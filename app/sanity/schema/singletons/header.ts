import {defineField, defineType} from 'sanity';

/**
 * GROUPS
 * Professional grouping structure for the header schema.
 * Desktop and mobile are now clearly separated.
 */
const GROUPS = [
  {name: 'navigation', title: 'Navigation', default: true},
  {name: 'desktopNavigation', title: 'Desktop Navigation'},
  {name: 'desktopMegaMenu', title: 'Desktop Mega Menu'},
  {name: 'mobileNavigation', title: 'Mobile Navigation'},
  {name: 'announcementBar', title: 'Announcement Bar'},
  {name: 'layout', title: 'Layout'},
  {name: 'appearance', title: 'Appearance'},
  {name: 'actions', title: 'Actions'},
  {name: 'behavior', title: 'Behavior'},
];

export default defineType({
  name: 'header',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,

  fields: [
    /**
     * ============================================================================
     * NAVIGATION
     * Menu structure shared across desktop and mobile.
     * ============================================================================
     */
    defineField({
      name: 'menu',
      title: 'Menu',
      group: 'navigation',
      type: 'internationalizedArrayHeaderNavigation',
      description: 'Navigation structure used for both desktop and mobile',
    }),

    /**
     * ============================================================================
     * DESKTOP NAVIGATION
     * Desktop navigation link styling.
     * ============================================================================
     */
    defineField({
      name: 'desktopNavigationTypography',
      title: 'Desktop navigation typography',
      type: 'fontStyleOverride',
      group: 'desktopNavigation',
      description: 'Typography for desktop navigation links',
    }),
    defineField({
      name: 'desktopMenuItemPaddingX',
      title: 'Desktop menu item horizontal padding',
      type: 'rangeSlider',
      group: 'desktopNavigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),
    defineField({
      name: 'desktopMenuItemPaddingY',
      title: 'Desktop menu item vertical padding',
      type: 'rangeSlider',
      group: 'desktopNavigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),
    defineField({
      name: 'desktopNavigationHoverEffect',
      title: 'Navigation link hover effect',
      type: 'string',
      group: 'desktopNavigation',
      description: 'Hover animation for desktop navigation links',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),

    /**
     * ============================================================================
     * DESKTOP MEGA MENU
     * Desktop mega menu appearance, behavior, and animations.
     * ============================================================================
     */
    defineField({
      name: 'desktopMegaMenuColorScheme',
      title: 'Desktop mega menu color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'desktopMegaMenu',
    }),
    defineField({
      name: 'desktopMegaMenuHeadingTypography',
      title: 'Desktop mega menu heading typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for desktop mega menu section headings',
    }),
    defineField({
      name: 'desktopMegaMenuHeadingHoverEffect',
      title: 'Heading link hover effect',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Hover animation for mega menu heading links',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'desktopMegaMenuLinkTypography',
      title: 'Desktop mega menu link typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for desktop mega menu links',
    }),
    defineField({
      name: 'desktopMegaMenuLinkHoverEffect',
      title: 'Sublink hover effect',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Hover animation for mega menu sublinks',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'desktopMegaMenuImageBlockHeadingTypography',
      title: 'Desktop mega menu image block heading typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for image block headings',
    }),
    defineField({
      name: 'desktopMegaMenuImageBlockDescriptionTypography',
      title: 'Desktop mega menu image block description typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for image block descriptions',
    }),
    defineField({
      name: 'desktopMegaMenuCTATypography',
      title: 'Desktop mega menu CTA typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for CTA buttons in image blocks',
    }),
    defineField({
      name: 'desktopMegaMenuPadding',
      title: 'Desktop mega menu padding',
      type: 'padding',
      group: 'desktopMegaMenu',
    }),
    defineField({
      name: 'desktopMegaMenuSeparatorLine',
      title: 'Desktop mega menu separator line',
      type: 'separatorLine',
      group: 'desktopMegaMenu',
      description: 'Separator between desktop mega menu and content',
    }),
    defineField({
      name: 'desktopMegaMenuBehavior',
      title: 'Desktop mega menu interaction',
      type: 'string',
      group: 'desktopMegaMenu',
      options: {
        list: [
          {title: 'Hover to open (Traditional)', value: 'hover'},
          {title: 'Click to open (Shinola style)', value: 'click'},
        ],
        layout: 'radio',
      },
      initialValue: 'hover',
      description: 'How desktop mega menus open. Touch devices always use tap.',
    }),
    defineField({
      name: 'desktopAllowMegaMenuParentLinks',
      title: 'Allow parent navigation links (desktop)',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: true,
      description:
        'If enabled, parent menu items can have links. If disabled, they only toggle the menu.',
    }),
    defineField({
      name: 'desktopMegaMenuDisableScroll',
      title: 'Disable scroll when desktop mega menu is open',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: false,
    }),
    defineField({
      name: 'desktopMegaMenuShowOverlay',
      title: 'Show overlay when desktop mega menu is open',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: false,
    }),
    defineField({
      name: 'desktopMegaMenuOverlayOpacity',
      title: 'Desktop mega menu overlay opacity',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      options: {min: 0, max: 100, suffix: '%'},
      initialValue: 50,
      hidden: ({parent}) => !parent?.desktopMegaMenuShowOverlay,
    }),
    defineField({
      name: 'desktopMegaMenuAnimation',
      title: 'Dropdown entrance animation',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Animation when the mega menu appears',
      options: {
        list: [
          {title: 'None (Instant)', value: 'none'},
          {title: 'Fade', value: 'fade'},
          {title: 'Slide Down', value: 'slideDown'},
          {title: 'Slide + Fade (Recommended)', value: 'slideFade'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'slideFade',
    }),
    defineField({
      name: 'desktopMegaMenuAnimationDuration',
      title: 'Animation duration',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description: 'How fast the mega menu animates in',
      options: {min: 100, max: 800, suffix: 'ms', step: 50},
      initialValue: 250,
    }),
    defineField({
      name: 'desktopMegaMenuContentStagger',
      title: 'Content stagger animation',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'How links/sections appear inside the mega menu',
      options: {
        list: [
          {title: 'None (All at once)', value: 'none'},
          {title: 'Fade', value: 'fade'},
          {title: 'Lift (Fade + Rise)', value: 'lift'},
          {title: 'Scale (Fade + Zoom)', value: 'scale'},
          {title: 'Blur (Premium)', value: 'blur'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'desktopMegaMenuStaggerDelay',
      title: 'Stagger delay between items',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description: 'Delay between each item animating in',
      options: {min: 30, max: 150, suffix: 'ms', step: 10},
      initialValue: 50,
      hidden: ({parent}) => parent?.desktopMegaMenuContentStagger === 'none',
    }),
    defineField({
      name: 'desktopMegaMenuStaggerStartDelay',
      title: 'Stagger start delay',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description:
        'Delay before stagger begins (useful for matching dropdown animation)',
      options: {min: 0, max: 600, suffix: 'ms', step: 50},
      initialValue: 0,
      hidden: ({parent}) => parent?.desktopMegaMenuContentStagger === 'none',
    }),

    /**
     * ============================================================================
     * MOBILE NAVIGATION
     * Mobile navigation styling (drawer/hamburger menu - future).
     * ============================================================================
     */
    defineField({
      name: 'mobileNavigationTypography',
      title: 'Mobile navigation typography',
      type: 'fontStyleOverride',
      group: 'mobileNavigation',
      description: 'Typography for mobile navigation links',
    }),

    /**
     * ============================================================================
     * ANNOUNCEMENT BAR
     * Controls announcement content and behavior.
     * ============================================================================
     */
    defineField({
      name: 'announcementBar',
      title: 'Announcement bar content',
      group: 'announcementBar',
      type: 'internationalizedArrayAnnouncementBar',
    }),
    defineField({
      name: 'announcementBarTypography',
      title: 'Announcement typography',
      type: 'fontStyleOverride',
      group: 'announcementBar',
      description: 'Typography for announcement bar text',
    }),
    defineField({
      name: 'utilityLinks',
      title: 'Utility links',
      description: 'Links on the right side (e.g., Help, Stocklists, Services)',
      type: 'internationalizedArrayLinks',
      group: 'announcementBar',
    }),
    defineField({
      name: 'utilityLinksTypography',
      title: 'Utility links typography',
      type: 'fontStyleOverride',
      group: 'announcementBar',
      description: 'Typography for utility links',
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
    defineField({
      name: 'announcementArrowSize',
      title: 'Navigation arrow size',
      type: 'rangeSlider',
      group: 'announcementBar',
      options: {min: 16, max: 48, suffix: 'px'},
      initialValue: 24,
      description: 'Size of the announcement navigation arrows',
      hidden: ({parent}) => !parent?.showAnnouncementArrows,
    }),
    defineField({
      name: 'announcementArrowStrokeWidth',
      title: 'Navigation arrow stroke width',
      type: 'rangeSlider',
      group: 'announcementBar',
      options: {min: 1, max: 4, suffix: 'px', step: 0.25},
      initialValue: 2,
      description: 'Thickness of the announcement navigation arrow lines',
      hidden: ({parent}) => !parent?.showAnnouncementArrows,
    }),

    /**
     * ============================================================================
     * LAYOUT
     * Global header layout across screen sizes.
     * ============================================================================
     */
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

    /**
     * ============================================================================
     * APPEARANCE
     * Header color and visual styling.
     * ============================================================================
     */
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
      name: 'separatorLine',
      title: 'Header separator line',
      type: 'separatorLine',
      group: 'appearance',
      description: 'Separator between header and page content',
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

    /**
     * ============================================================================
     * ACTIONS
     * Header actions such as account, cart, wishlist.
     * ============================================================================
     */
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
      name: 'actionsTypography',
      title: 'Actions typography',
      type: 'fontStyleOverride',
      group: 'actions',
      description: 'Typography for action labels (Account, Cart)',
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

    /**
     * ============================================================================
     * BEHAVIOR
     * Global header behavior settings.
     * ============================================================================
     */
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
