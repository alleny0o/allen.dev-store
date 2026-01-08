// mega-menu/config/layout-presets.ts

/**
 * Section preset configuration
 * Maps preset values to their grid system and column span classes
 */
export const SECTION_PRESETS = {
  '2-sections': {
    gridCols: 'grid-cols-2',
    spanClasses: ['col-span-1', 'col-span-1'],
  },
  '3-sections': {
    gridCols: 'grid-cols-3',
    spanClasses: ['col-span-1', 'col-span-1', 'col-span-1'],
  },
  '4-sections': {
    gridCols: 'grid-cols-4',
    spanClasses: ['col-span-1', 'col-span-1', 'col-span-1', 'col-span-1'],
  },
  '5-sections': {
    gridCols: 'grid-cols-5',
    spanClasses: ['col-span-1', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1'],
  },
  '6-narrow': {
    gridCols: 'grid-cols-6',
    spanClasses: ['col-span-1', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1'],
  },
  'links-featured': {
    gridCols: 'grid-cols-12',
    spanClasses: ['col-span-1', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-4', 'col-span-4'],
  },
  'featured-links': {
    gridCols: 'grid-cols-12',
    spanClasses: ['col-span-4', 'col-span-4', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1'],
  },
  'hero-three-small': {
    gridCols: 'grid-cols-12',
    spanClasses: ['col-span-6', 'col-span-2', 'col-span-2', 'col-span-2'],
  },
  'three-small-hero': {
    gridCols: 'grid-cols-12',
    spanClasses: ['col-span-2', 'col-span-2', 'col-span-2', 'col-span-6'],
  },
} as const;

/**
 * Grid layout configuration
 * Maps grid layout values to their column span classes in a 12-column grid
 */
export const GRID_LAYOUTS = {
  '6-columns': 'col-span-2',
  '4-columns': 'col-span-3',
  '3-columns': 'col-span-4',
  '2-columns': 'col-span-6',
} as const;

export type SectionPreset = keyof typeof SECTION_PRESETS;
export type GridLayout = keyof typeof GRID_LAYOUTS;