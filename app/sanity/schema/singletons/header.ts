import {defineField, defineType} from 'sanity';

const GROUPS = [
  {
    name: 'navigation',
    title: 'Navigation',
    default: true,
  },
  {
    name: 'announcementBar',
    title: 'Announcement Bar',
  },
  {
    name: 'settings',
    title: 'Settings',
  },
];

export default defineType({
  name: 'header',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,
  fields: [
    // Navigation Fields
    defineField({
      name: 'menu',
      title: 'Menu',
      group: 'navigation',
      type: 'internationalizedArrayHeaderNavigation',
    }),

    // Announcement Bar Fields
    defineField({
      name: 'announcementBar',
      title: 'Announcement bar content',
      group: 'announcementBar',
      type: 'internationalizedArrayAnnouncementBar',
    }),
    defineField({
      name: 'announcementBarColorScheme',
      title: 'Color scheme',
      type: 'reference',
      group: 'announcementBar',
      to: [{type: 'colorScheme'}],
    }),
    defineField({
      name: 'autoRotateAnnouncements',
      title: 'Auto rotate announcements',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: false,
    }),
    defineField({
      name: 'showAnnouncementArrows',
      title: 'Show navigation arrows',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: true,
    }),
    defineField({
      name: 'announcementBarTextSize',
      title: 'Text size',
      type: 'rangeSlider',
      group: 'announcementBar',
      options: {
        min: 10,
        max: 15,
        suffix: 'px',
      },
      initialValue: 13,
      validation: (Rule) => Rule.min(10).max(15),
    }),
    defineField({
      name: 'announcementBarPadding',
      title: 'Padding',
      type: 'padding',
      group: 'announcementBar',
    }),

    // Settings: Layout
    defineField({
      name: 'desktopLayout',
      title: 'Desktop header layout',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {
            title: 'LOGO - NAV   <->   ACTIONS',
            value: 'classic',
          },
          {
            title: 'NAV   <->   LOGO   <->   ACTIONS',
            value: 'centerLogo',
          },
          {
            title: 'LOGO   <->   NAV   <->   ACTIONS',
            value: 'threeColumn',
          },
          {
            title: 'LOGO   <->   NAV - ACTIONS',
            value: 'splitRight',
          },
        ],
      },
      initialValue: 'classic',
    }),
    defineField({
      name: 'mobileLayout',
      title: 'Mobile header layout',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {
            title: '☰ 🔍   <->   LOGO   <->   ACTIONS',
            value: 'balanced',
          },
          {
            title: '☰ LOGO   <->   ACTIONS',
            value: 'menuLeft',
          },
          {
            title: 'LOGO   <->   🔍 🛒 👤 ☰  (ACTIONS cluster)',
            value: 'brandLeft',
          },
        ],
      },
      initialValue: 'menuLeft',
    }),

    // Settings: Logo
    defineField({
      name: 'desktopLogoWidth',
      title: 'Desktop logo width',
      type: 'rangeSlider',
      group: 'settings',
      options: {
        min: 0,
        max: 400,
        suffix: 'px',
      },
      initialValue: 100,
      validation: (Rule) => Rule.min(0).max(400),
    }),

    // Settings: Actions
    defineField({
      name: 'showWishlist',
      title: 'Show wishlist action',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'accountStyleDesktop',
      title: 'Desktop account display',
      description: 'Mobile always uses icon.',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text (Account)', value: 'text'},
        ],
      },
      initialValue: 'icon',
    }),
    defineField({
      name: 'cartStyleDesktop',
      title: 'Desktop cart display',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text (Cart)', value: 'text'},
        ],
      },
      initialValue: 'icon',
    }),
    defineField({
      name: 'cartStyleMobile',
      title: 'Mobile cart display',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text ([count])', value: 'text'},
        ],
      },
      initialValue: 'icon',
    }),

    // Settings: Appearance
    defineField({
      name: 'colorScheme',
      title: 'Color scheme',
      type: 'reference',
      group: 'settings',
      to: [{type: 'colorScheme'}],
    }),
    defineField({
      name: 'blur',
      title: 'Background blur',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'showSeparatorLine',
      title: 'Show separator line',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'padding',
      title: 'Header padding',
      type: 'padding',
      group: 'settings',
    }),

    // Settings: Behavior
    defineField({
      name: 'sticky',
      title: 'Sticky header',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'On scroll up', value: 'onScrollUp'},
          {title: 'Always', value: 'always'},
        ],
      },
      initialValue: 'none',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Header'}),
  },
});
