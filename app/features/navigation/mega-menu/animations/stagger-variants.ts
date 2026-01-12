import type {Variants} from 'motion/react';

/**
 * Content stagger animations for mega menu items
 * Premium, subtle animations inspired by Apple, Nike, ASOS
 */

export const staggerItemVariants: Record<string, Variants> = {
  none: {
    hidden: {},
    visible: {},
  },

  fade: {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  },

  lift: {
    hidden: {opacity: 0, y: 8},
    visible: {opacity: 1, y: 0},
  },

  scale: {
    hidden: {opacity: 0, scale: 0.96},
    visible: {opacity: 1, scale: 1},
  },

  blur: {
    hidden: {opacity: 0, filter: 'blur(4px)'},
    visible: {opacity: 1, filter: 'blur(0px)'},
  },
};

/**
 * Get the appropriate stagger variant based on animation type
 */
export function getStaggerVariant(animationType: string): Variants {
  return staggerItemVariants[animationType] || staggerItemVariants.none;
}