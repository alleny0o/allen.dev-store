import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {ClientOnly} from '~/components/client-only';
import {MobileNavigation, MobileNavigationTrigger} from '~/features/navigation';
import {Logo} from '../../components/header-logo';
import {useHeaderSettings} from '~/features/header';

type BalancedLayoutProps = {
  logoWidth?: string;
};

/**
 * Mobile header layout with menu/search left, centered logo, actions right.
 */
export function BalancedLayout({logoWidth}: BalancedLayoutProps) {
  const homePath = useLocalePath({path: '/'});
  const header = useHeaderSettings();
  const menu = header?.menu ?? [];

  return (
    <div className="flex items-center justify-between">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4">
        <ClientOnly fallback={<MobileNavigationTrigger />}>
          {() => <MobileNavigation data={menu} />}
        </ClientOnly>
        {/* search */}
      </div>

      {/* Center: Logo */}
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

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* actions */}
      </div>
    </div>
  );
}
