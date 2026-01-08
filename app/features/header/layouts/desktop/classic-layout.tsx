import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {DesktopNavigation} from '~/features/navigation';

import { Logo } from '../../components/header-logo';

type ClassicLayoutProps = {
  logoWidth?: string;
};

export function ClassicLayout({logoWidth}: ClassicLayoutProps) {
  const homePath = useLocalePath({path: '/'});

  return (
    <div className="h-full w-full flex items-stretch justify-between">  {/* ← items-stretch instead */}
      {/* Left group: Logo + Nav together */}
      <div className="flex items-stretch gap-8">  {/* ← items-stretch */}
        <div className="flex items-center">  {/* ← logo centered within its space */}
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

        <DesktopNavigation />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center">
        {/* actions */}
      </div>
    </div>
  );
}
