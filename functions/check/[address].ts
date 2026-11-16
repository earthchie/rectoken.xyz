/**
 * Cloudflare Pages Function - legacy /check/<address> deep links.
 * Redirects to the locale-aware checker with the address in the query string.
 */
type Context = {
  request: Request;
  params: { address?: string };
};

export const onRequestGet = async ({ request, params }: Context): Promise<Response> => {
  const address = (params.address || '').trim();
  const valid = /^0x[a-fA-F0-9]{40}$/.test(address);
  const thai = (request.headers.get('accept-language') || '').toLowerCase().startsWith('th');
  const locale = thai ? 'th' : 'en';
  const target = valid
    ? `/${locale}/check/?address=${address}`
    : `/${locale}/check/`;
  return Response.redirect(new URL(target, request.url).toString(), 302);
};
