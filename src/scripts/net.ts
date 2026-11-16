/**
 * Guard for outbound requests made by the browser data layer.
 *
 * RPC and metadata endpoints come from site configuration rather than user
 * input, but every request is still validated: http(s) only, and never a
 * loopback, private, link-local or reserved host. A tampered or misconfigured
 * endpoint should fail loudly instead of turning the page into a request proxy.
 */

const BLOCKED_HOSTS = new Set([
  'localhost',
  'localhost.localdomain',
  'ip6-localhost',
  'ip6-loopback',
  '0.0.0.0',
  '::',
  '::1',
]);

function isPrivateIPv4(host: string): boolean {
  const parts = host.split('.');
  if (parts.length !== 4 || parts.some((part) => part === '' || !/^\d{1,3}$/.test(part))) {
    return false;
  }
  const [a, b] = parts.map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIPv6(host: string): boolean {
  const h = host.replace(/^\[|\]$/g, '').toLowerCase();
  if (!h.includes(':')) return false;
  if (h === '::' || h === '::1') return true;
  if (h.startsWith('fc') || h.startsWith('fd')) return true;
  if (/^fe[89ab]/.test(h)) return true;
  if (h.startsWith('::ffff:')) return isPrivateIPv4(h.slice(7));
  return false;
}

export function safeEndpoint(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('INVALID_URL');
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('INVALID_URL');
  }
  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith('.localhost') || host.endsWith('.internal')) {
    throw new Error('UNSAFE_HOST');
  }
  if (isPrivateIPv4(host) || isPrivateIPv6(host)) {
    throw new Error('UNSAFE_HOST');
  }
  return url.toString();
}
