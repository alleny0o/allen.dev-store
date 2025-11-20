// mega-menu.ts
import {LayoutGrid} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';

export default defineType({
  type: 'object',
  name: 'megaMenu',
  title: 'Mega Menu',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'name',
      title: 'Menu Item Name',
      type: 'string',
      description: 'The text shown in the main navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Main Link (Optional)',
      type: 'link',
      description: 'Where clicking the menu item goes',
    }),
    defineField({
      name: 'content',
      title: 'Mega Menu Content',
      type: 'array',
      description:
        'Add link sections and images. Automatically arranges in 4 columns, wrapping to next row after every 4 items.',
      of: [
        // Link Section
        defineArrayMember({
          type: 'object',
          name: 'linkSection',
          title: 'Link Section',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Heading',
              description: 'e.g., "Men\'s Clothing", "Accessories"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headingLink',
              type: 'link',
              title: 'Heading Link (Optional)',
              description: 'Make the heading clickable',
            }),
            defineField({
              name: 'links',
              type: 'array',
              of: [
                defineArrayMember({type: 'internalLink'}),
                defineArrayMember({type: 'externalLink'}),
              ],
            }),
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {
              return {
                title: title || 'Untitled Section',
                subtitle: 'Link Section',
              };
            },
          },
        }),

        // Image Block
        defineArrayMember({
          type: 'object',
          name: 'imageBlock',
          title: 'Image Block',
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
              title: 'Heading',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description (Optional)',
              rows: 2,
            }),
            defineField({
              name: 'link',
              type: 'link',
              title: 'Link (Optional)',
            }),
            defineField({
              name: 'linkText',
              type: 'string',
              title: 'Link Text (Optional)',
              description: 'e.g., "Shop Now", "Discover More"',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              heading: 'heading',
            },
            prepare({media, heading}) {
              return {
                title: heading || 'Untitled Image',
                subtitle: 'Image Block',
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Mega Menu',
        subtitle: 'Mega Menu',
      };
    },
  },
});
