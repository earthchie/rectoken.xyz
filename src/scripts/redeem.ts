declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const thaiApiErrors = new Map<string, string>([
  ['Unsupported content type', 'รูปแบบคำขอไม่รองรับ กรุณาลองส่งคำขออีกครั้ง'],
  ['Invalid request body', 'ข้อมูลคำขอไม่ถูกต้อง กรุณาลองส่งคำขออีกครั้ง'],
  ['Missing required fields', 'กรุณากรอกอีเมล รหัสบัญชี และแฮชธุรกรรมให้ครบถ้วน'],
  ['Invalid email format', 'กรุณากรอกอีเมลที่ถูกต้อง'],
  ['Invalid transaction hash format', 'กรุณากรอกแฮชธุรกรรมที่ถูกต้อง โดยขึ้นต้นด้วย 0x และตามด้วยอักขระฐานสิบหก 64 ตัว'],
  ['Minimum redemption is 100 REC', 'จำนวนขั้นต่ำสำหรับการแลกคืนคือ 100 REC'],
  ['Security verification is required', 'กรุณายืนยันความปลอดภัยก่อนส่งคำขอ'],
  ['Security verification failed', 'การยืนยันความปลอดภัยไม่สำเร็จ กรุณาลองอีกครั้ง'],
  ['Request service is not configured', 'บริการรับคำขอยังไม่พร้อมใช้งาน กรุณาใช้อีเมลด้านล่าง'],
  ['Could not deliver the request', 'ส่งคำขอไม่สำเร็จ กรุณาใช้อีเมลด้านล่างหรือลองอีกครั้ง'],
]);

export function initRedeem(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-redeem]');
  if (!root) return;

  const formWrap = root.querySelector<HTMLElement>('[data-redeem-form-wrap]');
  const form = root.querySelector<HTMLFormElement>('[data-redeem-form]');
  const success = root.querySelector<HTMLElement>('[data-redeem-success]');
  const errorEl = root.querySelector<HTMLElement>('[data-redeem-error]');
  const submit = root.querySelector<HTMLButtonElement>('[data-redeem-submit]');
  const fallback = root.querySelector<HTMLElement>('[data-redeem-fallback]');
  const mailto = root.querySelector<HTMLAnchorElement>('[data-redeem-mailto]');
  const turnstileEl = root.querySelector<HTMLElement>('[data-turnstile]');

  let token = '';
  let widgetId: string | null = null;

  const setError = (message: string) => {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = !message;
  };

  const email = () => root.querySelector<HTMLInputElement>('[data-redeem-email]')?.value.trim() || '';
  const account = () => root.querySelector<HTMLInputElement>('[data-redeem-account]')?.value.trim() || '';
  const amount = () => root.querySelector<HTMLInputElement>('[data-redeem-amount]')?.value.trim() || '';
  const network = () => root.querySelector<HTMLSelectElement>('[data-redeem-network]')?.value || 'optimism';
  const hash = () => root.querySelector<HTMLInputElement>('[data-redeem-hash]')?.value.trim() || '';
  const option = () => root.querySelector<HTMLSelectElement>('[data-redeem-option]')?.value || 'transfer';
  const notes = () => root.querySelector<HTMLTextAreaElement>('[data-redeem-notes]')?.value.trim() || '';

  const updateMailto = () => {
    if (!mailto) return;
    const body = [
      `Email: ${email()}`,
      `Account ID: ${account()}`,
      `Amount: ${amount()} REC`,
      `Network: ${network()}`,
      `Transaction hash: ${hash()}`,
      `Option: ${option()}`,
      `Notes: ${notes()}`,
    ].join('\n');
    mailto.href = `mailto:info@blockedge.earth?subject=${encodeURIComponent(
      'REC Token Redemption Request'
    )}&body=${encodeURIComponent(body)}`;
  };

  const loadTurnstile = () => {
    if (!turnstileEl) return;
    const siteKey = turnstileEl.dataset.sitekey || '';
    if (!siteKey) return;

    const render = () => {
      if (!window.turnstile || widgetId) return;
      widgetId = window.turnstile.render(turnstileEl, {
        sitekey: siteKey,
        callback: (value: string) => {
          token = value;
        },
        'expired-callback': () => {
          token = '';
        },
        'error-callback': () => {
          token = '';
        },
      });
    };

    if (window.turnstile) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (existing) {
      existing.addEventListener('load', render, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', render, { once: true });
    document.head.appendChild(script);
  };

  const showSuccess = (payload: any) => {
    if (formWrap) formWrap.hidden = true;
    if (success) success.hidden = false;

    const idEl = root.querySelector<HTMLElement>('[data-redeem-request-id]');
    const statusEl = root.querySelector<HTMLElement>('[data-redeem-status]');
    const expectedEl = root.querySelector<HTMLElement>('[data-redeem-expected]');
    const nextEl = root.querySelector<HTMLElement>('[data-redeem-next]');

    if (idEl) idEl.textContent = payload?.requestId || '-';
    if (statusEl) statusEl.textContent = payload?.status || (lang === 'th' ? 'รอตรวจสอบ' : 'Pending review');
    if (expectedEl) {
      expectedEl.textContent = payload?.estimatedCompletion
        ? new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(payload.estimatedCompletion))
        : lang === 'th'
          ? 'ภายใน 30 วันทำการ'
          : 'Within 30 business days';
    }
    if (nextEl) {
      nextEl.replaceChildren();
      (payload?.nextSteps ?? []).forEach((step: string) => {
        const li = document.createElement('li');
        li.textContent = step;
        nextEl.appendChild(li);
      });
    }
  };

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    setError('');

    const tx = hash();
    const mail = email();
    const value = Number(amount());

    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setError(lang === 'th' ? 'กรุณากรอกอีเมลที่ถูกต้อง' : 'Enter a valid email address.');
      return;
    }
    if (!account()) {
      setError(lang === 'th' ? 'กรุณากรอกรหัสบัญชี REDEX' : 'Enter your REDEX account ID.');
      return;
    }
    if (!Number.isFinite(value) || value < 100) {
      setError(lang === 'th' ? 'จำนวนขั้นต่ำคือ 100 REC' : 'The minimum amount is 100 REC.');
      return;
    }
    if (!/^0x[a-fA-F0-9]{64}$/.test(tx)) {
      setError(
        lang === 'th'
          ? 'กรุณากรอกแฮชธุรกรรมที่ถูกต้อง โดยขึ้นต้นด้วย 0x และตามด้วยอักขระฐานสิบหก 64 ตัว'
          : 'Enter a valid transaction hash (0x + 64 characters).'
      );
      return;
    }
    if (turnstileEl?.dataset.sitekey && !token) {
      setError(
        lang === 'th'
          ? 'กรุณายืนยันความปลอดภัยก่อนส่งคำขอ'
          : 'Complete the security verification before submitting.'
      );
      return;
    }

    updateMailto();
    if (submit) {
      submit.disabled = true;
      submit.textContent = lang === 'th' ? 'กำลังส่งคำขอ…' : 'Submitting…';
    }

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: mail,
          accountId: account(),
          amount: value,
          network: network(),
          transactionHash: tx,
          option: option(),
          notes: notes(),
          locale: lang,
          turnstileToken: token,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          lang === 'th'
            ? thaiApiErrors.get(payload?.message) || 'ไม่สามารถส่งคำขอได้ กรุณาลองอีกครั้ง'
            : payload?.message || 'Could not submit the request. Please try again.'
        );
        if (fallback) fallback.hidden = false;
        return;
      }

      showSuccess(payload);
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
      token = '';
    } catch (error) {
      console.error('[redeem] submit failed', error);
      setError(
        lang === 'th'
          ? 'บริการรับคำขอยังไม่พร้อมใช้งานในขณะนี้ กรุณาติดต่อทางอีเมลด้านล่าง'
          : 'The request service is not available here. Use the email option below.'
      );
      if (fallback) fallback.hidden = false;
      updateMailto();
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = lang === 'th' ? 'ส่งคำขอแลกคืน' : 'Submit redemption request';
      }
    }
  });

  root.querySelector('[data-redeem-another]')?.addEventListener('click', () => {
    if (success) success.hidden = true;
    if (formWrap) formWrap.hidden = false;
    setError('');
    if (fallback) fallback.hidden = true;
    if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
    token = '';
    form?.reset();
  });

  loadTurnstile();
}
