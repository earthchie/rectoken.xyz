import snapshot from '@data/projects.json';
import { CHAINS, CONTRACTS, MARKET, SITE, WALLETS } from '@data/site';
import { getBalanceOf, getNativeBalance, getTotalSupply, fromUnitsSafe, rpc } from './chain';
import { safeEndpoint } from './net';

export type Project = {
  address: string;
  name: string;
  symbol: string;
  projectId: string;
  province: string;
  country: string;
  technology: string;
  standard: string;
  vintage: string;
  description: string;
  image: string;
  verifyUrl: string;
  supply: number;
  supplyLive: boolean;
};

type SnapshotProject = (typeof snapshot.projects)[number];

const RPC = CHAINS.thaifi.rpc;
const REMOTE_LIST = 'https://asset.blockedge.co/rec-hydro.json';
const REMOTE_META = 'https://asset.blockedge.co';

let projectCache: Promise<Project[]> | null = null;
let statsCache: { at: number; value: Awaited<ReturnType<typeof computeStats>> } | null = null;

async function fetchJson<T>(url: string, timeout = 10_000): Promise<T> {
  const endpoint = safeEndpoint(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(endpoint, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function mapMetadata(address: string, meta: any): Partial<Project> {
  const attrs: Array<{ trait_type: string; value: string }> = meta?.attributes ?? [];
  const attr = (name: string) => attrs.find((a) => a.trait_type === name)?.value ?? '';
  return {
    address,
    name: meta?.name ?? 'REC Project',
    symbol: meta?.symbol ?? 'REC',
    projectId: attr('Project ID'),
    province: attr('Province'),
    country: (attr('Project location') || 'Vietnam').split(',')[0].trim(),
    technology: attr('Credit category') || 'Hydro-electric',
    standard: attr('Carbon standard') || 'International REC Standard (I-REC)',
    vintage: attr('Vintage Year') || '',
    description: meta?.description ?? '',
    image: meta?.image ?? '',
    verifyUrl: attr('Project URL') || meta?.url || '',
  };
}

/**
 * Loads the project registry.
 * Strategy: static snapshot first (works offline / no JS), then live list +
 * on-chain supplies. New projects appearing remotely are fetched on demand.
 */
export function loadProjects(force = false): Promise<Project[]> {
  if (projectCache && !force) return projectCache;

  projectCache = (async () => {
    const initial: Project[] = snapshot.projects.map((p) => ({
      ...p,
      supply: Number(p.supplySnapshot) || 0,
      supplyLive: false,
    }));

    let addresses = initial.map((p) => p.address);
    let remoteOk = false;
    try {
      const remote = await fetchJson<{ rectoken: string[] }>(REMOTE_LIST);
      if (Array.isArray(remote.rectoken) && remote.rectoken.length) {
        addresses = remote.rectoken;
        remoteOk = true;
      }
    } catch {
      /* keep snapshot */
    }

    const byAddress = new Map(initial.map((p) => [p.address.toLowerCase(), p]));
    const unknown = addresses.filter((a) => !byAddress.has(a.toLowerCase()));

    const extras = await Promise.all(
      unknown.map(async (address) => {
        try {
          const meta = await fetchJson<any>(`${REMOTE_META}/${address}.json`);
          return {
            ...(mapMetadata(address, meta) as SnapshotProject),
            supply: 0,
            supplyLive: false,
          } as Project;
        } catch {
          return null;
        }
      })
    );

    const ordered: Project[] = addresses
      .map((a) => byAddress.get(a.toLowerCase()) ?? extras.find((x) => x?.address.toLowerCase() === a.toLowerCase()) ?? null)
      .filter(Boolean) as Project[];

    // If the remote registry is unavailable, keep every known snapshot project.
    if (!remoteOk) {
      for (const p of initial) {
        if (!ordered.some((x) => x.address.toLowerCase() === p.address.toLowerCase())) ordered.push(p);
      }
    }

    const supplies = await Promise.allSettled(
      ordered.map((p) => getTotalSupply(RPC, p.address))
    );

    supplies.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        ordered[i].supply = fromUnitsSafe(result.value, 18);
        ordered[i].supplyLive = true;
      }
    });

    return ordered;
  })();

  return projectCache;
}

export function snapshotProjects(): Project[] {
  return snapshot.projects.map((p) => ({
    ...p,
    supply: Number(p.supplySnapshot) || 0,
    supplyLive: false,
  }));
}

async function readPaused(): Promise<boolean | null> {
  try {
    const result = await rpc<string>(RPC, 'eth_call', [
      { to: CONTRACTS.poolThaiFi, data: '0x5c975abb' },
      'latest',
    ]);
    return BigInt(result) === 1n;
  } catch {
    return null;
  }
}

async function computeStats() {
  /*
   * "Bridged" is read from the pool token's totalSupply on the destination
   * chain, not from the ThaiFi lock contract. The lock balances on the new
   * ThaiFi chain read 0 even though the Optimism and Kubchain deployments hold
   * live supply, so the destination supply is the truthful on-chain figure.
   */
  const [pool, retired, bridgeOp, bridgeKub, remaining, paused, projects] = await Promise.allSettled([
    getTotalSupply(RPC, CONTRACTS.poolThaiFi),
    getTotalSupply(RPC, CONTRACTS.retiredToken),
    getTotalSupply(CHAINS.optimism.rpc, CONTRACTS.poolOptimism),
    readKubchainSupply(),
    getBalanceOf(RPC, CONTRACTS.poolThaiFi, WALLETS.poolCustody),
    readPaused(),
    loadProjects(),
  ]);

  const projectList = projects.status === 'fulfilled' ? projects.value : snapshotProjects();

  return {
    poolSupply: pool.status === 'fulfilled' ? fromUnitsSafe(pool.value, 18) : null,
    retired: retired.status === 'fulfilled' ? fromUnitsSafe(retired.value, 18) : null,
    bridgedOp: bridgeOp.status === 'fulfilled' ? fromUnitsSafe(bridgeOp.value, 18) : null,
    bridgedKub: bridgeKub.status === 'fulfilled' ? bridgeKub.value : null,
    remaining: remaining.status === 'fulfilled' ? fromUnitsSafe(remaining.value, 18) : null,
    paused: paused.status === 'fulfilled' ? paused.value : null,
    projectSupply: projectList.reduce((sum, p) => sum + p.supply, 0),
    projectCount: projectList.length,
    updatedAt: new Date(),
  };
}

export async function loadStats() {
  if (statsCache && Date.now() - statsCache.at < 60_000) return statsCache.value;
  const value = await computeStats();
  statsCache = { at: Date.now(), value };
  return value;
}

export type AddressBalances = {
  address: string;
  thaifi: { rec: number | null; native: number | null };
  optimism: { rec: number | null; native: number | null };
  kubchain: { rec: number | null };
  holdings: Array<{ project: Project; balance: number }>;
  updatedAt: Date;
};

export async function loadAddressBalances(address: string): Promise<AddressBalances> {
  const projects = await loadProjects();

  const [thaifiRec, thaifiNative, optimismRec, optimismNative, kubchainRec, ...holdings] =
    await Promise.allSettled([
      getBalanceOf(RPC, CONTRACTS.poolThaiFi, address),
      getNativeBalance(RPC, address),
      getBalanceOf(CHAINS.optimism.rpc, CONTRACTS.poolOptimism, address),
      getNativeBalance(CHAINS.optimism.rpc, address),
      readKubchainBalance(address),
      ...projects.map((p) => getBalanceOf(RPC, p.address, address)),
    ]);

  const val = (r: PromiseSettledResult<bigint>) =>
    r.status === 'fulfilled' ? fromUnitsSafe(r.value, 18) : null;

  /**
   * ThaiFi's public RPC returns an implausible sentinel for eth_getBalance on
   * some contract addresses. Never render a number that cannot be a real
   * balance; show "-" instead.
   */
  const saneNative = (value: number | null): number | null =>
    value !== null && Number.isFinite(value) && value >= 0 && value < 1e12 ? value : null;

  return {
    address,
    thaifi: {
      rec: val(thaifiRec),
      native:
        thaifiNative.status === 'fulfilled'
          ? saneNative(fromUnitsSafe(thaifiNative.value, CHAINS.thaifi.native.decimals))
          : null,
    },
    optimism: {
      rec: val(optimismRec),
      native:
        optimismNative.status === 'fulfilled'
          ? saneNative(fromUnitsSafe(optimismNative.value, CHAINS.optimism.native.decimals))
          : null,
    },
    kubchain: { rec: kubchainRec.status === 'fulfilled' ? kubchainRec.value : null },
    holdings: projects
      .map((project, i) => ({
        project,
        balance: holdings[i]?.status === 'fulfilled' ? fromUnitsSafe((holdings[i] as PromiseFulfilledResult<bigint>).value, 18) : 0,
      }))
      .filter((h) => h.balance > 0),
    updatedAt: new Date(),
  };
}

async function readKubchainSupply(): Promise<number | null> {
  try {
    const data = await fetchJson<any>(
      `${CHAINS.kubchain.api}/tokens/${CONTRACTS.poolKubchain}`,
      8_000
    );
    if (!data || typeof data.total_supply !== 'string') return null;
    const decimals = Number(data.decimals ?? 18);
    return fromUnitsSafe(BigInt(data.total_supply), decimals);
  } catch {
    return null;
  }
}

async function readKubchainBalance(address: string): Promise<number | null> {
  try {
    const data = await fetchJson<any[]>(
      `${CHAINS.kubchain.api}/addresses/${address}/token-balances`,
      8_000
    );
    if (!Array.isArray(data)) return null;
    const item = data.find((t) => {
      const addr = t?.token?.address_hash || t?.token?.address;
      return typeof addr === 'string' && addr.toLowerCase() === CONTRACTS.poolKubchain.toLowerCase();
    });
    if (!item) return 0;
    const decimals = Number(item.token?.decimals ?? 18);
    return fromUnitsSafe(BigInt(item.value), decimals);
  } catch {
    return null;
  }
}

export type PriceInfo = {
  otcUsd: number;
  otcThb: number;
  forex: number;
  forexSource: string;
  bitkub: { listed: boolean; symbol: string; last?: number; changePercent?: number };
  updatedAt: Date;
  live: boolean;
};

export async function loadPrice(): Promise<PriceInfo> {
  let forex: number = MARKET.forexFallback;
  let forexSource = 'fallback';
  try {
    const data = await fetchJson<any>('https://open.er-api.com/v6/latest/USD', 8_000);
    const thb = Number(data?.rates?.THB);
    if (Number.isFinite(thb) && thb > 0) {
      forex = thb;
      forexSource = 'open.er-api.com';
    }
  } catch {
    /* fallback rate */
  }

  return {
    otcUsd: MARKET.otc.priceUsd,
    otcThb: MARKET.otc.priceUsd * forex,
    forex,
    forexSource,
    bitkub: { listed: MARKET.bitkub.listed, symbol: MARKET.bitkub.symbol },
    updatedAt: new Date(),
    live: forexSource !== 'fallback',
  };
}

export function assetBaseUrl(): string {
  return SITE.external.assets;
}
