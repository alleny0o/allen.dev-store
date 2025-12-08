// header-wrapper.tsx
import {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import React from 'react';
import {cx} from 'class-variance-authority';
import {stegaClean} from '@sanity/client/stega';

import {useRootLoaderData} from '~/root';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';

import {HeaderAnimation} from './header-animation';
import {HeaderHeightCssVars} from './header-height-css-vars';

export function HeaderWrapper({children}: {children: React.ReactNode}) {
  // Load header data from Sanity
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  // Extract header settings
  const separatorLine = header?.separatorLine;
  const blur = header?.blur;
  const sticky = stegaClean(header?.sticky);
  const headerMinHeight = header?.headerMinHeight ?? 80;

  // Generate CSS variables for header appearance
  const headerCssVars = useColorsCssVars({
    selector: '#header',
    settings: {
      colorScheme: header?.colorScheme ?? null,
      padding: null, // Header does not use padding
      separatorLine: header?.separatorLine ?? null,
    },
  });

  // Build header class names based on user settings
  const headerClassName = cx(
    'container min-h-[var(--header-min-height)] bg-background text-foreground',
    blur &&
      'bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/85',
    separatorLine?.show && 'separator-line',
  );

  // Render animated header only when sticky behavior is "onScrollUp"
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: headerCssVars}} />

      {sticky === 'onScrollUp' ? (
        <HeaderAnimation
          id="header"
          className={headerClassName}
          style={
            {
              '--header-min-height': `${headerMinHeight}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </HeaderAnimation>
      ) : (
        <header
          id="header"
          className={headerClassName}
          style={
            {
              '--header-min-height': `${headerMinHeight}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </header>
      )}

      {/* Injects --header-height and related CSS vars */}
      <HeaderHeightCssVars />
    </>
  );
}
