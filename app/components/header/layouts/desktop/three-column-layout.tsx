import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/components/navigation/desktop-navigation';

import {Logo} from '../../header-logo';

type ThreeColumnLayoutProps = {
  logoWidth?: string;
  menu?: any;
};

export function ThreeColumnLayout({logoWidth, menu}: ThreeColumnLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="grid grid-cols-3 items-center">
      {/* Left: Logo */}
      <div className="flex min-w-0 items-center justify-start">
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
      </div>

      {/* Center: Nav */}
      <div className="flex min-w-0 items-center justify-center">
        <DesktopNavigation data={menu} />
      </div>

      {/* Right: Actions */}
      <div className="flex min-w-0 items-center justify-end">
        {/* <CartDrawer /> */}
        {/* TODO: Add other desktop actions */}
      </div>
    </div>
  );
}
