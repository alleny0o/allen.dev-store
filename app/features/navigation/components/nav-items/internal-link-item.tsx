// internal-link-item.tsx
import { SanityInternalLink } from "~/components/sanity/link/sanity-internal-link";
import type { InternalLinkType } from "../../types";
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';

interface InternalLinkItemProps {
  item: InternalLinkType;
}

export function InternalLinkItem({ item }: InternalLinkItemProps) {
  const { closeMenu, behavior } = useMegaMenu();

  const handleMouseEnter = () => {
    if (behavior === 'hover') {
      closeMenu();
    }
  };

  return (
    <li className="h-full shrink-0" onMouseEnter={handleMouseEnter}>
      <div className="h-full flex items-center">
        <SanityInternalLink data={item} className="nav-text" />
      </div>
    </li>
  );
}