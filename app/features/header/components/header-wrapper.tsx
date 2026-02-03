import {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import React from 'react';
import {cx} from 'class-variance-authority';
import {stegaClean} from '@sanity/client/stega';

import {useRootLoaderData} from '~/root';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';

import {HeaderAnimation} from './header-animation';

/** Default minimum height for the header in pixels */
const DEFAULT_HEADER_MIN_HEIGHT = 80;

/**
 * Wrapper component that provides header styling, CSS variables, and scroll behavior.
 * Renders either an animated header (on scroll-up sticky) or a static header element.
 */
export function HeaderWrapper({children}: {children: React.ReactNode}) {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  const separatorLine = header?.separatorLine;
  const blur = header?.blur;
  const sticky = stegaClean(header?.sticky);
  const headerMinHeight = header?.headerMinHeight ?? DEFAULT_HEADER_MIN_HEIGHT;

  const headerCssVars = useColorsCssVars({
    selector: '#header',
    settings: {
      colorScheme: header?.colorScheme ?? null,
      padding: null,
      separatorLine: header?.separatorLine ?? null,
    },
  });

  const headerClassName = cx(
    'container min-h-[var(--header-min-height)] bg-background text-foreground',
    blur &&
      'bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/85',
    separatorLine?.show && 'separator-line',
  );

  const headerStyle = {
    '--header-min-height': `${headerMinHeight}px`,
  } as React.CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: headerCssVars}} />

      {sticky === 'onScrollUp' ? (
        <HeaderAnimation
          id="header"
          className={headerClassName}
          style={headerStyle}
        >
          {children}
        </HeaderAnimation>
      ) : (
        <header id="header" className={headerClassName} style={headerStyle}>
          {children}
        </header>
      )}
    </>
  );
}
