import {
  ensureChain,
  getWalletState,
  sendTransaction,
  subscribe,
  waitForReceipt,
  type WalletState,
} from './wallet';
import { encodeErc20Transfer, parseUnits } from './chain';
import { loadAddressBalances } from './data';
import { CHAINS, CONTRACTS } from '@data/site';
import { formatNumber, isEvmAddress } from '../utils/format';
import { t } from '../i18n/utils';

export function initWalletPage(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-wallet-page]');
  if (!root) return;

  const toast = (window as any).rectokenToast as
    | ((title: string, body?: string, kind?: string) => void)
    | undefined;

  const disconnected = root.querySelector<HTMLElement>('[data-wallet-disconnected]');
  const connected = root.querySelector<HTMLElement>('[data-wallet-connected]');
  const fullAddress = root.querySelector<HTMLElement>('[data-wallet-full-address]');
  const copyButton = root.querySelector<HTMLButtonElement>('[data-wallet-copy]');
  const refresh = root.querySelector<HTMLButtonElement>('[data-wallet-refresh]');
  const addChain = root.querySelector<HTMLButtonElement>('[data-add-chain]');
  const holdingsEl = root.querySelector<HTMLElement>('[data-wallet-holdings]');
  const emptyEl = root.querySelector<HTMLElement>('[data-wallet-holdings-empty]');

  const modal = document.querySelector<HTMLElement>('[data-transfer-modal]');
  const form = document.querySelector<HTMLFormElement>('[data-transfer-form]');
  const transferOpen = root.querySelector<HTMLButtonElement>('[data-transfer-open]');
  const networkSelect = document.querySelector<HTMLSelectElement>('[data-transfer-network]');
  const recipientInput = document.querySelector<HTMLInputElement>('[data-transfer-recipient]');
  const amountInput = document.querySelector<HTMLInputElement>('[data-transfer-amount]');
  const transferError = document.querySelector<HTMLElement>('[data-transfer-error]');
  const transferSubmit = document.querySelector<HTMLButtonElement>('[data-transfer-submit]');

  let currentAddress: string | null = null;
  let loadingFor: string | null = null;

  const setBalance = (key: string, value: number | null) => {
    root.querySelectorAll<HTMLElement>(`[data-wallet-balance="${key}"]`).forEach((el) => {
      el.textContent =
        value === null
          ? '-'
          : formatNumber(value, lang === 'th' ? 'th' : 'en', { maximumFractionDigits: 4 });
    });
  };

  const setExplorer = (key: string, href: string) => {
    root.querySelectorAll<HTMLAnchorElement>(`[data-wallet-explorer="${key}"]`).forEach((el) => {
      el.href = href;
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
      meta.textContent = `${project.projectId} · ${project.province}`;
      left.append(name, meta);

      const value = document.createElement('div');
      value.className = 'holding-value';
      value.textContent =
        formatNumber(balance, lang === 'th' ? 'th' : 'en', {
          maximumFractionDigits: 4,
        }) + ' ';
      const unit = document.createElement('small');
      unit.textContent = 'REC';
      value.appendChild(unit);

      row.append(left, value);
      holdingsEl.appendChild(row);
    });
  };

  const loadBalances = async (address: string, force = false) => {
    if (!force && loadingFor === address) return;
    loadingFor = address;
    try {
      const balances = await loadAddressBalances(address);
      setBalance('thaifi', balances.thaifi.rec);
      setBalance('native', balances.thaifi.native);
      setBalance('optimism', balances.optimism.rec);
      setBalance('kubchain', balances.kubchain.rec);
      renderHoldings(balances.holdings);
      setExplorer('thaifi', `${CHAINS.thaifi.explorer}/address/${address}`);
      setExplorer('optimism', `${CHAINS.optimism.explorer}/address/${address}`);
      setExplorer('kubchain', `${CHAINS.kubchain.explorer}/address/${address}`);
    } catch (error) {
      console.warn('[wallet] balance load failed', error);
      toast?.(
        lang === 'th' ? 'โหลดข้อมูลยอดคงเหลือไม่สำเร็จ' : 'Could not load balances',
        lang === 'th' ? 'กรุณาลองอีกครั้ง' : 'Please try again.',
        'error'
      );
    } finally {
      loadingFor = null;
    }
  };

  const render = (state: WalletState) => {
    if (disconnected) disconnected.hidden = Boolean(state.address);
    if (connected) connected.hidden = !state.address;

    if (!state.address) {
      currentAddress = null;
      return;
    }

    if (fullAddress) fullAddress.textContent = state.address;
    if (copyButton) copyButton.dataset.copy = state.address;

    if (state.address !== currentAddress) {
      currentAddress = state.address;
      void loadBalances(state.address);
    }
  };

  subscribe(render);

  copyButton?.addEventListener('click', async () => {
    const value = copyButton.dataset.copy || '';
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast?.(t('common.copied', lang === 'th' ? 'th' : 'en'), value, 'success');
    } catch {
      const locale = lang === 'th' ? 'th' : 'en';
      toast?.(t('copy.failedTitle', locale), t('copy.failedBody', locale), 'error');
    }
  });

  refresh?.addEventListener('click', () => {
    if (currentAddress) void loadBalances(currentAddress, true);
  });

  addChain?.addEventListener('click', async () => {
    try {
      const ok = await ensureChain(CHAINS.thaifi);
      if (!ok) throw new Error('CHAIN_NOT_ADDED');
      toast?.(
        lang === 'th' ? 'เพิ่ม ThaiFi แล้ว' : 'ThaiFi added',
        lang === 'th' ? 'ขณะนี้คุณสามารถสลับไปยังเชน 17 ใน MetaMask ได้' : 'You can now switch to chain 17 in MetaMask.',
        'success'
      );
    } catch (error) {
      console.warn('[wallet] could not add ThaiFi', error);
      toast?.(
        lang === 'th' ? 'เพิ่ม ThaiFi ไม่สำเร็จ' : 'Could not add ThaiFi',
        lang === 'th' ? 'กรุณาเพิ่มเครือข่ายด้วยตนเอง' : 'Please add the network manually.',
        'error'
      );
    }
  });

  const closeModal = () => {
    if (!modal) return;
    modal.dataset.open = 'false';
    document.body.style.overflow = '';
  };

  transferOpen?.addEventListener('click', () => {
    if (!modal) return;
    modal.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    if (transferError) transferError.hidden = true;
    recipientInput?.focus();
  });

  document.querySelectorAll('[data-transfer-close]').forEach((el) =>
    el.addEventListener('click', closeModal)
  );
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.dataset.open === 'true') closeModal();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (transferError) transferError.hidden = true;

    const state = getWalletState();
    if (!state.address) {
      toast?.(
        lang === 'th' ? 'เชื่อมต่อกระเป๋า' : 'Connect a wallet',
        lang === 'th' ? 'กรุณาเชื่อมต่อ MetaMask ก่อน' : 'Connect MetaMask first.',
        'warn'
      );
      return;
    }

    const recipient = recipientInput?.value.trim() || '';
    const amount = amountInput?.value.trim() || '';
    const network = networkSelect?.value === 'optimism' ? 'optimism' : 'thaifi';

    if (!isEvmAddress(recipient)) {
      if (transferError) {
        transferError.textContent =
          lang === 'th' ? 'กรุณากรอกที่อยู่ผู้รับให้ถูกต้อง' : 'Enter a valid recipient address.';
        transferError.hidden = false;
      }
      return;
    }

    let units: bigint;
    try {
      units = parseUnits(amount, 18);
      if (units <= 0n) throw new Error('zero');
    } catch {
      if (transferError) {
        transferError.textContent = lang === 'th' ? 'กรุณากรอกจำนวนที่ถูกต้องและมากกว่าศูนย์' : 'Enter a valid amount.';
        transferError.hidden = false;
      }
      return;
    }

    const chain = network === 'optimism' ? CHAINS.optimism : CHAINS.thaifi;
    const token = network === 'optimism' ? CONTRACTS.poolOptimism : CONTRACTS.poolThaiFi;

    if (transferSubmit) {
      transferSubmit.disabled = true;
      transferSubmit.textContent = lang === 'th' ? 'กำลังส่ง…' : 'Sending…';
    }

    try {
      const ready = await ensureChain(chain as any);
      if (!ready) throw new Error('WRONG_CHAIN');

      const data = encodeErc20Transfer(recipient, units);
      const hash = await sendTransaction({
        from: state.address,
        to: token,
        data,
        gas: '0x186a0',
      });

      toast?.(lang === 'th' ? 'ส่งคำขอโอนแล้ว' : 'Transfer submitted', `${amount} REC · ${hash.slice(0, 10)}…`, 'success');
      closeModal();
      form.reset();

      const receipt = await waitForReceipt(chain.id, hash);
      if (receipt?.status === '0x1') {
        toast?.(
          lang === 'th' ? 'ยืนยันการโอนแล้ว' : 'Transfer confirmed',
          lang === 'th' ? `ส่ง ${amount} REC แล้ว` : `${amount} REC sent.`,
          'success'
        );
        void loadBalances(state.address, true);
      } else if (receipt) {
        toast?.(
          lang === 'th' ? 'โอนไม่สำเร็จ' : 'Transfer failed',
          lang === 'th' ? 'ธุรกรรมถูกย้อนกลับบนเชน' : 'The transaction reverted on-chain.',
          'error'
        );
      }
    } catch (error: any) {
      const rejected = error?.code === 4001 || error?.code === 'ACTION_REJECTED';
      const message =
        error?.message === 'WRONG_CHAIN'
          ? lang === 'th'
            ? 'กรุณาสลับไปยังเครือข่ายที่ถูกต้องใน MetaMask'
            : 'Switch to the correct network in MetaMask.'
          : rejected
            ? lang === 'th'
              ? 'คุณปฏิเสธธุรกรรม'
              : 'You rejected the transaction.'
            : lang === 'th'
              ? 'การโอนล้มเหลว'
              : 'The transfer failed.';

      if (transferError) {
        transferError.textContent = message;
        transferError.hidden = false;
      }
      toast?.(lang === 'th' ? 'โอนไม่สำเร็จ' : 'Transfer failed', message, 'error');
    } finally {
      if (transferSubmit) {
        transferSubmit.disabled = false;
        transferSubmit.textContent = lang === 'th' ? 'ส่ง' : 'Send';
      }
    }
  });
}
