import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {stegaClean} from '@sanity/client/stega';
import {cx} from 'class-variance-authority';

import {useRootLoaderData} from '~/root';

import {HeaderContext} from './header-context';
import {HeaderWrapper} from './header-wrapper';

import {MegaMenuDropdown} from '~/features/navigation/mega-menu/components/mega-menu-dropdown';
import {MegaMenuProvider} from '~/features/navigation/mega-menu/context/mega-menu-context';

import {CenterLogoLayout} from '../layouts/desktop/center-logo-layout';
import {ClassicLayout} from '../layouts/desktop/classic-layout';
import {SplitRightLayout} from '../layouts/desktop/split-right-layout';
import {ThreeColumnLayout} from '../layouts/desktop/three-column-layout';

import {BalancedLayout} from '../layouts/mobile/balanced-layout';
import {BrandLeftLayout} from '../layouts/mobile/brand-left-layout';
import {MenuLeftLayout} from '../layouts/mobile/menu-left-layout';

/** Z-index for sticky header positioning */
const STICKY_HEADER_Z_INDEX = 'z-50';

/**
 * Main site header component with responsive desktop and mobile layouts.
 * Layout variants and sticky behavior are controlled via Sanity CMS.
 */
export function Header() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  const logoWidth = header?.desktopLogoWidth
    ? `${header.desktopLogoWidth}px`
    : undefined;

  const desktopLayout = stegaClean(header?.desktopLayout);
  const mobileLayout = stegaClean(header?.mobileLayout);
  const sticky = stegaClean(header?.sticky);

  return (
    <HeaderContext.Provider value={header ?? null}>
      <MegaMenuProvider>
        <div
          data-header-wrapper
          role="banner"
          className={cx(
            'relative',
            sticky !== 'none' && `sticky top-0 ${STICKY_HEADER_Z_INDEX}`,
          )}
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

          <MegaMenuDropdown />
        </div>
      </MegaMenuProvider>
    </HeaderContext.Provider>
  );
}
