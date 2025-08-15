export type Auth =
  | { raw: string }                       // p.ej. 'Bearer eyJ...' ya formateado
  | { scheme: string; token: string };    // p.ej. { scheme: 'Bearer', token: 'eyJ...' }

export function buildAuthHeader(auth?: Auth): Record<string, string> {
  if (!auth) return {};
  if ('raw' in auth) return {Authorization: auth.raw.trim()};
  const scheme = (auth.scheme || 'Bearer').trim();
  return {Authorization: `${scheme} ${auth.token}`.trim()};
}
