// use-mega-menu-height.ts
import {useState, useEffect} from 'react';

/**
 * Calculates and updates the maximum height for the mega menu dropdown
 * based on available viewport space
 */
export function useMegaMenuHeight(isOpen: boolean) {
  const [maxHeight, setMaxHeight] = useState<string>('80vh');

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  return maxHeight;
}
