import {m} from 'motion/react';
import {getBackdropVariants} from '../utils/aside-animations';

interface AsideBackdropProps {
  onClose: () => void;
  overlayOpacity: number;
  animationDuration: number;
}

/**
 * Backdrop overlay behind the aside panel.
 * Fades in/out with the aside via motion variants.
 *
 * Opacity comes from Sanity config (0-100) and is applied
 * as an inline style so it can be any value, not just Tailwind steps.
 */
export function AsideBackdrop({
  onClose,
  overlayOpacity,
  animationDuration,
}: AsideBackdropProps) {
  const variants = getBackdropVariants(animationDuration);

  return (
    <m.div
      aria-hidden
      className="fixed inset-0 z-60 bg-black"
      variants={variants}
      onClick={onClose}
      style={{
        opacity: overlayOpacity / 100,
      }}
    />
  );
}