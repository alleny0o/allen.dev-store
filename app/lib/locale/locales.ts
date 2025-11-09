import type {AllLocalizationsQuery} from 'types/shopify/storefrontapi.generated';
import type {I18nLocale} from 'types';
import {CountryCode, LanguageCode, CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

export function buildI18nLocales(data: AllLocalizationsQuery): I18nLocale[] {
  const countries = data.localization?.availableCountries ?? [];
  const out: I18nLocale[] = [];

  for (const c of countries) {
    for (const l of c.availableLanguages ?? []) {
      const iso = `${l.isoCode.toLowerCase()}-${c.isoCode.toLowerCase()}`;
      out.push({
        country: c.isoCode as CountryCode,
        currency: c.currency.isoCode as CurrencyCode,
        isoCode: iso,
        label: `${c.name} (${c.currency.isoCode})`,
        language: l.isoCode as LanguageCode,
        languageLabel: l.endonymName ?? l.isoCode,
        salesChannel: 'hydrogen' as any,
        default: false,
        pathPrefix: `/${iso}`,
      });
    }
  }

  return out;
}

export function markDefault(locales: I18nLocale[], defaultIsoLower: string) {
  for (const l of locales) {
    l.default = l.isoCode.toLowerCase() === defaultIsoLower;
    l.pathPrefix = `/${l.isoCode}`;
  }
  if (!locales.some((l) => l.default) && locales.length > 0) {
    locales[0].default = true;
  }
  return locales;
}