/**
 * Aspect Ratio Mapping
 */
export const ASPECT_RATIOS = {
  '1:1': '1/1',
  '3:4': '3/4',
  '4:5': '4/5',
  '16:9': '16/9',
  '21:9': '21/9',
} as const;

/**
 * Border Radius Mapping
 */
export const BORDER_RADIUS = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
} as const;

/**
 * CTA Border Radius Mapping (includes additional options)
 */
export const CTA_BORDER_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * Overlay Text Color Mapping
 */
export const OVERLAY_TEXT_COLORS = {
  white: 'text-white',
  'card-foreground': 'text-card-foreground',
  'primary-foreground': 'text-primary-foreground',
  foreground: 'text-foreground',
} as const;

/**
 * CTA Color Scheme Mapping
 * Returns CSS variable strings for background, text, and border colors
 */
export const CTA_COLOR_SCHEMES = {
  primary: {
    bg: 'rgb(var(--primary))',
    text: 'rgb(var(--primary-foreground))',
    border: 'rgb(var(--primary))',
  },
  secondary: {
    bg: 'rgb(var(--secondary))',
    text: 'rgb(var(--secondary-foreground))',
    border: 'rgb(var(--secondary))',
  },
  accent: {
    bg: 'rgb(var(--accent))',
    text: 'rgb(var(--accent-foreground))',
    border: 'rgb(var(--accent))',
  },
  foreground: {
    bg: 'rgb(var(--foreground))',
    text: 'rgb(var(--background))',
    border: 'rgb(var(--foreground))',
  },
} as const;

export type AspectRatio = keyof typeof ASPECT_RATIOS;
export type BorderRadius = keyof typeof BORDER_RADIUS;
export type CTABorderRadius = keyof typeof CTA_BORDER_RADIUS;
export type OverlayTextColor = keyof typeof OVERLAY_TEXT_COLORS;
export type CTAColorScheme = keyof typeof CTA_COLOR_SCHEMES;
