// internal-link-item.tsx
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import type {InternalLinkType} from '../../types';
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';
import {useNavHoverClasses} from '../../hooks/use-nav-hover-classes';

interface InternalLinkItemProps {
  item: InternalLinkType;
}

export function InternalLinkItem({item}: InternalLinkItemProps) {
  const {closeMenu} = useMegaMenu();
  const hoverClasses = useNavHoverClasses('navigation');

  const handleMouseEnter = () => {
    closeMenu(); // Always close mega menu when hovering internal links
  };

  return (
    <li className="h-full shrink-0" onMouseEnter={handleMouseEnter}>
      <div className="flex h-full items-center">
        <SanityInternalLink
          data={item}
          className={`nav-text ${hoverClasses}`}
        />
      </div>
    </li>
  );
}
