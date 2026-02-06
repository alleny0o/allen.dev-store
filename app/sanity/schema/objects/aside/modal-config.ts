// modal-config.ts
import {defineField} from 'sanity';

/**
 * MODAL CONFIG
 * Configuration for centered modal overlays (country selector, dialogs, etc)
 */
export default defineField({
  name: 'modalConfig',
  title: 'Modal Configuration',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'insetX',
      title: 'Horizontal inset (left/right spacing)',
      type: 'rangeSlider',
      options: {min: 0, max: 200, suffix: 'px'},
      initialValue: 20,
      description: 'Padding from left and right edges (0 = full width)',
    }),
    defineField({
      name: 'insetY',
      title: 'Vertical inset (top/bottom spacing)',
      type: 'rangeSlider',
      options: {min: 0, max: 200, suffix: 'px'},
      initialValue: 20,
      description: 'Padding from top and bottom edges (0 = full height)',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max width',
      type: 'rangeSlider',
      options: {min: 20, max: 100, suffix: '%'},
      initialValue: 100,
      description: 'Maximum width as percentage of viewport (100% = no limit)',
    }),
    defineField({
      name: 'maxHeight',
      title: 'Max height',
      type: 'rangeSlider',
      options: {min: 20, max: 100, suffix: '%'},
      initialValue: 100,
      description: 'Maximum height as percentage of viewport (100% = no limit)',
    }),
    defineField({
      name: 'fullScreenBelow',
      title: 'Full screen below breakpoint',
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
      initialValue: 'sm',
      description: 'Set insetX and insetY to 0 (fullscreen) on smaller devices',
    }),
    defineField({
      name: 'borderRadiusOnFullScreen',
      title: 'Border radius when fullscreen',
      type: 'string',
      options: {
        list: [
          {title: 'Keep border radius', value: 'keep'},
          {title: 'Remove (sharp corners)', value: 'none'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Border radius behavior when modal goes fullscreen',
      hidden: ({parent}) => parent?.fullScreenBelow === 'never',
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border radius',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'lg',
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'string',
      options: {
        list: [
          {title: 'None (Instant)', value: 'none'},
          {title: 'Fade', value: 'fade'},
          {title: 'Scale (Zoom)', value: 'scale'},
          {title: 'Slide from top', value: 'slideTop'},
          {title: 'Slide from bottom', value: 'slideBottom'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'scale',
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
