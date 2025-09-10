import {useRootLoaderData} from '~/root';

export function useLocalePath({path}: {path: string}) {
  const {locale} = useRootLoaderData();
  const pathPrefix = locale.pathPrefix;

  if (pathPrefix) {
    return `/${pathPrefix}${path}`;
  }

  return path;
}
