import {SUPPORTED_CONTENT_LANGUAGES} from './sanity-languages';

/**
 * Convert a Shopify locale (e.g. 'en-us') to a Sanity content language (e.g. 'en').
 * Falls back to 'en' if the language isn't supported.
 */
export function mapLocaleToContentLanguage(localePrefix: string): string {
  const languageCode = localePrefix.split('-')[0].toLowerCase();
  const supported = SUPPORTED_CONTENT_LANGUAGES.find((l) => l.id === languageCode);
  return supported ? languageCode : 'en';
}

/**
 * Extract a locale prefix from the start of a pathname if present.
 * Returns the prefix (e.g. 'en-us') and the remaining path.
 */
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
