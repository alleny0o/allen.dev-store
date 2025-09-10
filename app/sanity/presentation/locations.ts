import {defineLocations} from 'sanity/presentation';
import {SUPPORTED_CONTENT_LANGUAGES} from '~/lib/locale/sanity-languages';

const languages = SUPPORTED_CONTENT_LANGUAGES;
const defaultLanguage = languages[0];

const localizedPath = (id: string, path: string) =>
  id === defaultLanguage.id ? path : `/${id}${path}`;

const createLocations = (doc: any, path: string) =>
  languages.map(({id, title}) => ({
    href: localizedPath(id, path),
    title: `${doc?.title || 'Untitled'} (${title})`,
  }));

export const locations = {
  home: defineLocations({
    select: {},
    resolve: () => ({
      locations: createLocations({title: 'Home'}, '/'),
    }),
  }),

  page: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: createLocations(
        {
          title:
            doc?.title?.find(
              (t: {_key: string}) => t._key === defaultLanguage.id,
            )?.value || 'Page',
        },
        `/${doc?.slug}`,
      ),
    }),
  }),

  product: defineLocations({
    select: {title: 'store.title', slug: 'store.slug.current'},
    resolve: (doc) => ({
      locations: createLocations(doc, `/products/${doc?.slug}`),
    }),
  }),

  collection: defineLocations({
    select: {title: 'store.title', slug: 'store.slug.current'},
    resolve: (doc) => ({
      locations: createLocations(doc, `/collections/${doc?.slug}`),
    }),
  }),
};
