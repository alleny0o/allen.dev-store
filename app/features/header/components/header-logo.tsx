import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

import {SanityImage} from '~/components/sanity/sanity-image';
import {useRootLoaderData} from '~/root';

/**
 * Renders the site logo from Sanity CMS settings.
 * Falls back to site name text if no logo image is configured.
 */
export function Logo(props: {
  className?: string;
  loading?: 'eager' | 'lazy';
  sanityEncodeData?: string;
  sizes?: string;
  style?: React.CSSProperties;
}) {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const sanitySettings = data?.settings;
  const logo = sanitySettings?.logo;
  const siteName = sanitySettings?.siteName;

  if (!logo?._ref) {
    return (
      <div className="flex h-11 items-center justify-center font-heading text-2xl pointer-fine:group-hover:text-accent-foreground">
        {siteName}
      </div>
    );
  }

  return (
    <SanityImage
      data={{
        ...logo,
        altText: siteName || '',
      }}
      {...props}
    />
  );
}