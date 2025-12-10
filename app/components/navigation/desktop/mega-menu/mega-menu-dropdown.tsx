// mega-menu/mega-menu-dropdown.tsx

import {useMegaMenu} from './mega-menu-context';
import {GridRenderer} from './renderers/grid-renderer';
import {SectionRenderer} from './renderers/section-renderer';
import {useMegaMenuStyles} from './hooks/use-mega-menu-styles';
import {useMegaMenuHeight} from './hooks/use-mega-menu-height';
import {useRef, useEffect} from 'react';

/**
 * Main mega menu dropdown container
 * Handles visibility, refs, and delegates rendering to mode-specific renderers
 */
export function MegaMenuDropdown() {
  const {openMenu, registerDropdownRef, closeMenu} = useMegaMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const styles = useMegaMenuStyles();
  const maxHeight = useMegaMenuHeight(!!openMenu);

  useEffect(() => {
    if (dropdownRef.current) {
      registerDropdownRef(dropdownRef.current);
    }
  }, [registerDropdownRef, openMenu]);

  // Close mega menu on page scroll
  useEffect(() => {
    if (!openMenu) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        closeMenu();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMenu, closeMenu]);

  // Check if menu has any content
  const hasContent =
    openMenu?.layout === 'grid'
      ? openMenu?.content?.length
      : [
          openMenu?.section1,
          openMenu?.section2,
          openMenu?.section3,
          openMenu?.section4,
          openMenu?.section5,
          openMenu?.section6,
        ].some((section) => section?.length);

  if (!openMenu || !hasContent) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: styles}} />

      <div
        ref={dropdownRef}
        id="mega-menu-dropdown"
        data-mega-menu-dropdown
        className="absolute top-full right-0 left-0 z-40 overflow-y-auto bg-background"
        style={{maxHeight}}
      >
        <div className="container">
          {openMenu.layout === 'grid' ? (
            <GridRenderer menu={openMenu} />
          ) : (
            <SectionRenderer menu={openMenu} />
          )}
        </div>
      </div>
    </>
  );
}
