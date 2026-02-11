import {cn} from '~/lib/utils';
import type {
  AsideConfig,
  SidebarConfig,
  ModalConfig,
  BorderRadius,
  FullWidthBelow,
  FullScreenBelow,
} from '../types';

// ============================================================================
// SIDEBAR
// ============================================================================

function getSidebarFullWidthBreakpoint(
  fullWidthBelow: FullWidthBelow,
): string | null {
  if (fullWidthBelow === 'never') return null;
  return fullWidthBelow;
}

/**
 * Structural and positional classes for the sidebar panel.
 * No animation, no visual styling — just layout.
 */
export function getSidebarClasses(config: SidebarConfig): string {
  const {position, fullWidthBelow} = config;
  const isLeft = position === 'left';
  const breakpoint = getSidebarFullWidthBreakpoint(fullWidthBelow);

  return cn(
    'fixed top-0 z-70 flex h-full flex-col',
    isLeft ? 'left-0' : 'right-0',
    'w-full max-w-[var(--aside-width)]',
    breakpoint && `${breakpoint}:max-w-full`,
  );
}

// ============================================================================
// MODAL
// ============================================================================

function getBorderRadiusClass(radius: BorderRadius): string {
  const map: Record<BorderRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };
  return map[radius];
}

function getModalFullScreenBreakpoint(
  fullScreenBelow: FullScreenBelow,
): string | null {
  if (fullScreenBelow === 'never') return null;
  return fullScreenBelow;
}

/**
 * Structural and positional classes for the modal panel.
 * No animation, no visual styling — just layout.
 */
export function getModalClasses(config: ModalConfig): string {
  const {borderRadius, borderRadiusOnFullScreen, fullScreenBelow} = config;
  const breakpoint = getModalFullScreenBreakpoint(fullScreenBelow);
  const radiusClass = getBorderRadiusClass(borderRadius);

  const fullscreenRadiusClass =
    breakpoint && borderRadiusOnFullScreen === 'none'
      ? `${breakpoint}:rounded-none`
      : null;

  return cn(
    'fixed z-70 flex flex-col',
    'top-[var(--aside-inset-y)] bottom-[var(--aside-inset-y)]',
    'right-[var(--aside-inset-x)] left-[var(--aside-inset-x)]',
    'max-h-[var(--aside-max-height)] max-w-[var(--aside-max-width)]',
    'mx-auto my-auto',
    radiusClass,
    fullscreenRadiusClass,
    breakpoint && [
      `${breakpoint}:top-0`,
      `${breakpoint}:bottom-0`,
      `${breakpoint}:left-0`,
      `${breakpoint}:right-0`,
      `${breakpoint}:max-w-full`,
      `${breakpoint}:max-h-full`,
    ],
  );
}

// ============================================================================
// DISPATCH
// ============================================================================

export function getAsideClasses(config: AsideConfig): string {
  if (config.type === 'sidebar') {
    return getSidebarClasses(config);
  }
  return getModalClasses(config);
}
