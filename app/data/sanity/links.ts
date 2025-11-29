import {defineQuery} from 'groq';

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

export const INTERNAL_LINK_FRAGMENT = defineQuery(`{
  _key,
  _type,
  anchor,
  link -> ${LINK_REFERENCE_FRAGMENT},
  name,
}`);

export const EXTERNAL_LINK_FRAGMENT = defineQuery(`{
  _key,
  _type,
  link,
  name,
  openInNewTab,
}`);

export const MEGA_MENU_FRAGMENT = defineQuery(`{
  _key,
  _type,
  name,
  link -> ${LINK_REFERENCE_FRAGMENT},
  content[] {
    _type == "linkSection" => {
      _key,
      _type,
      heading,
      headingLink -> ${LINK_REFERENCE_FRAGMENT},
      links[] {
        _type == "externalLink" => ${EXTERNAL_LINK_FRAGMENT},
        _type == "internalLink" => ${INTERNAL_LINK_FRAGMENT},
      }
    },
    _type == "imageBlock" => {
      _key,
      _type,
      image,
      alt,
      heading,
      description,
      link -> ${LINK_REFERENCE_FRAGMENT},
      linkText,
    }
  }
}`);

export const LINKS_LIST_SELECTION = defineQuery(`{
  _type == "externalLink" => ${EXTERNAL_LINK_FRAGMENT},
  _type == "internalLink" => ${INTERNAL_LINK_FRAGMENT},
  _type == "megaMenu" => ${MEGA_MENU_FRAGMENT},
}`);