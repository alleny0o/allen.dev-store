import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {ClientOnly} from '~/components/client-only';
import {MobileNavigation} from '~/components/navigation/mobile-navigation.client';
import {MobileNavigationTrigger} from '~/components/navigation/mobile-navigation-trigger';

import {Logo} from '../../header-logo';

type BalancedLayoutProps = {
  logoWidth?: string;
  menu?: any;
};

export function BalancedLayout({logoWidth, menu}: BalancedLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="flex items-center justify-between">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4">
        <ClientOnly fallback={<MobileNavigationTrigger />}>
          {() => <MobileNavigation data={menu} />}
        </ClientOnly>
        {/* TODO: Search icon */}
      </div>

      {/* Center: Logo */}
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

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* TODO: Cart, Account, etc */}
      </div>
    </div>
  );
}
