// mega-menu/mega-menu-dropdown.tsx

// React
import {useRef, useEffect} from 'react';

// Motion
import {m, AnimatePresence} from 'motion/react';

// Context & Hooks
import {useMegaMenu} from '../context/mega-menu-context';
import {useHeaderSettings} from '~/features/header';
import {useMegaMenuStyles} from '../hooks/use-mega-menu-styles';
import {useMegaMenuHeight} from '../hooks/use-mega-menu-height';
import {useMegaMenuScrollLock} from '../hooks/use-mega-menu-scroll-lock';
import {useMegaMenuOverlay} from '../hooks/use-mega-menu-overlay';

// Components
import {GridRenderer} from './renderers/grid-renderer';
import {SectionRenderer} from './renderers/section-renderer';

// Utils
import {getDropdownVariant} from '../animations/dropdown-variants';

/**
 * Main mega menu dropdown container
 * Handles visibility, refs, and delegates rendering to mode-specific renderers
 */
export function MegaMenuDropdown() {
  const {openMenu, registerDropdownRef, closeMenu} = useMegaMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const styles = useMegaMenuStyles();
  const header = useHeaderSettings();
  const animationType = header?.desktopMegaMenuAnimation ?? 'slideFade';
  const duration = (header?.desktopMegaMenuAnimationDuration ?? 250) / 1000; // Convert ms to seconds
  const maxHeight = useMegaMenuHeight(!!openMenu);

  // Apply scroll lock when menu is open (if enabled)
  useMegaMenuScrollLock(!!openMenu);

  // Get overlay configuration
  const overlayConfig = useMegaMenuOverlay(!!openMenu);

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

  return (
    <>
      {/* Styles - always rendered so CSS vars are available */}
      <style dangerouslySetInnerHTML={{__html: styles}} />

      {/* Overlay */}
      {overlayConfig.showOverlay && (
        <div
          className="absolute top-full right-0 bottom-0 left-0 z-30 bg-black"
          style={{
            ...overlayConfig.overlayStyles,
            height: '100vh', // Cover rest of viewport
          }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Animated Dropdown */}
      <AnimatePresence>
        {openMenu && hasContent && (
          <m.div
            ref={dropdownRef}
            id="mega-menu-dropdown"
            data-mega-menu-dropdown
            className="absolute top-full right-0 left-0 z-40 overflow-y-auto bg-background"
            style={{maxHeight}}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getDropdownVariant(animationType)}
            transition={{
              duration,
              ease: [0.04, 0.62, 0.23, 0.98], // Custom ease-out curve (smooth)
            }}
          >
            <div className="container">
              {openMenu.layout === 'grid' ? (
                <GridRenderer menu={openMenu} />
              ) : (
                <SectionRenderer menu={openMenu} />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}