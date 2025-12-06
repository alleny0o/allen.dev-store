// mega-menu-context.tsx
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {useNavigation} from 'react-router';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {useHeaderSettings} from '~/components/header/header-context';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface MegaMenuContextType {
  openMenu: MegaMenuType | null;
  setOpenMenu: (menu: MegaMenuType | null) => void;
  closeMenu: () => void;
  behavior: 'hover' | 'click';
  allowParentLinks: boolean;
  registerItemRef: (ref: HTMLElement | null) => void;
  registerDropdownRef: (ref: HTMLElement | null) => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | null>(null);

export function MegaMenuProvider({children}: {children: ReactNode}) {
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);
  const navigation = useNavigation();

  const itemRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);

  const header = useHeaderSettings();
  const behavior = (header?.megaMenuBehavior as 'hover' | 'click') || 'hover';
  const allowParentLinks = header?.allowMegaMenuParentLinks ?? true;

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  const registerItemRef = useCallback((ref: HTMLElement | null) => {
    itemRef.current = ref;
  }, []);

  const registerDropdownRef = useCallback((ref: HTMLElement | null) => {
    dropdownRef.current = ref;
  }, []);

  // Auto-close when navigating
  useEffect(() => {
    if (navigation.state === 'loading') {
      closeMenu();
    }
  }, [navigation.state, closeMenu]);

  // HOVER MODE: Track mouse with requestAnimationFrame for best performance
  useEffect(() => {
    if (!openMenu || behavior !== 'hover') return;

    let isMouseMoveActive = false;
    let rafId: number | null = null;

    const activationTimeout = setTimeout(() => {
      isMouseMoveActive = true;
    }, 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseMoveActive) return;
      
      // If we already have a pending frame, skip this event
      if (rafId !== null) return;

      // Schedule check for next animation frame
      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (!itemRef.current || !dropdownRef.current) return;

        const itemRect = itemRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();

        // Add 5px tolerance to prevent overly sensitive detection
        const TOLERANCE = 5;

        const isInItem =
          e.clientX >= itemRect.left - TOLERANCE &&
          e.clientX <= itemRect.right + TOLERANCE &&
          e.clientY >= itemRect.top - TOLERANCE &&
          e.clientY <= itemRect.bottom + TOLERANCE;

        const isInDropdown =
          e.clientX >= dropdownRect.left - TOLERANCE &&
          e.clientX <= dropdownRect.right + TOLERANCE &&
          e.clientY >= dropdownRect.top - TOLERANCE &&
          e.clientY <= dropdownRect.bottom + TOLERANCE;

        if (!isInItem && !isInDropdown) {
          closeMenu();
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove, {passive: true});

    return () => {
      clearTimeout(activationTimeout);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [openMenu, behavior, closeMenu]);

  // CLICK MODE: Click outside to close
  useEffect(() => {
    if (!openMenu || behavior !== 'click') return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInNav = target.closest('#header-nav');
      const isInDropdown = target.closest('[data-mega-menu-dropdown]');

      if (!isInNav && !isInDropdown) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu, behavior, closeMenu]);

  return (
    <MegaMenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        closeMenu,
        behavior,
        allowParentLinks,
        registerItemRef,
        registerDropdownRef,
      }}
    >
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