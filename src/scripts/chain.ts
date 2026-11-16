/**
 * Minimal, dependency-free EVM helpers used by the browser-side data layer.
 * Only public, read-only RPC calls are made from here.
 */

import { safeEndpoint } from './net';

export class RpcError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = 'RpcError';
  }
}

const DEFAULT_TIMEOUT = 15_000;

export async function rpc<T = unknown>(
  url: string,
  method: string,
  params: unknown[] = [],
  timeout = DEFAULT_TIMEOUT
): Promise<T> {
  const endpoint = safeEndpoint(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      signal: controller.signal,
    });
    if (!res.ok) throw new RpcError(`RPC HTTP ${res.status}`);
    const json = (await res.json()) as { result?: T; error?: { code: number; message: string } };
    if (json.error) throw new RpcError(json.error.message, json.error.code);
    return json.result as T;
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ */
/* ABI encoding                                                        */
/* ------------------------------------------------------------------ */

export function strip0x(hex: string): string {
  return hex.startsWith('0x') ? hex.slice(2) : hex;
}

export function pad32(hex: string): string {
  return strip0x(hex).toLowerCase().padStart(64, '0');
}

export function encodeUint(value: bigint | number | string): string {
  return BigInt(value).toString(16).padStart(64, '0');
}

export function encodeAddress(address: string): string {
  const clean = strip0x(address).toLowerCase();
  if (!/^[0-9a-f]{40}$/.test(clean)) throw new Error('Invalid address');
  return clean.padStart(64, '0');
}

export function decodeUint(hex: string): bigint {
  if (!hex || hex === '0x') return 0n;
  return BigInt(hex);
}

export function decodeAddress(hex: string): string {
  const clean = strip0x(hex);
  return '0x' + clean.slice(-40);
}

/** Decode a dynamic ABI string (offset + length + bytes). */
export function decodeString(hex: string): string {
  if (!hex || hex === '0x') return '';
  const clean = strip0x(hex);
  try {
    const offset = Number(BigInt('0x' + clean.slice(0, 64)));
    const length = Number(BigInt('0x' + clean.slice(offset * 2, offset * 2 + 64)));
    const data = clean.slice(offset * 2 + 64, offset * 2 + 64 + length * 2);
    const bytes = new Uint8Array(data.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ?? []);
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}

/* ------------------------------------------------------------------ */
/* ERC-20 reads                                                        */
/* ------------------------------------------------------------------ */

const SELECTOR = {
  totalSupply: '0x18160ddd',
  decimals: '0x313ce567',
  symbol: '0x95d89b41',
  name: '0x06fdde03',
  balanceOf: '0x70a08231',
  allowance: '0xdd62ed3e',
  transfer: '0xa9059cbb',
  approve: '0x095ea7b3',
} as const;

export async function ethCall(rpcUrl: string, to: string, data: string): Promise<string> {
  return rpc<string>(rpcUrl, 'eth_call', [{ to, data }, 'latest']);
}

export async function getTotalSupply(rpcUrl: string, token: string): Promise<bigint> {
  return decodeUint(await ethCall(rpcUrl, token, SELECTOR.totalSupply));
}

export async function getDecimals(rpcUrl: string, token: string): Promise<number> {
  try {
    return Number(decodeUint(await ethCall(rpcUrl, token, SELECTOR.decimals)));
  } catch {
    return 18;
  }
}

export async function getSymbol(rpcUrl: string, token: string): Promise<string> {
  try {
    return decodeString(await ethCall(rpcUrl, token, SELECTOR.symbol)) || 'REC';
  } catch {
    return 'REC';
  }
}

export async function getBalanceOf(rpcUrl: string, token: string, holder: string): Promise<bigint> {
  return decodeUint(await ethCall(rpcUrl, token, SELECTOR.balanceOf + encodeAddress(holder)));
}

export async function getNativeBalance(rpcUrl: string, holder: string): Promise<bigint> {
  const hex = await rpc<string>(rpcUrl, 'eth_getBalance', [holder, 'latest']);
  return decodeUint(hex);
}

export async function getAllowance(
  rpcUrl: string,
  token: string,
  owner: string,
  spender: string
): Promise<bigint> {
  return decodeUint(
    await ethCall(rpcUrl, token, SELECTOR.allowance + encodeAddress(owner) + encodeAddress(spender))
  );
}

/* ------------------------------------------------------------------ */
/* Transactions (wallet-signed only)                                   */
/* ------------------------------------------------------------------ */

export function encodeErc20Approve(spender: string, amount: bigint): string {
  return SELECTOR.approve + encodeAddress(spender) + encodeUint(amount);
}

export function encodeErc20Transfer(to: string, amount: bigint): string {
  return SELECTOR.transfer + encodeAddress(to) + encodeUint(amount);
}

/* ------------------------------------------------------------------ */
/* Uniswap V3 (Optimism)                                               */
/* ------------------------------------------------------------------ */

export const UNISWAP = {
  quoterV1: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  feeTier: 3000,
} as const;

/** quoteExactInputSingle(address,address,uint24,uint256,uint160) */
export function encodeUniswapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: bigint,
  feeTier = UNISWAP.feeTier
): string {
  return (
    '0xf7729d43' +
    encodeAddress(tokenIn) +
    encodeAddress(tokenOut) +
    encodeUint(feeTier) +
    encodeUint(amountIn) +
    encodeUint(0)
  );
}

export async function quoteUniswap(
  rpcUrl: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: bigint,
  feeTier = UNISWAP.feeTier
): Promise<bigint> {
  const result = await ethCall(
    rpcUrl,
    UNISWAP.quoterV1,
    encodeUniswapQuote(tokenIn, tokenOut, amountIn, feeTier)
  );
  return decodeUint(result.slice(0, 66));
}

/** exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) */
export function encodeUniswapSwap(params: {
  tokenIn: string;
  tokenOut: string;
  recipient: string;
  deadline: number;
  amountIn: bigint;
  amountOutMinimum: bigint;
  feeTier?: number;
}): string {
  const fee = params.feeTier ?? UNISWAP.feeTier;
  return (
    '0x414bf389' +
    encodeAddress(params.tokenIn) +
    encodeAddress(params.tokenOut) +
    encodeUint(fee) +
    encodeAddress(params.recipient) +
    encodeUint(params.deadline) +
    encodeUint(params.amountIn) +
    encodeUint(params.amountOutMinimum) +
    encodeUint(0)
  );
}

/* ------------------------------------------------------------------ */
/* Formatting helpers for raw JSON-RPC values                          */
/* ------------------------------------------------------------------ */

export function hexToNumber(hex: string): number {
  return Number(BigInt(hex));
}

export function numberToHex(value: number): string {
  return '0x' + value.toString(16);
}

export function fromUnitsSafe(raw: bigint | string | null | undefined, decimals = 18): number {
  if (raw === null || raw === undefined) return 0;
  try {
    const value = typeof raw === 'bigint' ? raw : BigInt(raw);
    const base = 10n ** BigInt(decimals);
    const whole = value / base;
    const fraction = (value % base).toString().padStart(decimals, '0').slice(0, 8);
    const result = Number(`${whole}.${fraction}`);
    return Number.isFinite(result) ? result : 0;
  } catch {
    const n = Number(raw);
    return Number.isFinite(n) ? n / Math.pow(10, decimals) : 0;
  }
}

/** Parse a decimal user input into base units without floating-point drift. */
export function parseUnits(input: string, decimals = 18): bigint {
  const clean = input.trim().replace(/,/g, '');
  if (!/^\d*(\.\d*)?$/.test(clean) || clean === '' || clean === '.') {
    throw new Error('Invalid amount');
  }
  const [whole, fraction = ''] = clean.split('.');
  const base = 10n ** BigInt(decimals);
  const wholePart = BigInt(whole || '0') * base;
  const fractionPart = BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals) || '0');
  return wholePart + fractionPart;
}
