import type {CSSProperties} from 'react';
import type {AsideConfig, SidebarConfig, ModalConfig} from '../types';

// ============================================================================
// SIDEBAR CSS VARS
// ============================================================================

/**
 * Returns CSS custom properties for sidebar config.
 * These are dynamic values from Sanity that can't be expressed
 * as static Tailwind classes.
 *
 * --aside-width        → fixed width of the sidebar
 * --aside-max-width    → max width as % of viewport
 * --aside-duration     → animation duration in ms
 */
export function getSidebarCssVars(config: SidebarConfig): CSSProperties {
  return {
    '--aside-width': `${config.width}px`,
    '--aside-max-width': `${config.maxWidth}%`,
    '--aside-duration': `${config.animationDuration}ms`,
  } as CSSProperties;
}

// ============================================================================
// MODAL CSS VARS
// ============================================================================

/**
 * Returns CSS custom properties for modal config.
 * These are dynamic values from Sanity that can't be expressed
 * as static Tailwind classes.
 *
 * --aside-inset-x      → horizontal spacing from viewport edges
 * --aside-inset-y      → vertical spacing from viewport edges
 * --aside-max-width    → max width as % of viewport
 * --aside-max-height   → max height as % of viewport
 * --aside-duration     → animation duration in ms
 */
export function getModalCssVars(config: ModalConfig): CSSProperties {
  return {
    '--aside-inset-x': `${config.insetX}px`,
    '--aside-inset-y': `${config.insetY}px`,
    '--aside-max-width': `${config.maxWidth}%`,
    '--aside-max-height': `${config.maxHeight}%`,
    '--aside-duration': `${config.animationDuration}ms`,
  } as CSSProperties;
}

// ============================================================================
// DISPATCH
// ============================================================================

/**
 * Returns the correct CSS vars object based on config type.
 * Apply these as inline styles on the aside element.
 *
 * @example
 * <aside style={getAsideCssVars(config)}>
 */
export function getAsideCssVars(config: AsideConfig): CSSProperties {
  if (config.type === 'sidebar') {
    return getSidebarCssVars(config);
  }
  return getModalCssVars(config);
}
