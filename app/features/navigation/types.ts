// navigation/types.ts
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

/** Full menu array from header settings */
export type HeaderMenu = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['menu']
>;

/** Single menu item (internal link, external link, or mega menu) */
export type MenuItem = HeaderMenu[number];

/** Internal link menu item type */
export type InternalLinkType = Extract<MenuItem, {_type: 'internalLink'}>;

/** External link menu item type */
export type ExternalLinkType = Extract<MenuItem, {_type: 'externalLink'}>;

/** Mega menu item type */
export type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

/** Link section content block within mega menu */
export type LinkSectionType = Extract<
  NonNullable<MegaMenuType['content']>[number],
  {_type: 'linkSection'}
>;

/** Image block content block within mega menu */
export type ImageBlockType = Extract<
  NonNullable<MegaMenuType['content']>[number],
  {_type: 'imageBlock'}
>;
