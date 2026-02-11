import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useLocalePath} from '~/hooks/use-locale-path';
import {MobileNavigation} from '~/features/navigation';
import {Logo} from '../../components/header-logo';
import {useHeaderSettings} from '../../components/header-context';
import type {HeaderLayoutProps} from '../../types';

/**
 * Mobile header layout with logo on left, actions and menu grouped on right.
 */
export function BrandLeftLayout({logoWidth}: HeaderLayoutProps) {
  const homePath = useLocalePath({path: '/'});
  const header = useHeaderSettings();
  const menu = header?.menu ?? [];

  return (
    <div className="flex items-center justify-between">
      {/* Left: Logo */}
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

      {/* Right: Actions cluster */}
      <div className="flex items-center gap-4">
        {/* search */}
        {/* cart */}
        {/* account */}
        <MobileNavigation data={menu} />
      </div>
    </div>
  );
}
