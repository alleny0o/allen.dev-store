import {useRootLoaderData} from '~/root';

export function useLocalePath({path}: {path: string}) {
  const {locale} = useRootLoaderData();
  const pathPrefix = locale.pathPrefix; // ex: "/en-us"

  if (pathPrefix) {
    return `${pathPrefix}${path}`;
  }

  return path;
}
