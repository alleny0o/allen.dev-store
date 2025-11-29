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
    //
    // ────────────────────────────────────────────
    // NAVIGATION
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'menu',
      title: 'Menu',
      group: 'navigation',
      type: 'internationalizedArrayHeaderNavigation',
    }),
    defineField({
      name: 'menuItemGap',
      title: 'Menu item gap',
      type: 'rangeSlider',
      group: 'navigation',
      options: {
        min: 0,
        max: 50,
        suffix: 'px',
      },
      initialValue: 20,
    }),

    //
    // ────────────────────────────────────────────
    // ANNOUNCEMENT BAR – content + behavior
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'announcementBar',
      title: 'Announcement bar content',
      group: 'announcementBar',
      type: 'internationalizedArrayAnnouncementBar',
    }),
    defineField({
      name: 'utilityLinks',
      title: 'Utility links',
      description:
        'Links shown on the right side (e.g., Help, Stocklists, Services)',
      type: 'internationalizedArrayLinks',
      group: 'announcementBar',
    }),

    // Behavior settings that are Announcement-Bar-specific
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

    //
    // ────────────────────────────────────────────
    // SETTINGS — Global header settings
    // ────────────────────────────────────────────
    //

    // Layout
    defineField({
      name: 'desktopLayout',
      title: 'Desktop header layout',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'LOGO - NAV   <->   ACTIONS', value: 'classic'},
          {title: 'NAV   <->   LOGO   <->   ACTIONS', value: 'centerLogo'},
          {title: 'LOGO   <->   NAV   <->   ACTIONS', value: 'threeColumn'},
          {title: 'LOGO   <->   NAV - ACTIONS', value: 'splitRight'},
        ],
        layout: 'radio',
      },
      initialValue: 'classic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileLayout',
      title: 'Mobile header layout',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: '☰ 🔍   <->   LOGO   <->   ACTIONS', value: 'balanced'},
          {title: '☰ LOGO   <->   ACTIONS', value: 'menuLeft'},
          {title: 'LOGO   <->   🔍 🛒 👤 ☰', value: 'brandLeft'},
        ],
        layout: 'radio',
      },
      initialValue: 'menuLeft',
      validation: (Rule) => Rule.required(),
    }),

    // Logo
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

    // Actions visibility
    defineField({
      name: 'showLocalizationSelector',
      title: 'Show localization selector',
      description: 'Displays country and language selector',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'showWishlist',
      title: 'Show wishlist action',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),

    // Actions styling
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
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
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
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
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
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
    }),

    //
    // Appearance — Global + announcement bar (moved here)
    //
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

    // (MOVED into Settings)
    defineField({
      name: 'announcementBarColorScheme',
      title: 'Announcement bar color scheme',
      type: 'reference',
      group: 'settings',
      to: [{type: 'colorScheme'}],
    }),
    defineField({
      name: 'announcementBarPadding',
      title: 'Announcement bar padding',
      type: 'padding',
      group: 'settings',
    }),

    //
    // Behavior
    //
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
        layout: 'radio',
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare: () => ({title: 'Header'}),
  },
});
