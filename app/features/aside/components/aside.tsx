import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {m, AnimatePresence} from 'motion/react';

import {useAside} from '../hooks/use-aside';
import {useAsideClose} from '../hooks/use-aside-close';
import {getAsideClasses} from '../utils/aside-classnames';
import {getAsideVariants} from '../utils/aside-animations';
import {getAsideCssVars} from '../utils/aside-css-vars';
import {AsideBackdrop} from './aside-backdrop';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {cn} from '~/lib/utils';

import type {AsideProps} from '../types';

/**
 * Generic aside shell — sidebar or modal.
 * Driven entirely by Sanity config. Knows nothing about what's inside it.
 * Renders via portal into document.body to escape any stacking contexts.
 *
 * Usage:
 * <Aside type="mobile" config={sidebarConfig} colorScheme={header.mobileNavigationColorScheme}>
 *   <MobileNavContent />
 * </Aside>
 */
export function Aside({
  children,
  header,
  footer,
  type,
  config,
  colorScheme,
  closeAbove,
}: AsideProps) {
  const {type: activeType} = useAside();
  const {handleClose} = useAsideClose();
  const isOpen = type === activeType;

  // ─── Portal mount ─────────────────────────────────────────────────────────
  // Deferred to avoid SSR mismatch — document.body doesn't exist on the server.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ─── Scroll lock ──────────────────────────────────────────────────────────
  // Prevents body scroll while aside is open.
  // Saves scroll position and restores it on close.
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // ─── Escape key ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      },
      {signal: controller.signal},
    );

    return () => controller.abort();
  }, [isOpen, handleClose]);

  // ─── Auto-close above breakpoint ──────────────────────────────────────────
  useEffect(() => {
    if (!closeAbove) return;

    const breakpoints = {sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536};
    const threshold = breakpoints[closeAbove];

    const handleResize = () => {
      if (window.innerWidth >= threshold) {
        handleClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeAbove, handleClose]);

  // ─── Color scheme CSS vars ─────────────────────────────────────────────────
  // Scoped to #aside-{type} so each aside has its own color scheme.
  const colorSchemeCssVars = useColorsCssVars({
    selector: `#aside-${type}`,
    settings: colorScheme,
  });

  // ─── Motion ───────────────────────────────────────────────────────────────
  const variants = getAsideVariants(config);
  const cssVars = getAsideCssVars(config);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Scoped color scheme CSS vars */}
      {colorScheme && (
        <style dangerouslySetInnerHTML={{__html: colorSchemeCssVars}} />
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <AsideBackdrop
              onClose={handleClose}
              overlayOpacity={config.overlayOpacity}
              animationDuration={config.animationDuration}
            />

            {/* Aside panel */}
            <m.aside
              id={`aside-${type}`}
              role="dialog"
              aria-modal
              className={cn(
                getAsideClasses(config),
                'bg-background text-foreground',
              )}
              style={cssVars}
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {header && <div className="shrink-0">{header}</div>}

              <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

              {footer && <div className="shrink-0">{footer}</div>}
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
