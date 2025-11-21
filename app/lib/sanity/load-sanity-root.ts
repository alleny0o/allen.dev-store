/**
 * Loads Sanity root-level content in the correct language,
 * and generates SEO metadata tied to that content.
 *
 * Keeping this outside root.tsx keeps the loader clean and readable.
 */
import {seoPayload} from '../../lib/seo.server';
import {ROOT_QUERY} from '../../data/sanity/queries';
import {SanityLoader} from './sanity.server';

export async function loadSanityRoot(
  sanity: SanityLoader,
  env: any,
  request: Request,
  locale: any,
) {
  const sanityRoot = await sanity.loadQuery(ROOT_QUERY, {
    language: locale?.language?.toLowerCase() || 'en',
    defaultLanguage: 'en',
  });

  const seo = seoPayload.root({
    root: sanityRoot.data,
    sanity: {
      dataset: env.PUBLIC_SANITY_STUDIO_DATASET,
      projectId: env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
    },
    url: request.url,
  });

  return {sanityRoot, seo};
}