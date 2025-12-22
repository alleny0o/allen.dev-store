// desktop-navigation.tsx
import {useHeaderSettings} from '~/components/header/header-context';

import {
  HeaderMenu,
  InternalLinkType,
  ExternalLinkType,
  MegaMenuType,
} from '../types';

import {InternalLinkItem} from './link-items/internal-link-item';
import {ExternalLinkItem} from './link-items/external-link-item';
import {MegaMenuItem} from './link-items/mega-menu-item';

import type {CSSProperties} from 'react';

export const DesktopNavigation = () => {
  const header = useHeaderSettings();
  const items: HeaderMenu = header.menu ?? [];

  if (!items.length) return null;

  const paddingX = header.menuItemPaddingX ?? 4;
  const paddingY = header.menuItemPaddingY ?? 4;

  const navStyles = {
    '--nav-padding-x': `${paddingX}px`,
    '--nav-padding-y': `${paddingY}px`,
  } as CSSProperties;

  return (
    <nav
      id="header-nav"
      aria-label="Main Navigation"
      className="h-full [&_:is(a,button).nav-text]:px-(--nav-padding-x) [&_:is(a,button).nav-text]:py-(--nav-padding-y)"      style={navStyles}
    >
      <ul className="flex h-full items-center">
        {items.map((item) => {
          switch (item._type) {
            case 'internalLink':
              return (
                <InternalLinkItem
                  key={item._key}
                  item={item as InternalLinkType}
                />
              );

            case 'externalLink':
              return (
                <ExternalLinkItem
                  key={item._key}
                  item={item as ExternalLinkType}
                />
              );

            case 'megaMenu':
              return (
                <MegaMenuItem key={item._key} item={item as MegaMenuType} />
              );

            default:
              return null;
          }
        })}
      </ul>
    </nav>
  );
};
