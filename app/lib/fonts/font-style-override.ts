/**
 * Font Style Override Type
 * Matches the Sanity fontStyleOverride schema structure
 */
type FontStyleOverride = {
  role?: 'heading' | 'body' | 'extra1' | 'extra2' | 'extra3' | null;
  enabled?: boolean | null;
  fontWeight?: number | null;
  fontSize?: number | null;
  fontStyle?: 'normal' | 'italic' | null;
  letterSpacing?: number | null;
  lineHeight?: number | null;
  capitalize?: boolean | null;
};

/**
 * Resolves fontStyleOverride into CSS custom properties
 *
 * Converts a Sanity fontStyleOverride object into --t-* CSS variables
 * that can be applied to components. Defaults to 'body' typography if no role specified.
 *
 * @param override - The fontStyleOverride object from Sanity
 * @returns Object with CSS custom properties ready for inline styles
 *
 * @example
 * // Basic usage
 * const style = resolveFontStyleOverride(header?.navigationTypography);
 * <div style={style}>Navigation</div>
 *
 * @example
 * // Returns body typography when override is null/undefined
 * const style = resolveFontStyleOverride(undefined);
 * // Returns: { '--t-font-family': 'var(--body-font-family)', ... }
 *
 * @example
 * // Returns selected role with overrides applied
 * const style = resolveFontStyleOverride({
 *   role: 'extra1',
 *   enabled: true,
 *   fontSize: 14,
 *   fontWeight: 600
 * });
 * // Returns: { '--t-font-family': 'var(--extra1-font-family)', '--t-font-size': '14', '--t-font-weight': '600', ... }
 */
export function resolveFontStyleOverride(
  override?: FontStyleOverride | null,
): React.CSSProperties | undefined {
  // Default to 'body' if no role specified
  const role = override?.role || 'body';

  // Base: inherit from global role
  const resolved: Record<string, string> = {
    '--t-font-family': `var(--${role}-font-family)`,
    '--t-font-type': `var(--${role}-font-type)`,
    '--t-font-size': `var(--${role}-base-size)`,
    '--t-line-height': `var(--${role}-line-height)`,
    '--t-letter-spacing': `var(--${role}-letter-spacing)`,
    '--t-font-weight': `var(--${role}-font-weight)`,
    '--t-font-style': `var(--${role}-font-style)`,
    '--t-text-transform': `var(--${role}-capitalize)`,
  };

  // Apply overrides only if enabled
  if (override?.enabled) {
    if (override.fontSize !== undefined && override.fontSize !== null) {
      resolved['--t-font-size'] = `${override.fontSize}`;
    }

    if (override.fontWeight !== undefined && override.fontWeight !== null) {
      resolved['--t-font-weight'] = `${override.fontWeight}`;
    }

    if (override.fontStyle) {
      resolved['--t-font-style'] = override.fontStyle;
    }

    if (
      override.letterSpacing !== undefined &&
      override.letterSpacing !== null
    ) {
      resolved['--t-letter-spacing'] = `${override.letterSpacing}`;
    }

    if (override.lineHeight !== undefined && override.lineHeight !== null) {
      resolved['--t-line-height'] = `${override.lineHeight}`;
    }

    if (override.capitalize !== undefined && override.capitalize !== null) {
      resolved['--t-text-transform'] = override.capitalize
        ? 'uppercase'
        : 'none';
    }
  }

  return resolved as React.CSSProperties;
}

/**
 * Merges typography styles with other inline styles
 *
 * Useful when you need to combine typography overrides with additional CSS properties.
 *
 * @param override - The fontStyleOverride object from Sanity
 * @param additionalStyles - Additional CSS properties to merge
 * @returns Combined style object
 *
 * @example
 * const style = mergeWithTypography(
 *   header?.navigationTypography,
 *   { color: 'red', padding: '10px' }
 * );
 * <div style={style}>Styled Navigation</div>
 */
export function mergeWithTypography(
  override?: FontStyleOverride | null,
  additionalStyles?: React.CSSProperties,
): React.CSSProperties | undefined {
  const typographyStyle = resolveFontStyleOverride(override);

  if (!typographyStyle && !additionalStyles) {
    return undefined;
  }

  return {
    ...typographyStyle,
    ...additionalStyles,
  };
}
