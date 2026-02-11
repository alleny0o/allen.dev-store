import type {FooterDataType, SectionDataType} from 'types';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

import {darken, mix, readableColor, toRgba} from 'color2k';

import {useRootLoaderData} from '~/root';

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
export type CmsSectionSettings = SectionDataType['settings'];
export type FooterSettings = FooterDataType['settings'];
export type HeaderQuery = NonNullable<ROOT_QUERYResult['header']>;
export type CartColorScheme = {
  colorScheme?: NonNullable<ROOT_QUERYResult['settings']>['cartColorScheme'];
};

/** Exported union of all valid settings shapes for useColorsCssVars */
export type ColorsCssVarsSettings =
  | CartColorScheme
  | CmsSectionSettings
  | FooterSettings
  | HeaderQuery;

type Rgb =
  | null
  | undefined
  | {
      b?: number;
      g?: number;
      r?: number;
    };

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HOOKS
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Generates CSS custom properties (variables) for component styling
 * Used for: Header, Footer, CMS Sections, Cart, Aside
 *
 * @param selector - CSS selector to target (e.g., '#header', '.section')
 * @param settings - Settings object containing colorScheme, padding, separator, etc.
 * @returns CSS string to be injected via <style> tag
 *
 * @example
 * const cssVars = useColorsCssVars({
 *   selector: '#header',
 *   settings: header
 * });
 * return <style dangerouslySetInnerHTML={{__html: cssVars}} />
 */
export function useColorsCssVars(props: {
  selector?: string;
  settings?: ColorsCssVarsSettings;
}) {
  const {settings} = props;
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const defaultColorScheme = data?.defaultColorScheme;
  const fallbackScheme = useFallbackColorScheme();
  const selector = props.selector || ':root';

  // Extract values from settings
  const colorScheme =
    settings?.colorScheme || defaultColorScheme || fallbackScheme;
  const padding = getPaddingVars(settings);
  const separator = getSeparatorVars(settings);

  return `
    ${selector} {
      /* ─────────────────────────────────────────
         Color Variables
         ───────────────────────────────────────── */
      --accent: ${getMutedColor(colorScheme.primary?.rgb, colorScheme.background?.rgb, 0.85)};
      --accent-foreground: ${toRgbString(colorScheme.primary?.rgb)};
      --background: ${toRgbString(colorScheme.background?.rgb)};
      --border: ${toRgbString(colorScheme.border?.rgb)};
      --card: ${toRgbString(colorScheme.card?.rgb)};
      --card-foreground: ${toRgbString(colorScheme.cardForeground?.rgb)};
      --foreground: ${toRgbString(colorScheme.foreground?.rgb)};
      --input: ${toRgbString(colorScheme.border?.rgb)};
      --muted: ${getMutedColor(colorScheme.foreground?.rgb, colorScheme.background?.rgb, 0.95)};
      --muted-foreground: ${getMutedColor(colorScheme.foreground?.rgb, colorScheme.background?.rgb, 0.3)};
      --popover: ${toRgbString(colorScheme.background?.rgb)};
      --popover-foreground: ${toRgbString(colorScheme.foreground?.rgb)};
      --primary: ${toRgbString(colorScheme.primary?.rgb)};
      --primary-foreground: ${toRgbString(colorScheme.primaryForeground?.rgb)};
      --ring: ${getMutedColor(colorScheme.primary?.rgb, colorScheme.background?.rgb, 0.2)};
      --secondary: ${getMutedColor(colorScheme.primary?.rgb, colorScheme.background?.rgb, 0.85)};
      --secondary-foreground: ${toRgbString(colorScheme.primary?.rgb)};
      --destructive: 220 38 38;
      --destructive-foreground: 250 250 250;
      --shadow: ${getDarkenColor(colorScheme.background?.rgb)};

      /* ─────────────────────────────────────────
         Spacing Variables
         ───────────────────────────────────────── */
      --paddingTop: ${padding.top};
      --paddingBottom: ${padding.bottom};

      /* ─────────────────────────────────────────
         Separator Variables
         ───────────────────────────────────────── */
      --separator-opacity: ${separator.opacity};
      --separator-height: ${separator.height};
    }
  `;
}

/**
 * Generates CSS custom properties for card-based components
 * Inverts primary colors when primary matches card color for proper contrast
 * Used for: Product cards, collection cards, etc.
 *
 * @param selector - CSS selector to target
 * @param settings - Settings object containing colorScheme
 * @returns CSS string to be injected via <style> tag
 */
export function useCardColorsCssVars(props: {
  selector: string;
  settings?: CartColorScheme | CmsSectionSettings;
}) {
  const {settings} = props;
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const defaultColorScheme = data?.defaultColorScheme;
  const fallbackScheme = useFallbackColorScheme();

  const colorScheme =
    settings?.colorScheme || defaultColorScheme || fallbackScheme;
  let primary = colorScheme.primary;
  let primaryForeground = colorScheme.primaryForeground;

  if (
    toRgbString(colorScheme.primary?.rgb) === toRgbString(colorScheme.card?.rgb)
  ) {
    primary = colorScheme.cardForeground;
    primaryForeground = colorScheme.card;
  }

  return `
    ${props.selector} {
      --accent: ${getMutedColor(primary?.rgb, colorScheme.card?.rgb, 0.85)};
      --accent-foreground: ${toRgbString(primary?.rgb)};
      --background: ${toRgbString(colorScheme.card?.rgb)};
      --border: ${getMutedColor(colorScheme.border?.rgb, colorScheme.card?.rgb, 0.45)};
      --card: ${toRgbString(colorScheme.card?.rgb)};
      --card-foreground: ${toRgbString(colorScheme.cardForeground?.rgb)};
      --foreground: ${toRgbString(colorScheme.cardForeground?.rgb)};
      --input: ${getMutedColor(colorScheme.border?.rgb, colorScheme.card?.rgb, 0.45)};
      --muted: ${getMutedColor(colorScheme.cardForeground?.rgb, colorScheme.card?.rgb, 0.95)};
      --muted-foreground: ${getMutedColor(colorScheme.cardForeground?.rgb, colorScheme.card?.rgb, 0.3)};
      --popover: ${toRgbString(colorScheme.card?.rgb)};
      --popover-foreground: ${toRgbString(colorScheme.cardForeground?.rgb)};
      --primary: ${toRgbString(primary?.rgb)};
      --primary-foreground: ${toRgbString(primaryForeground?.rgb)};
      --ring: ${getMutedColor(primary?.rgb, colorScheme.card?.rgb, 0.2)};
      --secondary: ${getMutedColor(primary?.rgb, colorScheme.card?.rgb, 0.85)};
      --secondary-foreground: ${toRgbString(primary?.rgb)};
      --shadow: ${getDarkenColor(colorScheme.card?.rgb)};
    }
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS - VALUE EXTRACTION
// ─────────────────────────────────────────────────────────────────────────────
function getPaddingVars(settings?: ColorsCssVarsSettings) {
  const top =
    settings && 'padding' in settings && settings.padding
      ? `${settings.padding.top}px`
      : '0px';
  const bottom =
    settings && 'padding' in settings && settings.padding
      ? `${settings.padding.bottom}px`
      : '0px';

  return {top, bottom};
}

function getSeparatorVars(settings?: ColorsCssVarsSettings) {
  if (!settings) return {opacity: 10, height: '1px'};

  if ('separatorLine' in settings && settings.separatorLine) {
    return {
      opacity: settings.separatorLine.opacity ?? 10,
      height: `${settings.separatorLine.height ?? 1}px`,
    };
  }

  return {opacity: 10, height: '1px'};
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS - COLOR MANIPULATION
// ─────────────────────────────────────────────────────────────────────────────
function toRgbString(rgb?: Rgb) {
  if (!rgb) return 'null';
  return `${rgb.r} ${rgb.g} ${rgb.b}` as const;
}

function getMutedColor(color: Rgb, background: Rgb, weight: number) {
  if (!color || !background) return 'null';

  const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const bgString = `rgb(${background.r}, ${background.g}, ${background.b})`;
  const isDark = readableColor(colorString) === '#fff';

  if (isDark) {
    weight = weight - 0.05;
  }

  const mixedColor = mix(colorString, bgString, weight);

  return mixedColor
    .replace('rgba(', '')
    .replace(', 1)', '')
    .replaceAll(',', '');
}

function getDarkenColor(color: Rgb) {
  if (!color) return 'null';

  const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const darkenColor = toRgba(darken(colorString, 1));

  return darkenColor
    .replace('rgba(', '')
    .replace(', 1)', '')
    .replaceAll(',', '');
}

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK COLOR SCHEME
// ─────────────────────────────────────────────────────────────────────────────
export const useFallbackColorScheme = () => ({
  background: {hex: '#FBFDFC', rgb: {r: 251, g: 253, b: 252}},
  foreground: {hex: '#1A211EC', rgb: {r: 26, g: 33, b: 30}},
  border: {hex: '#D7DAD9', rgb: {r: 215, g: 218, b: 217}},
  card: {hex: '#FBFDFC', rgb: {r: 251, g: 253, b: 252}},
  cardForeground: {hex: '#1A211EC', rgb: {r: 26, g: 33, b: 30}},
  primary: {hex: '#1A211EC', rgb: {r: 26, g: 33, b: 30}},
  primaryForeground: {hex: '#FBFDFC', rgb: {r: 251, g: 253, b: 252}},
});
