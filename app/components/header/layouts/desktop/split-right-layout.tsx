import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/components/navigation/desktop/desktop-navigation';

import {Logo} from '../../header-logo';

type SplitRightLayoutProps = {
  logoWidth?: string;
};

export function SplitRightLayout({logoWidth}: SplitRightLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex items-center justify-between">
      <Link className="group" prefetch="intent" to={homePath}>
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

      <div className="flex items-center gap-8">
        <DesktopNavigation />

        <div className="flex items-center">
          {/* actions */}
        </div>
      </div>
    </div>
  );
}
