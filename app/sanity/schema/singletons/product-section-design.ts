import {defineField, defineType} from 'sanity';

const GROUPS = [
  {name: 'layout', title: 'Layout', default: true},
  {name: 'mobile', title: 'Mobile Layout'},
  {name: 'media', title: 'Media Gallery'},
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
      name: 'breakpoint',
      title: 'Desktop Layout Breakpoint',
      description:
        'When should the layout switch from mobile to desktop? Most shops use "Large [1024px]" for best results. [Default = Large]',
      type: 'string',
      group: 'layout',
      initialValue: 'lg',
      options: {
        list: [
          {
            title: 'Medium — 768px [Tablets switch to desktop earlier]',
            value: 'md',
          },
          {title: 'Large — 1024px [Default]', value: 'lg'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'flipLayout',
      title: 'Flip Layout',
      description:
        'Switch sides: Put product details on the left and media on the right [normally media are on the left].',
      type: 'boolean',
      group: 'layout',
      initialValue: false,
    }),

    // ✅ Updated ratio slider version
    defineField({
      name: 'columnRatio',
      title: 'Media : Details Ratio',
      description:
        'Adjust the balance between media and product details. Higher values give more space to media. [Default = 7 : 5]',
      type: 'rangeSlider',
      group: 'layout',
      options: {
        min: 3,
        max: 9,
        step: 1,
        suffix: '/12',
      },
      initialValue: 7,
    }),

    defineField({
      name: 'gap',
      title: 'Spacing Between Columns',
      type: 'object',
      group: 'layout',
      description: 'Add breathing room between your media and product details.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'desktop',
          type: 'rangeSlider',
          title: 'Desktop Spacing [pixels]',
          options: {min: 0, max: 120, step: 4, suffix: 'px'},
          initialValue: 40,
        }),
        defineField({
          name: 'mobile',
          type: 'rangeSlider',
          title: 'Mobile Spacing [pixels]',
          options: {min: 0, max: 80, step: 4, suffix: 'px'},
          initialValue: 24,
        }),
      ],
    }),

    defineField({
      name: 'detailsPadding',
      title: 'Product Details Padding',
      description:
        'Add inner padding around the product details section. Affects only the details area [not media].',
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
              title: 'Horizontal Padding [px]',
              type: 'rangeSlider',
              options: {min: 0, max: 100, suffix: 'px'},
              initialValue: 24,
            }),
            defineField({
              name: 'y',
              title: 'Vertical Padding [px]',
              type: 'rangeSlider',
              options: {min: 0, max: 100, suffix: 'px'},
              initialValue: 32,
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
              title: 'Horizontal Padding [px]',
              type: 'rangeSlider',
              options: {min: 0, max: 100, suffix: 'px'},
              initialValue: 16,
            }),
            defineField({
              name: 'y',
              title: 'Vertical Padding [px]',
              type: 'rangeSlider',
              options: {min: 0, max: 100, suffix: 'px'},
              initialValue: 24,
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
        'Choose whether customers see media or product info first when shopping on their phone. [Default = Show media first]',
      type: 'string',
      group: 'mobile',
      initialValue: 'mediaFirst',
      options: {
        list: [
          {
            title: 'Show media first [Default — works for most products]',
            value: 'mediaFirst',
          },
          {
            title: 'Show title & price first [Good for text-heavy products]',
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
        'Only applies when "Show title & price first" is selected above. Choose which info appears in the compact header.',
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
        'Top/bottom padding for the compact header [only applies when "Show title & price first" is selected]. Default = 12px',
      type: 'rangeSlider',
      group: 'mobile',
      hidden: ({parent}) => parent?.mobileLayout !== 'headerFirst',
      options: {min: 0, max: 64, suffix: 'px'},
      initialValue: 12,
    }),

    // ==================== MEDIA GALLERY ====================
    defineField({
      name: 'galleryDisplay',
      type: 'string',
      title: 'How Should Media Display?',
      description:
        'Choose how customers browse product photos on desktop. Mobile always uses a swipeable carousel. [Default = Carousel]',
      group: 'media',
      initialValue: 'carousel',
      options: {
        list: [
          {
            title: 'Carousel [Default — one media at a time with arrows]',
            value: 'carousel',
          },
          {
            title: 'Vertical Scroll [All media in a scrollable column]',
            value: 'vertical',
          },
          {title: 'Grid Layout [Multiple media side-by-side]', value: 'grid'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'gridGap',
      title: 'Grid Spacing',
      type: 'rangeSlider',
      group: 'media',
      hidden: ({parent}) => parent?.galleryDisplay !== 'grid',
      description:
        'Space between media items in the grid [pixels]. [Default = 16px]',
      initialValue: 16,
      options: {min: 0, max: 64, step: 2, suffix: 'px'},
    }),

    defineField({
      name: 'mediaBorderRadius',
      title: 'Media Rounded Corners',
      description: 'Rounded corners for main product images. [Default = None]',
      type: 'rangeSlider',
      group: 'media',
      options: {min: 0, max: 16, step: 2, suffix: 'px'},
      initialValue: 0,
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
      title: 'Show Thumbnails',
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
      options: {collapsible: true, collapsed: true},
      description: 'Customize how your thumbnail strip looks.',
      fields: [
        defineField({
          name: 'position',
          type: 'string',
          title: 'Thumbnail Position',
          description: '[Default = Left Side]',
          initialValue: 'left',
          options: {
            list: [
              {title: 'Left Side [Default]', value: 'left'},
              {title: 'Bottom', value: 'bottom'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'overlayOnImage',
          type: 'boolean',
          title: 'Overlay on Image [Left Position Only]',
          hidden: ({parent}) => parent?.position !== 'left',
          initialValue: false,
        }),
        defineField({
          name: 'borderRadius',
          type: 'rangeSlider',
          title: 'Thumbnail Rounded Corners',
          options: {min: 0, max: 16, step: 2, suffix: 'px'},
          initialValue: 0,
        }),
      ],
    }),

    defineField({
      name: 'mediaInteraction',
      title: 'Media Interaction',
      description:
        'Choose how customers interact with product images. [Default = Lightbox]',
      type: 'string',
      group: 'media',
      initialValue: 'lightbox',
      options: {
        list: [
          {
            title: 'Lightbox [Default — click to view fullscreen]',
            value: 'lightbox',
          },
          {
            title: 'Zoom on Hover [magnify without leaving page]',
            value: 'zoom',
          },
          {title: 'None [no interaction]', value: 'none'},
        ],
        layout: 'radio',
      },
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
