// mega-menu-item.tsx
import { SanityReferenceLink } from "~/components/sanity/link/sanity-reference-link";
import { useMegaMenu } from "../mega-menu/mega-menu-context";
import type { MegaMenuType } from "../../types";
import { useRef, useEffect } from "react";

interface MegaMenuItemProps {
  item: MegaMenuType;
}

export function MegaMenuItem({ item }: MegaMenuItemProps) {
  const { openMenu, setOpenMenu, registerItemRef } = useMegaMenu();
  const label = item.name ?? "Menu";
  const itemRef = useRef<HTMLLIElement>(null);
  const isOpen = openMenu?._key === item._key;

  // Register this item's ref when it becomes open
  useEffect(() => {
    if (isOpen && itemRef.current) {
      registerItemRef(itemRef.current);
    }
  }, [isOpen, registerItemRef]);

  const handleMouseEnter = () => setOpenMenu(item);

  return (
    <li
      ref={itemRef}
      className="h-full shrink-0"
      onMouseEnter={handleMouseEnter}
    >
      <div className="h-full flex items-center">
        {item.link ? (
          <SanityReferenceLink data={item.link} className="nav-text">
            {label}
          </SanityReferenceLink>
        ) : (
          <span className="nav-text">{label}</span>
        )}
      </div>
    </li>
  );
}