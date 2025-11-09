export function isInternalPath(pathname: string) {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/cms') ||
    pathname.startsWith('/sanity-preview') ||
    /\.[^/]+$/.test(pathname)
  );
}