import {I18nLocale} from 'types';

/**
 * Default fallback locale configuration.
 * This is used when no other locale can be determined from the URL, cookie, or headers.
 *
 * Following Shopify's best practices, we use en-us as the default market.
 */
export const FALLBACK_LOCALE: I18nLocale = {
  country: 'US',
  currency: 'USD',
  isoCode: 'en-us',
  label: 'United States (USD $)',
  language: 'EN',
  languageLabel: 'English',
  salesChannel: 'hydrogen',
  default: true,
  pathPrefix: '/en-us',
};

/**
 * The default locale prefix used in URLs.
 * This constant is used throughout the application to identify the default market.
 *
 * @example
 * // When a user visits without a locale prefix
 * // They will be redirected to /en-us/...
 */
export const FALLBACK_LOCALE_PREFIX = 'en-us' as const;
