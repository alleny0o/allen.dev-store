import {useEffect, useRef, useState, type RefObject} from 'react';
import {AnimatePresence, m} from 'motion/react';
import {cn} from '~/lib/utils';

interface LocaleDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
  /** When true, always opens upward — no collision detection needed */
  forceUpward?: boolean;
  children: React.ReactNode;
}

type DropdownPosition = {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
};

/**
 * Plain TSX dropdown container. No positioning libraries.
 *
 * - Measures trigger via getBoundingClientRect()
 * - Opens downward by default
 * - Flips upward if not enough space below viewport
 * - forceUpward skips collision detection (used inside mobile menu)
 * - Click outside closes the dropdown
 */
export function LocaleDropdown({
  isOpen,
  onClose,
  triggerRef,
  forceUpward = false,
  children,
}: LocaleDropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<DropdownPosition | null>(null);
  const [opensUpward, setOpensUpward] = useState(forceUpward);

  // ── Position calculation ──────────────────────────────────────────────────
  // Runs when dropdown opens. Measures trigger rect and checks available
  // space above and below to decide open direction.
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const panelHeight = panelRef.current?.offsetHeight ?? 300;

    const spaceBelow = viewportHeight - trigger.bottom;
    const spaceAbove = trigger.top;

    const shouldOpenUpward =
      forceUpward || (spaceBelow < panelHeight && spaceAbove > spaceBelow);

    setOpensUpward(shouldOpenUpward);

    if (shouldOpenUpward) {
      setPosition({
        bottom: viewportHeight - trigger.top,
        left: trigger.left,
        width: trigger.width,
      });
    } else {
      setPosition({
        top: trigger.bottom,
        left: trigger.left,
        width: trigger.width,
      });
    }
  }, [isOpen, triggerRef, forceUpward]);

  // ── Click outside ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, onClose, triggerRef]);

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') onClose();
      },
      {signal: controller.signal},
    );
    return () => controller.abort();
  }, [isOpen, onClose]);

  const ENTER_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.2, ease: ENTER_EASE},
    },
    closed: {
      opacity: 0,
      y: opensUpward ? 4 : -4,
      transition: {duration: 0},
    },
  };

  return (
    <AnimatePresence>
      {isOpen && position && (
        <m.div
          ref={panelRef}
          role="listbox"
          aria-label="Locale selector"
          className={cn(
            'fixed z-50 min-w-50 rounded-md border bg-background p-4 shadow-md',
          )}
          style={{
            top: position.top,
            bottom: position.bottom,
            left: position.left,
          }}
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}
