import * as React from 'react';

import {IconMenu} from '~/components/icons/icon-menu';
import {IconButton} from '~/components/ui/button';
import {useAside} from '~/features/aside';
import {useMegaMenu} from '~/features/navigation/mega-menu/context/mega-menu-context';

// Icon sizing and stroke
const MENU_ICON_SIZE = 7;
const MENU_ICON_STROKE_WIDTH = 1.5;

/**
 * Trigger button for opening the mobile navigation aside.
 * Closes mega menu if open, then opens the 'mobile' aside.
 */
export const MobileNavigationTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function MobileNavigationTrigger(props, ref) {
  const {open} = useAside();
  const {closeMenu} = useMegaMenu();

  const handleClick = () => {
    closeMenu();
    open('mobile');
  };

  return (
    <IconButton
      ref={ref}
      aria-label="Open menu"
      className="-mr-2 pointer-coarse:block lg:mr-0 lg:hidden"
      onClick={handleClick}
      {...props}
    >
      <span className="sr-only">Menu</span>
      <IconMenu
        className={`size-${MENU_ICON_SIZE}`}
        strokeWidth={MENU_ICON_STROKE_WIDTH}
      />
    </IconButton>
  );
});