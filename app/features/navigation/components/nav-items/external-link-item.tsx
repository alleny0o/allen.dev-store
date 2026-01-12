// external-link-item.tsx
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {ExternalLinkType} from '../../types';
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';
import {useNavHoverClasses} from '../../hooks/use-nav-hover-classes';

interface ExternalLinkItemProps {
  item: ExternalLinkType;
}

export function ExternalLinkItem({item}: ExternalLinkItemProps) {
  const {closeMenu } = useMegaMenu();
  const hoverClasses = useNavHoverClasses('navigation');

  const handleMouseEnter = () => {
    closeMenu(); // Always close mega menu when hovering internal links
  };

  return (
    <li className="h-full shrink-0" onMouseEnter={handleMouseEnter}>
      <div className="flex h-full items-center">
        <SanityExternalLink
          data={item}
          className={`nav-text ${hoverClasses}`}
        />
      </div>
    </li>
  );
}
