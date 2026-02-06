import type {ReactNode} from 'react';

/**
 * Available aside panel types in the application
 */
export type AsideType = 'search' | 'cart' | 'mobile' | 'closed';

/**
 * Positioning options for aside panels
 * - left: Slide in from left edge
 * - right: Slide in from right edge
 * - modal: Center overlay modal
 */
export type AsidePosition = 'left' | 'right' | 'modal';

/**
 * Responsive breakpoint identifiers
 */
export type Breakpoint = 'sm' | 'md' | 'lg';

/**
 * Responsive configuration for aside positioning
 * Allows different positions at different breakpoints with a required default
 */
export type AsideConfig = Partial<Record<Breakpoint, AsidePosition>> & {
  default: AsidePosition;
};

/**
 * Context value for aside state management
 */
export type AsideContextValue = {
  /** Currently active aside type */
  type: AsideType;
  /** Open an aside panel */
  open: (mode: AsideType) => void;
  /** Close the current aside panel */
  close: () => void;
};

/**
 * Props for aside component instances
 */
export interface AsideProps {
  /** Content to render inside the aside */
  children?: ReactNode;
  /** Type of aside panel to render */
  type: AsideType;
  /** Heading content for the aside */
  heading: ReactNode;
  /** Responsive positioning configuration */
  config: AsideConfig;
}