/**
 * Builds a new URL by swapping the locale prefix.
 *
 * Strips the current locale prefix (if any) from the pathname,
 * prepends the new locale's pathPrefix, and preserves the rest
 * of the path and search params.
 *
 * @example
 * buildLocaleUrl('/en-us/products/shirt', '/fr-fr', '?color=blue')
 * // → '/fr-fr/products/shirt?color=blue'
 *
 * @example
 * buildLocaleUrl('/', '/fr-fr', '')
 * // → '/fr-fr'
 *
 * @example
 * buildLocaleUrl('/en-us', '/fr-fr', '')
 * // → '/fr-fr'
 */
export function buildLocaleUrl(
  pathname: string,
  nextPathPrefix: string,
  search: string = '',
): string {
  // Strip existing locale prefix if present (e.g. /en-us, /fr-fr)
  const pathWithoutLocale =
    pathname.replace(/^\/[a-z]{2}-[a-z]{2}/i, '') || '/';

  // Build new path: /fr-fr + /products/shirt
  const newPath =
    `${nextPathPrefix}${pathWithoutLocale}`.replace(/\/+$/, '') ||
    nextPathPrefix;

  return `${newPath}${search}`;
}
