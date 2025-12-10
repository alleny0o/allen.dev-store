import {defineField} from 'sanity';
import {Image} from 'lucide-react';

export default defineField({
  type: 'object',
  name: 'imageBlock',
  title: 'Image Block',
  icon: Image,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkText',
      type: 'string',
      description: 'e.g. "Shop Now"',
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
