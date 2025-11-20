import {useRootLoaderData} from '~/root';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';

import {HeaderWrapper} from './header-wrapper';

// Desktop Layouts
import {ClassicLayout} from './layouts/desktop/classic-layout';
import {CenterLogoLayout} from './layouts/desktop/center-logo-layout';
import {ThreeColumnLayout} from './layouts/desktop/three-column-layout';
import {SplitRightLayout} from './layouts/desktop/split-right-layout';

// Mobile Layouts
import {BalancedLayout} from './layouts/mobile/balanced-layout';
import {MenuLeftLayout} from './layouts/mobile/menu-left-layout';
import {BrandLeftLayout} from './layouts/mobile/brand-left-layout';

export function Header() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const header = data?.header;

  const logoWidth = header?.desktopLogoWidth
    ? `${header.desktopLogoWidth}px`
    : undefined;

  const colorsCssVars = useColorsCssVars({
    selector: 'header',
    settings: header,
  });

  const desktopLayout = header?.desktopLayout || 'classic';
  const mobileLayout = header?.mobileLayout || 'menuLeft';

  return (
    <HeaderWrapper>
      <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />

      <div className="container">
        {/* Desktop Layout - only show on lg+ screens */}
        <div className="hidden lg:block">
          {desktopLayout === 'classic' && (
            <ClassicLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
          {desktopLayout === 'centerLogo' && (
            <CenterLogoLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
          {desktopLayout === 'threeColumn' && (
            <ThreeColumnLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
          {desktopLayout === 'splitRight' && (
            <SplitRightLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
        </div>

        {/* Mobile Layout - only show below lg screens */}
        <div className="lg:hidden">
          {mobileLayout === 'balanced' && (
            <BalancedLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
          {mobileLayout === 'menuLeft' && (
            <MenuLeftLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
          {mobileLayout === 'brandLeft' && (
            <BrandLeftLayout logoWidth={logoWidth} menu={header?.menu} />
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}
