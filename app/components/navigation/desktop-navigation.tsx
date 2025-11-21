import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

import {SanityExternalLink} from '../sanity/link/sanity-external-link';
import {SanityInternalLink} from '../sanity/link/sanity-internal-link';
import {cn} from 'app/lib/utils';

export type NavigationProps = NonNullable<ROOT_QUERYResult['header']>['menu'];

export function DesktopNavigation(props: {data?: NavigationProps}) {
  const items = props.data ?? [];

  if (!items.length) return null;

  return (
    <nav id="header-nav" aria-label="Main Navigation">
      <ul className="flex items-center gap-2">
        {items.map((item) => (
          <li key={item._key} className="list-none">
            {item._type === 'internalLink' && (
              <SanityInternalLink
                data={item}
              />
            )}

            {item._type === 'externalLink' && (
              <SanityExternalLink
                data={item}
              />
            )}

            {/* if it's nestedNavigation, ignore it / skip it */}
            {/* or render nothing, whatever you prefer */}
          </li>
        ))}
      </ul>
    </nav>
  );
}
