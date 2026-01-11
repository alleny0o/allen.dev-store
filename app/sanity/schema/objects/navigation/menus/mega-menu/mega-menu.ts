// mega-menu.ts
import {LayoutGrid} from 'lucide-react';
import {defineArrayMember, defineField} from 'sanity';

function getSectionCount(preset: string): number {
  const counts: Record<string, number> = {
    '2-sections': 2,
    '3-sections': 3,
    '4-sections': 4,
    '5-sections': 5,
    '6-narrow': 6,
    'links-featured': 6,
    'featured-links': 6,
    'hero-three-small': 4,
    'three-small-hero': 4,
  };
  return counts[preset] || 4;
}

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
      description:
        'The text that appears in the main navigation (e.g., "Shop", "Women", "New Arrivals")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'link',
      title: 'Main Link',
      type: 'link',
      description:
        'Where clicking the parent menu item goes (leave empty if you only want the dropdown to open)',
      hidden: ({document}) => !document?.desktopAllowMegaMenuParentLinks,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const allow = context.document?.desktopAllowMegaMenuParentLinks;
          if (allow && !value) {
            return 'A link is required when parent navigation links are enabled.';
          }
          return true;
        }),
    }),

    defineField({
      name: 'layout',
      title: 'Layout Mode',
      type: 'string',
      description: 'Choose how to organize your mega menu content',
      options: {
        list: [
          {
            title: 'Simple Grid (recommended for basic menus)',
            value: 'grid',
          },
          {
            title:
              'Section Layout (advanced - for complex layouts with mixed widths)',
            value: 'sections',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required(),
    }),

    // GRID MODE FIELDS
    defineField({
      name: 'gridLayout',
      title: 'Column Width',
      type: 'string',
      description: 'All blocks will be the same width and wrap automatically',
      options: {
        list: [
          {title: 'Six Equal Columns — narrow blocks', value: '6-columns'},
          {title: 'Four Equal Columns — medium blocks', value: '4-columns'},
          {title: 'Three Equal Columns — wide blocks', value: '3-columns'},
          {title: 'Two Equal Columns — half width', value: '2-columns'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.layout !== 'grid',
      initialValue: '4-columns',
    }),

    defineField({
      name: 'content',
      title: 'Mega Menu Content',
      type: 'array',
      description:
        'Add link sections and image blocks. They will flow left-to-right and wrap to the next row.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Add at least one block to the mega menu.'),
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),

    // SECTION MODE FIELDS
    defineField({
      name: 'sectionPreset',
      title: 'Section Layout Preset',
      type: 'string',
      description:
        'Choose a preset layout. Sections divide the menu into columns, and blocks within each section stack vertically.',
      options: {
        list: [
          {
            title: 'Two Equal Sections — 50% / 50%',
            value: '2-sections',
          },
          {
            title: 'Three Equal Sections — 33% / 33% / 33%',
            value: '3-sections',
          },
          {
            title: 'Four Equal Sections — 25% / 25% / 25% / 25%',
            value: '4-sections',
          },
          {
            title: 'Five Equal Sections — 20% / 20% / 20% / 20% / 20%',
            value: '5-sections',
          },
          {
            title: 'Six Narrow Columns — 16% / 16% / 16% / 16% / 16% / 16%',
            value: '6-narrow',
          },
          {
            title: 'Link Bar + Featured — 4 narrow (8%) + 2 wide (33%)',
            value: 'links-featured',
          },
          {
            title: 'Featured + Link Bar — 2 wide (33%) + 4 narrow (8%)',
            value: 'featured-links',
          },
          {
            title: 'Hero + Small — 1 large (50%) + 3 small (16%)',
            value: 'hero-three-small',
          },
          {
            title: 'Small + Hero — 3 small (16%) + 1 large (50%)',
            value: 'three-small-hero',
          },
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.layout !== 'sections',
      initialValue: '4-sections',
    }),

    // SECTION 1
    defineField({
      name: 'section1',
      title: 'Section 1',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 1 > getSectionCount(preset);
      },
    }),

    // SECTION 2
    defineField({
      name: 'section2',
      title: 'Section 2',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 2 > getSectionCount(preset);
      },
    }),

    // SECTION 3
    defineField({
      name: 'section3',
      title: 'Section 3',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 3 > getSectionCount(preset);
      },
    }),

    // SECTION 4
    defineField({
      name: 'section4',
      title: 'Section 4',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 4 > getSectionCount(preset);
      },
    }),

    // SECTION 5
    defineField({
      name: 'section5',
      title: 'Section 5',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 5 > getSectionCount(preset);
      },
    }),

    // SECTION 6
    defineField({
      name: 'section6',
      title: 'Section 6',
      type: 'array',
      description: 'Add blocks to this section. They will stack vertically.',
      of: [
        defineArrayMember({type: 'linkSection'}),
        defineArrayMember({type: 'imageBlock'}),
      ],
      hidden: ({parent}) => {
        if (parent?.layout !== 'sections') return true;
        const preset = parent?.sectionPreset || '4-sections';
        return 6 > getSectionCount(preset);
      },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      layout: 'layout',
      contentCount: 'content.length',
      section1Count: 'section1.length',
      section2Count: 'section2.length',
      section3Count: 'section3.length',
      section4Count: 'section4.length',
      section5Count: 'section5.length',
      section6Count: 'section6.length',
    },
    prepare({
      title,
      layout,
      contentCount,
      section1Count,
      section2Count,
      section3Count,
      section4Count,
      section5Count,
      section6Count,
    }) {
      const totalBlocks =
        layout === 'grid'
          ? contentCount || 0
          : (section1Count || 0) +
            (section2Count || 0) +
            (section3Count || 0) +
            (section4Count || 0) +
            (section5Count || 0) +
            (section6Count || 0);

      return {
        title,
        subtitle: `${layout === 'grid' ? 'Grid' : 'Section'} layout • ${totalBlocks} blocks`,
      };
    },
  },
});