import {useState, useMemo} from 'react';
import {useNavigate, useLocation} from 'react-router';
import type {I18nLocale} from 'types';
import {useRootLoaderData} from '~/root';
import {buildLocaleUrl} from '../utils/locale-url';

// ============================================================================
// TYPES
// ============================================================================

export type LocaleSelectorState = {
  /** Whether the selector panel is open */
  isOpen: boolean;
  /** Open the selector */
  open: () => void;
  /** Close the selector */
  close: () => void;
  /** Toggle open/close */
  toggle: () => void;
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

/**
 * Extracts unique countries from the full locales list.
 * Returns one entry per country (the first locale found for that country).
 */
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    locale.country,
  );

  // Build full locales list from Shopify localizations query
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

  // Language options update reactively when selectedCountry changes
  const availableLanguages = useMemo(
    () => getAvailableLanguagesForCountry(locales, selectedCountry),
    [locales, selectedCountry],
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  /**
   * Navigates to the URL for the selected country + language combination.
   * Called automatically when the language select changes.
   * Cookie is updated by the root loader as a side effect of the URL change.
   */
  const handleLocaleChange = (countryCode: string, languageCode: string) => {
    const isoCode = `${languageCode.toLowerCase()}-${countryCode.toLowerCase()}`;
    const nextLocale = locales.find((l) => l.isoCode.toLowerCase() === isoCode);

    if (!nextLocale) return;

    const url = buildLocaleUrl(pathname, nextLocale.pathPrefix, search);
    close();
    navigate(url);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
    currentLocale: locale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  };
}
