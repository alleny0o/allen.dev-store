import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/features/navigation';
import {Logo} from '../../components/header-logo';

type ThreeColumnLayoutProps = {
  logoWidth?: string;
};

/**
 * Desktop header layout with three equal columns: logo left, nav center, actions right.
 */
export function ThreeColumnLayout({logoWidth}: ThreeColumnLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="grid h-full grid-cols-3 items-center">
      <div className="flex h-full min-w-0 items-center justify-start">
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

      <div className="flex h-full min-w-0 items-center justify-center">
        <DesktopNavigation />
      </div>

      <div className="flex h-full min-w-0 items-center justify-end">
        {/* actions */}
      </div>
    </div>
  );
}
