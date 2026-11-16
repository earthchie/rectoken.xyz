import { loadAddressBalances } from './data';
import { CHAINS } from '@data/site';
import { isEvmAddress, formatNumber } from '../utils/format';

export function initCheck(lang: string): void {
  const form = document.querySelector<HTMLFormElement>('[data-check-form]');
  if (!form) return;

  const input = form.querySelector<HTMLInputElement>('[data-check-input]');
  const submit = form.querySelector<HTMLButtonElement>('[data-check-submit]');
  const error = document.querySelector<HTMLElement>('[data-check-error]');
  const result = document.querySelector<HTMLElement>('[data-check-result]');
  const addressEl = document.querySelector<HTMLElement>('[data-check-address]');
  const timeEl = document.querySelector<HTMLElement>('[data-check-time]');
  const holdingsEl = document.querySelector<HTMLElement>('[data-check-holdings]');
  const emptyEl = document.querySelector<HTMLElement>('[data-check-empty]');
  const submitLabel = submit?.textContent || 'Check';

  const setError = (message: string) => {
    if (!error) return;
    error.textContent = message;
    error.hidden = !message;
  };

  const setBalance = (key: string, value: number | null) => {
    document.querySelectorAll<HTMLElement>(`[data-balance="${key}"]`).forEach((el) => {
      el.textContent =
        value === null
          ? '-'
          : formatNumber(value, lang === 'th' ? 'th' : 'en', { maximumFractionDigits: 4 });
    });
  };

  const renderHoldings = (holdings: Awaited<ReturnType<typeof loadAddressBalances>>['holdings']) => {
    if (!holdingsEl) return;
    holdingsEl.replaceChildren();

    if (!holdings.length) {
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    holdings.forEach(({ project, balance }) => {
      const row = document.createElement('div');
      row.className = 'holding-row';

      const left = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'holding-name';
      name.textContent = project.name;
      const meta = document.createElement('div');
      meta.className = 'holding-meta';
      meta.textContent = `${project.projectId} · ${project.province} · ${project.symbol || 'REC'}`;
      left.append(name, meta);

      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.alignItems = 'center';
      right.style.gap = '12px';

      const value = document.createElement('div');
      value.className = 'holding-value';
      value.textContent =
        formatNumber(balance, lang === 'th' ? 'th' : 'en', { maximumFractionDigits: 4 }) + ' ';
      const unit = document.createElement('small');
      unit.textContent = 'REC';
      value.appendChild(unit);

      const link = document.createElement('a');
      link.href = `${CHAINS.thaifi.explorer}/address/${project.address}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'link-arrow';
      link.style.fontSize = '0.65rem';
      link.textContent = lang === 'th' ? 'ดูบน Explorer' : 'explorer';

      right.append(value, link);
      row.append(left, right);
      holdingsEl.appendChild(row);
    });
  };

  const run = async (address: string) => {
    setError('');
    if (!isEvmAddress(address)) {
      setError(
        lang === 'th'
          ? 'กรุณากรอกที่อยู่ 0x ที่ถูกต้อง (42 ตัวอักษร)'
          : 'Enter a valid 0x address (42 characters).'
      );
      result && (result.hidden = true);
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = lang === 'th' ? 'กำลังตรวจสอบ…' : 'Checking…';
    }

    try {
      const balances = await loadAddressBalances(address);
      if (addressEl) addressEl.textContent = address;
      if (timeEl) {
        timeEl.textContent = new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Bangkok',
        }).format(balances.updatedAt);
      }
      setBalance('thaifi', balances.thaifi.rec);
      setBalance('native', balances.thaifi.native);
      setBalance('optimism', balances.optimism.rec);
      setBalance('kubchain', balances.kubchain.rec);
      renderHoldings(balances.holdings);

      if (result) result.hidden = false;
      const url = new URL(window.location.href);
      url.searchParams.set('address', address);
      window.history.replaceState({}, '', url);

      if (balances.thaifi.rec === null && balances.optimism.rec === null && balances.kubchain.rec === null) {
        if (emptyEl) emptyEl.hidden = false;
      }
    } catch (err) {
      console.warn('[check] balance lookup failed', err);
      setError(
        lang === 'th'
          ? 'ไม่สามารถโหลดข้อมูลกระเป๋าได้ กรุณาลองอีกครั้ง'
          : 'Could not load wallet data. Please try again.'
      );
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void run(input?.value.trim() || '');
  });

  const initial = new URLSearchParams(window.location.search).get('address');
  if (initial) {
    if (input) input.value = initial;
    void run(initial);
  }
}
