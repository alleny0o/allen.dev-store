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
          title: 'Base size',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
            step: 1,
          },
          initialValue: 50,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
            step: 0.5,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height',
          options: {
            min: 0.8,
            max: 2,
            step: 0.1,
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
          type: 'boolean',
          name: 'capitalize',
          description: 'Uppercase body text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
            step: 1,
          },
          initialValue: 16,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
            step: 0.5,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height',
          options: {
            min: 0.8,
            max: 2,
            step: 0.1,
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

    // Optional decorative or special-use typography - Extra 1
    defineField({
      name: 'extra1',
      title: 'Extra 1',
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
          description: 'Uppercase text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
            step: 1,
          },
          initialValue: 16,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
            step: 0.5,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height',
          options: {
            min: 0.8,
            max: 2,
            step: 0.1,
          },
          initialValue: 1.2,
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),

    // Optional decorative or special-use typography - Extra 2
    defineField({
      name: 'extra2',
      title: 'Extra 2',
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
          description: 'Uppercase text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
            step: 1,
          },
          initialValue: 16,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
            step: 0.5,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height',
          options: {
            min: 0.8,
            max: 2,
            step: 0.1,
          },
          initialValue: 1.2,
        }),
      ],
      options: {collapsible: true},
      initialValue: {
        baseSize: 16,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    }),

    // Optional decorative or special-use typography - Extra 3
    defineField({
      name: 'extra3',
      title: 'Extra 3',
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
          description: 'Uppercase text.',
        }),
        defineField({
          type: 'rangeSlider',
          name: 'baseSize',
          title: 'Base size',
          options: {
            suffix: 'px',
            min: 12,
            max: 150,
            step: 1,
          },
          initialValue: 16,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'letterSpacing',
          title: 'Letter spacing',
          options: {
            suffix: 'px',
            min: -20,
            max: 50,
            step: 0.5,
          },
          initialValue: 0,
        }),
        defineField({
          type: 'rangeSlider',
          name: 'lineHeight',
          title: 'Line height',
          options: {
            min: 0.8,
            max: 2,
            step: 0.1,
          },
          initialValue: 1.2,
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
