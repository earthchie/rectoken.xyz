/**
 * Redemption intake without a backend.
 *
 * The form validates the request locally and prepares a mailto draft with every
 * field the team needs. Nothing is transmitted from this page; the request only
 * exists once the visitor sends the email from their own mail app.
 */

export function initRedeem(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-redeem]');
  if (!root) return;

  const formWrap = root.querySelector<HTMLElement>('[data-redeem-form-wrap]');
  const form = root.querySelector<HTMLFormElement>('[data-redeem-form]');
  const draft = root.querySelector<HTMLElement>('[data-redeem-draft]');
  const errorEl = root.querySelector<HTMLElement>('[data-redeem-error]');
  const submit = root.querySelector<HTMLButtonElement>('[data-redeem-submit]');
  const mailto = root.querySelector<HTMLAnchorElement>('[data-redeem-mailto]');

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

  const supportEmail = (mailto?.getAttribute('href') || 'mailto:info@blockedge.earth')
    .replace(/^mailto:/, '')
    .split('?')[0];

  const buildMailto = () => {
    const body = [
      `Email: ${email()}`,
      `Account ID: ${account()}`,
      `Amount: ${amount()} REC`,
      `Network: ${network()}`,
      `Transaction hash: ${hash()}`,
      `Option: ${option()}`,
      `Notes: ${notes()}`,
    ].join('\n');
    const subject = lang === 'th' ? 'คำขอแลกคืน REC Token' : 'REC Token redemption request';
    return `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form?.addEventListener('submit', (event) => {
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

    const href = buildMailto();
    if (mailto) mailto.href = href;
    if (formWrap) formWrap.hidden = true;
    if (draft) draft.hidden = false;
    if (submit) submit.blur();
    window.location.href = href;
  });

  root.querySelector('[data-redeem-another]')?.addEventListener('click', () => {
    if (draft) draft.hidden = true;
    if (formWrap) formWrap.hidden = false;
    setError('');
  });
}
