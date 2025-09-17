import type {AllLocalizationsQuery} from 'types/shopify/storefrontapi.generated';
import type {I18nLocale} from 'types';
import {
  CountryCode,
  LanguageCode,
  CurrencyCode,
} from '@shopify/hydrogen/storefront-api-types';
import {getLocaleFromCookie, setLocaleCookie} from './cookies';
import {mapLocaleToContentLanguage} from './config';
import {FALLBACK_LOCALE_PREFIX} from './fallbacks';

/** Build I18nLocale[] directly from Shopify localizations. */
function buildI18nLocales(data: AllLocalizationsQuery): I18nLocale[] {
  const countries = data.localization?.availableCountries ?? [];
  const out: I18nLocale[] = [];

  for (const c of countries) {
    const langs = c.availableLanguages ?? [];
    for (const l of langs) {
      const iso = `${l.isoCode.toLowerCase()}-${c.isoCode.toLowerCase()}`; // e.g. en-us
      out.push({
        country: c.isoCode as CountryCode,
        currency: c.currency.isoCode as CurrencyCode,
        isoCode: iso, // we also use this as URL prefix
        label: `${c.name} (${c.currency.isoCode})`,
        language: l.isoCode as LanguageCode,
        languageLabel: l.endonymName ?? l.isoCode,
        salesChannel: 'hydrogen' as any, // constant; matches keyof typeof ShopifySalesChannel
        default: false, // set below
        pathPrefix: `/${iso}`, // default becomes '' below
      });
    }
  }
  return out;
}

/** Mark default locale by prefix, ensure exactly one default + correct pathPrefix. */
function markDefault(locales: I18nLocale[], defaultIsoLower: string) {
  for (const l of locales) {
    const isDef = l.isoCode.toLowerCase() === defaultIsoLower;
    l.default = isDef;
    l.pathPrefix = isDef ? '' : `/${l.isoCode}`;
  }
  if (!locales.some((l) => l.default) && locales.length) {
    locales[0].default = true;
    locales[0].pathPrefix = '';
  }
  return locales;
}

function isInternalPath(pathname: string) {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/cms') ||
    pathname.startsWith('/sanity-preview') ||
    /\.[^/]+$/.test(pathname) // file-like paths
  );
}

function pickByAcceptLanguage(
  header: string | null,
  locales: I18nLocale[],
): I18nLocale | null {
  if (!header) return null;
  const prefs = header
    .split(',')
    .map((pref) => {
      const [loc, q = '1'] = pref.trim().split(';q=');
      return {loc: loc.toLowerCase(), q: parseFloat(q)};
    })
    .sort((a, b) => b.q - a.q);

  // exact match: "en-us"
  for (const p of prefs) {
    if (/^[a-z]{2}-[a-z]{2}$/.test(p.loc)) {
      const exact = locales.find((l) => l.isoCode.toLowerCase() === p.loc);
      if (exact) return exact;
    }
  }
  // language-only: "en"
  for (const p of prefs) {
    if (/^[a-z]{2}$/.test(p.loc)) {
      const found = locales.find((l) => l.language.toLowerCase() === p.loc);
      if (found) return found;
    }
  }
  return null;
}

export function resolveEffectiveLocale(
  request: Request,
  localizations: AllLocalizationsQuery,
  pathname: string,
): {
  locale: I18nLocale;
  locales: I18nLocale[];
  cookie?: string;
  shouldRedirect: boolean;
  redirectUrl?: string;
} {
  const locales = markDefault(
    buildI18nLocales(localizations),
    FALLBACK_LOCALE_PREFIX.toLowerCase(),
  );

  const defaultLocale = locales.find((l) => l.default) ?? locales[0];

  if (isInternalPath(pathname)) {
    return {locale: defaultLocale, locales, shouldRedirect: false};
  }

  const pathIso =
    pathname.match(/^\/([a-z]{2}-[a-z]{2})(\/|$)/i)?.[1]?.toLowerCase() ?? null;
  const pathLocale = pathIso
    ? locales.find((l) => l.isoCode.toLowerCase() === pathIso)
    : null;

  const cookieIso = getLocaleFromCookie(request);
  const cookieLocale = cookieIso
    ? locales.find((l) => l.isoCode === cookieIso)
    : null;

  const acceptLocale = pickByAcceptLanguage(
    request.headers.get('accept-language'),
    locales,
  );

  const preferred = pathLocale ?? cookieLocale ?? acceptLocale ?? defaultLocale;

  const shouldRedirect =
    !pathIso || preferred.isoCode.toLowerCase() !== pathIso;
  let redirectUrl: string | undefined;
  if (shouldRedirect) {
    const url = new URL(request.url);
    const pathWithoutIso = pathIso
      ? pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/'
      : pathname || '/';
    redirectUrl =
      `/${preferred.isoCode}${pathWithoutIso}`.replace(/\/+$/, '') + url.search;
  }

  const cookie =
    cookieIso === preferred.isoCode
      ? undefined
      : setLocaleCookie(preferred.isoCode);

  return {locale: preferred, locales, cookie, shouldRedirect, redirectUrl};
}

/** Helper: derive Sanity language from an I18nLocale (or isoCode). */
export const sanityLanguageFrom = (localeIsoOrI18n: string | I18nLocale) =>
  mapLocaleToContentLanguage(
    typeof localeIsoOrI18n === 'string'
      ? localeIsoOrI18n
      : localeIsoOrI18n.isoCode,
  );
