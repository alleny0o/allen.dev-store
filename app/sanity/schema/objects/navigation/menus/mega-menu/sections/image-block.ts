import {defineField} from 'sanity';
import {Image} from 'lucide-react';

export default defineField({
  type: 'object',
  name: 'imageBlock',
  title: 'Image Block',
  icon: Image,
  fields: [
    // ============================================================================
    // IMAGE SETTINGS
    // ============================================================================
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'Choose the shape/proportion of the image',
      options: {
        list: [
          {title: '1:1 — Square', value: '1:1'},
          {title: '3:4 — Portrait', value: '3:4'},
          {title: '4:5 — Tall Portrait', value: '4:5'},
          {title: '16:9 — Landscape', value: '16:9'},
          {title: '21:9 — Ultra-wide', value: '21:9'},
        ],
        layout: 'dropdown',
      },
      initialValue: '1:1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'string',
      description: 'Roundedness of the image corners',
      options: {
        list: [
          {title: 'None — Sharp corners', value: 'none'},
          {title: 'Medium — Slightly rounded', value: 'md'},
          {title: 'Large — Rounded', value: 'lg'},
          {title: 'Extra Large — Very rounded', value: 'xl'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),

    // ============================================================================
    // CONTENT SETTINGS
    // ============================================================================
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contentLayout',
      title: 'Content Layout',
      type: 'string',
      description: 'Where should the text appear?',
      options: {
        list: [
          {title: 'Overlay — Text over image', value: 'overlay'},
          {title: 'Below — Text under image', value: 'below'},
        ],
        layout: 'radio',
      },
      initialValue: 'overlay',
      validation: (Rule) => Rule.required(),
    }),

    // ============================================================================
    // OVERLAY SETTINGS (only visible when contentLayout = 'overlay')
    // ============================================================================
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'rangeSlider',
      description: 'How dark the gradient overlay should be',
      options: {min: 0, max: 100, suffix: '%'},
      initialValue: 60,
      hidden: ({parent}) => parent?.contentLayout !== 'overlay',
    }),
    defineField({
      name: 'overlayTextColor',
      title: 'Overlay Text Color',
      type: 'string',
      description: 'Text color when overlaid on image',
      options: {
        list: [
          {title: 'White (Recommended)', value: 'white'},
          {title: 'Card Foreground', value: 'card-foreground'},
          {title: 'Primary Foreground', value: 'primary-foreground'},
          {title: 'Foreground', value: 'foreground'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'white',
      hidden: ({parent}) => parent?.contentLayout !== 'overlay',
    }),

    // ============================================================================
    // LINK SETTINGS
    // ============================================================================
    defineField({
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkText',
      type: 'string',
      description: 'e.g. "Shop Now"',
    }),
    defineField({
      name: 'linkStyle',
      title: 'Link Style',
      type: 'string',
      description: 'How the link should appear',
      options: {
        list: [
          {title: 'Text Only — Plain text, no background', value: 'text'},
          {title: 'Button Filled — Solid background', value: 'filled'},
          {title: 'Button Outlined — Border, transparent background', value: 'outlined'},
          {title: 'Button Ghost — Subtle background', value: 'ghost'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required(),
    }),

    // ============================================================================
    // CTA BUTTON STYLING (only visible when linkStyle !== 'text')
    // ============================================================================
    defineField({
      name: 'ctaColorScheme',
      title: 'Button Color Scheme',
      type: 'string',
      description: 'Color scheme for button',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Accent', value: 'accent'},
          {title: 'Foreground', value: 'foreground'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'primary',
      hidden: ({parent}) => parent?.linkStyle === 'text',
    }),
    defineField({
      name: 'ctaPaddingX',
      title: 'Button Horizontal Padding',
      type: 'rangeSlider',
      description: 'Horizontal padding inside button',
      options: {min: 0, max: 40, suffix: 'px'},
      initialValue: 16,
      hidden: ({parent}) => parent?.linkStyle === 'text',
    }),
    defineField({
      name: 'ctaPaddingY',
      title: 'Button Vertical Padding',
      type: 'rangeSlider',
      description: 'Vertical padding inside button',
      options: {min: 0, max: 20, suffix: 'px'},
      initialValue: 8,
      hidden: ({parent}) => parent?.linkStyle === 'text',
    }),
    defineField({
      name: 'ctaBorderRadius',
      title: 'Button Border Radius',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
          {title: 'Full (Pill)', value: 'full'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'md',
      hidden: ({parent}) => parent?.linkStyle === 'text',
    }),
    defineField({
      name: 'ctaHoverEffect',
      title: 'Button Hover Effect',
      type: 'string',
      description: 'Animation when hovering over the button',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Darken', value: 'darken'},
          {title: 'Lift', value: 'lift'},
          {title: 'Scale', value: 'scale'},
          {title: 'Underline', value: 'underline'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'darken',
      hidden: ({parent}) => parent?.linkStyle === 'text',
    }),

    // ============================================================================
    // IMAGE INTERACTION SETTINGS
    // ============================================================================
    defineField({
      name: 'hoverEffect',
      title: 'Image Hover Effect',
      type: 'string',
      description: 'Animation when hovering over the image',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Scale — Zoom in', value: 'scale'},
          {title: 'Fade — Reduce opacity', value: 'fade'},
          {title: 'Lift — Raise with shadow', value: 'lift'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {media: 'image', title: 'heading'},
    prepare({media, title}) {
      return {
        title: title || 'Image Block',
        subtitle: 'Image Block',
        media,
      };
    },
  },
});