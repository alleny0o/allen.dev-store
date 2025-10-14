import {defineField, defineType} from 'sanity';

const GROUPS = [
  {name: 'layout', title: '🧱 Layout', default: true},
  {name: 'mobile', title: '📱 Mobile Layout'},
  {name: 'media', title: '🖼️ Media Gallery'},
];

export default defineType({
  name: 'productSection',
  title: 'Product Section',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,
  fields: [
    // ==================== LAYOUT ====================
    defineField({
      name: 'layoutNote',
      type: 'string',
      readOnly: true,
      group: 'layout',
      description:
        '💡 Control how your product images and details are arranged. Changes here affect desktop view only.',
    }),
    defineField({
      name: 'flipLayout',
      title: 'Flip Layout',
      description:
        '⬅️➡️ Switch sides: Put product details on the left and images on the right (normally images are on left)',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),
    defineField({
      name: 'columnRatio',
      title: 'Column Width Balance',
      description:
        '📏 Choose how much space images vs. details should take up. "7:5" means images get a bit more space than details. Most shops prefer the recommended 7:5 ratio.',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: '5:7 — More space for details', value: '5:7'},
          {title: '6:6 — Equal space for both', value: '6:6'},
          {title: '7:5 — Standard (⭐ Recommended)', value: '7:5'},
          {title: '8:4 — Focus on images', value: '8:4'},
          {title: '9:3 — Maximum image size', value: '9:3'},
        ],
        layout: 'radio',
      },
      initialValue: '7:5',
    }),
    defineField({
      name: 'gap',
      title: 'Spacing Between Columns',
      type: 'object',
      group: 'layout',
      description:
        '↔️ Add breathing room between your images and product details',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'desktop',
          type: 'number',
          title: 'Desktop Spacing (pixels)',
          description: '40px gives a comfortable amount of space',
          initialValue: 40,
          validation: (Rule) => Rule.min(0).max(120),
        }),
        defineField({
          name: 'mobile',
          type: 'number',
          title: 'Mobile Spacing (pixels)',
          description: '24px works well for most mobile screens',
          initialValue: 24,
          validation: (Rule) => Rule.min(0).max(80),
        }),
      ],
    }),

    // ==================== MOBILE LAYOUT ====================
    defineField({
      name: 'mobileLayout',
      title: 'What Shows First on Mobile?',
      description:
        '📱 Choose whether customers see images or product info first when shopping on their phone',
      type: 'string',
      group: 'mobile',
      options: {
        list: [
          {
            title: '🖼️ Show images first (Standard — works for most products)',
            value: 'mediaFirst',
          },
          {
            title: '🪧 Show title & price first (Good for text-heavy products)',
            value: 'headerFirst',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'mediaFirst',
    }),
    defineField({
      name: 'mobileHeaderContent',
      title: 'Customize Mobile Header',
      description:
        '✏️ Pick what info appears in the header section (only applies when "Show title & price first" is selected above)',
      type: 'object',
      group: 'mobile',
      hidden: ({parent}) => parent?.mobileLayout !== 'headerFirst',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'showVendor',
          type: 'boolean',
          title: 'Show Brand/Vendor Name',
          description: 'Display who makes this product',
          initialValue: false,
        }),
        defineField({
          name: 'showTitle',
          type: 'boolean',
          title: 'Show Product Title',
          description: 'Display the product name',
          initialValue: true,
        }),
        defineField({
          name: 'showReviews',
          type: 'boolean',
          title: 'Show Review Stars',
          description: 'Display customer rating',
          initialValue: true,
        }),
        defineField({
          name: 'showPrice',
          type: 'boolean',
          title: 'Show Price',
          description: 'Display product price',
          initialValue: true,
        }),
      ],
    }),

    // ==================== MEDIA GALLERY ====================
    defineField({
      name: 'galleryDisplay',
      type: 'string',
      title: 'How Should Images Display?',
      description:
        '🎨 Choose how customers browse your product photos on desktop. Mobile always uses swipeable carousel for best experience.',
      group: 'media',
      options: {
        list: [
          {
            title: '🎠 Carousel (Default — one image at a time with arrows)',
            value: 'carousel',
          },
          {
            title: '📜 Vertical Scroll (All images in a scrollable column)',
            value: 'vertical',
          },
          {
            title: '🔳 Grid Layout (Multiple images side-by-side)',
            value: 'grid',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'carousel',
    }),

    defineField({
      name: 'mainAspectRatio',
      title: 'Image Shape',
      description:
        '🖼️ Control how your images are cropped. Square (1:1) works best for most products and looks clean. Choose "Auto" if you want images to keep their original proportions.',
      type: 'string',
      group: 'media',
      options: {
        list: [
          {
            title: '1:1 — Square (⭐ Recommended for clean, consistent look)',
            value: '1:1',
          },
          {title: '4:3 — Classic photo shape (slightly wider)', value: '4:3'},
          {title: '3:2 — Standard photo ratio', value: '3:2'},
          {
            title: '16:9 — Wide rectangle (good for lifestyle shots)',
            value: '16:9',
          },
          {title: 'Auto — Keep original image proportions', value: 'auto'},
        ],
        layout: 'radio',
      },
      initialValue: '1:1',
    }),

    // 🧩 Grid Options
    defineField({
      name: 'gridOptions',
      title: 'Grid Layout Settings',
      type: 'object',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'grid',
      description: '⚙️ Fine-tune how the grid looks',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'columns',
          title: 'Images Per Row',
          type: 'string',
          description:
            '2 columns is easier to browse, 3 columns fits more images',
          options: {
            list: [
              {
                title: '2 per row (⭐ Recommended — easier to see details)',
                value: '2',
              },
              {title: '3 per row (More compact)', value: '3'},
            ],
            layout: 'radio',
          },
          initialValue: '2',
        }),
        defineField({
          name: 'gap',
          title: 'Space Between Images (pixels)',
          type: 'number',
          description: '16px gives nice spacing between images',
          initialValue: 16,
          validation: (Rule) => Rule.min(0).max(64),
        }),
      ],
    }),

    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Navigation Arrows',
      description:
        '◀️▶️ Display left/right arrows so customers can easily switch between images (desktop only)',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'carousel',
      initialValue: true,
    }),

    defineField({
      name: 'showThumbnails',
      type: 'boolean',
      title: 'Show Small Preview Thumbnails',
      description:
        '🖼️ Display a strip of small image previews so customers can jump to any photo instantly',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay === 'grid',
      initialValue: true,
    }),

    defineField({
      name: 'thumbnailOptions',
      title: 'Thumbnail Appearance',
      type: 'object',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay === 'grid',
      description: '🎨 Customize how your thumbnail strip looks',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'position',
          type: 'string',
          title: 'Thumbnail Position',
          description: 'Where should the thumbnail strip appear?',
          options: {
            list: [
              {
                title: 'Left Side (⭐ Recommended — classic e-commerce layout)',
                value: 'left',
              },
              {title: 'Bottom (Modern alternative)', value: 'bottom'},
            ],
            layout: 'radio',
          },
          initialValue: 'left',
        }),
        defineField({
          name: 'borderRadius',
          type: 'number',
          title: 'Rounded Corners (pixels)',
          description:
            'Add rounded corners to thumbnails. 4px gives a subtle, modern look.',
          initialValue: 4,
          validation: (Rule) => Rule.min(0).max(20),
        }),
        defineField({
          name: 'aspectRatio',
          type: 'string',
          title: 'Thumbnail Shape',
          description: 'How should thumbnail previews be cropped?',
          options: {
            list: [
              {
                title:
                  '1:1 — Square (⭐ Recommended — matches most product images)',
                value: '1:1',
              },
              {title: '4:3 — Classic rectangle', value: '4:3'},
              {title: '3:2 — Photo ratio', value: '3:2'},
              {title: '16:9 — Wide rectangle', value: '16:9'},
            ],
            layout: 'radio',
          },
          initialValue: '1:1',
        }),
      ],
    }),

    defineField({
      name: 'enableModal',
      type: 'boolean',
      title: 'Enable Fullscreen View',
      description:
        '🔍 Let customers click images to open a large fullscreen view. Recommended for seeing product details.',
      group: 'media',
      initialValue: true,
    }),

    defineField({
      name: 'enableZoom',
      type: 'boolean',
      title: 'Enable Zoom on Hover',
      description:
        '🔎 When customers hover over images on desktop, they can see a zoomed-in view. Great for detailed products like jewelry or textiles.',
      group: 'media',
      initialValue: false,
    }),

    defineField({
      name: 'showDots',
      type: 'boolean',
      title: 'Show Position Dots',
      description:
        '⚫⚫⚫ Display dots on mobile showing which image they\'re viewing (e.g., "2 of 5")',
      group: 'media',
      initialValue: true,
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Product Section',
      subtitle: 'Layout, mobile, and media settings',
    }),
  },
});
