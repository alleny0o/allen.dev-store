// mega-menu-item.tsx
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import {useMegaMenu} from '../mega-menu/mega-menu-context';
import type {MegaMenuType} from '../../types';
import {useRef, useEffect, useState} from 'react';

interface MegaMenuItemProps {
  item: MegaMenuType;
}

export function MegaMenuItem({item}: MegaMenuItemProps) {
  const {
    openMenu,
    setOpenMenu,
    closeMenu,
    behavior,
    allowParentLinks,
    registerItemRef,
  } = useMegaMenu();

  const label = item.name ?? 'Menu';
  const isOpen = openMenu?._key === item._key;
  const hasLink = allowParentLinks && item.link;

  const [touchOpened, setTouchOpened] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  // Register this item's ref when it becomes the open menu
  useEffect(() => {
    if (isOpen && itemRef.current) {
      registerItemRef(itemRef.current);
    }
  }, [isOpen, registerItemRef]);

  // Reset touchOpened when menu closes (fixes iPad bug)
  useEffect(() => {
    if (!isOpen) {
      setTouchOpened(false);
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (behavior === 'hover') {
      setOpenMenu(item);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // SCENARIO 1: Touch device with parent link (any behavior mode)
    if (isTouch && hasLink) {
      if (!touchOpened) {
        e.preventDefault();
        setOpenMenu(item);
        setTouchOpened(true);
      }
      // Second tap: navigate (don't preventDefault)
    }
    
    // SCENARIO 2: Click mode with parent link (desktop)
    else if (behavior === 'click' && hasLink) {
      if (!isOpen) {
        // First click: open menu
        e.preventDefault();
        setOpenMenu(item);
      }
      // Second click: navigate (don't preventDefault)
    }
    
    // SCENARIO 3: Click mode without parent link
    else if (behavior === 'click') {
      e.preventDefault();
      if (isOpen) {
        closeMenu();
        setTouchOpened(false);
      } else {
        setOpenMenu(item);
      }
    }
    
    // SCENARIO 4: Hover mode (desktop) - let link navigate naturally
  };

  return (
    <li
      ref={itemRef}
      className="h-full shrink-0"
      onMouseEnter={handleMouseEnter}
    >
      <div className="h-full flex items-center">
        {hasLink ? (
          <SanityReferenceLink
            data={item.link}
            className="nav-text"
            onClick={handleClick}
          >
            {label}
          </SanityReferenceLink>
        ) : (
          <button
            type="button"
            className="nav-text cursor-pointer"
            onClick={handleClick}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {label}
          </button>
        )}
      </div>
    </li>
  );
}