import {useState, useMemo} from 'react';
import {useNavigate, useLocation} from 'react-router';
import type {I18nLocale} from 'types';
import {useRootLoaderData} from '~/root';
import {buildLocaleUrl} from '../utils/locale-url';

// ============================================================================
// TYPES
// ============================================================================

export type LocaleSelectorState = {
  /** The currently active locale */
  currentLocale: I18nLocale;
  /** All available locales */
  locales: I18nLocale[];
  /** The country the user has selected in the form (not yet submitted) */
  selectedCountry: string;
  /** Update selected country — resets language select */
  setSelectedCountry: (country: string) => void;
  /** Language options available for the selected country */
  availableLanguages: LanguageOption[];
  /** Navigate to a new locale URL — auto-submits on language change */
  handleLocaleChange: (countryCode: string, languageCode: string) => void;
};

export type LanguageOption = {
  isoCode: string;
  label: string;
};

// ============================================================================
// HELPERS
// ============================================================================

export function getAvailableLanguagesForCountry(
  locales: I18nLocale[],
  countryCode: string,
): LanguageOption[] {
  return locales
    .filter((l) => l.country === countryCode)
    .map((l) => ({
      isoCode: l.language,
      label: l.languageLabel,
    }));
}

// ============================================================================
// HOOK
// ============================================================================

export function useLocaleSelector(): LocaleSelectorState {
  const {locale, localizations} = useRootLoaderData();
  const navigate = useNavigate();
  const {pathname, search} = useLocation();

  const [selectedCountry, setSelectedCountry] = useState<string>(
    locale.country,
  );

  const locales = useMemo<I18nLocale[]>(() => {
    const countries = localizations?.localization?.availableCountries ?? [];
    const out: I18nLocale[] = [];

    for (const c of countries) {
      for (const l of c.availableLanguages ?? []) {
        const iso = `${l.isoCode.toLowerCase()}-${c.isoCode.toLowerCase()}`;
        out.push({
          country: c.isoCode as I18nLocale['country'],
          currency: c.currency.isoCode as I18nLocale['currency'],
          isoCode: iso,
          label: `${c.name} (${c.currency.isoCode})`,
          language: l.isoCode as I18nLocale['language'],
          languageLabel: l.endonymName ?? l.isoCode,
          salesChannel: 'hydrogen' as I18nLocale['salesChannel'],
          default: false,
          pathPrefix: `/${iso}`,
        });
      }
    }

    return out;
  }, [localizations]);

  const availableLanguages = useMemo(
    () => getAvailableLanguagesForCountry(locales, selectedCountry),
    [locales, selectedCountry],
  );

  const handleLocaleChange = (countryCode: string, languageCode: string) => {
    const isoCode = `${languageCode.toLowerCase()}-${countryCode.toLowerCase()}`;
    const nextLocale = locales.find((l) => l.isoCode.toLowerCase() === isoCode);

    if (!nextLocale) return;

    const url = buildLocaleUrl(pathname, nextLocale.pathPrefix, search);
    navigate(url);
  };

  return {
    currentLocale: locale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  };
}
