// internal-link-item.tsx
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import type {InternalLinkType} from '../../types';
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';
import {useNavHoverClasses} from '../../hooks/use-nav-hover-classes';

interface InternalLinkItemProps {
  item: InternalLinkType;
}

/**
 * Internal link navigation item
 * Closes any open mega menu on hover
 */
export function InternalLinkItem({item}: InternalLinkItemProps) {
  const {closeMenu} = useMegaMenu();
  const hoverClasses = useNavHoverClasses('navigation');

  const handleMouseEnter = () => {
    closeMenu();
  };

  return (
    <li className="h-full shrink-0" role="none" onMouseEnter={handleMouseEnter}>
      <div className="flex h-full items-center">
        <SanityInternalLink data={item} className={`nav-text ${hoverClasses}`} />
      </div>
    </li>
  );
}
