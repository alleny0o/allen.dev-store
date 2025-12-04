import {createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode} from 'react';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface MegaMenuContextType {
  openMenu: MegaMenuType | null;
  setOpenMenu: (menu: MegaMenuType | null) => void;
  registerItemRef: (ref: HTMLElement | null) => void;
  registerDropdownRef: (ref: HTMLElement | null) => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | null>(null);

export function MegaMenuProvider({children}: {children: ReactNode}) {
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);
  const itemRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);

  const registerItemRef = useCallback((ref: HTMLElement | null) => {
    itemRef.current = ref;
  }, []);

  const registerDropdownRef = useCallback((ref: HTMLElement | null) => {
    dropdownRef.current = ref;
  }, []);

  // Track mouse position and close menu when outside both elements
  useEffect(() => {
    if (!openMenu) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!itemRef.current || !dropdownRef.current) return;

      const itemRect = itemRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      const isInItem = (
        e.clientX >= itemRect.left &&
        e.clientX <= itemRect.right &&
        e.clientY >= itemRect.top &&
        e.clientY <= itemRect.bottom
      );

      const isInDropdown = (
        e.clientX >= dropdownRect.left &&
        e.clientX <= dropdownRect.right &&
        e.clientY >= dropdownRect.top &&
        e.clientY <= dropdownRect.bottom
      );

      // Close if mouse is outside both elements
      if (!isInItem && !isInDropdown) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [openMenu]);

  return (
    <MegaMenuContext.Provider value={{openMenu, setOpenMenu, registerItemRef, registerDropdownRef}}>
      {children}
    </MegaMenuContext.Provider>
  );
}

export function useMegaMenu() {
  const context = useContext(MegaMenuContext);
  if (!context) {
    throw new Error('useMegaMenu must be used within MegaMenuProvider');
  }
  return context;
}