// mega-menu-dropdown.tsx
import {useMegaMenu} from './mega-menu-context';
import {LinkSection} from './sections/link-section';
import {ImageBlock} from './sections/image-block';
import {useRef, useEffect} from 'react';

export function MegaMenuDropdown() {
  const {openMenu, registerDropdownRef} = useMegaMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Register dropdown ref whenever it renders
  useEffect(() => {
    if (dropdownRef.current) {
      registerDropdownRef(dropdownRef.current);
    }
  }, [registerDropdownRef, openMenu]);

  if (!openMenu?.content?.length) return null;

  return (
    <div
      ref={dropdownRef}
      data-mega-menu-dropdown
      className="absolute top-full right-0 left-0 z-50 bg-white shadow-lg"
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-6 py-8">
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
  );
}
