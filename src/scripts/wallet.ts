/**
 * Shared wallet state for every page.
 * Uses an injected EIP-1193 provider (MetaMask). No secrets, no backend.
 */

import { rpc } from './chain';
import { CHAINS } from '@data/site';

export type WalletChain = {
  id: number;
  hexId: string;
  name: string;
  rpc: string;
  explorer: string;
  native: { name: string; symbol: string; decimals: number };
};

export type WalletState = {
  address: string | null;
  chainId: string | null;
  connecting: boolean;
  available: boolean;
};

const STORAGE_KEY = 'rectoken:wallet';
const EVENT = 'rectoken:wallet';
const CHAIN_EVENT = 'rectoken:chain';

let state: WalletState = {
  address: null,
  chainId: null,
  connecting: false,
  available: typeof window !== 'undefined' && Boolean((window as any).ethereum),
};

let listening = false;
const listeners = new Set<(state: WalletState) => void>();

function getProvider(): any {
  return typeof window !== 'undefined' ? (window as any).ethereum : undefined;
}

function emit(): void {
  const snapshot = { ...state };
  listeners.forEach((fn) => {
    try {
      fn(snapshot);
    } catch {
      /* ignore listener errors */
    }
  });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: snapshot }));
  }
}

function setState(patch: Partial<WalletState>): void {
  state = { ...state, ...patch };
  emit();
}

function persist(address: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, address);
  } catch {
    /* storage may be unavailable */
  }
}

function clearPersisted(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function attachProviderListeners(): void {
  const provider = getProvider();
  if (!provider || listening) return;
  listening = true;

  provider.on?.('accountsChanged', (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      clearPersisted();
      setState({ address: null });
      return;
    }
    persist(accounts[0]);
    setState({ address: accounts[0] });
  });

  provider.on?.('chainChanged', (chainId: string) => {
    setState({ chainId });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CHAIN_EVENT, { detail: chainId }));
    }
  });

  provider.on?.('disconnect', () => {
    clearPersisted();
    setState({ address: null, chainId: null });
  });
}

export function hasProvider(): boolean {
  return Boolean(getProvider());
}

export function getWalletState(): WalletState {
  return { ...state };
}

export function subscribe(fn: (state: WalletState) => void): () => void {
  listeners.add(fn);
  fn({ ...state });
  return () => listeners.delete(fn);
}

export async function restoreWallet(): Promise<WalletState> {
  const provider = getProvider();
  if (!provider) {
    setState({ available: false });
    return { ...state };
  }
  attachProviderListeners();
  let cached: string | null = null;
  try {
    cached = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    const accounts = (await provider.request({ method: 'eth_accounts' })) as string[];
    const chainId = (await provider.request({ method: 'eth_chainId' })) as string;
    if (accounts && accounts.length > 0) {
      persist(accounts[0]);
      setState({ address: accounts[0], chainId, available: true, connecting: false });
    } else {
      if (cached) clearPersisted();
      setState({ address: null, chainId, available: true, connecting: false });
    }
  } catch {
    setState({ address: null, available: true, connecting: false });
  }
  return { ...state };
}

export async function connectWallet(): Promise<WalletState> {
  const provider = getProvider();
  if (!provider) {
    const error = new Error('NO_PROVIDER');
    (error as any).code = 'NO_PROVIDER';
    throw error;
  }
  setState({ connecting: true, available: true });
  try {
    const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[];
    const chainId = (await provider.request({ method: 'eth_chainId' })) as string;
    attachProviderListeners();
    if (!accounts || accounts.length === 0) {
      throw new Error('NO_ACCOUNTS');
    }
    persist(accounts[0]);
    setState({ address: accounts[0], chainId, connecting: false });
    return { ...state };
  } catch (error) {
    setState({ connecting: false });
    throw error;
  }
}

export function disconnectWallet(): void {
  clearPersisted();
  // Ask MetaMask to forget the permission so a reload does not silently
  // reconnect. Wallets that do not support the method simply ignore it.
  const provider = getProvider();
  if (provider?.request) {
    provider
      .request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] })
      .catch(() => {
        /* unsupported */
      });
  }
  setState({ address: null, chainId: null });
}

export function shortWallet(address: string | null): string {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function sameChain(chainId: string | null, chain: WalletChain): boolean {
  if (!chainId) return false;
  try {
    return Number(BigInt(chainId)) === chain.id;
  } catch {
    return false;
  }
}

export async function ensureChain(chain: WalletChain): Promise<boolean> {
  const provider = getProvider();
  if (!provider) return false;
  const current = (await provider.request({ method: 'eth_chainId' })) as string;
  if (sameChain(current, chain)) return true;

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.hexId }],
    });
    const updated = (await provider.request({ method: 'eth_chainId' })) as string;
    setState({ chainId: updated });
    return sameChain(updated, chain);
  } catch (error: any) {
    const code = error?.code ?? Number(error?.data?.originalError?.code);
    if (code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chain.hexId,
            chainName: chain.name,
            nativeCurrency: chain.native,
            rpcUrls: [chain.rpc],
            blockExplorerUrls: [chain.explorer],
          },
        ],
      });
      const updated = (await provider.request({ method: 'eth_chainId' })) as string;
      setState({ chainId: updated });
      return sameChain(updated, chain);
    }
    return false;
  }
}

export async function sendTransaction(tx: {
  from: string;
  to: string;
  data?: string;
  value?: string;
  gas?: string;
}): Promise<string> {
  const provider = getProvider();
  if (!provider) throw new Error('NO_PROVIDER');
  return (await provider.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: tx.from,
        to: tx.to,
        data: tx.data,
        value: tx.value,
        gas: tx.gas,
      },
    ],
  })) as string;
}

/** Wait for a receipt by polling the public RPC of a configured chain. */
export async function waitForReceipt(chainId: number, hash: string, timeoutMs = 120_000): Promise<any> {
  const chain = Object.values(CHAINS).find((entry) => entry.id === chainId);
  if (!chain) throw new Error('UNKNOWN_CHAIN');
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const receipt = await rpc<any>(chain.rpc, 'eth_getTransactionReceipt', [hash], 15_000).catch(
      () => null
    );
    if (receipt) return receipt;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return null;
}
