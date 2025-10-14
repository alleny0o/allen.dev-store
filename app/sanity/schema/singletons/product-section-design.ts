import {defineField, defineType} from 'sanity';

const GROUPS = [
  {name: 'layout', title: '🧱 Layout', default: true},
  {name: 'mobile', title: '📱 Mobile Layout'},
  {name: 'media', title: '🖼️ Media Gallery'},
];

export default defineType({
  name: 'productSectionDesign',
  title: 'Product section design',
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
      name: 'breakpoint',
      title: 'Desktop Layout Breakpoint',
      description:
        '📐 When should the layout switch from mobile to desktop? Most shops use "Large (1024px)" for best results. (Default = Large)',
      type: 'string',
      group: 'layout',
      initialValue: 'lg',
      options: {
        list: [
          {
            title: 'Medium — 768px (Tablets switch to desktop earlier)',
            value: 'md',
          },
          {title: 'Large — 1024px (⭐ Default)', value: 'lg'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'flipLayout',
      title: 'Flip Layout',
      description:
        '⬅️➡️ Switch sides: Put product details on the left and media on the right (normally media are on the left).',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),
    defineField({
      name: 'columnRatio',
      title: 'Column Width Balance',
      description:
        '📏 Choose how much space media vs. details should take up. "7:5" means media get a bit more space than details. Most shops prefer the default 7:5 ratio. (Default = 7:5)',
      type: 'string',
      group: 'layout',
      initialValue: '7:5',
      options: {
        list: [
          {title: '5:7 — More space for details', value: '5:7'},
          {title: '6:6 — Equal space for both', value: '6:6'},
          {title: '7:5 — Standard (⭐ Default)', value: '7:5'},
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
        '↔️ Add breathing room between your media and product details.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'desktop',
          type: 'number',
          title: 'Desktop Spacing (pixels)',
          description: '40px (Default) works well for most screens.',
          initialValue: 40,
          validation: (Rule) => Rule.min(0).max(120),
        }),
        defineField({
          name: 'mobile',
          type: 'number',
          title: 'Mobile Spacing (pixels)',
          description: '24px (Default) works well for most mobile screens.',
          initialValue: 24,
          validation: (Rule) => Rule.min(0).max(80),
        }),
      ],
    }),

    defineField({
      name: 'detailsPadding',
      title: 'Product Details Padding',
      description:
        '🧍 Add inner padding around the product details section. Affects only the details area (not media). This also controls horizontal padding for the mobile header when "Show title & price first" is enabled.',
      type: 'object',
      group: 'layout',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'desktop',
          title: 'Desktop Padding',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'Horizontal Padding (px)',
              type: 'number',
              description:
                'Space on the left and right of product details. (Default = 24px)',
              initialValue: 24,
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'y',
              title: 'Vertical Padding (px)',
              type: 'number',
              description:
                'Space above and below product details. (Default = 32px)',
              initialValue: 32,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
        }),
        defineField({
          name: 'mobile',
          title: 'Mobile Padding',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'Horizontal Padding (px)',
              type: 'number',
              description:
                'Space on the left and right of product details. (Default = 16px)',
              initialValue: 16,
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'y',
              title: 'Vertical Padding (px)',
              type: 'number',
              description:
                'Space above and below product details. (Default = 24px)',
              initialValue: 24,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
        }),
      ],
    }),

    // ==================== MOBILE LAYOUT ====================
    defineField({
      name: 'mobileLayout',
      title: 'What Shows First on Mobile?',
      description:
        '📱 Choose whether customers see media or product info first when shopping on their phone. (Default = Show media first)',
      type: 'string',
      group: 'mobile',
      initialValue: 'mediaFirst',
      options: {
        list: [
          {
            title: '🖼️ Show media first (⭐ Default — works for most products)',
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
        '✏️ Pick what info appears in the compact header section at the top (only applies when "Show title & price first" is selected above). Full product details will still appear below the media gallery.',
      type: 'object',
      group: 'mobile',
      hidden: ({parent}) => parent?.mobileLayout !== 'headerFirst',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'showVendor',
          type: 'boolean',
          title: 'Show Brand/Vendor Name',
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
    defineField({
      name: 'mobileHeaderPaddingY',
      title: 'Mobile Header Vertical Padding',
      description:
        '📐 Control top/bottom padding for the compact header (only applies when "Show title & price first" is selected). Horizontal padding uses the same value as Product Details Padding above. (Default = 12px)',
      type: 'number',
      group: 'mobile',
      hidden: ({parent}) => parent?.mobileLayout !== 'headerFirst',
      initialValue: 12,
      validation: (Rule) => Rule.min(0).max(60),
    }),

    // ==================== MEDIA GALLERY ====================
    defineField({
      name: 'galleryDisplay',
      type: 'string',
      title: 'How Should Media Display?',
      description:
        '🎨 Choose how customers browse your product photos on desktop. Mobile always uses a swipeable carousel for best experience. (Default = Carousel)',
      group: 'media',
      initialValue: 'carousel',
      options: {
        list: [
          {
            title: '🎠 Carousel (⭐ Default — one media at a time with arrows)',
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
      name: 'gridGap',
      title: 'Grid Spacing',
      type: 'number',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'grid',
      description:
        '📐 Space between media items in the grid (pixels). (Default = 16px)',
      initialValue: 16,
      validation: (Rule) => Rule.min(0).max(64),
    }),

    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Navigation Arrows',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'carousel',
      initialValue: true,
    }),

    defineField({
      name: 'showThumbnails',
      type: 'boolean',
      title: 'Show Small Preview Thumbnails',
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
      description: '🎨 Customize how your thumbnail strip looks.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'position',
          type: 'string',
          title: 'Thumbnail Position',
          description: '(Default = Left Side)',
          initialValue: 'left',
          options: {
            list: [
              {title: 'Left Side (⭐ Default)', value: 'left'},
              {title: 'Bottom', value: 'bottom'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'overlayOnImage',
          type: 'boolean',
          title: 'Overlay on Image (Left Position Only)',
          hidden: ({parent}) => parent?.position !== 'left',
          initialValue: false,
        }),
        defineField({
          name: 'borderRadius',
          type: 'number',
          title: 'Rounded Corners (pixels)',
          description: '(Default = 4px)',
          initialValue: 4,
          validation: (Rule) => Rule.min(0).max(20),
        }),
      ],
    }),

    defineField({
      name: 'showThumbnailsOnMobile',
      type: 'boolean',
      title: 'Show Thumbnails on Mobile',
      group: 'media',
      hidden: ({parent}) => !parent?.showThumbnails,
      initialValue: false,
    }),

    defineField({
      name: 'enableModal',
      type: 'boolean',
      title: 'Enable Fullscreen View',
      group: 'media',
      initialValue: true,
    }),

    defineField({
      name: 'enableZoom',
      type: 'boolean',
      title: 'Enable Zoom on Hover',
      group: 'media',
      initialValue: false,
    }),

    defineField({
      name: 'showDots',
      type: 'boolean',
      title: 'Show Position Dots',
      group: 'media',
      initialValue: true,
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Product section design',
      subtitle: 'Layout, mobile, and media settings',
    }),
  },
});
