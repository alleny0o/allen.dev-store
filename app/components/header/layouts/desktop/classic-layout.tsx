import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/components/navigation/desktop/desktop-navigation';

import {Logo} from '../../header-logo';
import {useHeaderSettings} from '~/components/header/header-context';

type ClassicLayoutProps = {
  logoWidth?: string;
};

export function ClassicLayout({logoWidth}: ClassicLayoutProps) {
  const homePath = useLocalePath({path: '/'});
  const header = useHeaderSettings(); // ⬅️ Get full header object

  const menu = header.menu ?? [];

  return (
    <div className="h-full w-full flex items-center justify-between">
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

        {/* No more props — DesktopNavigation reads from context */}
        <DesktopNavigation />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center">
        {/* Example future actions */}
        {/* <Search /> */}
        {/* <Account /> */}
        {/* <Wishlist /> */}
        {/* <CartDrawer /> */}
      </div>
    </div>
  );
}
