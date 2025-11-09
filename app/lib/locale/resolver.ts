/**
 * Locale resolution logic for all incoming requests.
 *
 * Priority order:
 *   1. URL locale prefix (e.g. /en-us)
 *   2. Locale cookie (user preference)
 *   3. Accept-Language header (browser preference)
 *   4. Default fallback (`en-us`)
 *
 * Additionally:
 * - Ensures locale prefixes are lowercase (/EN-us -> /en-us)
 * - Never returns null — always returns a safe locale
 * - Avoids redirect loops
 * - Allows skipping for internal routes (/api, /admin, static assets)
 */

import type {AllLocalizationsQuery} from 'types/shopify/storefrontapi.generated';
import type {I18nLocale} from 'types';
import {getLocaleFromCookie, setLocaleCookie} from './cookies';
import {buildI18nLocales, markDefault} from './locales';
import {pickByAcceptLanguage} from './accept-language';
import {isInternalPath} from './internal-paths';
import {FALLBACK_LOCALE_PREFIX, FALLBACK_LOCALE} from './fallbacks';

export function resolveEffectiveLocale(
  request: Request,
  localizations: AllLocalizationsQuery,
  pathname: string,
) {
  // Build list of available locales from Shopify markets
  let locales = markDefault(
    buildI18nLocales(localizations),
    FALLBACK_LOCALE_PREFIX.toLowerCase(),
  );

  // Safety net: If Shopify misconfigures markets, we still serve the site
  if (locales.length === 0) {
    locales = [FALLBACK_LOCALE];
  }

  const defaultLocale = locales.find((l) => l.default)!;

  // Skip locale logic for internal/system paths
  if (isInternalPath(pathname)) {
    return {locale: defaultLocale, locales, shouldRedirect: false};
  }

  // Try extracting locale prefix from URL
  const match = pathname.match(/^\/([a-z]{2}-[a-z]{2})(\/|$)/i);
  const rawIso = match?.[1] ?? null;
  const normalizedIso = rawIso?.toLowerCase() ?? null;

  const pathLocale = normalizedIso
    ? (locales.find((l) => l.isoCode.toLowerCase() === normalizedIso) ?? null)
    : null;

  // URL contains recognized locale
  if (pathLocale) {
    const cookieIso = getLocaleFromCookie(request);
    const cookie =
      cookieIso === pathLocale.isoCode
        ? undefined
        : setLocaleCookie(pathLocale.isoCode);

    // Normalize casing — redirect if needed
    if (rawIso !== pathLocale.isoCode) {
      const url = new URL(request.url);
      const rest = pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/';
      const redirectUrl =
        `${pathLocale.pathPrefix}${rest}`.replace(/\/+$/, '') + url.search;

      return {
        locale: pathLocale,
        locales,
        cookie,
        shouldRedirect: true,
        redirectUrl,
      };
    }

    // Already canonical
    return {locale: pathLocale, locales, cookie, shouldRedirect: false};
  }

  // URL has no locale → try cookie
  const cookieIso = getLocaleFromCookie(request);
  const cookieLocale = cookieIso
    ? (locales.find((l) => l.isoCode === cookieIso) ?? null)
    : null;

  // Try Accept-Language header (only if cookie not set)
  const acceptLocale = cookieLocale
    ? null
    : pickByAcceptLanguage(request.headers.get('accept-language'), locales);

  // Final guaranteed fallback
  const target: I18nLocale = cookieLocale ?? acceptLocale ?? defaultLocale;

  // Build redirection path
  const url = new URL(request.url);
  const basePath = normalizedIso
    ? pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/'
    : pathname || '/';

  const redirectUrl =
    `${target.pathPrefix}${basePath}`.replace(/\/+$/, '') + url.search;

  const cookie = setLocaleCookie(target.isoCode);

  // Avoid infinite redirect loops
  if (redirectUrl === pathname + url.search) {
    return {locale: target, locales, cookie, shouldRedirect: false};
  }

  return {locale: target, locales, cookie, shouldRedirect: true, redirectUrl};
}
