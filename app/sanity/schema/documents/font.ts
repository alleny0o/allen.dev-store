import {StringIcon} from '@sanity/icons';
import {defineArrayMember, defineField, defineType} from 'sanity';
import ArrayMaxItems from '~/sanity/components/array-max-items';

export default defineType({
  name: 'typography',
  type: 'document',
  icon: StringIcon,
  title: 'Typography',
  __experimental_formPreviewTitle: false,

  fields: [
    // Main heading typography settings (H1-H6)
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      description: 'Controls all H1-H6 styles.',
      fields: [
        defineField({
          name: 'font',
          type: 'array',
          of: [defineArrayMember({type: 'fontCategory'})],
          components: {input: ArrayMaxItems},
          validation: (Rule) => Rule.max(1),
        }),
        defineField({
          type: 'boolean',
          name: 'capitalize',
          description: 'Uppercase headings.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {
            suffix: 'px',
            min: 20,
            max: 90,
          },
          initialValue: 50,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {
            min: 0.8,
            max: 2,
            step: 0.025,
          },
          initialValue: 1.2,
        }),
      ],
      options: {
        collapsible: true,
      },
      initialValue: {
        baseSize: 50,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),

    // Body text typography settings (paragraphs, lists, etc)
    defineField({
      type: 'object',
      title: 'Body',
      name: 'body',
      description: 'Primary paragraph and general UI text.',
      fields: [
        defineField({
          name: 'font',
          type: 'array',
          of: [defineArrayMember({type: 'fontCategory'})],
          components: {input: ArrayMaxItems},
          validation: (Rule) => Rule.max(1),
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {
            suffix: 'px',
            min: 12,
            max: 38,
          },
          initialValue: 16,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {
            min: 0.8,
            max: 2,
            step: 0.2,
          },
          initialValue: 1.2,
        }),
      ],
      options: {
        collapsible: true,
      },
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),

    // Navigation links (header menu)
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      description: 'Top-level site navigation links.',
      fields: [
        defineField({
          type: 'boolean',
          name: 'capitalize',
          description: 'Uppercase navigation text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {suffix: 'px', min: 10, max: 24},
          initialValue: 14,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {suffix: 'px', min: -10, max: 30},
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {min: 0.8, max: 2, step: 0.05},
          initialValue: 1.2,
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 14,
        letterSpacing: 0,
        lineHeight: 1.2,
        capitalize: false,
      },
    }),

    // Announcement bar text
    defineField({
      name: 'announcement',
      title: 'Announcement bar',
      type: 'object',
      description: 'Small promotional text at the top of the site.',
      fields: [
        defineField({
          type: 'boolean',
          name: 'capitalize',
          description: 'Uppercase announcement text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {suffix: 'px', min: 10, max: 20},
          initialValue: 13,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {suffix: 'px', min: -10, max: 50},
          initialValue: 5,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {min: 0.8, max: 2, step: 0.05},
          initialValue: 1.2,
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 13,
        letterSpacing: 5,
        lineHeight: 1.2,
        capitalize: true,
      },
    }),

    // Text-logo settings (only used if logo is text)
    defineField({
      name: 'logo',
      title: 'Logo (text)',
      type: 'object',
      description: 'Dedicated typography for a text-based logo.',
      fields: [
        defineField({
          name: 'font',
          type: 'array',
          of: [defineArrayMember({type: 'fontCategory'})],
          components: {input: ArrayMaxItems},
          validation: (Rule) => Rule.max(1),
        }),
        defineField({
          type: 'boolean',
          name: 'capitalize',
        }),
        defineField({
          type: 'boolean',
          name: 'italic',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {suffix: 'px', min: 16, max: 120},
          initialValue: 55,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {suffix: 'px', min: -20, max: 50},
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {min: 0.8, max: 2, step: 0.05},
          initialValue: 1.1,
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 24,
        letterSpacing: 0,
        lineHeight: 1.1,
        capitalize: false,
        italic: false,
      },
    }),

    // Optional decorative or special-use typography
    defineField({
      name: 'extra',
      title: 'Extra',
      type: 'object',
      description: 'Optional accent or decorative typography.',
      fields: [
        defineField({
          name: 'font',
          type: 'array',
          of: [defineArrayMember({type: 'fontCategory'})],
          components: {input: ArrayMaxItems},
          validation: (Rule) => Rule.max(1),
        }),
        defineField({
          type: 'boolean',
          name: 'capitalize',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size.',
          options: {suffix: 'px', min: 12, max: 150},
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing.',
          options: {suffix: 'px', min: -20, max: 50},
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height.',
          options: {min: 0.8, max: 2, step: 0.2},
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),
  ],

  preview: {
    prepare: () => ({title: 'Typography'}),
  },
});
