import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/components/navigation/desktop-navigation';

import {Logo} from '../../header-logo';

type SplitRightLayoutProps = {
  logoWidth?: string;
  menu?: any;
};

export function SplitRightLayout({logoWidth, menu}: SplitRightLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex items-center justify-between">
      {/* Left: Logo */}
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

      {/* Right group: Nav + Actions together */}
      <div className="flex items-center gap-8">
        <DesktopNavigation data={menu} />

        <div className="flex items-center">
          {/* <CartDrawer /> */}
          {/* TODO: Add other desktop actions */}
        </div>
      </div>
    </div>
  );
}
