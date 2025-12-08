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
 * Generates CSS custom properties for typography overrides
 * Similar pattern to useColorsCssVars - generates CSS string for injection
 *
 * @param selector - CSS selector to target (e.g., '#announcement-bar', '.navigation')
 * @param override - The fontStyleOverride object from Sanity
 * @returns CSS string to be injected via <style> tag
 *
 * @example
 * const typographyCss = useTypographyCssVars({
 *   selector: '#announcement-bar',
 *   override: header?.announcementBarTypography
 * });
 * return <style dangerouslySetInnerHTML={{__html: typographyCss}} />
 */
export function useTypographyCssVars(props: {
  selector: string;
  override?: FontStyleOverride | null;
}) {
  const {selector, override} = props;

  // Default to 'body' if no role specified
  const role = override?.role || 'body';

  // Build override properties
  const overrides: string[] = [];
  
  if (override?.enabled) {
    if (override.fontSize !== undefined && override.fontSize !== null) {
      overrides.push(`--t-font-size: ${override.fontSize};`);
    }

    if (override.fontWeight !== undefined && override.fontWeight !== null) {
      overrides.push(`--t-font-weight: ${override.fontWeight};`);
    }

    if (override.fontStyle) {
      overrides.push(`--t-font-style: ${override.fontStyle};`);
    }

    if (override.letterSpacing !== undefined && override.letterSpacing !== null) {
      overrides.push(`--t-letter-spacing: ${override.letterSpacing};`);
    }

    if (override.lineHeight !== undefined && override.lineHeight !== null) {
      overrides.push(`--t-line-height: ${override.lineHeight};`);
    }

    if (override.capitalize !== undefined && override.capitalize !== null) {
      overrides.push(`--t-text-transform: ${override.capitalize ? 'uppercase' : 'none'};`);
    }
  }

  // Build final CSS string
  return `
    ${selector} {
      --t-font-family: var(--${role}-font-family);
      --t-font-type: var(--${role}-font-type);
      --t-font-size: var(--${role}-base-size);
      --t-line-height: var(--${role}-line-height);
      --t-letter-spacing: var(--${role}-letter-spacing);
      --t-font-weight: var(--${role}-font-weight);
      --t-font-style: var(--${role}-font-style);
      --t-text-transform: var(--${role}-capitalize);
      ${overrides.length > 0 ? '\n      /* Overrides */\n      ' + overrides.join('\n      ') : ''}
    }
  `;
}