import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {ClientOnly} from '~/components/client-only';
import {MobileNavigation} from '~/components/navigation/mobile-navigation.client';
import {MobileNavigationTrigger} from '~/components/navigation/mobile-navigation-trigger';

import {Logo} from '../../header-logo';
import {useHeaderSettings} from '~/components/header/header-context';

type BrandLeftLayoutProps = {
  logoWidth?: string;
};

export function BrandLeftLayout({logoWidth}: BrandLeftLayoutProps) {
  const homePath = useLocalePath({path: '/'});
  const header = useHeaderSettings();
  const menu = header.menu ?? [];

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

      {/* Right: Actions cluster */}
      <div className="flex items-center gap-4">
        {/* search */}
        {/* cart */}
        {/* account */}

        <ClientOnly fallback={<MobileNavigationTrigger />}>
          {() => <MobileNavigation data={menu} />}
        </ClientOnly>
      </div>
    </div>
  );
}
