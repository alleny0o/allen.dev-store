import {stegaClean} from '@sanity/client/stega';
import type {AsideConfig, SidebarConfig, ModalConfig} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULTS
// Fallback values when Sanity fields are not configured.
// Mirror the initialValues in the Sanity schema.
// ─────────────────────────────────────────────────────────────────────────────
export const SIDEBAR_DEFAULTS: Omit<SidebarConfig, 'type'> = {
  position: 'left',
  width: 400,
  maxWidth: 100,
  fullWidthBelow: 'md',
  animation: 'slide',
  animationDuration: 500,
  overlayOpacity: 50,
};

export const MODAL_DEFAULTS: Omit<ModalConfig, 'type'> = {
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
// TYPES
// Raw Sanity config shapes — partial since fields may not be set.
// ─────────────────────────────────────────────────────────────────────────────
export type RawSidebarConfig =
  | {
      [K in keyof Omit<SidebarConfig, 'type'>]?: SidebarConfig[K] | null;
    }
  | null
  | undefined;

export type RawModalConfig =
  | {
      [K in keyof Omit<ModalConfig, 'type'>]?: ModalConfig[K] | null;
    }
  | null
  | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maps raw Sanity sidebar/modal config to a fully resolved AsideConfig.
 * Reusable across any aside instance — mobile nav, cart, search, localization.
 *
 * @param drawerType - 'sidebar' | 'modal' from Sanity
 * @param sidebarConfig - Raw sidebar config fields from Sanity
 * @param modalConfig - Raw modal config fields from Sanity
 * @returns Fully resolved AsideConfig ready for <Aside config={...} />
 */
export function resolveAsideConfig(
  drawerType: string | null | undefined,
  sidebarConfig: RawSidebarConfig,
  modalConfig: RawModalConfig,
): AsideConfig {
  const type = stegaClean(drawerType) ?? 'sidebar';

  if (type === 'modal') {
    const config: ModalConfig = {
      type: 'modal',
      insetX: modalConfig?.insetX ?? MODAL_DEFAULTS.insetX,
      insetY: modalConfig?.insetY ?? MODAL_DEFAULTS.insetY,
      maxWidth: modalConfig?.maxWidth ?? MODAL_DEFAULTS.maxWidth,
      maxHeight: modalConfig?.maxHeight ?? MODAL_DEFAULTS.maxHeight,
      fullScreenBelow:
        stegaClean(modalConfig?.fullScreenBelow) ??
        MODAL_DEFAULTS.fullScreenBelow,
      borderRadius:
        stegaClean(modalConfig?.borderRadius) ?? MODAL_DEFAULTS.borderRadius,
      borderRadiusOnFullScreen:
        stegaClean(modalConfig?.borderRadiusOnFullScreen) ??
        MODAL_DEFAULTS.borderRadiusOnFullScreen,
      animation: stegaClean(modalConfig?.animation) ?? MODAL_DEFAULTS.animation,
      animationDuration:
        modalConfig?.animationDuration ?? MODAL_DEFAULTS.animationDuration,
      overlayOpacity:
        modalConfig?.overlayOpacity ?? MODAL_DEFAULTS.overlayOpacity,
    };
    return config;
  }

  // Default: sidebar
  const config: SidebarConfig = {
    type: 'sidebar',
    position: stegaClean(sidebarConfig?.position) ?? SIDEBAR_DEFAULTS.position,
    width: sidebarConfig?.width ?? SIDEBAR_DEFAULTS.width,
    maxWidth: sidebarConfig?.maxWidth ?? SIDEBAR_DEFAULTS.maxWidth,
    fullWidthBelow:
      stegaClean(sidebarConfig?.fullWidthBelow) ??
      SIDEBAR_DEFAULTS.fullWidthBelow,
    animation:
      stegaClean(sidebarConfig?.animation) ?? SIDEBAR_DEFAULTS.animation,
    animationDuration:
      sidebarConfig?.animationDuration ?? SIDEBAR_DEFAULTS.animationDuration,
    overlayOpacity:
      sidebarConfig?.overlayOpacity ?? SIDEBAR_DEFAULTS.overlayOpacity,
  };
  return config;
}
