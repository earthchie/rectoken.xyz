/**
 * Cloudflare Worker: static assets + redemption intake.
 *
 * The Worker only owns `/api/*`; every other request falls through to the
 * static asset router. Requests are verified against the chain before they are
 * stored, so a browser cannot invent an amount or reuse someone else's hash.
 */

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: any;
  NOTIFY_WEBHOOK?: string;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  FROM_EMAIL?: string;
};

type Network = 'optimism' | 'kubchain';
type Option = 'rehash' | 'retire-individual';

type Transfer = {
  amount: bigint;
  decimals: number;
  from: string;
  to: string;
};

type RedemptionInput = {
  contactName: string;
  email: string;
  phone: string;
  option: Option;
  rehashAccount?: string;
  beneficialName?: string;
  retirementReason?: string;
  notes?: string;
  network: Network;
  transactionHash: string;
  locale: 'th' | 'en';
};

const POOL_OPTIMISM = '0xf4fefee4730cf174608766877911f8d33735f9d7';
const POOL_KUBCHAIN = '0x5555555555240ef13ef76c1dc35aa5cd695616f8';
const VAULT_OPTIMISM = '0xb10c4edf6ee11f084fc24851883b0b237c96e6a8';
const VAULT_KUBCHAIN = '0x1111111c4f6eb907763780195a25984e3e8619b9';
const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const MIN_REC = 100n;

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

function addressFromTopic(topic: string): string {
  const clean = topic.startsWith('0x') ? topic.slice(2) : topic;
  return `0x${clean.slice(-40)}`.toLowerCase();
}

function unitsToDecimal(value: bigint, decimals: number): string {
  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const fraction = (value % base).toString().padStart(decimals, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : `${whole}`;
}

async function verifyOptimism(hash: string): Promise<Transfer> {
  const response = await fetch('https://mainnet.optimism.io', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionReceipt',
      params: [hash],
    }),
  });
  if (!response.ok) throw new Error('TX_NOT_FOUND');
  const payload = (await response.json()) as any;
  const receipt = payload?.result;
  if (!receipt) throw new Error('TX_NOT_FOUND');
  if (receipt.status !== '0x1') throw new Error('TX_FAILED');

  const vault = VAULT_OPTIMISM;
  let amount = 0n;
  let from = '';
  let to = '';

  for (const log of receipt.logs || []) {
    if ((log?.address || '').toLowerCase() !== POOL_OPTIMISM) continue;
    if ((log?.topics?.[0] || '').toLowerCase() !== TRANSFER_TOPIC) continue;
    const recipient = addressFromTopic(log.topics?.[2] || '');
    if (recipient !== vault && recipient !== ZERO_ADDRESS) continue;
    if (!log.data || log.data === '0x') continue;
    amount += BigInt(log.data);
    if (!from) from = addressFromTopic(log.topics?.[1] || '');
    to = recipient;
  }

  if (amount === 0n) throw new Error('NO_VAULT_TRANSFER');
  return { amount, decimals: 18, from, to };
}

async function verifyKubchain(hash: string): Promise<Transfer> {
  const base = 'https://www.kubscan.com/api/v2';
  let tx: any;
  try {
    const response = await fetch(`${base}/transactions/${hash}`);
    if (!response.ok) throw new Error('TX_NOT_FOUND');
    tx = await response.json();
  } catch {
    throw new Error('TX_NOT_FOUND');
  }
  if (!tx || (tx.status !== 'ok' && tx.result !== 'success')) throw new Error('TX_FAILED');

  const response = await fetch(`${base}/transactions/${hash}/token-transfers`);
  if (!response.ok) throw new Error('TX_NOT_FOUND');
  const payload = (await response.json()) as any;
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const vault = VAULT_KUBCHAIN;
  let amount = 0n;
  let decimals = 18;
  let from = '';
  let to = '';

  for (const item of items) {
    if ((item?.token?.address || '').toLowerCase() !== POOL_KUBCHAIN) continue;
    const recipient = (item?.to?.hash || '').toLowerCase();
    if (recipient !== vault && recipient !== ZERO_ADDRESS) continue;
    amount += BigInt(item?.total?.value || '0');
    decimals = Number(item?.total?.decimals ?? item?.token?.decimals ?? 18);
    if (!from) from = item?.from?.hash || '';
    to = recipient;
  }

  if (amount === 0n) throw new Error('NO_VAULT_TRANSFER');
  return { amount, decimals, from, to };
}

function requiredString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function optionalString(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function validate(body: any): { input?: RedemptionInput; error?: string } {
  if (optionalString(body?.company, 100)) return { error: 'SPAM_REJECTED' };

  const contactName = requiredString(body?.contactName, 120);
  const email = requiredString(body?.email, 200);
  const phone = requiredString(body?.phone, 32);
  const option = body?.option;
  const network = body?.network;
  const transactionHash = requiredString(body?.transactionHash, 66);

  if (!contactName) return { error: 'INVALID_CONTACT_NAME' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'INVALID_EMAIL' };
  if (!phone || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15) {
    return { error: 'INVALID_PHONE' };
  }
  if (option !== 'rehash' && option !== 'retire-individual') return { error: 'INVALID_OPTION' };
  if (network !== 'optimism' && network !== 'kubchain') return { error: 'INVALID_NETWORK' };
  if (!transactionHash || !/^0x[a-fA-F0-9]{64}$/.test(transactionHash)) {
    return { error: 'INVALID_TRANSACTION_HASH' };
  }

  const rehashAccount = optionalString(body?.rehashAccount, 200);
  const beneficialName = optionalString(body?.beneficialName, 200);
  const retirementReason = optionalString(body?.retirementReason, 1000);

  if (option === 'rehash' && !rehashAccount) return { error: 'MISSING_REHASH_ACCOUNT' };
  if (option === 'retire-individual' && !beneficialName) return { error: 'MISSING_BENEFICIAL_NAME' };
  if (option === 'retire-individual' && !retirementReason) {
    return { error: 'MISSING_RETIREMENT_REASON' };
  }

  return {
    input: {
      contactName,
      email,
      phone,
      option,
      rehashAccount: option === 'rehash' ? rehashAccount : undefined,
      beneficialName: option === 'retire-individual' ? beneficialName : undefined,
      retirementReason: option === 'retire-individual' ? retirementReason : undefined,
      notes: optionalString(body?.notes, 2000),
      network,
      transactionHash,
      locale: body?.locale === 'th' ? 'th' : 'en',
    },
  };
}

async function notify(env: Env, input: RedemptionInput, id: string, transfer: Transfer): Promise<void> {
  const lines = [
    `New REC redemption request ${id}`,
    '',
    `Contact: ${input.contactName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Option: ${input.option === 'rehash' ? 'Receive I-REC on REHASH' : 'Retire on behalf of an individual'}`,
  ];

  if (input.option === 'rehash') {
    lines.push(`REHASH account: ${input.rehashAccount}`);
  } else {
    lines.push(`Beneficial name: ${input.beneficialName}`);
    lines.push(`Reason: ${input.retirementReason}`);
  }

  lines.push(
    `Amount: ${unitsToDecimal(transfer.amount, transfer.decimals)} REC`,
    `Network: ${input.network === 'optimism' ? 'Optimism' : 'Kubchain'}`,
    `Transaction: ${input.transactionHash}`,
    `Sender: ${transfer.from || '-'}`,
    `Vault: ${transfer.to || '-'}`,
    `Notes: ${input.notes || '-'}`
  );
  const text = lines.join('\n');

  if (env.NOTIFY_WEBHOOK) {
    try {
      const url = new URL(env.NOTIFY_WEBHOOK);
      if (url.protocol !== 'https:') throw new Error('INSECURE_WEBHOOK');
      await fetch(url.toString(), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, content: text }),
      });
    } catch (error) {
      console.error('[redemption] webhook notification failed', error);
    }
  }

  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL && env.FROM_EMAIL) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: [env.NOTIFY_EMAIL],
          reply_to: input.email,
          subject: `New REC redemption request ${id}`,
          text,
        }),
      });
      if (!response.ok) console.error('[redemption] resend notification failed', response.status);
    } catch (error) {
      console.error('[redemption] resend notification failed', error);
    }
  }
}

async function createRedemption(request: Request, env: Env, ctx: any): Promise<Response> {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'ORIGIN_NOT_ALLOWED' }, 403);
  }

  let body: any;
  try {
    const raw = await request.text();
    if (raw.length > 32_000) return json({ error: 'PAYLOAD_TOO_LARGE' }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'INVALID_JSON' }, 400);
  }

  const parsed = validate(body);
  if (!parsed.input) return json({ error: parsed.error || 'INVALID_REQUEST' }, 400);
  const input = parsed.input;

  let transfer: Transfer;
  try {
    transfer = input.network === 'optimism'
      ? await verifyOptimism(input.transactionHash)
      : await verifyKubchain(input.transactionHash);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'VERIFICATION_FAILED';
    const status = code === 'TX_NOT_FOUND' ? 404 : code === 'NO_VAULT_TRANSFER' ? 422 : 400;
    return json({ error: code }, status);
  }

  if (transfer.amount < MIN_REC * 10n ** BigInt(transfer.decimals)) {
    return json({ error: 'BELOW_MINIMUM' }, 400);
  }

  try {
    const recent = await env.DB.prepare(
      "SELECT COUNT(*) AS count FROM redemptions WHERE email = ? AND created_at > datetime('now','-1 hour')"
    )
      .bind(input.email)
      .first();
    if (Number(recent?.count || 0) >= 5) return json({ error: 'RATE_LIMITED' }, 429);
  } catch (error) {
    console.error('[redemption] rate-limit query failed', error);
  }

  const id = `REC-${crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase()}`;
  const amount = unitsToDecimal(transfer.amount, transfer.decimals);

  try {
    await env.DB.prepare(
      `INSERT INTO redemptions
        (id, contact_name, email, phone, option, rehash_account, beneficial_name,
         retirement_reason, amount, network, transaction_hash, sender_address,
         vault_address, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        id,
        input.contactName,
        input.email,
        input.phone,
        input.option,
        input.rehashAccount ?? null,
        input.beneficialName ?? null,
        input.retirementReason ?? null,
        amount,
        input.network,
        input.transactionHash.toLowerCase(),
        transfer.from || null,
        transfer.to || null,
        input.notes || null
      )
      .run();
  } catch (error: any) {
    const message = String(error?.message || '');
    if (message.includes('UNIQUE constraint failed')) {
      return json({ error: 'TRANSACTION_ALREADY_USED' }, 409);
    }
    console.error('[redemption] insert failed', error);
    return json({ error: 'STORAGE_FAILED' }, 500);
  }

  console.log('[redemption] stored', id, input.option, input.network, amount);
  ctx.waitUntil(notify(env, input, id, transfer));
  return json({ id, status: 'received' }, 201);
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return json({ ok: true, service: 'rectoken-redemptions' });
    }

    if (url.pathname === '/api/redemptions' && request.method === 'POST') {
      return createRedemption(request, env, ctx);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'NOT_FOUND' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
