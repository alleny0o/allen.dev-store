// mega-menu-dropdown.tsx
import {useMegaMenu} from './mega-menu-context';
import {LinkSection} from './sections/link-section';
import {ImageBlock} from './sections/image-block';
import {useRef, useEffect, useState} from 'react';
import {useHeaderSettings} from '~/components/header/header-context';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';

export function MegaMenuDropdown() {
  const header = useHeaderSettings();
  const {openMenu, registerDropdownRef, closeMenu} = useMegaMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('80vh');

  // Generate CSS variables for header appearance
  const megaDropdownCssVars = useColorsCssVars({
    selector: '#mega-menu-dropdown',
    settings: {
      colorScheme: header?.megaMenuColorScheme ?? null,
      padding: header?.megaMenuPadding, // Header does not use padding
      separatorLine: header?.megaMenuSeparatorLine ?? null,
    },
  });

  useEffect(() => {
    if (dropdownRef.current) {
      registerDropdownRef(dropdownRef.current);
    }
  }, [registerDropdownRef, openMenu]);

  useEffect(() => {
    if (!openMenu) return;

    const calculateMaxHeight = () => {
      const headerWrapper = document.querySelector(
        '[data-header-wrapper]',
      ) as HTMLElement | null;
      const announcementBar = document.querySelector(
        '[data-announcement-bar]',
      ) as HTMLElement | null;

      if (!headerWrapper) return;

      const available =
        window.innerHeight -
        headerWrapper.offsetHeight -
        (announcementBar?.offsetHeight || 0) -
        50;

      setMaxHeight(`${available}px`);
    };

    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);

    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [openMenu]);

  // Close mega menu on page scroll
  useEffect(() => {
    if (!openMenu) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Close if user scrolls the page down by any amount
      if (currentScrollY > lastScrollY) {
        closeMenu();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMenu, closeMenu]);

  if (!openMenu?.content?.length) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: megaDropdownCssVars}} />

      <div
        ref={dropdownRef}
        id="mega-menu-dropdown"
        data-mega-menu-dropdown
        className="absolute top-full right-0 left-0 z-40 overflow-y-auto bg-background"
        style={{maxHeight}}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-6 section-padding">
            {openMenu.content.map((block) => {
              if (block._type === 'linkSection') {
                return <LinkSection key={block._key} data={block} />;
              }
              if (block._type === 'imageBlock') {
                return <ImageBlock key={block._key} data={block} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
