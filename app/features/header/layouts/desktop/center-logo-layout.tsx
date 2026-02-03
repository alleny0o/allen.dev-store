import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/features/navigation';
import {Logo} from '../../components/header-logo';

type CenterLogoLayoutProps = {
  logoWidth?: string;
};

/**
 * Desktop header layout with centered logo, navigation on left, actions on right.
 */
export function CenterLogoLayout({logoWidth}: CenterLogoLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="grid h-full w-full grid-cols-3 items-center">
      {/* Left: Nav */}
      <div className="flex h-full min-w-0 items-center justify-start">
        <DesktopNavigation />
      </div>

      {/* Center: Logo */}
      <div className="flex h-full items-center justify-center">
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

      {/* Right: Actions */}
      <div className="flex h-full min-w-0 items-center justify-end">
        {/* Actions go here */}
      </div>
    </div>
  );
}
