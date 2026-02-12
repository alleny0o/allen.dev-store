import {defineField, defineType} from 'sanity';
import sidebarConfig from '../objects/aside/sidebar-config';
import modalConfig from '../objects/aside/modal-config';

/**
 * GROUPS
 */
const GROUPS = [
  {name: 'trigger', title: 'Trigger', default: true},
  {name: 'display', title: 'Display Mode'},
  {name: 'sidebar', title: 'Sidebar Config'},
  {name: 'modal', title: 'Modal Config'},
];

export default defineType({
  name: 'localeSelector',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,

  fields: [
    /**
     * ============================================================================
     * TRIGGER
     * Controls how the locale selector button looks.
     * ============================================================================
     */
    defineField({
      name: 'triggerVariant',
      title: 'Trigger variant',
      type: 'string',
      group: 'trigger',
      description: 'What the locale selector button displays',
      options: {
        list: [
          {title: 'Icon only (Globe)', value: 'icon'},
          {title: 'Flag only', value: 'flag'},
          {title: 'Flag + Country', value: 'flag-country'},
          {title: 'Flag + Country + Language', value: 'flag-country-lang'},
        ],
        layout: 'radio',
      },
      initialValue: 'flag-country',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showChevron',
      title: 'Show chevron',
      type: 'boolean',
      group: 'trigger',
      description: 'Show a chevron icon next to the trigger button',
      initialValue: true,
    }),

    /**
     * ============================================================================
     * DISPLAY MODE
     * Controls how the selector opens and at which breakpoints.
     * ============================================================================
     */
    defineField({
      name: 'displayModeKind',
      title: 'Display mode',
      type: 'string',
      group: 'display',
      description:
        'Use the same mode on all screen sizes, or different modes per breakpoint',
      options: {
        list: [
          {title: 'Single (same on all screens)', value: 'single'},
          {title: 'Responsive (different per breakpoint)', value: 'responsive'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
      validation: (Rule) => Rule.required(),
    }),

    // ── Single mode ───────────────────────────────────────────────────────────
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      group: 'display',
      description: 'How the locale selector opens on all screen sizes',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'radio',
      },
      initialValue: 'dropdown',
      hidden: ({document}) => document?.displayModeKind !== 'single',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if (ctx.document?.displayModeKind === 'single' && !value) {
            return 'Required when display mode is Single';
          }
          return true;
        }),
    }),

    // ── Responsive mode ───────────────────────────────────────────────────────
    defineField({
      name: 'modeBase',
      title: 'Base mode (below sm / 640px)',
      type: 'string',
      group: 'display',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'modal',
      hidden: ({document}) => document?.displayModeKind !== 'responsive',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if (ctx.document?.displayModeKind === 'responsive' && !value) {
            return 'Required when display mode is Responsive';
          }
          return true;
        }),
    }),
    defineField({
      name: 'modeSm',
      title: 'Mode from sm (640px)',
      type: 'string',
      group: 'display',
      description: 'Leave blank to inherit from base',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({document}) => document?.displayModeKind !== 'responsive',
    }),
    defineField({
      name: 'modeMd',
      title: 'Mode from md (768px)',
      type: 'string',
      group: 'display',
      description: 'Leave blank to inherit from sm',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({document}) => document?.displayModeKind !== 'responsive',
    }),
    defineField({
      name: 'modeLg',
      title: 'Mode from lg (1024px)',
      type: 'string',
      group: 'display',
      description: 'Leave blank to inherit from md',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({document}) => document?.displayModeKind !== 'responsive',
    }),

    /**
     * ============================================================================
     * SIDEBAR CONFIG
     * Only relevant when sidebar mode is selected at any breakpoint.
     * ============================================================================
     */
    defineField({
      ...sidebarConfig,
      name: 'sidebarConfig',
      title: 'Sidebar configuration',
      group: 'sidebar',
    }),

    /**
     * ============================================================================
     * MODAL CONFIG
     * Only relevant when modal mode is selected at any breakpoint.
     * ============================================================================
     */
    defineField({
      ...modalConfig,
      name: 'modalConfig',
      title: 'Modal configuration',
      group: 'modal',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Locale Selector'}),
  },
});
