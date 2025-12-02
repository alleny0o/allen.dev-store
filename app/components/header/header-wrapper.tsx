// header-wrapper.tsx
import { ROOT_QUERYResult } from 'types/sanity/sanity.generated';
import React, {type CSSProperties} from 'react';
import {cx} from 'class-variance-authority';
import {stegaClean} from '@sanity/client/stega';

import {useRootLoaderData} from '~/root';
import {headerVariants} from '~/components/cva/header';

import {HeaderAnimation} from './header-animation';
import {HeaderHeightCssVars} from './header-height-css-vars';

export function HeaderWrapper({children}: {children: React.ReactNode}) {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  const showSeparatorLine = header?.showSeparatorLine;
  const blur = header?.blur;
  const sticky = stegaClean(header?.sticky);
  const headerMinHeight = header?.headerMinHeight ?? 80;
  
  const headerClassName = cx(
    'container bg-background text-foreground min-h-[var(--header-min-height)]',
    sticky !== 'none' && 'sticky top-0 z-50',
    blur &&
      'bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/85',
    headerVariants({
      optional: showSeparatorLine ? 'separator-line' : null,
    }),
  );

  const headerStyle = {
    '--header-min-height': `${headerMinHeight}px`,
  } as CSSProperties;

  return (
    <>
      {sticky === 'onScrollUp' ? (
        <HeaderAnimation className={headerClassName} style={headerStyle}>
          {children}
        </HeaderAnimation>
      ) : (
        <header className={headerClassName} style={headerStyle}>
          {children}
        </header>
      )}

      <HeaderHeightCssVars />
    </>
  );
}