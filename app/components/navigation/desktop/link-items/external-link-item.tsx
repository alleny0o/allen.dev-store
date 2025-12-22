// external-link-item.tsx
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {ExternalLinkType} from '../../types';
import {useMegaMenu} from '../mega-menu/mega-menu-context';

interface ExternalLinkItemProps {
  item: ExternalLinkType;
}

export function ExternalLinkItem({item}: ExternalLinkItemProps) {
  const {closeMenu, behavior} = useMegaMenu();

  const handleMouseEnter = () => {
    if (behavior === 'hover') {
      closeMenu();
    }
  };

  return (
    <li className="h-full shrink-0" onMouseEnter={handleMouseEnter}>
      <div className="flex h-full items-center">
        <SanityExternalLink data={item} className="nav-text" />
      </div>
    </li>
  );
}