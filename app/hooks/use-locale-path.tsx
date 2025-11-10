import {useRootLoaderData} from '~/root';

export function useLocalePath({path}: {path: string}) {
  const {locale} = useRootLoaderData();
  const pathPrefix = locale.pathPrefix; // ex: "/en-us"

  if (pathPrefix) {
    const cleanPath = path === '/' ? '' : path;
    return `${pathPrefix}${cleanPath}`;
  }

  return path;
}
