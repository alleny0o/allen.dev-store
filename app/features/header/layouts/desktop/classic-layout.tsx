import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/features/navigation';
import {Logo} from '../../components/header-logo';
import type {HeaderLayoutProps} from '../../types';

/**
 * Desktop header layout with logo and navigation grouped on left, actions on right.
 */
export function ClassicLayout({logoWidth}: HeaderLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex h-full w-full items-stretch justify-between">
      {/* Left group: Logo + Nav together */}
      <div className="flex items-stretch gap-8">
        <div className="flex items-center">
          <Link aria-label="Home" className="group" prefetch="intent" to={homePath}>
            <Logo
              className="h-auto w-(--logoWidth)"
              sizes={logoWidth}
              style={
                {
                  '--logoWidth': logoWidth || 'auto',
                } as CSSProperties
              }
            />
          </Link>
        </div>

        <DesktopNavigation />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center">
        {/* actions */}
      </div>
    </div>
  );
}
