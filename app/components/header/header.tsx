// header.tsx
import type { ROOT_QUERYResult } from 'types/sanity/sanity.generated';

import {useRootLoaderData} from '~/root';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {sanitizeString} from '~/utils/sanitize';

import {HeaderWrapper} from './header-wrapper';
import {HeaderContext} from './header-context';

// Desktop Layouts
import {ClassicLayout} from './layouts/desktop/classic-layout';
import {CenterLogoLayout} from './layouts/desktop/center-logo-layout';
import {ThreeColumnLayout} from './layouts/desktop/three-column-layout';
import {SplitRightLayout} from './layouts/desktop/split-right-layout';

// Mobile Layouts
import {BalancedLayout} from './layouts/mobile/balanced-layout';
import {MenuLeftLayout} from './layouts/mobile/menu-left-layout';
import {BrandLeftLayout} from './layouts/mobile/brand-left-layout';
import header from '~/sanity/schema/singletons/header';

export function Header() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  const logoWidth = header?.desktopLogoWidth
    ? `${header.desktopLogoWidth}px`
    : undefined;

  const colorsCssVars = useColorsCssVars({
    selector: 'header',
    settings: header,
  });

  const desktopLayout = sanitizeString(header?.desktopLayout, 'classic');
  const mobileLayout = sanitizeString(header?.mobileLayout, 'menuLeft');

  return (
    <HeaderContext.Provider value={header ?? null}>
      <HeaderWrapper>
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />

        <div className="h-full w-full">
          {/* Desktop Layout - only show on lg+ screens */}
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

          {/* Mobile Layout - only show on smaller screens */}
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
    </HeaderContext.Provider>
  );
}