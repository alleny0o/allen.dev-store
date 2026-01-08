// hooks/use-mega-menu-overlay.ts

import {useHeaderSettings} from '~/components/header/header-context';
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
  
  const showOverlay = header?.megaMenuShowOverlay ?? false;
  const opacity = header?.megaMenuOverlayOpacity ?? 50;

  return {
    showOverlay: isOpen && showOverlay,
    overlayStyles: {
      opacity: opacity / 100,
    },
  };
}