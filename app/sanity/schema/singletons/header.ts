import {defineField, defineType} from 'sanity';

const GROUPS = [
  // main menu navigation items
  {
    name: 'navigation',
    title: 'Navigation',
    default: true,
  },

  // announcement bar messaging (optional carousel)
  {
    name: 'announcementBar',
    title: 'Announcement Bar',
  },

  // desktop header structure controls
  {
    name: 'layout',
    title: 'Layout',
  },

  // mobile header structure controls
  {
    name: 'mobileLayout',
    title: 'Mobile Layout',
  },

  // visual and behavioral settings
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
    // ANNOUNCEMENT BAR FIELDS
    defineField({
      name: 'announcementBar',
      group: 'announcementBar',
      type: 'internationalizedArrayAnnouncementBar',
    }),
    defineField({
      name: 'announcementBarColorScheme',
      type: 'reference',
      group: 'announcementBar',
      to: [{type: 'colorScheme'}],
    }),
    defineField({
      name: 'autoRotateAnnouncements',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: false,
    }),

    // NAVIGATION MENU FIELDS
    defineField({
      name: 'menu',
      group: 'navigation',
      type: 'internationalizedArrayHeaderNavigation',
    }),

    // DESKTOP HEADER LAYOUT FIELDS
    defineField({
      name: 'layoutPreset',
      title: 'Desktop header layout',
      type: 'string',
      group: 'layout',
      description:
        'Desktop only. Choose how the header arranges the logo, navigation, and icons. Legend: "•" = space between groups, "+" = placed next to each other within a group.',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Logo • Nav • Icons',
            value: 'layout-1', // logo (left) • nav (center) • icons (right)
          },
          {
            title: 'Logo • (Nav + Icons)',
            value: 'layout-2', // logo (left) • nav+icons (right)
          },
          {
            title: 'Nav • Logo • Icons',
            value: 'layout-3', // nav (left) • logo (center) • icons (right)
          },
          {
            title: '(Logo + Nav) • Icons',
            value: 'layout-4', // logo+nav (left) • icons (right)
          },
        ],
      },
      initialValue: 'layout-1',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'desktopClusterGap',
      title: 'Gap between “+” items',
      type: 'rangeSlider',
      group: 'layout',
      description:
        'Desktop-only. Controls the horizontal gap between items that are adjacent (the “+” in the layout). Example: in “(Logo + Nav) • Icons”, this sets the space between Logo and Nav.',
      options: {
        min: 0,
        max: 48,
        suffix: 'px',
      },
      initialValue: 12,
      validation: (Rule) => Rule.min(0).max(48),
    }),

    // MOBILE HEADER LAYOUT FIELDS
    defineField({
      name: 'mobileLayoutPreset',
      title: 'Mobile header layout',
      type: 'string',
      group: 'mobileLayout',
      description:
        'Mobile-only. • = space between groups, + = grouped next to each other.',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Menu + Search • Logo • Icons',
            value: 'mobile-1',
          },
          {
            title: 'Menu • Logo • Icons',
            value: 'mobile-2',
          },
          {
            title: 'Logo • Icons + Menu',
            value: 'mobile-3',
          },
          {
            title: 'Menu + Logo • Icons',
            value: 'mobile-4',
          },
          {
            title: 'Logo + Menu • Icons',
            value: 'mobile-5',
          },
        ],
      },
      initialValue: 'mobile-1',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mobileClusterGap',
      title: 'Gap between “+” items',
      type: 'rangeSlider',
      group: 'mobileLayout',
      description:
        'Mobile-only. Controls the gap between items grouped with “+” in the mobile header layout. Example: in “Menu + Search • Logo • Icons”, this sets the space between Menu and Search.',
      options: {
        min: 0,
        max: 32,
        suffix: 'px',
      },
      initialValue: 0, // ← slightly tighter than desktop because mobile UI is compact
      validation: (Rule) => Rule.min(0).max(32),
    }),

    // STYLING AND BEHAVIOR SETTINGS
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
    defineField({
      name: 'announcementBarPadding',
      title: 'Announcement bar padding',
      type: 'padding',
      group: 'settings',
    }),
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
  ],
  preview: {
    prepare: () => ({title: 'Header'}),
  },
});
