// desktop-navigation.tsx
import {SanityExternalLink} from '../../sanity/link/sanity-external-link';
import {SanityInternalLink} from '../../sanity/link/sanity-internal-link';
import {MegaMenu} from './mega/mega-menu';
import {useHeaderSettings} from '~/components/header/header-context';
import type {CSSProperties} from 'react';

export function DesktopNavigation() {
  const header = useHeaderSettings();
  const items = header.menu ?? [];

  if (!items.length) return null;

  const gap = header.menuItemGap !== undefined ? header.menuItemGap : 8;
  const paddingX = header.menuItemPaddingX !== undefined ? header.menuItemPaddingX : 4;
  const paddingY = header.menuItemPaddingY !== undefined ? header.menuItemPaddingY : 4;

  const navStyles = {
    '--nav-gap': `${gap}px`,
    '--nav-padding-x': `${paddingX}px`,
    '--nav-padding-y': `${paddingY}px`,
  } as CSSProperties;

  return (
    <nav 
      id="header-nav" 
      aria-label="Main Navigation" 
      className="[&_a.nav-text]:px-(--nav-padding-x) [&_a.nav-text]:py-(--nav-padding-y)"
      style={navStyles}
    >
      <ul className="flex items-center" style={{ gap: 'var(--nav-gap)' }}>
        {items.map((item) => (
          <li key={item._key} className="flex items-center shrink-0">
            {item._type === 'internalLink' && (
              <SanityInternalLink 
                data={item} 
                className="nav-text"
              />
            )}

            {item._type === 'externalLink' && (
              <SanityExternalLink 
                data={item} 
                className="nav-text"
              />
            )}

            {item._type === 'megaMenu' && (
              <MegaMenu 
                data={item} 
                className="nav-text"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}