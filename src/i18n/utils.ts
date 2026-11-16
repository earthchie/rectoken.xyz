import en from './en.json';
import th from './th.json';

export type Locale = 'en' | 'th';
export const LOCALES: Locale[] = ['en', 'th'];
export const DEFAULT_LOCALE: Locale = 'th';

const dictionaries: Record<Locale, Record<string, unknown>> = { en, th };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'th';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'th' : 'en';
}

/** Translate a dotted key with English fallback. */
export function t(key: string, locale: Locale = DEFAULT_LOCALE): string {
  const parts = key.split('.');

  const lookup = (dict: Record<string, unknown>): string | undefined => {
    let value: unknown = dict;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return typeof value === 'string' ? value : undefined;
  };

  return lookup(dictionaries[locale]) ?? lookup(dictionaries.en) ?? key;
}

/** Return raw dictionary node (arrays / objects), with English fallback. */
export function td<T = unknown>(key: string, locale: Locale = DEFAULT_LOCALE): T | undefined {
  const parts = key.split('.');
  const lookup = (dict: Record<string, unknown>): unknown => {
    let value: unknown = dict;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return value;
  };
  return (lookup(dictionaries[locale]) ?? lookup(dictionaries.en)) as T | undefined;
}

/** Pick the right side of a bilingual record. */
export function pick<T>(record: Record<Locale, T>, locale: Locale): T {
  return record[locale] ?? record.en;
}

/** Extract locale from a pathname such as /th/compliance. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Remove the locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return '/' + parts.join('/');
}

/** BCP-47 tag for Intl / html lang. */
export function htmlLang(locale: Locale): string {
  return locale === 'th' ? 'th-TH' : 'en';
}

export function localeLabel(locale: Locale): string {
  return locale === 'th' ? 'ไทย' : 'English';
}
