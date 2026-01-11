// hooks/use-mega-menu-overlay.ts

import {useHeaderSettings} from '~/features/header';
import type {CSSProperties} from 'react';

interface OverlayConfig {
  showOverlay: boolean;
  overlayStyles: CSSProperties;
}

/**
 * Generates overlay configuration for mega menu
 * Returns visibility state and opacity styles based on header settings
 */
export function useMegaMenuOverlay(isOpen: boolean): OverlayConfig {
  const header = useHeaderSettings();
  
  const showOverlay = header?.desktopMegaMenuShowOverlay ?? false;
  const opacity = header?.desktopMegaMenuOverlayOpacity ?? 50;

  return {
    showOverlay: isOpen && showOverlay,
    overlayStyles: {
      opacity: opacity / 100,
    },
  };
}