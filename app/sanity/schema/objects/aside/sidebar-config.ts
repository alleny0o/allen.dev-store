// sidebar-config.ts
import {defineField} from 'sanity';

/**
 * SIDEBAR CONFIG
 * Configuration for side drawer panels (cart, mobile nav, filters, etc)
 */
export default defineField({
  name: 'sidebarConfig',
  title: 'Sidebar Configuration',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Sidebar width',
      type: 'rangeSlider',
      options: {min: 300, max: 800, suffix: 'px'},
      initialValue: 400,
      description: 'Fixed width of the sidebar',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max width',
      type: 'rangeSlider',
      options: {min: 60, max: 100, suffix: '%'},
      initialValue: 100,
      description: 'Maximum width as percentage of viewport (100% = no limit)',
    }),
    defineField({
      name: 'fullWidthBelow',
      title: 'Full width below breakpoint',
      type: 'string',
      options: {
        list: [
          {title: 'Never', value: 'never'},
          {title: 'Below sm (640px)', value: 'sm'},
          {title: 'Below md (768px)', value: 'md'},
          {title: 'Below lg (1024px)', value: 'lg'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'md',
      description: 'Make sidebar full width on smaller screens',
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'string',
      options: {
        list: [
          {title: 'None (Instant)', value: 'none'},
          {title: 'Slide', value: 'slide'},
          {title: 'Slide + Fade', value: 'slideFade'},
        ],
        layout: 'radio',
      },
      initialValue: 'slide',
    }),
    defineField({
      name: 'animationDuration',
      title: 'Animation duration',
      type: 'rangeSlider',
      options: {min: 200, max: 800, suffix: 'ms', step: 50},
      initialValue: 500,
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay opacity',
      type: 'rangeSlider',
      options: {min: 0, max: 100, suffix: '%'},
      initialValue: 50,
    }),
  ],
});
