import React from 'react';
import {cx} from 'class-variance-authority';
import {stegaClean} from '@sanity/client/stega';

import {useRootLoaderData} from '~/root';
import {headerVariants} from '~/components/cva/header';

import {HeaderAnimation} from './header-animation';
import {HeaderHeightCssVars} from './header-height-css-vars';

export function HeaderWrapper({children}: {children: React.ReactNode}) {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const header = data?.header;

  const showSeparatorLine = header?.showSeparatorLine;
  const blur = header?.blur;
  const sticky = stegaClean(header?.sticky);

  const headerClassName = cx(
    'bg-background section-padding text-foreground',
    sticky !== 'none' && 'sticky top-0 z-50',
    blur &&
      'bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/85',
    headerVariants({
      optional: showSeparatorLine ? 'separator-line' : null,
    }),
  );

  return (
    <>
      {sticky === 'onScrollUp' ? (
        <HeaderAnimation className={headerClassName}>
          {children}
        </HeaderAnimation>
      ) : (
        <header className={headerClassName}>{children}</header>
      )}

      <HeaderHeightCssVars />
    </>
  );
}
