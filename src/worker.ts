/**
 * Cloudflare Worker entry point.
 *
 * The site itself is static: everything in `dist` is served by the ASSETS binding.
 * Only two paths run code:
 *   POST /api/redeem        redemption request intake
 *   GET  /check[/<address>] legacy deep link redirect
 */

import { handleRedeem, type RedeemEnv } from './server/redeem';

type AssetsBinding = {
  fetch(request: Request): Promise<Response>;
};

type Env = RedeemEnv & {
  ASSETS: AssetsBinding;
};

const CHECK_PATH = /^\/check(?:\/([^/]+))?\/?$/;

function legacyCheckRedirect(request: Request, rawAddress?: string): Response {
  const address = (rawAddress || '').trim();
  const valid = /^0x[a-fA-F0-9]{40}$/.test(address);
  const thai = (request.headers.get('accept-language') || '').toLowerCase().startsWith('th');
  const locale = thai ? 'th' : 'en';
  const target = valid ? `/${locale}/check/?address=${address}` : `/${locale}/check/`;
  return Response.redirect(new URL(target, request.url).toString(), 302);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/redeem') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: { allow: 'POST, OPTIONS' } });
      }
      if (request.method !== 'POST') {
        return new Response(null, { status: 405, headers: { allow: 'POST, OPTIONS' } });
      }
      return handleRedeem(request, env);
    }

    const legacy = pathname.match(CHECK_PATH);
    if (legacy) {
      return legacyCheckRedirect(request, legacy[1]);
    }

    return env.ASSETS.fetch(request);
  },
};
