// hooks/use-mega-menu-overlay.ts
import {useHeaderSettings} from '~/features/header';
import type {CSSProperties} from 'react';

// Default overlay settings
const DEFAULT_OVERLAY_OPACITY = 50;
const PERCENT_TO_DECIMAL = 100;

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
  const opacity = header?.desktopMegaMenuOverlayOpacity ?? DEFAULT_OVERLAY_OPACITY;

  return {
    showOverlay: isOpen && showOverlay,
    overlayStyles: {
      opacity: opacity / PERCENT_TO_DECIMAL,
    },
  };
}