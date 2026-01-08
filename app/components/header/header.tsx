// header.tsx
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {stegaClean} from '@sanity/client/stega';
import {cx} from 'class-variance-authority';

import {useRootLoaderData} from '~/root';

import {HeaderWrapper} from './header-wrapper';
import {HeaderContext} from './header-context';

import {MegaMenuProvider} from '~/features/navigation/mega-menu/context/mega-menu-context';
import {MegaMenuDropdown} from '~/features/navigation/mega-menu/components/mega-menu-dropdown';

// Desktop layouts
import {ClassicLayout} from './layouts/desktop/classic-layout';
import {CenterLogoLayout} from './layouts/desktop/center-logo-layout';
import {ThreeColumnLayout} from './layouts/desktop/three-column-layout';
import {SplitRightLayout} from './layouts/desktop/split-right-layout';

// Mobile layouts
import {BalancedLayout} from './layouts/mobile/balanced-layout';
import {MenuLeftLayout} from './layouts/mobile/menu-left-layout';
import {BrandLeftLayout} from './layouts/mobile/brand-left-layout';

export function Header() {
  // Load header data
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  // Logo width for both desktop and mobile layouts
  const logoWidth = header?.desktopLogoWidth
    ? `${header.desktopLogoWidth}px`
    : undefined;

  // Normalize layout values with fallbacks
  const desktopLayout = stegaClean(header?.desktopLayout);
  const mobileLayout = stegaClean(header?.mobileLayout);
  const sticky = stegaClean(header?.sticky);

  return (
    <HeaderContext.Provider value={header ?? null}>
      <MegaMenuProvider>
        {/* Wrapper for positioning context */}
        <div
          data-header-wrapper
          className={cx('relative', sticky !== 'none' && 'sticky top-0 z-50')}
        >
          <HeaderWrapper>

            <div className="h-full w-full">
              {/* Desktop layout (lg+) */}
              <div className="hidden lg:block">
                {desktopLayout === 'classic' && (
                  <ClassicLayout logoWidth={logoWidth} />
                )}
                {desktopLayout === 'centerLogo' && (
                  <CenterLogoLayout logoWidth={logoWidth} />
                )}
                {desktopLayout === 'threeColumn' && (
                  <ThreeColumnLayout logoWidth={logoWidth} />
                )}
                {desktopLayout === 'splitRight' && (
                  <SplitRightLayout logoWidth={logoWidth} />
                )}
              </div>

              {/* Mobile layout (below lg) */}
              <div className="lg:hidden">
                {mobileLayout === 'balanced' && (
                  <BalancedLayout logoWidth={logoWidth} />
                )}
                {mobileLayout === 'menuLeft' && (
                  <MenuLeftLayout logoWidth={logoWidth} />
                )}
                {mobileLayout === 'brandLeft' && (
                  <BrandLeftLayout logoWidth={logoWidth} />
                )}
              </div>
            </div>
          </HeaderWrapper>

          {/* Dropdown for mega menu content - outside HeaderWrapper */}
          <MegaMenuDropdown />
        </div>
      </MegaMenuProvider>
    </HeaderContext.Provider>
  );
}
