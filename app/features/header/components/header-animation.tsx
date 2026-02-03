import React, {useEffect, useState, type CSSProperties} from 'react';
import {useLocation} from 'react-router';
import {
  m,
  type Variants,
  transform,
  useMotionValueEvent,
  useTransform,
} from 'motion/react';

import {useBoundedScroll} from '~/hooks/use-bounded-scroll';
import {cn} from '~/lib/utils';
import {useHeaderHeight} from '../hooks/use-header-height';

/** Scroll distance in pixels before header starts hiding */
const SCROLL_BOUND_DISTANCE = 250;
/** Progress threshold before delayed transform begins */
const SCROLL_DELAY_THRESHOLD = 0.75;
/** Progress threshold to trigger hidden state */
const HIDDEN_THRESHOLD = 0.5;
/** Animation duration in seconds */
const ANIMATION_DURATION = 0.2;

type HeaderVariant = 'hidden' | 'initial' | 'visible';

const variants: Variants = {
  hidden: {
    transform: 'translateY(-100%)',
  },
  initial: {
    transform: 'translateY(0)',
    transition: {
      duration: 0,
    },
  },
  visible: {
    transform: 'translateY(0)',
  },
};

/**
 * Animated header wrapper that hides/shows based on scroll direction.
 * Resets to visible state on route changes.
 */
export function HeaderAnimation(props: {
  children: React.ReactNode;
  className: string;
  style?: CSSProperties;
  id?: string;
}) {
  const {children, className, style, id} = props;

  const {pathname} = useLocation();
  const {desktopHeaderHeight} = useHeaderHeight();
  const desktopHeaderHeightValue = desktopHeaderHeight || 0;

  const [activeVariant, setActiveVariant] = useState<HeaderVariant>('initial');

  const {scrollYBoundedProgress} = useBoundedScroll(SCROLL_BOUND_DISTANCE);

  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, SCROLL_DELAY_THRESHOLD, 1],
    [0, 0, 1],
  );

  useEffect(() => {
    setActiveVariant('initial');
  }, [pathname]);

  useMotionValueEvent(scrollYBoundedProgressDelayed, 'change', (latest) => {
    if (latest === 0) {
      setActiveVariant('visible');
    } else if (latest > HIDDEN_THRESHOLD) {
      setActiveVariant('hidden');
    } else {
      setActiveVariant('visible');
    }

    const newDesktopHeaderHeight = transform(
      latest,
      [0, 1],
      [`${desktopHeaderHeightValue}px`, '0px'],
    );

    document.documentElement.style.setProperty(
      '--desktopHeaderHeight',
      newDesktopHeaderHeight,
    );
  });

  return (
    <m.header
      id={id}
      animate={activeVariant}
      className={cn(className)}
      initial="visible"
      transition={{
        duration: ANIMATION_DURATION,
      }}
      variants={variants}
      style={style}
    >
      {children}
    </m.header>
  );
}
