import { SUPPORTED_CONTENT_LANGUAGES } from "./sanity-languages";

/** Map Shopify locale prefixes to Sanity language codes (e.g., 'en-us' -> 'en'). */
export function mapLocaleToContentLanguage(localePrefix: string): string {
  const languageCode = localePrefix.split('-')[0].toLowerCase();
  const supported = SUPPORTED_CONTENT_LANGUAGES.find((l) => l.id === languageCode);
  return supported ? languageCode : 'en';
}

/** Extract locale info from URL path. */
export function extractLocaleFromPath(pathname: string): {
  localePrefix: string | null;
  pathWithoutLocale: string;
} {
  const match = pathname.match(/^\/([a-z]{2}-[a-z]{2})(\/|$)/i);
  const localePrefix = match?.[1]?.toLowerCase() || null;

  const pathWithoutLocale = localePrefix
    ? pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/'
    : pathname;

  return {localePrefix, pathWithoutLocale};
}
