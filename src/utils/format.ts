import type { Locale } from '@i18n/utils';

export function formatNumber(
  value: number | bigint,
  locale: Locale = 'en',
  options: Intl.NumberFormatOptions = {}
): string {
  const n = typeof value === 'bigint' ? Number(value) : value;
  if (!Number.isFinite(n)) return '-';
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    maximumFractionDigits: 2,
    ...options,
  }).format(n);
}

export function formatCompact(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '-';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(digits)}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(digits)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(digits)}K`;
  return value.toLocaleString('en-US', { maximumFractionDigits: digits });
}

/** Convert raw base units (string or bigint) into a decimal number. */
export function fromUnits(raw: string | bigint, decimals = 18): number {
  try {
    const value = typeof raw === 'bigint' ? raw : BigInt(raw);
    const base = 10n ** BigInt(decimals);
    const whole = value / base;
    const fraction = value % base;
    const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 8);
    return Number(whole.toString() + '.' + fractionStr);
  } catch {
    const n = Number(raw);
    return Number.isFinite(n) ? n / Math.pow(10, decimals) : 0;
  }
}

export function formatUnits(raw: string | bigint, decimals = 18, maxFraction = 2): string {
  const n = fromUnits(raw, decimals);
  if (!Number.isFinite(n)) return '-';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Math.min(2, maxFraction),
    maximumFractionDigits: maxFraction,
  }).format(n);
}

export function formatCompactUnits(raw: string | bigint, decimals = 18): string {
  return formatCompact(fromUnits(raw, decimals));
}

export function shortAddress(address: string, head = 6, tail = 4): string {
  if (!address) return '';
  if (address.length <= head + tail + 2) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function isEvmAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatThb(value: number): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDateIso(date: string | Date, locale: Locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(d);
}

export function formatDateTime(date: Date | string | number, locale: Locale = 'en'): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok',
  }).format(d);
}

export function pct(value: number, digits = 2): string {
  return `${value.toFixed(digits)}%`;
}
