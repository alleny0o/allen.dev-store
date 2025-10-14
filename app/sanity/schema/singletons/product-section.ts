import {defineField, defineType} from 'sanity';

const GROUPS = [
  {name: 'layout', title: 'Layout', default: true},
  {name: 'mobile', title: 'Mobile Layout'},
  {name: 'media', title: 'Media Gallery'},
];

export default defineType({
  name: 'productSection',
  title: 'Product section',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,
  fields: [
    // ==================== LAYOUT ====================
    defineField({
      name: 'flipLayout',
      title: 'Flip Layout',
      description: 'Put details on the left, media on the right (desktop only)',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),
    defineField({
      name: 'columnRatio',
      title: 'Column Width Ratio',
      description: 'Adjust the split between media and details (desktop only)',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: '50 / 50 — Equal split', value: '6:6'},
          {title: '58 / 42 — Standard (recommended)', value: '7:5'},
          {title: '67 / 33 — Gallery focused', value: '8:4'},
          {title: '75 / 25 — Wide gallery', value: '9:3'},
        ],
        layout: 'radio',
      },
      initialValue: '7:5',
    }),
    defineField({
      name: 'gap',
      title: 'Gap Between Media & Details',
      type: 'object',
      group: 'layout',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'mobile',
          type: 'number',
          title: 'Mobile (px)',
          description: 'Vertical spacing between sections',
          initialValue: 24,
          validation: (Rule) => Rule.min(0).max(80),
        }),
        defineField({
          name: 'desktop',
          type: 'number',
          title: 'Desktop (px)',
          description: 'Horizontal spacing between media and details',
          initialValue: 40,
          validation: (Rule) => Rule.min(0).max(120),
        }),
      ],
    }),

    // ==================== MOBILE LAYOUT ====================
    defineField({
      name: 'mobileLayout',
      title: 'Mobile Layout Order',
      description: 'Choose what appears first on mobile',
      type: 'string',
      group: 'mobile',
      options: {
        list: [
          {title: 'Gallery First (Standard)', value: 'mediaFirst'},
          {title: 'Title & Price First', value: 'headerFirst'},
        ],
        layout: 'radio',
      },
      initialValue: 'mediaFirst',
    }),
    defineField({
      name: 'mobileHeaderContent',
      title: 'Mobile Header Settings',
      description:
        'Customize what shows in the header when header-first is enabled',
      type: 'object',
      group: 'mobile',
      hidden: ({parent}) => parent?.mobileLayout !== 'headerFirst',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'showVendor',
          type: 'boolean',
          title: 'Show Vendor/Brand',
          description: 'Show brand name above title (for multi-brand stores)',
          initialValue: false,
        }),
        defineField({
          name: 'showTitle',
          type: 'boolean',
          title: 'Show Product Title',
          initialValue: true,
        }),
        defineField({
          name: 'showReviews',
          type: 'boolean',
          title: 'Show Review Stars',
          initialValue: true,
        }),
        defineField({
          name: 'showPrice',
          type: 'boolean',
          title: 'Show Price',
          initialValue: true,
        }),
      ],
    }),

    // ==================== MEDIA GALLERY ====================
    defineField({
      name: 'stickyGallery',
      type: 'boolean',
      title: 'Sticky Gallery',
      description:
        'Gallery stays in view while scrolling details (desktop only)',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'stickyOffset',
      type: 'number',
      title: 'Sticky Top Offset (px)',
      description:
        'Space from top of viewport when sticky (accounts for header height)',
      group: 'media',
      hidden: ({parent}) => !parent?.stickyGallery,
      initialValue: 96,
      validation: (Rule) => Rule.min(0).max(200),
    }),
    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Navigation Arrows',
      description:
        'Left/right arrows to navigate between images (desktop only)',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'showThumbnails',
      type: 'boolean',
      title: 'Show Thumbnails',
      description:
        'Display thumbnail strip for quick navigation (desktop only)',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'thumbnailPosition',
      type: 'string',
      title: 'Thumbnail Position',
      group: 'media',
      options: {
        list: [
          {title: 'Left Side', value: 'left'},
          {title: 'Bottom', value: 'bottom'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => !parent?.showThumbnails,
      initialValue: 'left',
    }),
    defineField({
      name: 'enableModal',
      type: 'boolean',
      title: 'Enable Fullscreen Modal',
      description: 'Click on images to open fullscreen lightbox',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'showDots',
      type: 'boolean',
      title: 'Show Dot Indicators',
      description: 'Mobile only — shows current slide position',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'enableZoom',
      type: 'boolean',
      title: 'Enable Zoom on Hover',
      description: 'Desktop only — hover to zoom into product images',
      group: 'media',
      initialValue: false,
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Product Section',
      subtitle: 'Global layout, mobile, and gallery configuration',
    }),
  },
});
