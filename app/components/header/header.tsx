import type {CSSProperties} from 'react';
import {Link} from 'react-router';

import {useRootLoaderData} from '~/root';
import {useLocalePath} from '~/hooks/use-locale-path';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';

import {ClientOnly} from '~/components/client-only';
import {DesktopNavigation} from '~/components/navigation/desktop-navigation';
import {MobileNavigation} from '~/components/navigation/mobile-navigation.client';
import {MobileNavigationTrigger} from '~/components/navigation/mobile-navigation-trigger';
// import {CartDrawer} from '../layout/cart-drawer.client';

import {Logo} from './header-logo';
import {HeaderWrapper} from './header-wrapper';

export function Header() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const header = data?.header;

  const homePath = useLocalePath({path: '/'});

  const logoWidth = header?.desktopLogoWidth
    ? `${header.desktopLogoWidth}px`
    : undefined;

  const colorsCssVars = useColorsCssVars({
    selector: 'header',
    settings: header,
  });

  return (
    <HeaderWrapper>
      <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />

      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Right side */}
          <div className="flex items-center">
            <DesktopNavigation data={header?.menu} />

            {/* <CartDrawer /> */}

            <ClientOnly fallback={<MobileNavigationTrigger />}>
              {() => <MobileNavigation data={header?.menu} />}
            </ClientOnly>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}
