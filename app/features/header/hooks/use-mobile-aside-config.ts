import {stegaClean} from '@sanity/client/stega';
import {useHeaderSettings} from '~/features/header';
import type {AsideConfig, SidebarConfig, ModalConfig} from '~/features/aside';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULTS
// Fallback values when Sanity fields are not configured.
// Mirror the initialValues in the Sanity schema.
// ─────────────────────────────────────────────────────────────────────────────
const SIDEBAR_DEFAULTS: Omit<SidebarConfig, 'type'> = {
  position: 'left',
  width: 400,
  maxWidth: 100,
  fullWidthBelow: 'md',
  animation: 'slide',
  animationDuration: 500,
  overlayOpacity: 50,
};

const MODAL_DEFAULTS: Omit<ModalConfig, 'type'> = {
  insetX: 20,
  insetY: 20,
  maxWidth: 100,
  maxHeight: 100,
  fullScreenBelow: 'sm',
  borderRadius: 'lg',
  borderRadiusOnFullScreen: 'none',
  animation: 'scale',
  animationDuration: 500,
  overlayOpacity: 50,
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maps Sanity mobile navigation config to the AsideConfig shape.
 *
 * Reads mobileDrawerType, mobileSidebarConfig, and mobileModalConfig
 * from header settings and returns a fully resolved AsideConfig
 * ready to pass directly to <Aside config={...} />.
 *
 * Falls back to defaults for any unset Sanity fields.
 */
export function useMobileAsideConfig(): AsideConfig {
  const header = useHeaderSettings();

  const drawerType = stegaClean(header?.mobileDrawerType) ?? 'sidebar';

  if (drawerType === 'modal') {
    const sanity = header?.mobileModalConfig;

    const config: ModalConfig = {
      type: 'modal',
      insetX: sanity?.insetX ?? MODAL_DEFAULTS.insetX,
      insetY: sanity?.insetY ?? MODAL_DEFAULTS.insetY,
      maxWidth: sanity?.maxWidth ?? MODAL_DEFAULTS.maxWidth,
      maxHeight: sanity?.maxHeight ?? MODAL_DEFAULTS.maxHeight,
      fullScreenBelow:
        stegaClean(sanity?.fullScreenBelow) ?? MODAL_DEFAULTS.fullScreenBelow,
      borderRadius:
        stegaClean(sanity?.borderRadius) ?? MODAL_DEFAULTS.borderRadius,
      borderRadiusOnFullScreen:
        stegaClean(sanity?.borderRadiusOnFullScreen) ??
        MODAL_DEFAULTS.borderRadiusOnFullScreen,
      animation: stegaClean(sanity?.animation) ?? MODAL_DEFAULTS.animation,
      animationDuration:
        sanity?.animationDuration ?? MODAL_DEFAULTS.animationDuration,
      overlayOpacity: sanity?.overlayOpacity ?? MODAL_DEFAULTS.overlayOpacity,
    };

    return config;
  }

  // Default: sidebar
  const sanity = header?.mobileSidebarConfig;

  const config: SidebarConfig = {
    type: 'sidebar',
    position: stegaClean(sanity?.position) ?? SIDEBAR_DEFAULTS.position,
    width: sanity?.width ?? SIDEBAR_DEFAULTS.width,
    maxWidth: sanity?.maxWidth ?? SIDEBAR_DEFAULTS.maxWidth,
    fullWidthBelow:
      stegaClean(sanity?.fullWidthBelow) ?? SIDEBAR_DEFAULTS.fullWidthBelow,
    animation: stegaClean(sanity?.animation) ?? SIDEBAR_DEFAULTS.animation,
    animationDuration:
      sanity?.animationDuration ?? SIDEBAR_DEFAULTS.animationDuration,
    overlayOpacity: sanity?.overlayOpacity ?? SIDEBAR_DEFAULTS.overlayOpacity,
  };

  return config;
}
