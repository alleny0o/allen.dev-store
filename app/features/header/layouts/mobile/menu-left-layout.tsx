import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {ClientOnly} from '~/components/client-only';
import {MobileNavigation, MobileNavigationTrigger} from '~/features/navigation';

import { Logo } from '../../components/header-logo';
import {useHeaderSettings} from '~/features/header';

type MenuLeftLayoutProps = {
  logoWidth?: string;
};

export function MenuLeftLayout({logoWidth}: MenuLeftLayoutProps) {
  const homePath = useLocalePath({path: '/'});
  const header = useHeaderSettings();
  const menu = header.menu ?? [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ClientOnly fallback={<MobileNavigationTrigger />}>
          {() => <MobileNavigation data={menu} />}
        </ClientOnly>

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

      <div className="flex items-center gap-4">
        {/* actions */}
      </div>
    </div>
  );
}
