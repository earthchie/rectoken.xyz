import { loadProjects, snapshotProjects, type Project } from './data';
import { CHAINS } from '@data/site';
import { formatNumber } from '../utils/format';

export function initProjects(lang: string): void {
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');
  if (!grid) return;

  const locale = lang === 'th' ? 'th' : 'en';
  const cards = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-card]'));
  const search = document.querySelector<HTMLInputElement>('[data-project-search]');
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-province]'));
  const visibleCount = document.querySelector<HTMLElement>('[data-project-visible]');
  const totalSupply = document.querySelector<HTMLElement>('[data-project-total]');
  const empty = document.querySelector<HTMLElement>('[data-project-empty]');
  const modal = document.querySelector<HTMLElement>('[data-project-modal]');

  let projects: Project[] = snapshotProjects();
  let query = '';
  let province = 'all';
  let lastFocus: HTMLElement | null = null;

  const applyFilters = () => {
    let visible = 0;
    cards.forEach((card) => {
      const haystack = (card.dataset.name || '').toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesProvince = province === 'all' || card.dataset.province === province;
      const show = matchesQuery && matchesProvince;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (visibleCount) visibleCount.textContent = String(visible);
    if (empty) empty.hidden = visible > 0;
  };

  search?.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    applyFilters();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      province = chip.dataset.province || 'all';
      chips.forEach((other) => other.setAttribute('aria-pressed', other === chip ? 'true' : 'false'));
      applyFilters();
    });
  });

  const modalTitle = modal?.querySelector<HTMLElement>('[data-modal-title]');
  const modalDesc = modal?.querySelector<HTMLElement>('[data-modal-desc]');
  const modalId = modal?.querySelector<HTMLElement>('[data-modal-id]');
  const modalProvince = modal?.querySelector<HTMLElement>('[data-modal-province]');
  const modalVintage = modal?.querySelector<HTMLElement>('[data-modal-vintage]');
  const modalSupply = modal?.querySelector<HTMLElement>('[data-modal-supply]');
  const modalContract = modal?.querySelector<HTMLElement>('[data-modal-contract]');
  const modalImage = modal?.querySelector<HTMLImageElement>('[data-modal-image]');
  const modalVisualMark = modal?.querySelector<HTMLElement>('[data-modal-visual-mark]');
  const modalVerify = modal?.querySelector<HTMLAnchorElement>('[data-modal-verify]');
  const modalExplorer = modal?.querySelector<HTMLAnchorElement>('[data-modal-explorer]');

  modalImage?.addEventListener('load', () => {
    if (modalVisualMark) modalVisualMark.hidden = true;
  });
  modalImage?.addEventListener('error', () => {
    if (modalImage) {
      modalImage.hidden = true;
      modalImage.removeAttribute('src');
    }
    if (modalVisualMark) modalVisualMark.hidden = false;
  });

  function closeModal(): void {
    if (!modal) return;
    modal.dataset.open = 'false';
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  function openModal(address: string): void {
    const project = projects.find((p) => p.address.toLowerCase() === address.toLowerCase());
    if (!project || !modal) return;

    lastFocus = document.activeElement as HTMLElement;
    if (modalTitle) modalTitle.textContent = project.name;
    if (modalDesc) modalDesc.textContent = project.description || '-';
    if (modalId) modalId.textContent = project.projectId || '-';
    if (modalProvince) {
      const country = locale === 'th' && project.country === 'Vietnam' ? 'เวียดนาม' : project.country;
      modalProvince.textContent = `${project.province}, ${country}`;
    }
    if (modalVintage) modalVintage.textContent = project.vintage;
    if (modalSupply) {
      modalSupply.textContent = `${formatNumber(project.supply, locale, { maximumFractionDigits: 2 })} REC`;
    }
    if (modalContract) modalContract.textContent = project.address;
    if (modalVisualMark) {
      modalVisualMark.textContent = project.projectId || 'I-REC';
      modalVisualMark.hidden = false;
    }
    if (modalImage) {
      if (project.image) {
        modalImage.src = project.image;
        modalImage.alt = project.name;
        modalImage.hidden = false;
      } else {
        modalImage.hidden = true;
        modalImage.removeAttribute('src');
      }
    }
    if (modalVerify) modalVerify.href = project.verifyUrl || '#';
    if (modalExplorer) modalExplorer.href = `${CHAINS.thaifi.explorer}/address/${project.address}`;

    modal.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    modal.querySelector<HTMLButtonElement>('[data-modal-close]')?.focus();
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.address || ''));
  });

  modal?.querySelectorAll('[data-modal-close]').forEach((button) =>
    button.addEventListener('click', closeModal)
  );
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.dataset.open === 'true') closeModal();
  });

  /* Hydrate with live supplies. */
  loadProjects()
    .then((live) => {
      projects = live;
      const byAddress = new Map(live.map((p) => [p.address.toLowerCase(), p]));

      document.querySelectorAll<HTMLElement>('[data-project-supply]').forEach((el) => {
        const project = byAddress.get((el.dataset.projectSupply || '').toLowerCase());
        if (project) {
          el.textContent = formatNumber(project.supply, locale, { maximumFractionDigits: 2 });
        }
      });

      const total = live.reduce((sum, p) => sum + p.supply, 0);
      if (totalSupply) {
        totalSupply.textContent = formatNumber(total, locale, { maximumFractionDigits: 2 });
      }
    })
    .catch(() => {
      /* snapshot values remain */
    });

  applyFilters();
}
