import {defineQuery} from 'groq';

/**
 * LINK REFERENCE FRAGMENT
 * Resolves internal document references to their slug
 */
export const LINK_REFERENCE_FRAGMENT = defineQuery(`{
  'documentType': _type,
  'slug': coalesce(
    slug,
    store.slug
  ) {
    _type,
    current
  },
}`);

/**
 * INTERNAL LINK FRAGMENT
 * Links to pages within the site (with optional anchor)
 */
export const INTERNAL_LINK_FRAGMENT = defineQuery(`{
  _key,
  _type,
  anchor,
  link -> ${LINK_REFERENCE_FRAGMENT},
  name,
}`);

/**
 * EXTERNAL LINK FRAGMENT
 * Links to external URLs (with optional new tab setting)
 */
export const EXTERNAL_LINK_FRAGMENT = defineQuery(`{
  _key,
  _type,
  link,
  name,
  openInNewTab,
}`);

/**
 * MEGA MENU BLOCK FRAGMENTS
 * Reusable content blocks for mega menus
 */
export const LINK_SECTION_FRAGMENT = defineQuery(`{
  _key,
  _type,
  heading,
  headingLink -> ${LINK_REFERENCE_FRAGMENT},
  links[] {
    _type == "externalLink" => ${EXTERNAL_LINK_FRAGMENT},
    _type == "internalLink" => ${INTERNAL_LINK_FRAGMENT},
  }
}`);

export const IMAGE_BLOCK_FRAGMENT = defineQuery(`{
  _key,
  _type,
  image,
  aspectRatio,
  borderRadius,
  heading,
  description,
  contentLayout,
  overlayOpacity,
  overlayTextColor,
  link -> ${LINK_REFERENCE_FRAGMENT},
  linkText,
  linkStyle,
  ctaColorScheme,
  ctaPaddingX,
  ctaPaddingY,
  ctaBorderRadius,
  ctaHoverEffect,
  hoverEffect,
}`);

const CONTENT_BLOCKS_QUERY = `[] {
  _type == "linkSection" => ${LINK_SECTION_FRAGMENT},
  _type == "imageBlock" => ${IMAGE_BLOCK_FRAGMENT},
}`;

/**
 * MEGA MENU FRAGMENT
 * Supports two layout modes:
 * - Grid: All blocks flow in a uniform grid (content array)
 * - Sections: Blocks organized into vertical columns (section1-6 arrays)
 */
export const MEGA_MENU_FRAGMENT = defineQuery(`{
  _key,
  _type,
  name,
  link -> ${LINK_REFERENCE_FRAGMENT},
  layout,
  
  // Grid mode fields
  gridLayout,
  content${CONTENT_BLOCKS_QUERY},
  
  // Section mode fields
  sectionPreset,
  section1${CONTENT_BLOCKS_QUERY},
  section2${CONTENT_BLOCKS_QUERY},
  section3${CONTENT_BLOCKS_QUERY},
  section4${CONTENT_BLOCKS_QUERY},
  section5${CONTENT_BLOCKS_QUERY},
  section6${CONTENT_BLOCKS_QUERY},
}`);

/**
 * LINKS LIST SELECTION
 * Handles all navigation item types (external links, internal links, mega menus)
 */
export const LINKS_LIST_SELECTION = defineQuery(`{
  _type == "externalLink" => ${EXTERNAL_LINK_FRAGMENT},
  _type == "internalLink" => ${INTERNAL_LINK_FRAGMENT},
  _type == "megaMenu" => ${MEGA_MENU_FRAGMENT},
}`);
