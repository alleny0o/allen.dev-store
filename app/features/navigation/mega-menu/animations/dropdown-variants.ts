import type {Variants} from 'motion/react';

/**
 * Mega menu dropdown entrance animations
 * These animate the entire mega menu container
 */

export const dropdownVariants: Record<string, Variants> = {
  none: {
    hidden: {},
    visible: {},
  },

  fade: {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  },

  slideDown: {
    hidden: {height: 0, overflow: 'hidden'},
    visible: {height: 'auto', overflow: 'hidden'},
  },

  slideFade: {
    hidden: {opacity: 0, height: 0, overflow: 'hidden'},
    visible: {opacity: 1, height: 'auto', overflow: 'hidden'},
  },
};

/**
 * Get the appropriate variant based on animation type
 */
export function getDropdownVariant(animationType: string): Variants {
  return dropdownVariants[animationType] || dropdownVariants.slideFade;
}