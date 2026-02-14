import {useEffect} from 'react';
import {AnimatePresence, m} from 'motion/react';
import * as Popover from '@radix-ui/react-popover';
import {cn} from '~/lib/utils';

interface LocaleDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  /**
   * When true, always opens upward.
   * Used when locale selector is rendered inside the mobile menu.
   */
  forceUpward?: boolean;
  children: React.ReactNode;
}

const ENTER_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Locale selector dropdown container using Radix Popover.
 *
 * - Portals to document.body — never trapped under headers or stacking contexts
 * - Collision-aware positioning out of the box (flips, shifts, stays in viewport)
 * - forceUpward forces upward alignment (used inside mobile menu)
 * - Click outside and Escape handled by Radix
 * - Closes on scroll via document capture listener
 * - Motion animation via AnimatePresence + m.div
 */
export function LocaleDropdown({
  isOpen,
  onOpenChange,
  trigger,
  forceUpward = false,
  children,
}: LocaleDropdownProps) {
  // Radix has no built-in close-on-scroll. We attach to document in capture
  // phase so scroll on any element (not just window) triggers the close.
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => onOpenChange(false);
    document.addEventListener('scroll', handleScroll, {passive: true, capture: true});
    return () => document.removeEventListener('scroll', handleScroll, {capture: true});
  }, [isOpen, onOpenChange]);

  return (
    <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
      {/* asChild merges Radix trigger behaviour onto our button */}
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        {/*
         * forceMount keeps content in the DOM so AnimatePresence can
         * play the exit animation before unmounting.
         * pointer-events-none when closed prevents the invisible panel
         * from intercepting clicks.
         */}
        <Popover.Content
          forceMount
          side={forceUpward ? 'top' : 'bottom'}
          align="start"
          sideOffset={6}
          avoidCollisions={!forceUpward}
          collisionPadding={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'z-70 outline-none',
            !isOpen && 'pointer-events-none',
          )}
        >
          <AnimatePresence>
            {isOpen && (
              <m.div
                key="locale-dropdown"
                role="dialog"
                aria-label="Select country and language"
                className={cn(
                  'w-[min(320px,calc(100vw-16px))]',
                  'rounded-md border bg-background p-4 shadow-md',
                  'max-h-[min(400px,calc(100vh-80px))] overflow-y-auto',
                )}
                initial={{opacity: 0, y: forceUpward ? 4 : -4}}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.2, ease: ENTER_EASE},
                }}
                exit={{
                  opacity: 0,
                  y: forceUpward ? 4 : -4,
                  transition: {duration: 0.15},
                }}
              >
                {children}
              </m.div>
            )}
          </AnimatePresence>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}