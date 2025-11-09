import {SUPPORTED_CONTENT_LANGUAGES} from './sanity-languages';

/**
 * Maps Shopify locale prefixes to Sanity CMS language codes.
 * 
 * Shopify uses full locale codes like 'en-us', 'en-gb', 'fr-ca',
 * but Sanity typically uses just language codes like 'en', 'fr', 'de'.
 * 
 * This function extracts the language part and validates it against
 * supported Sanity languages, falling back to 'en' if unsupported.
 * 
 * @param localePrefix - The Shopify locale (e.g., 'en-us', 'fr-ca')
 * @returns The Sanity language code (e.g., 'en', 'fr')
 * 
 * @example
 * mapLocaleToContentLanguage('en-us') // returns 'en'
 * mapLocaleToContentLanguage('fr-ca') // returns 'fr'
 * mapLocaleToContentLanguage('en-gb') // returns 'en'
 * mapLocaleToContentLanguage('invalid') // returns 'en' (fallback)
 */
export function mapLocaleToContentLanguage(localePrefix: string): string {
  // Extract just the language code (before the hyphen)
  const languageCode = localePrefix.split('-')[0].toLowerCase();
  
  // Check if this language is supported in Sanity
  const supported = SUPPORTED_CONTENT_LANGUAGES.find((l) => l.id === languageCode);
  
  // Return the language if supported, otherwise fallback to English
  return supported ? languageCode : 'en';
}

/**
 * Extracts locale information from a URL pathname.
 * 
 * This parses URLs like '/en-us/products' or '/fr-ca/collections/shoes'
 * and separates the locale prefix from the actual path.
 * 
 * @param pathname - The URL pathname to parse
 * @returns Object containing the locale prefix and path without locale
 * 
 * @example
 * extractLocaleFromPath('/en-us/products')
 * // returns { localePrefix: 'en-us', pathWithoutLocale: '/products' }
 * 
 * extractLocaleFromPath('/products')
 * // returns { localePrefix: null, pathWithoutLocale: '/products' }
 * 
 * extractLocaleFromPath('/fr-ca/')
 * // returns { localePrefix: 'fr-ca', pathWithoutLocale: '/' }
 */
export function extractLocaleFromPath(pathname: string): {
  localePrefix: string | null;
  pathWithoutLocale: string;
} {
  // Match pattern: /xx-xx/ or /xx-xx at start of path
  const match = pathname.match(/^\/([a-z]{2}-[a-z]{2})(\/|$)/i);
  const localePrefix = match?.[1]?.toLowerCase() || null;

  // Remove the locale prefix from the path if found
  const pathWithoutLocale = localePrefix
    ? pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/'
    : pathname;

  return {localePrefix, pathWithoutLocale};
}