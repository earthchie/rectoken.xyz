import { loadPrice } from './data';

export function initPrice(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-live-price]');
  if (!root) return;

  const set = (selector: string, value: string) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  loadPrice()
    .then((price) => {
      set('[data-otc-usd]', `$${price.otcUsd.toFixed(2)}`);
      set(
        '[data-otc-thb]',
        price.otcThb.toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
      set(
        '[data-price-updated]',
        new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Bangkok',
        }).format(price.updatedAt)
      );
    })
    .catch(() => {
      /* static fallback values remain */
    });
}
