import {defineField, defineType} from 'sanity';

//
// ────────────────────────────────────────────
// GROUPS (professional structure)
// ────────────────────────────────────────────
//
const GROUPS = [
  {name: 'navigation', title: 'Navigation', default: true},
  {name: 'announcementBar', title: 'Announcement Bar'},
  {name: 'layout', title: 'Layout'},
  {name: 'appearance', title: 'Appearance'},
  {name: 'actions', title: 'Actions'},
  {name: 'megaMenu', title: 'Mega Menu'},
  {name: 'behavior', title: 'Behavior'},
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
      options: {min: 0, max: 16, suffix: 'px'},
      initialValue: 8,
    }),
    defineField({
      name: 'menuItemPaddingX',
      title: 'Menu item horizontal padding',
      type: 'rangeSlider',
      group: 'navigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),
    defineField({
      name: 'menuItemPaddingY',
      title: 'Menu item vertical padding',
      type: 'rangeSlider',
      group: 'navigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),

    //
    // ────────────────────────────────────────────
    // ANNOUNCEMENT BAR — content + behavior
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
      description: 'Links on the right side (e.g., Help, Stocklists, Services)',
      type: 'internationalizedArrayLinks',
      group: 'announcementBar',
    }),
    defineField({
      name: 'fadeTransition',
      title: 'Use fade transition',
      description: 'Fade between announcements instead of sliding',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: false,
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

    //
    // ────────────────────────────────────────────
    // LAYOUT (global header layout)
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'desktopLayout',
      title: 'Desktop header layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'LOGO - NAV <-> ACTIONS', value: 'classic'},
          {title: 'NAV <-> LOGO <-> ACTIONS', value: 'centerLogo'},
          {title: 'LOGO <-> NAV <-> ACTIONS', value: 'threeColumn'},
          {title: 'LOGO <-> NAV - ACTIONS', value: 'splitRight'},
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
      group: 'layout',
      options: {
        list: [
          {title: '☰ 🔍 <-> LOGO <-> ACTIONS', value: 'balanced'},
          {title: '☰ LOGO <-> ACTIONS', value: 'menuLeft'},
          {title: 'LOGO <-> 🔍 🛒 👤 ☰', value: 'brandLeft'},
        ],
        layout: 'radio',
      },
      initialValue: 'menuLeft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopLogoWidth',
      title: 'Desktop logo width',
      type: 'rangeSlider',
      group: 'layout',
      options: {min: 0, max: 400, suffix: 'px'},
      initialValue: 100,
      validation: (Rule) => Rule.min(0).max(400),
    }),
    defineField({
      name: 'headerMinHeight',
      title: 'Header minimum height',
      description: 'Minimum header height (content may expand beyond this)',
      type: 'rangeSlider',
      group: 'layout',
      options: {min: 0, max: 100, suffix: 'px'},
      initialValue: 0,
    }),

    //
    // ────────────────────────────────────────────
    // APPEARANCE (global header styling)
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'colorScheme',
      title: 'Header color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'appearance',
    }),
    defineField({
      name: 'blur',
      title: 'Background blur',
      type: 'boolean',
      group: 'appearance',
      initialValue: false,
    }),
    defineField({
      name: 'showSeparatorLine',
      title: 'Show header separator line',
      type: 'boolean',
      group: 'appearance',
      initialValue: true,
    }),
    defineField({
      name: 'announcementBarColorScheme',
      title: 'Announcement bar color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'appearance',
    }),
    defineField({
      name: 'announcementBarPadding',
      title: 'Announcement bar padding',
      type: 'padding',
      group: 'appearance',
    }),

    //
    // ────────────────────────────────────────────
    // ACTIONS (account, cart, wishlist, localization)
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'showLocalizationSelector',
      title: 'Show localization selector',
      type: 'boolean',
      group: 'actions',
      initialValue: false,
    }),
    defineField({
      name: 'showWishlist',
      title: 'Show wishlist action',
      type: 'boolean',
      group: 'actions',
      initialValue: false,
    }),
    defineField({
      name: 'accountStyleDesktop',
      title: 'Account display (desktop)',
      description: 'Mobile always uses icon.',
      type: 'string',
      group: 'actions',
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
      title: 'Cart display (desktop)',
      type: 'string',
      group: 'actions',
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
      title: 'Cart display (mobile)',
      type: 'string',
      group: 'actions',
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
    // ────────────────────────────────────────────
    // MEGA MENU — appearance + behavior
    // ────────────────────────────────────────────
    //
    // Appearance
    defineField({
      name: 'megaMenuColorScheme',
      title: 'Mega menu color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'megaMenu',
    }),
    defineField({
      name: 'megaMenuPadding',
      title: 'Mega menu padding',
      type: 'padding',
      group: 'megaMenu',
    }),
    defineField({
      name: 'megaMenuShowSeparatorLine',
      title: 'Mega menu separator line',
      type: 'boolean',
      group: 'megaMenu',
      initialValue: true,
    }),

    // Behavior — your added fields included here
    defineField({
      name: 'megaMenuBehavior',
      title: 'Mega Menu Interaction',
      type: 'string',
      group: 'megaMenu',
      options: {
        list: [
          {title: 'Hover to open (Traditional)', value: 'hover'},
          {title: 'Click to open (Shinola style)', value: 'click'},
        ],
        layout: 'radio',
      },
      initialValue: 'hover',
      description:
        'How mega menus open on desktop. Touch devices always use tap.',
    }),
    defineField({
      name: 'allowMegaMenuParentLinks',
      title: 'Allow parent navigation links',
      type: 'boolean',
      group: 'megaMenu',
      initialValue: true,
      description:
        'If enabled, parent menu items can have links. If disabled, they only toggle the menu.',
    }),
    defineField({
      name: 'megaMenuDisableScroll',
      title: 'Disable scroll when mega menu is open',
      type: 'boolean',
      group: 'megaMenu',
      initialValue: false,
    }),
    defineField({
      name: 'megaMenuShowOverlay',
      title: 'Show overlay when mega menu is open',
      type: 'boolean',
      group: 'megaMenu',
      initialValue: false,
    }),
    defineField({
      name: 'megaMenuOverlayOpacity',
      title: 'Mega menu overlay opacity',
      type: 'rangeSlider',
      group: 'megaMenu',
      options: {min: 0, max: 100, suffix: '%'},
      initialValue: 50,
      hidden: ({parent}) => !parent?.megaMenuShowOverlay,
    }),

    //
    // ────────────────────────────────────────────
    // BEHAVIOR — global header behavior
    // ────────────────────────────────────────────
    //
    defineField({
      name: 'sticky',
      title: 'Sticky header',
      type: 'string',
      group: 'behavior',
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
