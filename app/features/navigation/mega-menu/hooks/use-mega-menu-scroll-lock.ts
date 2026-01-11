// hooks/use-mega-menu-scroll-lock.ts

import {useEffect} from 'react';
import {useHeaderSettings} from '~/features/header';

/**
 * Disables body scroll when mega menu is open (if enabled in settings)
 * Prevents scroll events while allowing the mega menu dropdown itself to remain scrollable
 */
export function useMegaMenuScrollLock(isOpen: boolean) {
  const header = useHeaderSettings();
  const disableScroll = header?.desktopMegaMenuDisableScroll ?? false;

  useEffect(() => {
    // Only apply scroll lock if both conditions are true
    if (!isOpen || !disableScroll) return;

    // Store original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup: restore original overflow
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, disableScroll]);
}