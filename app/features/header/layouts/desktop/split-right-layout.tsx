import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/features/navigation';
import {Logo} from '../../components/header-logo';

type SplitRightLayoutProps = {
  logoWidth?: string;
};

/**
 * Desktop header layout with logo on left, navigation and actions grouped on right.
 */
export function SplitRightLayout({logoWidth}: SplitRightLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex h-full items-stretch justify-between">
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
      <div className="flex h-full items-stretch gap-8">
        <DesktopNavigation />
        <div className="flex items-center">{/* actions */}</div>
      </div>
    </div>
  );
}
