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
        '💡 Control how your product media and details are arranged. Changes here affect desktop view only.',
    }),
    defineField({
      name: 'flipLayout',
      title: 'Flip Layout',
      description:
        '⬅️➡️ Switch sides: Put product details on the left and media on the right (normally media are on left)',
      type: 'boolean',
      group: 'layout',
    }),
    defineField({
      name: 'columnRatio',
      title: 'Column Width Balance',
      description:
        '📏 Choose how much space media vs. details should take up. "7:5" means media get a bit more space than details. Most shops prefer the recommended 7:5 ratio.',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: '5:7 — More space for details', value: '5:7'},
          {title: '6:6 — Equal space for both', value: '6:6'},
          {title: '7:5 — Standard (⭐ Recommended)', value: '7:5'},
          {title: '8:4 — Focus on media', value: '8:4'},
          {title: '9:3 — Maximum media size', value: '9:3'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'gap',
      title: 'Spacing Between Columns',
      type: 'object',
      group: 'layout',
      description:
        '↔️ Add breathing room between your media and product details',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'desktop',
          type: 'number',
          title: 'Desktop Spacing (pixels)',
          description: '40px gives a comfortable amount of space',
          validation: (Rule) => Rule.min(0).max(120),
        }),
        defineField({
          name: 'mobile',
          type: 'number',
          title: 'Mobile Spacing (pixels)',
          description: '24px works well for most mobile screens',
          validation: (Rule) => Rule.min(0).max(80),
        }),
      ],
    }),

    // ==================== MOBILE LAYOUT ====================
    defineField({
      name: 'mobileLayout',
      title: 'What Shows First on Mobile?',
      description:
        '📱 Choose whether customers see media or product info first when shopping on their phone',
      type: 'string',
      group: 'mobile',
      options: {
        list: [
          {
            title: '🖼️ Show media first (Standard — works for most products)',
            value: 'mediaFirst',
          },
          {
            title: '🪧 Show title & price first (Good for text-heavy products)',
            value: 'headerFirst',
          },
        ],
        layout: 'radio',
      },
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
        }),
        defineField({
          name: 'showTitle',
          type: 'boolean',
          title: 'Show Product Title',
          description: 'Display the product name',
        }),
        defineField({
          name: 'showReviews',
          type: 'boolean',
          title: 'Show Review Stars',
          description: 'Display customer rating',
        }),
        defineField({
          name: 'showPrice',
          type: 'boolean',
          title: 'Show Price',
          description: 'Display product price',
        }),
      ],
    }),

    // ==================== MEDIA GALLERY ====================
    defineField({
      name: 'galleryDisplay',
      type: 'string',
      title: 'How Should Media Display?',
      description:
        '🎨 Choose how customers browse your product photos on desktop. Mobile always uses swipeable carousel for best experience.',
      group: 'media',
      options: {
        list: [
          {
            title: '🎠 Carousel (Default — one media at a time with arrows)',
            value: 'carousel',
          },
          {
            title: '📜 Vertical Scroll (All media in a scrollable column)',
            value: 'vertical',
          },
          {
            title: '🔳 Grid Layout (Multiple media side-by-side)',
            value: 'grid',
          },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'mainAspectRatio',
      title: 'Media Shape',
      description:
        '🖼️ Control how your media are cropped. Square (1:1) works best for most products and looks clean. Choose "Auto" if you want media to keep their original proportions.',
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
          {title: 'Auto — Keep original media proportions', value: 'auto'},
        ],
        layout: 'radio',
      },
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
          title: 'Media Per Row',
          type: 'string',
          description:
            '2 columns is easier to browse, 3 columns fits more media',
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
        }),
        defineField({
          name: 'gap',
          title: 'Space Between Media (pixels)',
          type: 'number',
          description: '16px gives nice spacing between media',
          validation: (Rule) => Rule.min(0).max(64),
        }),
      ],
    }),

    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Navigation Arrows',
      description:
        '◀️▶️ Display left/right arrows so customers can easily switch between media (desktop only)',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'carousel',
    }),

    defineField({
      name: 'showThumbnails',
      type: 'boolean',
      title: 'Show Small Preview Thumbnails',
      description:
        '🖼️ Display a strip of small media previews so customers can jump to any photo instantly',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay === 'grid',
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
        }),
        defineField({
          name: 'borderRadius',
          type: 'number',
          title: 'Rounded Corners (pixels)',
          description:
            'Add rounded corners to thumbnails. 4px gives a subtle, modern look.',
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
                  '1:1 — Square (⭐ Recommended — matches most product media)',
                value: '1:1',
              },
              {title: '4:3 — Classic rectangle', value: '4:3'},
              {title: '3:2 — Photo ratio', value: '3:2'},
              {title: '16:9 — Wide rectangle', value: '16:9'},
            ],
            layout: 'radio',
          },
        }),
      ],
    }),

    defineField({
      name: 'enableModal',
      type: 'boolean',
      title: 'Enable Fullscreen View',
      description:
        '🔍 Let customers click media to open a large fullscreen view. Recommended for seeing product details.',
      group: 'media',
    }),

    defineField({
      name: 'enableZoom',
      type: 'boolean',
      title: 'Enable Zoom on Hover',
      description:
        '🔎 When customers hover over media on desktop, they can see a zoomed-in view. Great for detailed products like jewelry or textiles.',
      group: 'media',
    }),

    defineField({
      name: 'showDots',
      type: 'boolean',
      title: 'Show Position Dots',
      description:
        '⚫⚫⚫ Display dots on mobile showing which media they\'re viewing (e.g., "2 of 5")',
      group: 'media',
    }),
  ],

  initialValue: {
    flipLayout: false,
    columnRatio: '7:5',
    gap: {
      desktop: 40,
      mobile: 24,
    },
    mobileLayout: 'mediaFirst',
    mobileHeaderContent: {
      showVendor: false,
      showTitle: true,
      showReviews: true,
      showPrice: true,
    },
    galleryDisplay: 'carousel',
    mainAspectRatio: '1:1',
    gridOptions: {
      columns: '2',
      gap: 16,
    },
    showArrows: true,
    showThumbnails: true,
    thumbnailOptions: {
      position: 'left',
      borderRadius: 4,
      aspectRatio: '1:1',
    },
    enableModal: true,
    enableZoom: false,
    showDots: true,
  },

  preview: {
    prepare: () => ({
      title: 'Product Section',
      subtitle: 'Layout, mobile, and media settings',
    }),
  },
});
