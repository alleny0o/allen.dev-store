/**
 * Server-side helper for resolving the user's locale before the app renders.
 *
 * This runs:
 * - The Shopify localization query
 * - The locale resolution logic (URL → Cookie → Accept-Language → Default)
 * - Returns the locale result + redirect instructions
 *
 * Keeping this outside of root.tsx keeps root.tsx easier to read.
 */

import {resolveEffectiveLocale} from './resolver';
import {ALL_LOCALIZATION_QUERY} from '../../data/shopify/queries';

export async function resolveLocaleServer(context: any, request: Request) {
  const url = new URL(request.url);

  // Fetch all available Shopify markets (countries + languages)
  const localizations = await context.storefront.query(ALL_LOCALIZATION_QUERY, {
    cache: context.storefront.CacheLong(),
  });

  // Determine which locale should be used for this request
  const {locale, cookie, shouldRedirect, redirectUrl} = resolveEffectiveLocale(
    request,
    localizations,
    url.pathname,
  );

  return {locale, localizations, cookie, shouldRedirect, redirectUrl};
}
