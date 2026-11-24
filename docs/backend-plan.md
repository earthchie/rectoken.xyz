# Redemption backend plan

Status: implemented in `src/worker.ts` on a Cloudflare Worker with D1. Requests are stored and the
form receives a reference ID. Notification hooks (webhook and Resend) exist but no channel is
configured yet, so requests are currently read from D1 by the team.

## Purpose

Receive a redemption request, verify the on-chain transfer it references, notify the operations team,
and give the requester a reference ID and status. The service never holds keys, never burns tokens and
never moves funds; settlement stays a manual, reviewed operation.

## Scope

In scope:

- Accept and validate a redemption request over HTTPS.
- Verify the referenced transaction on Optimism or Kubchain.
- Detect duplicates and reject already-used transaction hashes.
- Store the request, its state and an audit trail.
- Notify operations when a notification channel is configured. Requester acknowledgement is not
  sent yet.
- Expose status to the requester and a triage view to staff.

Out of scope:

- Custody, signing or automated burning.
- KYC/AML decisions (the issuer handles eligibility out of band).
- Price calculation or trading.
- Public listing of requests.

## API

All endpoints JSON over HTTPS. The implemented surface is:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/redemptions` | Create a request |
| `GET` | `/api/health` | Liveness for the platform |

A requester-facing status lookup (`GET /api/redemptions/{id}`) is not implemented yet.

`POST /v1/redemptions` body:

```json
{
  "contactName": "Somchai Example",
  "email": "user@example.com",
  "phone": "+66 81 234 5678",
  "option": "rehash | retire-individual",
  "rehashAccount": "REHASH account email or ID (required for rehash)",
  "beneficialName": "Beneficiary name (required for retire-individual)",
  "retirementReason": "Reason for retirement (required for retire-individual)",
  "amount": 1000,
  "network": "optimism | kubchain",
  "transactionHash": "0x...",
  "notes": "optional, max 2000 chars",
  "locale": "th | en",
  "turnstileToken": "..."
}
```

`amount` is accepted only as a cross-check; the server derives the authoritative amount from
`transactionHash` and rejects a mismatch.

Responses: `201` with `{ id, status, receivedAt }`; `400` for validation failures with a stable
machine-readable `code`; `409` when the transaction hash was already submitted; `429` when rate
limited; `503` when email delivery is unavailable.

Requirements:

- Reject unknown fields, cap the body at 32 KB, cap string lengths server-side.
- Validate `contactName`, `email`, `phone`, `amount >= 100`, `network` enum, `option` enum and
  `transactionHash` as `0x` plus 64 hex characters.
- Require `rehashAccount` for `rehash`, and both `beneficialName` and `retirementReason` for
  `retire-individual`; reject fields that belong to the other option.
- Accept an `Idempotency-Key` header; identical keys return the original request instead of creating
  a second one.
- Rate limit by IP and by email, for example 5 requests per hour per IP and 20 per day per address.
- CORS: allow only the production site origins; no wildcard, no credentials.

## Verification pipeline

On create:

1. Fetch the receipt from the Optimism RPC, or the transaction plus token transfers from the
   Kubchain API.
2. Confirm it succeeded and contains a `Transfer` of that network's REC token to the redemption
   vault (or to the zero address for a burn).
3. Derive the amount from that transfer and compare it to the requested amount within the accepted
   decimals. Never trust the browser-supplied amount.
4. Confirm the transaction is old enough to be final (for example 20 confirmations or 10 minutes).
5. Record the tx hash as consumed so it cannot back a second request.
6. Mark the request `verified`, or `rejected` with a reason code.

On-chain reads use fixed, allow-listed RPC hosts. No user-supplied URL is ever fetched; this is the
same rule the frontend applies in `src/scripts/net.ts`.

## Data

Store only what triage needs:

| Field | Notes |
|---|---|
| `id` | Public reference, for example `REC-<base32>` |
| `contact_name` | Requester contact, personal data |
| `email` | Requester contact, personal data |
| `phone` | Requester contact, personal data |
| `option` | `rehash` or `retire-individual` |
| `rehash_account` | Required for `rehash` |
| `beneficial_name` | Required for `retire-individual` |
| `retirement_reason` | Required for `retire-individual` |
| `amount`, `network` | Derived from the transaction |
| `sender_address`, `vault_address` | Derived from the transaction |
| `transaction_hash` | Unique, used for duplicate detection |
| `notes` | Free text, optional |
| `status` | `received`, `verified`, `rejected`, `in_review`, `completed`, `cancelled` |
| `created_at`, `updated_at` | UTC timestamps |
| `audit` | Append-only: actor, action, timestamp, reason |

Retention: agree with the issuer before launch. A reasonable default is 24 months after completion,
then delete personal data and keep an anonymised count. Back up daily and test a restore before
going live.

## Security

- Secrets come from the platform's secret store or environment. Nothing is committed, and no key
  reaches the browser.
- Turnstile is verified server-side on every create; without a token the request is rejected.
- Admin triage requires authenticated staff access (SSO or per-user tokens) and is never on the
  public origin.
- Every state change writes an audit entry. Logs carry request IDs, never raw email bodies.
- Outbound HTTP: https only, allow-listed hosts, no redirects followed, timeouts on every call.
- Return generic errors to the public; keep detail in internal logs.
- Set `Content-Security-Policy` and `Strict-Transport-Security` on the API host as well.

## Email

- Transactional provider with a verified sending domain; `Reply-To` set to the requester's address
  on the operations notification.
- Two templates per locale: acknowledgement to the requester, notification to operations.
- Send the acknowledgement only after the request is stored; a failed email must not lose the
  request. Queue retries and surface failures to operations.
- Keep the current wording that a request is received only when the team replies, and state the
  30 business day ceiling.

## Hosting options

| Option | Shape | Trade-off |
|---|---|---|
| **Cloudflare Worker + D1 + Queues + email API** | `POST /api/redemptions` Worker writes to D1, sends email and queues retries | Same platform as the site; D1 has a unique index on `transaction_hash`; no server to manage; external email provider needed |
| **Firebase Firestore + Cloud Functions** | Browser writes to Firestore under security rules; `onCreate` function sends email/FCM | Real-time console and auth; requires App Check and careful rules because PII is in a client-writable store; Blaze plan |
| **Supabase Postgres + Edge Functions** | Row-level security, SQL schema, webhooks | Another vendor; strong audit/query story |
| **Formspree / Basin / Netlify Forms** | Hosted form endpoint, built-in email | Fastest to ship; no on-chain verification, duplicate detection or custom audit |
| **Small Node service + Postgres** | Full control over schema, queues and audit | Needs a runtime host, backups and monitoring |

Recommendation for this site: **Cloudflare Worker + D1 + Turnstile + an email API**. The site already
lives on Cloudflare, the volume is low, and D1's unique index on `transaction_hash` gives duplicate
protection without a separate database service. Keep the Node + Postgres option if the issuer wants a
full audit/migrations toolchain and independent hosting more than low ops.

### Notifications

- Send an operations email on every stored request, with `Reply-To` set to the requester.
- Send an acknowledgement to the requester only after the row is committed.
- Mirror the notification to a Slack/Telegram webhook if operations wants an instant alert.
- Use a queue with retries; a failed email must never lose the request.
- Never notify from the browser. The browser-side verification is UX only; the Worker re-verifies the
  transaction and is the source of truth.

## Frontend integration

Implemented:

1. `src/scripts/redeem.ts` posts to the same-origin `/api/redemptions`.
2. The success panel shows the returned reference ID.
3. The browser verifies the transfer for immediate feedback; the Worker re-verifies it independently.
4. There is no mailto fallback: a request counts as received only after the Worker returns 201.
5. Turnstile is not implemented. The Worker uses a honeypot, a same-origin check and a per-email rate
   limit; add Turnstile before high-traffic launch if needed.

## Delivery phases

1. Schema, migrations, request creation and storage, no email.
2. On-chain verification and duplicate detection.
3. Email templates, queues and retries.
4. Staff triage view and audit log.
5. Frontend switch-over with the mailto fallback retained.
6. Retention job, backup restore drill, incident runbook.

## Open questions for the issuer

- Who triages requests, and what is the internal SLA per status?
- Retention period and jurisdiction for stored personal data.
- Whether requesters may look up status with only an ID, or must also confirm their email.
- Whether operations wants a shared inbox notification, a dashboard, or both.
- Which vault addresses and token contracts are canonical per network.
