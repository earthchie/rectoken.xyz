import {
  connectWallet,
  ensureChain,
  getWalletState,
  sendTransaction,
  subscribe,
  waitForReceipt,
  sameChain,
  hasProvider,
} from './wallet';
import {
  encodeErc20Approve,
  encodeUniswapSwap,
  fromUnitsSafe,
  getAllowance,
  getBalanceOf,
  parseUnits,
  quoteUniswap,
  UNISWAP,
} from './chain';
import { CHAINS, CONTRACTS } from '@data/site';
import { formatNumber } from '../utils/format';

type TokenKey = 'USDT' | 'REC';

const TOKENS: Record<TokenKey, { symbol: TokenKey; address: string; decimals: number; letter: string }> = {
  USDT: { symbol: 'USDT', address: CONTRACTS.usdtOptimism, decimals: 6, letter: 'U' },
  REC: { symbol: 'REC', address: CONTRACTS.poolOptimism, decimals: 18, letter: 'R' },
};

export function initTrade(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-swap]');
  if (!root) return;

  const q = <T extends Element>(selector: string) => root.querySelector<T>(selector);
  const amountInput = q<HTMLInputElement>('[data-swap-amount]');
  const receiveInput = q<HTMLInputElement>('[data-swap-receive]');
  const fromSymbol = q<HTMLElement>('[data-swap-from-token]');
  const toSymbol = q<HTMLElement>('[data-swap-to-token]');
  const fromSymbolMini = q<HTMLElement>('[data-swap-from-symbol]');
  const toSymbolMini = q<HTMLElement>('[data-swap-to-symbol]');
  const fromDot = q<HTMLElement>('[data-swap-from-dot]');
  const toDot = q<HTMLElement>('[data-swap-to-dot]');
  const fromBalanceEl = q<HTMLElement>('[data-swap-from-balance]');
  const toBalanceEl = q<HTMLElement>('[data-swap-to-balance]');
  const maxButton = q<HTMLButtonElement>('[data-swap-max]');
  const flipButton = q<HTMLButtonElement>('[data-swap-flip]');
  const quoteBox = q<HTMLElement>('[data-swap-quote]');
  const quoteRoute = q<HTMLElement>('[data-quote-route]');
  const quoteMin = q<HTMLElement>('[data-quote-min]');
  const quoteSlippage = q<HTMLElement>('[data-quote-slippage]');
  const slippageInput = q<HTMLInputElement>('[data-slippage]');
  const slippageLabel = q<HTMLElement>('[data-slippage-label]');
  const submit = q<HTMLButtonElement>('[data-swap-submit]');
  const status = q<HTMLElement>('[data-swap-status]');
  const settingsToggle = q<HTMLButtonElement>('[data-settings-toggle]');
  const settingsPanel = q<HTMLElement>('[data-settings-panel]');

  const toast = (window as any).rectokenToast as
    | ((title: string, body?: string, kind?: string) => void)
    | undefined;

  let fromKey: TokenKey = 'USDT';
  let toKey: TokenKey = 'REC';
  let amount = '';
  let quote: bigint | null = null;
  let quoteLoading = false;
  let balances: Record<TokenKey, bigint> = { USDT: 0n, REC: 0n };
  let allowance = 0n;
  let busy: '' | 'approving' | 'swapping' = '';
  let address: string | null = null;
  let onOptimism = false;
  let slippage = 0.5;
  let quoteTimer: number | undefined;

  const from = () => TOKENS[fromKey];
  const to = () => TOKENS[toKey];

  const setStatus = (message: string, kind = '') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.kind = kind;
  };

  const display = (value: bigint, decimals: number) =>
    formatNumber(fromUnitsSafe(value, decimals), lang === 'th' ? 'th' : 'en', {
      maximumFractionDigits: decimals === 6 ? 2 : 4,
    });

  const renderLabels = () => {
    if (fromSymbol) fromSymbol.textContent = fromKey;
    if (toSymbol) toSymbol.textContent = toKey;
    if (fromSymbolMini) fromSymbolMini.textContent = fromKey;
    if (toSymbolMini) toSymbolMini.textContent = toKey;
    if (fromDot) fromDot.textContent = from().letter;
    if (toDot) toDot.textContent = to().letter;
    if (quoteRoute) quoteRoute.textContent = `${fromKey} → ${toKey}`;
    if (amountInput) amountInput.setAttribute('aria-label', `${lang === 'th' ? 'จำนวน' : 'Amount'} ${fromKey}`);
  };

  const renderBalances = () => {
    if (fromBalanceEl) fromBalanceEl.textContent = display(balances[fromKey], from().decimals);
    if (toBalanceEl) toBalanceEl.textContent = display(balances[toKey], to().decimals);
  };

  const amountUnits = (): bigint | null => {
    if (!amount) return null;
    try {
      const units = parseUnits(amount, from().decimals);
      return units > 0n ? units : null;
    } catch {
      return null;
    }
  };

  const renderQuote = () => {
    const units = amountUnits();
    if (!quote || !units) {
      if (quoteBox) quoteBox.hidden = true;
      if (receiveInput) receiveInput.value = '';
      if (quoteMin) quoteMin.textContent = '-';
      return;
    }

    const bps = Math.round(slippage * 100);
    const minimum = (quote * BigInt(10_000 - bps)) / 10_000n;

    if (receiveInput) {
      receiveInput.value = fromUnitsSafe(quote, to().decimals).toLocaleString('en-US', {
        maximumFractionDigits: 6,
        useGrouping: false,
      });
    }
    if (quoteMin) quoteMin.textContent = `${display(minimum, to().decimals)} ${toKey}`;
    if (quoteSlippage) quoteSlippage.textContent = `${slippage.toFixed(1)}%`;
    if (quoteBox) quoteBox.hidden = false;
  };

  const refreshSubmit = () => {
    if (!submit) return;
    const units = amountUnits();
    let label = lang === 'th' ? 'เชื่อมต่อกระเป๋า' : 'Connect wallet';
    let disabled = false;

    if (!hasProvider()) {
      label = lang === 'th' ? 'ติดตั้ง MetaMask' : 'Install MetaMask';
    } else if (!address) {
      label = lang === 'th' ? 'เชื่อมต่อกระเป๋า' : 'Connect wallet';
    } else if (!onOptimism) {
      label = lang === 'th' ? 'สลับไป Optimism' : 'Switch to Optimism';
    } else if (busy === 'approving') {
      label = lang === 'th' ? 'กำลังอนุมัติ…' : 'Approving…';
      disabled = true;
    } else if (busy === 'swapping') {
      label = lang === 'th' ? 'กำลังแลกเปลี่ยน…' : 'Swapping…';
      disabled = true;
    } else if (quoteLoading) {
      label = lang === 'th' ? 'กำลังขอราคา…' : 'Getting quote…';
      disabled = true;
    } else if (!units) {
      label = lang === 'th' ? 'ระบุจำนวน' : 'Enter an amount';
      disabled = true;
    } else if (units > balances[fromKey]) {
      label = lang === 'th' ? `ยอด ${fromKey} ไม่เพียงพอ` : `Insufficient ${fromKey}`;
      disabled = true;
    } else if (allowance < units) {
      label = lang === 'th' ? `อนุมัติ ${fromKey}` : `Approve ${fromKey}`;
    } else if (!quote) {
      label = lang === 'th' ? 'ไม่มีราคา' : 'No quote';
      disabled = true;
    } else {
      label = lang === 'th' ? 'แลกเปลี่ยน' : 'Swap';
    }

    submit.textContent = label;
    submit.disabled = disabled;
    submit.dataset.action = !address
      ? 'connect'
      : !onOptimism
        ? 'switch'
        : allowance < (units ?? 0n)
          ? 'approve'
          : 'swap';
  };

  const fetchQuote = async () => {
    const units = amountUnits();
    if (!units || !address || !onOptimism) {
      quote = null;
      quoteLoading = false;
      renderQuote();
      refreshSubmit();
      return;
    }

    quoteLoading = true;
    refreshSubmit();
    try {
      quote = await quoteUniswap(CHAINS.optimism.rpc, from().address, to().address, units, UNISWAP.feeTier);
      setStatus('');
    } catch (error) {
      console.warn('[trade] quote failed', error);
      quote = null;
      setStatus(lang === 'th' ? 'ไม่มีราคาสำหรับคู่นี้ในขณะนี้' : 'No quote available for this pair right now.', 'error');
    } finally {
      quoteLoading = false;
      renderQuote();
      refreshSubmit();
    }
  };

  const scheduleQuote = () => {
    window.clearTimeout(quoteTimer);
    quoteTimer = window.setTimeout(() => void fetchQuote(), 450);
  };

  const loadBalances = async () => {
    if (!address || !onOptimism) {
      balances = { USDT: 0n, REC: 0n };
      allowance = 0n;
      renderBalances();
      refreshSubmit();
      return;
    }
    try {
      const [usdt, rec, allowed] = await Promise.all([
        getBalanceOf(CHAINS.optimism.rpc, TOKENS.USDT.address, address),
        getBalanceOf(CHAINS.optimism.rpc, TOKENS.REC.address, address),
        getAllowance(CHAINS.optimism.rpc, from().address, address, UNISWAP.router),
      ]);
      balances = { USDT: usdt, REC: rec };
      allowance = allowed;
      renderBalances();
      refreshSubmit();
    } catch (error) {
      console.warn('[trade] balance load failed', error);
    }
  };

  const connect = async () => {
    if (!hasProvider()) {
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      } else {
        window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
      }
      setStatus(
        lang === 'th'
          ? 'ไม่พบ MetaMask กรุณาติดตั้งหรือเปิดในแอป MetaMask'
          : 'MetaMask was not detected. Install it or open this page in the MetaMask app.',
        'error'
      );
      return;
    }
    try {
      await connectWallet();
      const state = getWalletState();
      if (state.address) {
        address = state.address;
        onOptimism = sameChain(state.chainId, CHAINS.optimism);
        if (!onOptimism) {
          onOptimism = await ensureChain(CHAINS.optimism);
        }
        await loadBalances();
        scheduleQuote();
      }
    } catch (error: any) {
      if (error?.code === 4001) {
        setStatus(lang === 'th' ? 'คุณปฏิเสธการเชื่อมต่อ' : 'You cancelled the connection.', 'error');
      } else {
        setStatus(lang === 'th' ? 'เชื่อมต่อกระเป๋าไม่สำเร็จ' : 'Could not connect the wallet.', 'error');
      }
    }
  };

  const switchNetwork = async () => {
    const ok = await ensureChain(CHAINS.optimism);
    onOptimism = ok;
    if (ok) {
      await loadBalances();
      scheduleQuote();
    } else {
      setStatus(lang === 'th' ? 'กรุณาสลับไปยัง Optimism ใน MetaMask' : 'Switch to Optimism in MetaMask.', 'error');
    }
    refreshSubmit();
  };

  const approve = async () => {
    const units = amountUnits();
    if (!address || !units) return;
    busy = 'approving';
    refreshSubmit();
    try {
      const max = (1n << 256n) - 1n;
      const hash = await sendTransaction({
        from: address,
        to: from().address,
        data: encodeErc20Approve(UNISWAP.router, max),
        gas: '0x15f90',
      });
      setStatus(lang === 'th' ? 'ส่งคำสั่งอนุมัติแล้ว…' : 'Approval submitted…');
      const receipt = await waitForReceipt(CHAINS.optimism.rpc, hash);
      if (receipt?.status === '0x1') {
        allowance = await getAllowance(CHAINS.optimism.rpc, from().address, address, UNISWAP.router);
        toast?.(
          lang === 'th' ? 'ยืนยันการอนุมัติแล้ว' : 'Approval confirmed',
          lang === 'th' ? `อนุมัติ ${fromKey} สำหรับการซื้อขายแล้ว` : `${fromKey} approved for trading.`,
          'success'
        );
        setStatus('');
      } else {
        throw new Error('APPROVAL_FAILED');
      }
    } catch (error) {
      setStatus(lang === 'th' ? 'การอนุมัติล้มเหลว' : 'Approval failed.', 'error');
    } finally {
      busy = '';
      refreshSubmit();
    }
  };

  const swap = async () => {
    const units = amountUnits();
    if (!address || !units || !quote) return;
    busy = 'swapping';
    refreshSubmit();

    try {
      const bps = Math.round(slippage * 100);
      const minimum = (quote * BigInt(10_000 - bps)) / 10_000n;
      const data = encodeUniswapSwap({
        tokenIn: from().address,
        tokenOut: to().address,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 1200,
        amountIn: units,
        amountOutMinimum: minimum,
        feeTier: UNISWAP.feeTier,
      });

      const hash = await sendTransaction({
        from: address,
        to: UNISWAP.router,
        data,
        gas: '0x493e0',
      });

      setStatus(
        `${lang === 'th' ? 'ส่งธุรกรรมแล้ว' : 'Transaction submitted'} · ${hash.slice(0, 10)}…`,
        'success'
      );

      const receipt = await waitForReceipt(CHAINS.optimism.rpc, hash);
      if (receipt?.status === '0x1') {
        toast?.(
          lang === 'th' ? 'ยืนยันการแลกเปลี่ยนแล้ว' : 'Swap confirmed',
          `${amount} ${fromKey} → ${receiveInput?.value || ''} ${toKey}`,
          'success'
        );
        setStatus(lang === 'th' ? 'แลกเปลี่ยนสำเร็จ' : 'Swap confirmed.', 'success');
        amount = '';
        quote = null;
        if (amountInput) amountInput.value = '';
        renderQuote();
        await loadBalances();
      } else {
        throw new Error('SWAP_FAILED');
      }
    } catch (error: any) {
      const rejected = error?.code === 4001;
      setStatus(
        rejected
          ? lang === 'th'
            ? 'คุณปฏิเสธธุรกรรม'
            : 'You rejected the transaction.'
          : lang === 'th'
            ? 'การแลกเปลี่ยนล้มเหลว'
            : 'The swap failed.',
        'error'
      );
      toast?.(lang === 'th' ? 'แลกเปลี่ยนไม่สำเร็จ' : 'Swap failed', '', 'error');
    } finally {
      busy = '';
      refreshSubmit();
    }
  };

  /* Events */
  amountInput?.addEventListener('input', () => {
    amount = amountInput.value.replace(/[^\d.]/g, '');
    amountInput.value = amount;
    quote = null;
    renderQuote();
    refreshSubmit();
    scheduleQuote();
  });

  maxButton?.addEventListener('click', () => {
    if (!amountInput) return;
    const value = fromUnitsSafe(balances[fromKey], from().decimals);
    amount = value > 0 ? String(Math.floor(value * 1e6) / 1e6) : '';
    amountInput.value = amount;
    quote = null;
    renderQuote();
    refreshSubmit();
    scheduleQuote();
  });

  flipButton?.addEventListener('click', () => {
    const previous = fromKey;
    fromKey = toKey;
    toKey = previous;
    amount = '';
    quote = null;
    if (amountInput) amountInput.value = '';
    if (receiveInput) receiveInput.value = '';
    renderLabels();
    renderBalances();
    renderQuote();
    refreshSubmit();
    void loadBalances();
    scheduleQuote();
  });

  slippageInput?.addEventListener('input', () => {
    slippage = Number(slippageInput.value) || 0.5;
    if (slippageLabel) slippageLabel.textContent = `${slippage.toFixed(1)}%`;
    renderQuote();
  });

  settingsToggle?.addEventListener('click', () => {
    if (!settingsPanel) return;
    settingsPanel.hidden = !settingsPanel.hidden;
  });

  submit?.addEventListener('click', () => {
    const action = submit.dataset.action;
    if (action === 'connect') void connect();
    else if (action === 'switch') void switchNetwork();
    else if (action === 'approve') void approve();
    else if (action === 'swap') void swap();
  });

  subscribe((state) => {
    address = state.address;
    onOptimism = sameChain(state.chainId, CHAINS.optimism);
    if (address && onOptimism) void loadBalances();
    refreshSubmit();
  });

  renderLabels();
  renderBalances();
  refreshSubmit();
}
