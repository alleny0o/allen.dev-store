export const LOCALE_COOKIE_NAME = 'locale';
const LOCALE_COOKIE_AGE = 60 * 60 * 24 * 365; // 1 year

export function getLocaleFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const match = cookies.find((c) => c.startsWith(`${LOCALE_COOKIE_NAME}=`));
  if (!match) return null;
  const locale = match.split('=')[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? locale.toLowerCase() : null;
}

export function setLocaleCookie(locale: string): string {
  if (!/^[a-z]{2}-[a-z]{2}$/i.test(locale)) {
    throw new Error(`Invalid locale format: ${locale}. Expected format: xx-xx (e.g., en-us)`);
  }
  return `${LOCALE_COOKIE_NAME}=${locale.toLowerCase()}; Path=/; Max-Age=${LOCALE_COOKIE_AGE}; SameSite=Lax; Secure; HttpOnly`;
}

export function deleteLocaleCookie(): string {
  return `${LOCALE_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; Secure; HttpOnly`;
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) cookies[name] = value;
  });
  return cookies;
}

export function hasLocaleCookie(request: Request): boolean {
  return getLocaleFromCookie(request) !== null;
}

export function getLocaleFromCookieWithFallback(request: Request, fallback: string): string {
  return getLocaleFromCookie(request) || fallback;
}
