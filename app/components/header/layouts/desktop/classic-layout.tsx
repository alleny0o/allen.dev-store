import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/components/navigation/desktop-navigation';

import {Logo} from '../../header-logo';

type ClassicLayoutProps = {
  logoWidth?: string;
  menu?: any; // We can type this better later
};

export function ClassicLayout({logoWidth, menu}: ClassicLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex items-center justify-between">
      {/* Left group: Logo + Nav together */}
      <div className="flex items-center gap-8">
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

        <DesktopNavigation data={menu} />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center">
        {/* <CartDrawer /> */}
        {/* TODO: Add other desktop actions (search, account, wishlist, cart, localization) */}
      </div>
    </div>
  );
}
