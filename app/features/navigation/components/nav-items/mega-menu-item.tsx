// mega-menu-item.tsx
import {useRef, useEffect, useState} from 'react';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {MegaMenuType} from '../../types';
import {useMegaMenu} from '../../mega-menu/context/mega-menu-context';
import {useNavHoverClasses} from '../../hooks/use-nav-hover-classes';

interface MegaMenuItemProps {
  item: MegaMenuType;
}

/**
 * Mega menu navigation item
 * Supports hover and click behaviors with optional parent links
 */
export function MegaMenuItem({item}: MegaMenuItemProps) {
  const {
    openMenu,
    setOpenMenu,
    closeMenu,
    behavior,
    allowParentLinks,
    registerItemRef,
  } = useMegaMenu();

  const hoverClasses = useNavHoverClasses('navigation');

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
    } else if (behavior === 'click') {
      // In click mode, hovering over a different mega menu closes the current one
      if (openMenu && openMenu._key !== item._key) {
        closeMenu();
      }
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
      role="none"
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex h-full items-center">
        {hasLink ? (
          <SanityReferenceLink
            data={item.link}
            className={`nav-text ${hoverClasses} ${isOpen ? 'active' : ''}`}
            onClick={handleClick}
            role="menuitem"
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            {label}
          </SanityReferenceLink>
        ) : (
          <button
            type="button"
            className={`nav-text cursor-pointer ${hoverClasses} ${isOpen ? 'active' : ''}`}
            onClick={handleClick}
            role="menuitem"
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            {label}
          </button>
        )}
      </div>
    </li>
  );
}