import {stegaClean} from '@sanity/client/stega';
import type {
  LocaleSelectorConfig,
  SelectorMode,
  DisplayMode,
  TriggerVariant,
} from '../types';
import {LOCALE_SELECTOR_DEFAULTS} from '../constants';

// ─────────────────────────────────────────────────────────────────────────────
// RAW SANITY SHAPE
// Flat fields as returned by LOCALE_SELECTOR_FRAGMENT.
// ─────────────────────────────────────────────────────────────────────────────

export type RawSanityLocaleSelectorConfig =
  | {
      triggerVariant?: string | null;
      showChevron?: boolean | null;
      // Display mode
      displayModeKind?: string | null;
      mode?: string | null; // used when kind = 'single'
      modeBase?: string | null; // used when kind = 'responsive'
      modeSm?: string | null;
      modeMd?: string | null;
      modeLg?: string | null;
      // Aside configs
      sidebarConfig?: Record<string, unknown> | null;
      modalConfig?: Record<string, unknown> | null;
    }
  | null
  | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const TRIGGER_VARIANTS: TriggerVariant[] = [
  'icon',
  'flag',
  'flag-country',
  'flag-country-lang',
];

function cleanTriggerVariant(
  value: string | null | undefined,
): TriggerVariant | null {
  const cleaned = stegaClean(value);
  if (TRIGGER_VARIANTS.includes(cleaned as TriggerVariant)) {
    return cleaned as TriggerVariant;
  }
  return null;
}

function cleanMode(value: string | null | undefined): SelectorMode | null {
  const cleaned = stegaClean(value);
  if (cleaned === 'dropdown' || cleaned === 'modal' || cleaned === 'sidebar') {
    return cleaned;
  }
  return null;
}

function resolveDisplayMode(
  raw: NonNullable<RawSanityLocaleSelectorConfig>,
): DisplayMode {
  const kind = stegaClean(raw.displayModeKind) ?? 'single';

  if (kind === 'responsive') {
    return {
      kind: 'responsive',
      base: cleanMode(raw.modeBase) ?? 'dropdown',
      sm: cleanMode(raw.modeSm) ?? undefined,
      md: cleanMode(raw.modeMd) ?? undefined,
      lg: cleanMode(raw.modeLg) ?? undefined,
    };
  }

  // Default: single
  return {
    kind: 'single',
    mode: cleanMode(raw.mode) ?? 'dropdown',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RESOLVER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves raw Sanity locale selector config into a fully typed
 * LocaleSelectorConfig with no nulls.
 *
 * Mirrors the pattern of resolveAsideConfig in app/features/aside —
 * cleans stega encoding, applies defaults for missing fields, and
 * returns a shape that components can consume directly.
 *
 * @param raw - Raw data from the LOCALE_SELECTOR_FRAGMENT GROQ query
 * @returns Fully resolved LocaleSelectorConfig
 */
export function resolveLocaleSelectorConfig(
  raw: RawSanityLocaleSelectorConfig,
): LocaleSelectorConfig {
  if (!raw) return LOCALE_SELECTOR_DEFAULTS;

  return {
    triggerVariant:
      cleanTriggerVariant(raw.triggerVariant) ??
      LOCALE_SELECTOR_DEFAULTS.triggerVariant,
    showChevron: raw.showChevron ?? LOCALE_SELECTOR_DEFAULTS.showChevron,
    displayMode: resolveDisplayMode(raw),
    sidebarConfig: raw.sidebarConfig ?? null,
    modalConfig: raw.modalConfig ?? null,
  };
}
