// external-link-item.tsx
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {ExternalLinkType} from '../../types';
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';
import {useNavHoverClasses} from '../../hooks/use-nav-hover-classes';

interface ExternalLinkItemProps {
  item: ExternalLinkType;
}

/**
 * External link navigation item
 * Closes any open mega menu on hover
 */
export function ExternalLinkItem({item}: ExternalLinkItemProps) {
  const {closeMenu} = useMegaMenu();
  const hoverClasses = useNavHoverClasses('navigation');

  const handleMouseEnter = () => {
    closeMenu();
  };

  return (
    <li className="h-full shrink-0" role="none" onMouseEnter={handleMouseEnter}>
      <div className="flex h-full items-center">
        <SanityExternalLink data={item} className={`nav-text ${hoverClasses}`} />
      </div>
    </li>
  );
}
