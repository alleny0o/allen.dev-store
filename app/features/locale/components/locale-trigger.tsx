import {forwardRef} from 'react';
import {Globe, ChevronDown} from 'lucide-react';
import {LocaleFlag} from './locale-flag';
import type {LocaleTriggerProps} from '../types';
import {cn} from '~/lib/utils';

/**
 * The locale selector trigger button.
 * Renders one of four variants based on Sanity config.
 * Forwarded ref is used by LocaleDropdown for collision detection.
 */
export const LocaleTrigger = forwardRef<HTMLButtonElement, LocaleTriggerProps>(
  function LocaleTrigger({variant, showChevron, locale, isOpen, onClick}, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select country or language. Current: ${locale.label}`}
        className="flex items-center gap-2"
      >
        {/* Icon only */}
        {variant === 'icon' && <Globe size={20} aria-hidden="true" />}

        {/* Flag only */}
        {variant === 'flag' && (
          <LocaleFlag countryCode={locale.country} size={20} />
        )}

        {/* Flag + country name */}
        {variant === 'flag-country' && (
          <>
            <LocaleFlag countryCode={locale.country} size={20} />
            <span>{locale.label}</span>
          </>
        )}

        {/* Flag + country name + language */}
        {variant === 'flag-country-lang' && (
          <>
            <LocaleFlag countryCode={locale.country} size={20} />
            <span>{locale.label}</span>
            <span className="text-muted-foreground">
              {locale.languageLabel}
            </span>
          </>
        )}

        {/* Optional chevron — rotates when open */}
        {showChevron && (
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={cn(
              'transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </button>
    );
  },
);
