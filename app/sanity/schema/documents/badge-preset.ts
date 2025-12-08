// badge-preset.ts
import {TagIcon} from '@sanity/icons';
import {defineField, defineType} from 'sanity';
import {fontWeightField} from '../objects/font/font-weight';

export default defineType({
  name: 'badgePreset',
  type: 'document',
  title: 'Badge Preset',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Internal name (e.g., "NEW Badge", "Sale Badge")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'text',
      title: 'Badge Text',
      type: 'string',
      description: 'The text displayed in the badge (e.g., "NEW", "SALE")',
      validation: (Rule) => Rule.required().max(10),
    }),

    // Color
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      validation: (Rule) => Rule.required(),
    }),

    // Typography
    defineField({
      name: 'fontSizeScale',
      title: 'Font Size Scale',
      type: 'rangeSlider',
      description: 'Badge font size as % of parent text (0.7 = 70% of parent)',
      options: {min: 0.5, max: 1, step: 0.05},
      initialValue: 0.7,
    }),

    fontWeightField({initialValue: 400}),

    defineField({
      name: 'letterSpacing',
      title: 'Letter Spacing',
      type: 'rangeSlider',
      options: {min: -1, max: 3, step: 0.1, suffix: 'px'},
      initialValue: 0.5,
    }),

    defineField({
      name: 'uppercase',
      title: 'Uppercase',
      type: 'boolean',
      initialValue: true,
    }),

    // Spacing (Absolute PX)
    defineField({
      name: 'paddingX',
      title: 'Horizontal Padding',
      type: 'rangeSlider',
      options: {min: 2, max: 12, suffix: 'px'},
      initialValue: 6,
    }),

    defineField({
      name: 'paddingY',
      title: 'Vertical Padding',
      type: 'rangeSlider',
      options: {min: 1, max: 8, suffix: 'px'},
      initialValue: 2,
    }),

    // Shape (Absolute PX)
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'rangeSlider',
      options: {min: 0, max: 20, suffix: 'px'},
      initialValue: 4,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Badge',
        subtitle: subtitle ? `"${subtitle}"` : 'No text',
      };
    },
  },
});
