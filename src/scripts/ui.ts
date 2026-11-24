import {
  connectWallet,
  disconnectWallet,
  getWalletState,
  hasProvider,
  restoreWallet,
  shortWallet,
  subscribe,
  type WalletState,
} from './wallet';
import { initSearch } from './search';
import { t, type Locale } from '../i18n/utils';

function pageLocale(): Locale {
  return document.documentElement.lang.toLowerCase().startsWith('th') ? 'th' : 'en';
}

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */

type ToastKind = 'info' | 'success' | 'warn' | 'error';

function toast(title: string, body = '', kind: ToastKind = 'info', timeout = 5000): void {
  const stack = document.querySelector<HTMLElement>('[data-toast-stack]');
  if (!stack) return;
  const node = document.createElement('div');
  node.className = 'toast';
  node.dataset.kind = kind;
  node.setAttribute('role', kind === 'error' ? 'alert' : 'status');

  const text = document.createElement('div');
  const strong = document.createElement('strong');
  strong.textContent = title;
  text.appendChild(strong);
  if (body) {
    const p = document.createElement('span');
    p.textContent = body;
    text.appendChild(p);
  }
  node.appendChild(text);
  stack.appendChild(node);

  window.setTimeout(() => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(6px)';
    node.style.transition = 'opacity .25s ease, transform .25s ease';
    window.setTimeout(() => node.remove(), 260);
  }, timeout);
}

declare global {
  interface Window {
    rectokenToast?: typeof toast;
  }
}
window.rectokenToast = toast;

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

function initTheme(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('rectoken-theme', next);
      } catch {
        /* ignore */
      }
      document
        .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
        .forEach((meta) => {
          const media = meta.getAttribute('media');
          if (media?.includes('light')) meta.content = '#ffffff';
          if (media?.includes('dark')) meta.content = '#070f0a';
        });
    });
  });
}

/* ------------------------------------------------------------------ */
/* Header: mega menu, mobile drawer, ribbon, scroll                    */
/* ------------------------------------------------------------------ */

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-panel]'));
  let hoverTimer: number | undefined;

  const closeAll = (except?: HTMLElement) => {
    triggers.forEach((trigger) => {
      const panel = trigger.nextElementSibling as HTMLElement | null;
      if (panel === except) return;
      trigger.setAttribute('aria-expanded', 'false');
      if (panel) panel.dataset.open = 'false';
    });
  };

  const openPanel = (trigger: HTMLButtonElement) => {
    const panel = trigger.nextElementSibling as HTMLElement | null;
    closeAll(panel ?? undefined);
    trigger.setAttribute('aria-expanded', 'true');
    if (panel) panel.dataset.open = 'true';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      trigger.getAttribute('aria-expanded') === 'true'
        ? (trigger.setAttribute('aria-expanded', 'false'),
          trigger.nextElementSibling instanceof HTMLElement &&
            (trigger.nextElementSibling.dataset.open = 'false'))
        : openPanel(trigger);
    });

    trigger.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => openPanel(trigger), 60);
      }
    });

    trigger.addEventListener('mouseleave', () => {
      window.clearTimeout(hoverTimer);
    });
  });

  panels.forEach((panel) => {
    panel.addEventListener('mouseleave', () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        panel.dataset.open = 'false';
        const trigger = panel.previousElementSibling as HTMLElement | null;
        trigger?.setAttribute('aria-expanded', 'false');
      }, 140);
    });
    panel.addEventListener('mouseenter', () => window.clearTimeout(hoverTimer));
  });

  document.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('.nav-desktop')) closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAll();
      closeDrawer();
    }
  });

  /* Mobile drawer */
  const drawer = document.querySelector<HTMLElement>('[data-mobile-drawer]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-mobile-toggle]');

  function closeDrawer(): void {
    if (!drawer || !toggle) return;
    drawer.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', () => {
    if (!drawer) return;
    const open = drawer.dataset.open === 'true';
    if (!open) {
      const headerRect = document.querySelector<HTMLElement>('[data-header]')?.getBoundingClientRect();
      if (headerRect) drawer.style.top = `${Math.max(0, headerRect.bottom)}px`;
    }
    drawer.dataset.open = open ? 'false' : 'true';
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    document.body.style.overflow = open ? '' : 'hidden';
  });

  drawer?.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => closeDrawer())
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) closeDrawer();
  });

  /* Announcement ribbon */
  const ribbon = document.querySelector<HTMLElement>('[data-ribbon]');
  if (ribbon) {
    try {
      if (sessionStorage.getItem('rectoken:ribbon') === 'dismissed') ribbon.hidden = true;
    } catch {
      /* ignore */
    }
    ribbon.querySelector('[data-ribbon-dismiss]')?.addEventListener('click', () => {
      ribbon.hidden = true;
      try {
        sessionStorage.setItem('rectoken:ribbon', 'dismissed');
      } catch {
        /* ignore */
      }
    });
  }

  /* Scroll state + progress */
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------------ */
/* Wallet UI                                                           */
/* ------------------------------------------------------------------ */

function initWalletUI(): void {
  const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-wallet-root]'));
  if (!roots.length) return;

  const render = (state: WalletState) => {
    roots.forEach((root) => {
      const button = root.querySelector<HTMLButtonElement>('[data-wallet-toggle]');
      const label = root.querySelector<HTMLElement>('[data-wallet-label]');
      const dot = root.querySelector<HTMLElement>('[data-wallet-dot]');
      const full = root.querySelector<HTMLElement>('[data-wallet-full]');
      const menu = root.querySelector<HTMLElement>('[data-wallet-menu]');

      if (!button || !label) return;

      if (state.connecting) {
        label.textContent = root.dataset.labelConnecting || t('wallet.connecting', pageLocale());
        dot?.setAttribute('hidden', '');
        button.disabled = true;
        return;
      }

      button.disabled = false;

      if (state.address) {
        label.textContent = shortWallet(state.address);
        dot?.removeAttribute('hidden');
        if (full) full.textContent = state.address;
      } else {
        label.textContent = root.dataset.labelConnect || t('nav.connect', pageLocale());
        dot?.setAttribute('hidden', '');
        if (menu) menu.dataset.open = 'false';
      }
    });
  };

  subscribe(render);

  roots.forEach((root) => {
    const button = root.querySelector<HTMLButtonElement>('[data-wallet-toggle]');
    const menu = root.querySelector<HTMLElement>('[data-wallet-menu]');
    const disconnect = root.querySelector<HTMLButtonElement>('[data-wallet-disconnect]');

    button?.addEventListener('click', async (event) => {
      event.stopPropagation();
      const state = getWalletState();

      if (state.address) {
        if (menu) {
          const open = menu.dataset.open === 'true';
          menu.dataset.open = open ? 'false' : 'true';
          button.setAttribute('aria-expanded', open ? 'false' : 'true');
        }
        return;
      }

      if (!hasProvider()) {
        toast(t('wallet.noProviderTitle', pageLocale()), t('wallet.noProviderBody', pageLocale()), 'warn');
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent
        );
        if (isMobile) {
          window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
        } else {
          window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
        }
        return;
      }

      try {
        await connectWallet();
        toast(t('wallet.connectedTitle', pageLocale()), t('wallet.connectedBody', pageLocale()), 'success');
      } catch (error: any) {
        if (error?.code === 4001 || error?.code === 'ACTION_REJECTED') {
          toast(t('wallet.cancelledTitle', pageLocale()), t('wallet.cancelledBody', pageLocale()), 'warn');
        } else {
          toast(t('wallet.failedTitle', pageLocale()), t('wallet.failedBody', pageLocale()), 'error');
        }
      }
    });

    disconnect?.addEventListener('click', () => {
      disconnectWallet();
      if (menu) menu.dataset.open = 'false';
      button?.setAttribute('aria-expanded', 'false');
      toast(t('wallet.disconnectedTitle', pageLocale()), '', 'info', 3000);
    });
  });

  document.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('[data-wallet-root]')) {
      roots.forEach((root) => {
        const menu = root.querySelector<HTMLElement>('[data-wallet-menu]');
        const button = root.querySelector<HTMLButtonElement>('[data-wallet-toggle]');
        if (menu) menu.dataset.open = 'false';
        button?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  void restoreWallet();
}

/* ------------------------------------------------------------------ */
/* Scroll reveal, spotlight, counters                                  */
/* ------------------------------------------------------------------ */

function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal, .reveal-scale');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function initSpotlight(): void {
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-count-to]');
  if (!counters.length) return;

  const animate = (el: HTMLElement) => {
    const target = Number(el.dataset.countTo || '0');
    const decimals = Number(el.dataset.countDecimals || '0');
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const duration = Number(el.dataset.countDuration || '1400');
    const start = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      el.textContent = prefix + target.toLocaleString('en-US', { maximumFractionDigits: decimals }) + suffix;
      return;
    }

    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent =
        prefix +
        value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */
/* Tabs, accordions, copy, TOC                                         */
/* ------------------------------------------------------------------ */

function initTabs(): void {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
    const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-tab]'));
    const panels = Array.from(group.querySelectorAll<HTMLElement>('[data-tab-panel]'));

    const activate = (id: string) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.tab === id;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== id;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset.tab || ''));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(tabs[next].dataset.tab || '');
      });
    });

    if (tabs.length) activate(tabs[0].dataset.tab || '');
  });
}

function initAccordions(): void {
  document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
    const single = group.dataset.accordion === 'single';
    const triggers = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-acc-trigger]'));

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panel = document.getElementById(trigger.getAttribute('aria-controls') || '');
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        if (single && !isOpen) {
          triggers.forEach((other) => {
            other.setAttribute('aria-expanded', 'false');
            const otherPanel = document.getElementById(other.getAttribute('aria-controls') || '');
            if (otherPanel) otherPanel.dataset.open = 'false';
          });
        }

        trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (panel) panel.dataset.open = isOpen ? 'false' : 'true';
      });
    });
  });
}

function initCopy(): void {
  document.querySelectorAll<HTMLElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        button.classList.add('is-copied');
        toast(t('common.copied', pageLocale()), value.length > 42 ? `${value.slice(0, 18)}…${value.slice(-10)}` : value, 'success', 2600);
        window.setTimeout(() => button.classList.remove('is-copied'), 1600);
      } catch {
        toast(t('copy.failedTitle', pageLocale()), t('copy.failedBody', pageLocale()), 'error');
      }
    });
  });
}

function initToc(): void {
  const rail = document.querySelector<HTMLElement>('[data-toc]');
  if (!rail) return;
  const links = Array.from(rail.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  if (!links.length) return;

  const targets = links
    .map((link) => document.getElementById(link.getAttribute('href')?.slice(1) || ''))
    .filter(Boolean) as HTMLElement[];

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: '-96px 0px -66% 0px', threshold: 0 }
  );
  targets.forEach((target) => observer.observe(target));
}

/* ------------------------------------------------------------------ */
/* Live chain stats                                                    */
/* ------------------------------------------------------------------ */

function formatStat(value: number | null, mode: string): string {
  if (value === null || !Number.isFinite(value)) return '-';
  if (mode === 'int') return Math.round(value).toLocaleString('en-US');
  if (mode === 'compact') {
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
    if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
    return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

async function initLiveStats(): Promise<void> {
  const roots = document.querySelectorAll<HTMLElement>('[data-live-stats]');
  if (!roots.length) return;

  try {
    const { loadStats } = await import('./data');
    const stats = await loadStats();
    const bridged =
      stats.bridgedOp === null || stats.bridgedKub === null
        ? null
        : stats.bridgedOp + stats.bridgedKub;
    const values: Record<string, number | null> = {
      pool: stats.poolSupply,
      retired: stats.retired,
      'project-supply': stats.projectSupply,
      'project-count': stats.projectCount,
      'bridged-op': stats.bridgedOp,
      'bridged-kub': stats.bridgedKub,
      'bridged-total': bridged,
      remaining: stats.remaining,
    };

    document.querySelectorAll<HTMLElement>('[data-stat]').forEach((el) => {
      const key = el.dataset.stat || '';
      if (key === 'updated') {
        const thai = pageLocale() === 'th';
        const stamp = new Intl.DateTimeFormat(thai ? 'th-TH-u-ca-gregory' : 'en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Bangkok',
        }).format(stats.updatedAt);
        el.textContent = `${t('common.updated', pageLocale())} ${stamp} ICT`;
        return;
      }
      if (key === 'pool-status') {
        const thai = pageLocale() === 'th';
        el.textContent =
          stats.paused === null
            ? '-'
            : stats.paused
              ? thai ? 'หยุดชั่วคราว' : 'Paused'
              : thai ? 'ใช้งาน' : 'Active';
        el.dataset.live = 'true';
        return;
      }
      if (key in values) {
        el.textContent = formatStat(values[key], el.dataset.statFormat || 'full');
        el.classList.remove('skeleton');
        el.dataset.live = 'true';
      }
    });

    document.querySelectorAll<HTMLElement>('[data-bar="pool"]').forEach((el) => {
      const pct =
        stats.poolSupply === null
          ? 0
          : Math.min(100, (stats.poolSupply / 100_000_000) * 100);
      el.style.width = `${pct > 0 ? Math.max(0.4, pct) : 0}%`;
    });

    roots.forEach((root) => root.setAttribute('data-live-state', 'ok'));
  } catch (error) {
    console.warn('[stats] live data unavailable', error);
    roots.forEach((root) => root.setAttribute('data-live-state', 'error'));
    document.querySelectorAll<HTMLElement>('[data-stat="updated"]').forEach((el) => {
      el.textContent = t('dashboard.unavailable', pageLocale());
    });
  }
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

function boot(): void {
  initTheme();
  initHeader();
  initWalletUI();
  initReveal();
  initSpotlight();
  initCounters();
  initTabs();
  initAccordions();
  initCopy();
  initToc();
  initSearch();
  void initLiveStats();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
