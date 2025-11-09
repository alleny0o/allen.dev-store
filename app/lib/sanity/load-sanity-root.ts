/**
 * Loads Sanity root-level content in the correct language,
 * and generates SEO metadata tied to that content.
 *
 * Keeping this outside root.tsx keeps the loader clean and readable.
 */

import {seoPayload} from '../../lib/seo.server';
import {ROOT_QUERY} from '../../data/sanity/queries';

export async function loadSanityRoot(
  sanity: any,
  env: any,
  request: Request,
  locale: any,
) {
  // Fetch the top-level Sanity content in the correct language
  const sanityRoot = await sanity.loadQuery(ROOT_QUERY, {
    language: locale.language.toLowerCase() || 'en',
    defaultLanguage: 'en',
  });

  // Generate SEO metadata based on CMS content
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
