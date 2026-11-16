/**
 * Cloudflare Pages Function - redemption request intake.
 *
 * Environment variables (set in the Pages project, never in the repo):
 *   BREVO_API_KEY                  Brevo transactional email key
 *   CLOUDFLARE_TURNSTILE_SECRET_KEY Turnstile secret (optional but recommended)
 *   REDEEM_TO_EMAIL                inbox that receives requests
 *   REDEEM_FROM_EMAIL              verified sender address
 */

type Env = {
  BREVO_API_KEY?: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY?: string;
  REDEEM_TO_EMAIL?: string;
  REDEEM_FROM_EMAIL?: string;
};

type Context = {
  request: Request;
  env: Env;
};

const MAX_LENGTH = {
  email: 254,
  accountId: 120,
  notes: 2000,
  transactionHash: 66,
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ success: false, message: 'Unsupported content type' }, 415);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid request body' }, 400);
  }

  const email = clean(body.email, MAX_LENGTH.email);
  const accountId = clean(body.accountId, MAX_LENGTH.accountId);
  const transactionHash = clean(body.transactionHash, MAX_LENGTH.transactionHash);
  const notes = clean(body.notes, MAX_LENGTH.notes);
  const network = body.network === 'kubchain' ? 'kubchain' : 'optimism';
  const option = ['transfer', 'retire-entity', 'retire-individual'].includes(body.option)
    ? body.option
    : 'transfer';
  const amount = Number(body.amount);
  const locale = body.locale === 'th' ? 'th' : 'en';
  const turnstileToken = clean(body.turnstileToken, 4000);

  if (!email || !accountId || !transactionHash) {
    return json(
      {
        success: false,
        message: 'Missing required fields',
        details: 'Email, account ID and transaction hash are required.',
      },
      400
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: 'Invalid email format' }, 400);
  }

  if (!/^0x[a-fA-F0-9]{64}$/.test(transactionHash)) {
    return json({ success: false, message: 'Invalid transaction hash format' }, 400);
  }

  if (!Number.isFinite(amount) || amount < 100) {
    return json({ success: false, message: 'Minimum redemption is 100 REC' }, 400);
  }

  if (env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return json({ success: false, message: 'Security verification is required' }, 400);
    }
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for');
    const verified = await verifyTurnstile(
      env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      turnstileToken,
      ip ? ip.split(',')[0].trim() : null
    );
    if (!verified) {
      return json({ success: false, message: 'Security verification failed' }, 400);
    }
  }

  if (!env.BREVO_API_KEY) {
    return json(
      {
        success: false,
        message: 'Request service is not configured',
        details: 'Email delivery is not configured on this deployment.',
      },
      503
    );
  }

  const requestId = `REC-${Date.now().toString(36).toUpperCase()}`;
  const to = env.REDEEM_TO_EMAIL || 'info@blockedge.earth';
  const from = env.REDEEM_FROM_EMAIL || 'noreply@blockedge.earth';
  const createdAt = new Date().toISOString();

  const rows = [
    ['Request ID', requestId],
    ['Created', createdAt],
    ['Email', email],
    ['Account ID', accountId],
    ['Amount', `${amount.toLocaleString('en-US')} REC`],
    ['Network', network],
    ['Option', option],
    ['Transaction hash', transactionHash],
    ['Notes', notes || '-'],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;white-space:nowrap">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0a1712;font-size:13px">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join('');

  const adminHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px;margin:0 0 4px">New REC redemption request</h1>
      <p style="color:#6b7280;font-size:13px;margin:0 0 20px">A request has been submitted through rectoken.xyz. Verify the transaction before burning any tokens.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">${table}</table>
      <p style="color:#6b7280;font-size:11px;margin-top:20px">This email contains personal data. Handle it under the privacy policy.</p>
    </div>`;

  const userHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px;margin:0 0 4px">${locale === 'th' ? 'ได้รับคำขอแลกคืนแล้ว' : 'We received your redemption request'}</h1>
      <p style="color:#6b7280;font-size:13px;margin:0 0 20px">${locale === 'th' ? 'ทีมงานจะตรวจสอบธุรกรรมและติดต่อกลับทางอีเมลนี้' : 'Our team will verify the transaction and contact you at this address.'}</p>
      <p style="font-size:13px;color:#0a1712"><strong>${locale === 'th' ? 'รหัสคำขอ' : 'Request ID'}:</strong> ${requestId}</p>
      <p style="font-size:13px;color:#0a1712"><strong>${locale === 'th' ? 'จำนวน' : 'Amount'}:</strong> ${amount.toLocaleString('en-US')} REC</p>
      <p style="font-size:13px;color:#0a1712"><strong>${locale === 'th' ? 'สถานะ' : 'Status'}:</strong> ${locale === 'th' ? 'รอตรวจสอบ' : 'Pending review'}</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px">${locale === 'th' ? 'ขั้นตอนทั้งหมดไม่เกิน 30 วันทำการ นโยบายความเป็นส่วนตัว: https://rectoken.xyz/th/legal/privacy' : 'The total process does not exceed 30 business days. Privacy policy: https://rectoken.xyz/en/legal/privacy'}</p>
    </div>`;

  const adminSent = await sendEmail(env.BREVO_API_KEY, {
    sender: { name: 'REC Token System', email: from },
    to: [{ email: to, name: 'BlockEdge Redemption' }],
    replyTo: { email, name: 'REC Token User' },
    subject: `New redemption request ${requestId} - ${amount.toLocaleString('en-US')} REC`,
    htmlContent: adminHtml,
  }).catch(() => false);

  if (!adminSent) {
    return json(
      {
        success: false,
        message: 'Could not deliver the request',
        details: 'Please use the email fallback or try again shortly.',
      },
      502
    );
  }

  await sendEmail(env.BREVO_API_KEY, {
    sender: { name: 'BlockEdge REC Token', email: from },
    to: [{ email, name: 'REC Token User' }],
    subject: `REC Token redemption request ${requestId}`,
    htmlContent: userHtml,
  }).catch(() => false);

  return json({
    success: true,
    requestId,
    status: locale === 'th' ? 'รอตรวจสอบ' : 'Pending review',
    estimatedCompletion: new Date(Date.now() + 14 * 86_400_000).toISOString(),
    nextSteps:
      locale === 'th'
        ? [
            'ทีมงานจะตรวจสอบธุรกรรมและสิทธิ์ภายใน 3-14 วันทำการ',
            'คุณจะได้รับการยืนยันรายละเอียดสินทรัพย์ก่อนการเผาโทเคน',
            'การโอนหรือไถ่ถอนจะดำเนินการหลังคุณยืนยัน',
            'อีเมลยืนยันจะถูกส่งเมื่อดำเนินการเสร็จสิ้น',
          ]
        : [
            'Transaction verification and eligibility review within 3-14 business days',
            'You will receive pre-burn confirmation of the assets to be allocated',
            'Transfer or retirement proceeds after you confirm',
            'A completion email will be sent when the process is finished',
          ],
  });
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: { allow: 'POST, OPTIONS' },
  });
};
