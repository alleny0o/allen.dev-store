// mega-menu.ts
import {LayoutGrid} from 'lucide-react';
import {defineArrayMember, defineField} from 'sanity';

export default defineField({
  type: 'object',
  name: 'megaMenu',
  icon: LayoutGrid,
  title: 'Mega Menu',

  fields: [
    defineField({
      name: 'name',
      title: 'Menu Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Optional parent link — RECOMMENDED to keep
    defineField({
      name: 'link',
      title: 'Main Link',
      type: 'link',
      description: 'Where clicking the parent menu item goes',

      hidden: ({document}) => !document?.allowMegaMenuParentLinks,

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const allow = context.document?.allowMegaMenuParentLinks;

          if (allow && !value) {
            return 'A link is required when parent navigation links are enabled.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'content',
      title: 'Mega Menu Content',
      type: 'array',
      description: 'At least one link section or image block is required.',
      validation: (Rule) =>
        Rule.required().min(1).error('Add at least one block to the mega menu.'),
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headingLink',
              type: 'link',
              title: 'Heading Link (Optional)',
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
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      count: 'content.length',
    },
    prepare({title, count}) {
      return {
        title,
        subtitle: `${count || 0} content blocks`,
      };
    },
  },
});
