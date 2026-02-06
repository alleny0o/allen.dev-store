import {useState, useEffect} from 'react';

// Height calculation constants
const DEFAULT_MAX_HEIGHT = '80vh';
const BOTTOM_PADDING_PX = 50;

/**
 * Calculates and updates the maximum height for the mega menu dropdown
 * based on available viewport space
 */
export function useMegaMenuHeight(isOpen: boolean): string {
  const [maxHeight, setMaxHeight] = useState<string>(DEFAULT_MAX_HEIGHT);

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
        BOTTOM_PADDING_PX;

      setMaxHeight(`${available}px`);
    };

    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);

    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [isOpen]);

  return maxHeight;
}
