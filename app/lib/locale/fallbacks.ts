import {I18nLocale} from 'types';

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

export const FALLBACK_LOCALE_PREFIX = 'en-us' as const;
