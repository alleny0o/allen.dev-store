import type {ReactNode} from 'react';
import type {ColorsCssVarsSettings} from '~/hooks/use-colors-css-vars';

// ============================================================================
// ASIDE STATE
// ============================================================================

/** All possible aside panel types. 'closed' means no aside is open. */
export type AsideType = 'search' | 'cart' | 'mobile' | 'closed';

// ============================================================================
// SIDEBAR CONFIG
// Matches Sanity sidebarConfig schema exactly.
// ============================================================================

export type SidebarAnimation = 'none' | 'slide' | 'slideFade';
export type FullWidthBelow = 'never' | 'sm' | 'md' | 'lg';

export type SidebarConfig = {
  type: 'sidebar';
  position: 'left' | 'right';
  /** Fixed width of the sidebar in px */
  width: number;
  /** Maximum width as percentage of viewport */
  maxWidth: number;
  /** Breakpoint below which sidebar becomes full width */
  fullWidthBelow: FullWidthBelow;
  animation: SidebarAnimation;
  /** Animation duration in ms */
  animationDuration: number;
  /** Overlay opacity 0-100 */
  overlayOpacity: number;
};

// ============================================================================
// MODAL CONFIG
// Matches Sanity modalConfig schema exactly.
// ============================================================================

export type ModalAnimation =
  | 'none'
  | 'fade'
  | 'scale'
  | 'slideTop'
  | 'slideBottom';
export type FullScreenBelow = 'never' | 'sm' | 'md' | 'lg';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type BorderRadiusOnFullScreen = 'keep' | 'none';

export type ModalConfig = {
  type: 'modal';
  /** Horizontal inset (left/right spacing) in px */
  insetX: number;
  /** Vertical inset (top/bottom spacing) in px */
  insetY: number;
  /** Maximum width as percentage of viewport */
  maxWidth: number;
  /** Maximum height as percentage of viewport */
  maxHeight: number;
  /** Breakpoint below which modal goes fullscreen */
  fullScreenBelow: FullScreenBelow;
  borderRadius: BorderRadius;
  /** Whether to keep or remove border radius when fullscreen */
  borderRadiusOnFullScreen: BorderRadiusOnFullScreen;
  animation: ModalAnimation;
  /** Animation duration in ms */
  animationDuration: number;
  /** Overlay opacity 0-100 */
  overlayOpacity: number;
};

// ============================================================================
// DISCRIMINATED UNION
// ============================================================================

/** Full aside config — either a sidebar or a modal */
export type AsideConfig = SidebarConfig | ModalConfig;

// ============================================================================
// CONTEXT
// ============================================================================

export type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface AsideProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  /** Which aside type this instance represents */
  type: AsideType;
  /** Full config from Sanity — sidebar or modal */
  config: AsideConfig;
  /**
   * Color scheme reference from Sanity.
   * Passed to useColorsCssVars to scope CSS variables to this aside.
   */
  colorScheme?: ColorsCssVarsSettings;
  /**
   * Tailwind breakpoint above which the aside auto-closes.
   * e.g. 'lg' closes the aside when the screen grows past 1024px.
   */
  closeAbove?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
