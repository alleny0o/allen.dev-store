import * as React from 'react';

import {IconMenu} from '~/components/icons/icon-menu';
import {IconButton} from '~/components/ui/button';
import {useAside} from '~/features/aside';

// Icon sizing and stroke
const MENU_ICON_SIZE = 7;
const MENU_ICON_STROKE_WIDTH = 1.5;

/**
 * Trigger button for opening the mobile navigation aside.
 * Hooks into useAside to open the 'mobile' aside type.
 */
export const MobileNavigationTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function MobileNavigationTrigger(props, ref) {
  const {open} = useAside();

  return (
    <IconButton
      ref={ref}
      aria-label="Open menu"
      className="-mr-2 lg:mr-0 lg:hidden pointer-coarse:block"
      onClick={() => open('mobile')}
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
