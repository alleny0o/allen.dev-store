import {useMemo} from 'react';
import type {I18nLocale} from 'types';
import type {LocaleFormProps} from '../types';
import type { LocaleSelectorState } from '../hooks/use-locale-selector';
import {LocaleFlag} from './locale-flag';

interface LocaleFormInternalProps extends LocaleFormProps {
  currentLocale: I18nLocale;
  locales: LocaleSelectorState['locales'];
  selectedCountry: string;
  setSelectedCountry: LocaleSelectorState['setSelectedCountry'];
  availableLanguages: LocaleSelectorState['availableLanguages'];
  handleLocaleChange: LocaleSelectorState['handleLocaleChange'];
}

/**
 * Country + language select form.
 *
 * - Country change updates selectedCountry state only (no submit)
 * - Language change auto-navigates via handleLocaleChange
 * - Noscript fallback renders a submit button for JS-disabled environments
 */
export function LocaleForm({
  currentLocale,
  locales,
  selectedCountry,
  setSelectedCountry,
  availableLanguages,
  handleLocaleChange,
  onClose,
}: LocaleFormInternalProps) {
  // Unique countries derived from full locales list
  const countries = useMemo(() => {
    const seen = new Set<string>();
    return locales.filter((l) => {
      if (seen.has(l.country)) return false;
      seen.add(l.country);
      return true;
    });
  }, [locales]);

  // Current language for the selected country — defaults to current locale's language
  const selectedLanguage =
    availableLanguages.find((l) => l.isoCode === currentLocale.language)
      ?.isoCode ?? availableLanguages[0]?.isoCode ?? '';

  return (
    <div className="flex flex-col gap-4">
      {/* Country select */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="locale-country"
          className="text-sm font-medium"
        >
          Country
        </label>
        <div className="relative flex items-center gap-2">
          <LocaleFlag countryCode={selectedCountry} size={18} />
          <select
            id="locale-country"
            name="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full appearance-none bg-transparent py-1.5 pr-8 text-sm focus:outline-none"
          >
            {countries.map((locale) => (
              <option key={locale.country} value={locale.country}>
                {locale.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language select — auto-submits on change */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="locale-language"
          className="text-sm font-medium"
        >
          Language
        </label>
        <select
          id="locale-language"
          name="language"
          value={selectedLanguage}
          onChange={(e) =>
            handleLocaleChange(selectedCountry, e.target.value)
          }
          className="w-full appearance-none bg-transparent py-1.5 pr-8 text-sm focus:outline-none"
        >
          {availableLanguages.map((lang) => (
            <option key={lang.isoCode} value={lang.isoCode}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Noscript fallback — only visible when JS is disabled */}
      <noscript>
        <button
          type="submit"
          onClick={() => handleLocaleChange(selectedCountry, selectedLanguage)}
          className="mt-2 w-full rounded border px-4 py-2 text-sm"
        >
          Apply
        </button>
      </noscript>
    </div>
  );
}