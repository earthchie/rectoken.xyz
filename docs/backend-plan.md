# Redemption backend plan

Status: draft, not implemented. The public site is static and prepares an email draft. This document
scopes the separate service that will replace that with a recorded request.

## Purpose

Receive a redemption request, verify the on-chain transfer it references, notify the operations team,
and give the requester a reference ID and status. The service never holds keys, never burns tokens and
never moves funds; settlement stays a manual, reviewed operation.

## Scope

In scope:

- Accept and validate a redemption request over HTTPS.
- Verify the referenced transaction on ThaiFi and Optimism.
- Detect duplicates and reject already-used transaction hashes.
- Store the request, its state and an audit trail.
- Send a confirmation to the requester and a notification to operations.
- Expose status to the requester and a triage view to staff.

Out of scope:

- Custody, signing or automated burning.
- KYC/AML decisions (the issuer handles eligibility out of band).
- Price calculation or trading.
- Public listing of requests.

## API

All endpoints JSON over HTTPS, versioned under `/v1`.

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/v1/redemptions` | Create a request |
| `GET` | `/v1/redemptions/{id}` | Status for the requester (id plus email match) |
| `GET` | `/v1/health` | Liveness for the platform |

`POST /v1/redemptions` body:

```json
{
  "email": "user@example.com",
  "accountId": "REDEX-12345",
  "amount": 1000,
  "network": "optimism",
  "transactionHash": "0x...",
  "option": "transfer | retire-entity | retire-individual",
  "notes": "optional, max 2000 chars",
  "locale": "th | en",
  "turnstileToken": "..."
}
```

Responses: `201` with `{ id, status, receivedAt }`; `400` for validation failures with a stable
machine-readable `code`; `409` when the transaction hash was already submitted; `429` when rate
limited; `503` when email delivery is unavailable.

Requirements:

- Reject unknown fields, cap the body at 32 KB, cap string lengths server-side.
- Validate `email`, `amount >= 100`, `network` enum, `option` enum and `transactionHash` as
  `0x` plus 64 hex characters.
- Accept an `Idempotency-Key` header; identical keys return the original request instead of creating
  a second one.
- Rate limit by IP and by email, for example 5 requests per hour per IP and 20 per day per address.
- CORS: allow only the production site origins; no wildcard, no credentials.

## Verification pipeline

On create:

1. Fetch the transaction and receipt from the chain's RPC.
2. Confirm it succeeded (`status == 0x1`) and was sent to the redemption vault for that network.
3. Confirm the token contract is the REC Token contract and the transferred amount matches the
   requested amount within the accepted decimals.
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
| `email` | Requester contact, personal data |
| `account_id` | REDEX/Evident identifier |
| `amount`, `network`, `option` | Request details |
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
| Cloudflare Worker + D1 + Queues + Email | Stays in the current platform, low ops | D1 and queue semantics are limited; email provider still external |
| Small Node service (Fastify) + Postgres + provider API | Clear schema, easy migrations, portable | Needs a runtime host, backups and monitoring |

Recommendation: a small Node service with Postgres. The workload is low volume, the schema and audit
requirements matter more than edge latency, and it keeps the static site independent of the backend.

## Frontend integration

When the backend exists:

1. Replace the mailto submit in `src/scripts/redeem.ts` with `POST` to the API origin.
2. Keep the mailto draft as the fallback when the request fails or the service is unreachable.
3. Add the API origin to `connect-src` in `public/_headers`.
4. Render the returned reference ID and status instead of the current "email ready" panel.
5. Add Turnstile back to the form only if the backend verifies it; keep the site key in the build
   environment.

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
