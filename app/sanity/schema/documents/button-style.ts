// button-style.ts
import {SquareIcon} from '@sanity/icons';
import {defineField, defineType} from 'sanity';
import {fontWeightField} from '../objects/font/font-weight';

export default defineType({
  name: 'buttonStyle',
  type: 'document',
  title: 'Button Style',
  icon: SquareIcon,
  
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Internal name (e.g., "Primary CTA", "Secondary Outline")',
      validation: (Rule) => Rule.required(),
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
      description: 'Button font size as % of parent text (1.0 = 100% of parent)',
      options: {min: 0.75, max: 1.5, step: 0.05},
      initialValue: 1.0,
    }),
    
    fontWeightField({initialValue: 400}),
    
    defineField({
      name: 'letterSpacing',
      title: 'Letter Spacing',
      type: 'rangeSlider',
      options: {min: -1, max: 3, step: 0.1, suffix: 'px'},
      initialValue: 0,
    }),
    
    defineField({
      name: 'uppercase',
      title: 'Uppercase',
      type: 'boolean',
      initialValue: false,
    }),
    
    // Spacing (Absolute PX)
    defineField({
      name: 'paddingX',
      title: 'Horizontal Padding',
      type: 'rangeSlider',
      options: {min: 8, max: 48, suffix: 'px'},
      initialValue: 24,
    }),
    
    defineField({
      name: 'paddingY',
      title: 'Vertical Padding',
      type: 'rangeSlider',
      options: {min: 4, max: 24, suffix: 'px'},
      initialValue: 12,
    }),
    
    // Shape (Absolute PX)
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'rangeSlider',
      options: {min: 0, max: 50, suffix: 'px'},
      initialValue: 6,
    }),
    
    // Layout
    defineField({
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      description: 'Button takes full width of container',
      initialValue: true,
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      variant: 'variant',
    },
    prepare({title, variant}) {
      return {
        title: title || 'Untitled Button',
        subtitle: variant ? `${variant} variant` : 'No variant',
      };
    },
  },
});