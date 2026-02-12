import type {I18nLocale} from 'types';
import type {RawSidebarConfig, RawModalConfig} from '~/features/aside';

// ============================================================================
// TRIGGER VARIANTS
// Controls how the locale selector button looks.
// ============================================================================

/** What the trigger button renders */
export type TriggerVariant =
  | 'icon' // Globe icon only
  | 'flag' // Flag only
  | 'flag-country' // Flag + country name
  | 'flag-country-lang'; // Flag + country name + language name

// ============================================================================
// DISPLAY MODE
// Controls how the selector opens and at which breakpoints.
// ============================================================================

/** The three container types */
export type SelectorMode = 'dropdown' | 'modal' | 'sidebar';

/** Single mode — same on all screen sizes */
export type SingleDisplayMode = {
  kind: 'single';
  mode: SelectorMode;
};

/**
 * Responsive mode — different modes at different breakpoints.
 * Mobile-first: base applies below sm,
 * each breakpoint overrides above its threshold.
 */
export type ResponsiveDisplayMode = {
  kind: 'responsive';
  base: SelectorMode;
  sm?: SelectorMode;
  md?: SelectorMode;
  lg?: SelectorMode;
};

export type DisplayMode = SingleDisplayMode | ResponsiveDisplayMode;

// ============================================================================
// SANITY CONFIG
// Raw shape coming from Sanity — all fields optional/nullable.
// ============================================================================

export type RawLocaleSelectorConfig = {
  triggerVariant?: TriggerVariant | null;
  showChevron?: boolean | null;
  displayMode?: RawDisplayMode | null;
  sidebarConfig?: RawSidebarConfig | null;
  modalConfig?: RawModalConfig | null;
};

export type RawDisplayMode = {
  kind?: 'single' | 'responsive' | null;
  mode?: SelectorMode | null; // used when kind = 'single'
  base?: SelectorMode | null; // used when kind = 'responsive'
  sm?: SelectorMode | null;
  md?: SelectorMode | null;
  lg?: SelectorMode | null;
};

// ============================================================================
// RESOLVED CONFIG
// Fully resolved, no nulls — ready to use in components.
// ============================================================================

export type LocaleSelectorConfig = {
  triggerVariant: TriggerVariant;
  showChevron: boolean;
  displayMode: DisplayMode;
  sidebarConfig: RawSidebarConfig;
  modalConfig: RawModalConfig;
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface LocaleSelectorProps {
  /** Resolved config from Sanity */
  config: LocaleSelectorConfig;
  /**
   * When true, forces dropdown mode opening upward.
   * Used when locale selector is rendered inside the mobile menu aside.
   */
  inMobileMenu?: boolean;
}

export interface LocaleTriggerProps {
  variant: TriggerVariant;
  showChevron: boolean;
  locale: I18nLocale;
  isOpen: boolean;
  onClick: () => void;
}

export interface LocaleFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
}

export interface LocaleFormProps {
  /** Called after successful navigation — closes the container */
  onClose: () => void;
}
