import {SanityExternalLink} from '../../sanity/link/sanity-external-link';
import {SanityInternalLink} from '../../sanity/link/sanity-internal-link';
import {MegaMenu} from './mega/mega-menu';
import {useHeaderSettings} from '~/components/header/header-context';

export function DesktopNavigation() {
  const header = useHeaderSettings();
  const items = header.menu ?? [];
  const gap = header.menuItemGap ?? 20;

  if (!items.length) return null;

  return (
    <nav id="header-nav" aria-label="Main Navigation">
      <ul className="flex items-center" style={{gap: `${gap}px`}}>
        {items.map((item) => (
          <li key={item._key} className="list-none">
            {item._type === 'internalLink' && (
              <SanityInternalLink data={item} className="nav-text" />
            )}

            {item._type === 'externalLink' && (
              <SanityExternalLink data={item} className="nav-text" />
            )}

            {item._type === 'megaMenu' && (
              <MegaMenu data={item} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}