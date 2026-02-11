import type {Variants, Transition} from 'motion/react';
import type {AsideConfig, SidebarConfig, ModalConfig} from '../types';

// ============================================================================
// TRANSITIONS
// Enter and exit use different curves and durations for a premium feel.
// Enter: [0.25, 0.46, 0.45, 0.94] — smooth easeOut, balanced and natural
// Exit:  Instant — gets out of the way immediately
// ============================================================================

const ENTER_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EXIT_TRANSITION: Transition = {duration: 0};

function getEnterTransition(animationDuration: number): Transition {
  return {
    duration: animationDuration / 1000,
    ease: ENTER_EASE,
  };
}

// ============================================================================
// SIDEBAR VARIANTS
// Sidebar animates via translateX (slide) with optional opacity (slideFade).
// ============================================================================

/**
 * Returns motion variants for the sidebar panel.
 *
 * - 'none'      → instant, no animation
 * - 'slide'     → slides in from left or right edge
 * - 'slideFade' → slides in and fades in simultaneously
 */
export function getSidebarVariants(config: SidebarConfig): Variants {
  const {position, animation, animationDuration} = config;
  const isLeft = position === 'left';
  const enter = getEnterTransition(animationDuration);
  const hiddenX = isLeft ? '-100%' : '100%';

  if (animation === 'none') {
    return {
      open: {x: 0, opacity: 1, transition: {duration: 0}},
      closed: {x: hiddenX, opacity: 1, transition: {duration: 0}},
    };
  }

  if (animation === 'slide') {
    return {
      open: {x: 0, opacity: 1, transition: enter},
      closed: {x: hiddenX, opacity: 1, transition: EXIT_TRANSITION},
    };
  }

  // slideFade
  return {
    open: {x: 0, opacity: 1, transition: enter},
    closed: {x: hiddenX, opacity: 0, transition: EXIT_TRANSITION},
  };
}

// ============================================================================
// MODAL VARIANTS
// Modal animates from center — fade, scale, or slide from top/bottom.
// ============================================================================

/**
 * Returns motion variants for the modal panel.
 *
 * - 'none'        → instant, no animation
 * - 'fade'        → opacity only
 * - 'scale'       → fades in while scaling up from 95%
 * - 'slideTop'    → fades in while sliding down from above
 * - 'slideBottom' → fades in while sliding up from below
 */
export function getModalVariants(config: ModalConfig): Variants {
  const {animation, animationDuration} = config;
  const enter = getEnterTransition(animationDuration);
  
  if (animation === 'none') {
    return {
      open: {opacity: 1, transition: {duration: 0}},
      closed: {opacity: 0, transition: {duration: 0}},
    };
  }

  if (animation === 'fade') {
    return {
      open: {opacity: 1, transition: enter},
      closed: {opacity: 0, transition: EXIT_TRANSITION},
    };
  }

  if (animation === 'scale') {
    return {
      open: {opacity: 1, scale: 1, transition: enter},
      closed: {opacity: 0, scale: 0.95, transition: EXIT_TRANSITION},
    };
  }

  if (animation === 'slideTop') {
    return {
      open: {opacity: 1, y: 0, transition: enter},
      closed: {opacity: 0, y: '-1rem', transition: EXIT_TRANSITION},
    };
  }

  // slideBottom
  return {
    open: {opacity: 1, y: 0, transition: enter},
    closed: {opacity: 0, y: '1rem', transition: EXIT_TRANSITION},
  };
}

// ============================================================================
// BACKDROP VARIANTS
// Backdrop always fades in/out regardless of aside type.
// Exit matches the panel exit duration for a synchronized feel.
// ============================================================================

/**
 * Returns motion variants for the backdrop overlay.
 * Duration is tied to the aside animation duration.
 */
export function getBackdropVariants(animationDuration: number): Variants {
  const enter = getEnterTransition(animationDuration);
  
  return {
    open: {opacity: 1, transition: enter},
    closed: {opacity: 0, transition: EXIT_TRANSITION},
  };
}

// ============================================================================
// DISPATCH
// ============================================================================

/**
 * Returns the correct variants based on config type.
 */
export function getAsideVariants(config: AsideConfig): Variants {
  if (config.type === 'sidebar') {
    return getSidebarVariants(config);
  }
  return getModalVariants(config);
}