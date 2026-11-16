/**
 * Pagefind-powered search.
 * Uses the low-level API (not PagefindUI) so the palette matches the design
 * and results can be filtered by locale.
 */

type PagefindResult = {
  url: string;
  excerpt: string;
  meta: { title?: string };
  filters: Record<string, string[]>;
  data: () => Promise<PagefindResult>;
};

let pagefind: any = null;
let loading: Promise<any> | null = null;
let failed = false;

const LOCALE_NAMES: Record<string, string> = { en: 'EN', th: 'TH' };

async function getPagefind(): Promise<any> {
  if (pagefind) return pagefind;
  if (failed) return null;
  if (loading) return loading;

  loading = (async () => {
    try {
      // The index only exists after `npm run build`. The variable specifier is
      // deliberately not statically analysable so Rollup leaves it as a runtime
      // import of the public asset (no eval, CSP-safe).
      const pagefindUrl = '/pagefind/pagefind.js';
      const mod = await import(/* @vite-ignore */ pagefindUrl);
      const api = (mod as any).default ?? mod;
      if (api?.options) {
        await api.options({ excerptLength: 30 });
      }
      pagefind = api;
      return api;
    } catch (error) {
      console.warn('[search] Pagefind index not available yet. Run `npm run build`.', error);
      failed = true;
      return null;
    }
  })();

  return loading;
}

function sanitizeExcerpt(html: string): string {
  return html.replace(/<(?!\/?mark\b)[^>]*>/gi, '');
}

function localeOf(url: string): string {
  const match = url.match(/^\/(en|th)\//);
  return match ? match[1] : 'en';
}

function cleanUrl(url: string): string {
  return url.replace(/index\.html$/, '');
}

async function runSearch(query: string, locale: string): Promise<PagefindResult[]> {
  const api = await getPagefind();
  if (!api) return [];
  const trimmed = query.trim();
  if (!trimmed) return [];

  let search = await api.search(trimmed, { filters: { locale } });
  if ((!search.results || search.results.length === 0) && locale) {
    // Fallback for indexes built before the locale filter existed.
    search = await api.search(trimmed);
  }

  const slice = (search.results ?? []).slice(0, 25);
  const data = await Promise.all(slice.map((r: PagefindResult) => r.data()));
  return data as PagefindResult[];
}

function resultMarkup(result: PagefindResult, index: number): HTMLElement {
  const url = cleanUrl(result.url);
  const locale = localeOf(url);
  const title = result.meta?.title?.replace(/\s*-\s*RECTOKEN$/, '') || url;

  const link = document.createElement('a');
  link.className = 'search-result';
  link.href = url;
  link.dataset.index = String(index);

  const titleRow = document.createElement('div');
  titleRow.className = 'search-result-title';
  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;
  titleRow.appendChild(titleSpan);

  const badge = document.createElement('span');
  badge.className = 'search-locale';
  badge.textContent = LOCALE_NAMES[locale] ?? locale.toUpperCase();
  titleRow.appendChild(badge);

  const excerpt = document.createElement('div');
  excerpt.className = 'search-result-excerpt';
  excerpt.innerHTML = sanitizeExcerpt(result.excerpt || '');

  link.appendChild(titleRow);
  link.appendChild(excerpt);
  return link;
}

function emptyMarkup(message: string): HTMLElement {
  const p = document.createElement('p');
  p.className = 'search-empty';
  p.textContent = message;
  return p;
}

export function initSearch(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.__rectokenSearchInit) return;
  w.__rectokenSearchInit = true;

  const modal = document.querySelector<HTMLElement>('[data-search-modal]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const results = document.querySelector<HTMLElement>('[data-search-results]');
  const allLink = document.querySelector<HTMLAnchorElement>('[data-search-all]');
  const locale = modal?.dataset.locale || 'en';
  const placeholder = input?.placeholder || 'Search';

  let lastFocus: HTMLElement | null = null;
  let focusIndex = -1;
  let timer: number | undefined;

  function open(): void {
    if (!modal) return;
    lastFocus = document.activeElement as HTMLElement;
    modal.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => input?.focus(), 40);
  }

  function close(): void {
    if (!modal) return;
    modal.dataset.open = 'false';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function setFocus(index: number): void {
    if (!results) return;
    const items = Array.from(results.querySelectorAll<HTMLAnchorElement>('.search-result'));
    if (!items.length) return;
    focusIndex = (index + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle('is-focus', i === focusIndex));
    items[focusIndex].scrollIntoView({ block: 'nearest' });
  }

  async function render(query: string): Promise<void> {
    if (!results) return;
    focusIndex = -1;

    if (allLink) {
      const base = allLink.getAttribute('href')?.split('?')[0] ?? '#';
      allLink.href = query.trim() ? `${base}?q=${encodeURIComponent(query.trim())}` : base;
    }

    if (!query.trim()) {
      results.replaceChildren(emptyMarkup(placeholder));
      return;
    }

    const found = await runSearch(query, locale);
    if (!found.length) {
      const modalEl = document.querySelector('[data-search-modal]');
      results.replaceChildren(
        emptyMarkup(
          failed
            ? modalEl?.getAttribute('data-missing') || 'Search index not found. Run `npm run build`.'
            : modalEl?.getAttribute('data-empty') || 'No results found. Try a different term.'
        )
      );
      return;
    }

    results.replaceChildren(...found.map((r, i) => resultMarkup(r, i)));
  }

  /* Modal bindings */
  document.querySelectorAll<HTMLElement>('[data-search-open]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  input?.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => void render(input.value), 130);
  });

  input?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocus(focusIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocus(focusIndex - 1);
    } else if (event.key === 'Enter') {
      const items = results?.querySelectorAll<HTMLAnchorElement>('.search-result');
      if (items && items.length) {
        event.preventDefault();
        (items[Math.max(0, focusIndex)] ?? items[0]).click();
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null;
    const typing =
      target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      modal?.dataset.open === 'true' ? close() : open();
      return;
    }
    if (event.key === 'Escape' && modal?.dataset.open === 'true') {
      close();
      return;
    }
    if (event.key === '/' && !typing && modal?.dataset.open !== 'true') {
      event.preventDefault();
      open();
    }
    if (modal?.dataset.open === 'true') {
      // Simple focus trap
      if (event.key === 'Tab' && modal) {
        const focusables = modal.querySelectorAll<HTMLElement>(
          'input, a[href], button:not([disabled])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  });

  /* Full search page */
  const page = document.querySelector<HTMLElement>('[data-search-page]');
  if (page) {
    const pageRoot = page;
    const pageInput = pageRoot.querySelector<HTMLInputElement>('[data-search-page-input]');
    const pageResults = pageRoot.querySelector<HTMLElement>('[data-search-page-results]');
    const pageCount = pageRoot.querySelector<HTMLElement>('[data-search-page-count]');
    const pageLocale = pageRoot.dataset.locale || locale;

    async function renderPage(query: string): Promise<void> {
      if (!pageResults) return;
      if (!query.trim()) {
        pageResults.replaceChildren(emptyMarkup(pageInput?.placeholder || 'Search'));
        if (pageCount) pageCount.textContent = '';
        return;
      }
      const found = await runSearch(query, pageLocale);
      if (pageCount) {
        pageCount.textContent =
          found.length === 0
            ? ''
            : `${found.length}${found.length === 25 ? '+' : ''} ${pageRoot.dataset.resultsLabel || 'results'}`;
      }
      if (!found.length) {
        pageResults.replaceChildren(
          emptyMarkup(
            failed
              ? pageRoot.dataset.missingLabel || 'Search index not found.'
              : pageRoot.dataset.emptyLabel || 'No results found.'
          )
        );
        return;
      }
      pageResults.replaceChildren(
        ...found.map((r, i) => {
          const node = resultMarkup(r, i);
          node.classList.add('search-result-page');
          return node;
        })
      );
    }

    const initial = new URLSearchParams(window.location.search).get('q') || '';
    if (pageInput) pageInput.value = initial;
    void renderPage(initial);

    pageInput?.addEventListener('input', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const q = pageInput.value;
        const url = new URL(window.location.href);
        if (q.trim()) url.searchParams.set('q', q);
        else url.searchParams.delete('q');
        window.history.replaceState({}, '', url);
        void renderPage(q);
      }, 180);
    });
  }
}
