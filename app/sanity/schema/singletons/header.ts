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
    name: 'layout',
    title: 'Layout',
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
    // announcement bar fields
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

    // navigation fields
    defineField({
      name: 'menu',
      group: 'navigation',
      type: 'internationalizedArrayHeaderNavigation',
    }),

    // layout fields
    defineField({
      name: 'layoutPreset',
      title: 'Header Layout',
      type: 'string',
      group: 'layout',
      description:
        'Choose how the header arranges logo, navigation, and icons.',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Logo (left) • Nav (center) • Icons (right)',
            value: 'logo-left_nav-center_icons-right',
          },
          {
            title: 'Logo (left) • Nav + Icons (right)',
            value: 'logo-left_space-between_nav-icons-right',
          },
          {
            title: 'Nav (left) • Logo (center) • Icons (right)',
            value: 'nav-left_logo-center_icons-right',
          },
        ],
      },
      initialValue: 'logo-left_nav-center_icons-right',
    }),

    // settings fields
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
