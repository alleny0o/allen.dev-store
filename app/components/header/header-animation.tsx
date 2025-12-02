// header-animation.tsx
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
import {useHeaderHeight} from './use-header-height';

export function HeaderAnimation(props: {
  children: React.ReactNode;
  className: string;
  style?: CSSProperties;
}) {
  const {children, className, style} = props;

  const {pathname} = useLocation();
  const {desktopHeaderHeight} = useHeaderHeight();
  const desktopHeaderHeightValue = desktopHeaderHeight || 0;

  const [activeVariant, setActiveVariant] = useState<
    'hidden' | 'initial' | 'visible'
  >('initial');

  const {scrollYBoundedProgress} = useBoundedScroll(250);

  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );

  useEffect(() => {
    // Reset the header position on route change
    setActiveVariant('initial');
  }, [pathname]);

  useMotionValueEvent(scrollYBoundedProgressDelayed, 'change', (latest) => {
    if (latest === 0) {
      setActiveVariant('visible');
    } else if (latest > 0.5) {
      setActiveVariant('hidden');
    } else {
      setActiveVariant('visible');
    }

    const newDesktopHeaderHeight = transform(
      latest,
      [0, 1],
      [`${desktopHeaderHeightValue}px`, '0px'],
    );

    // Reassign header height css var on scroll
    document.documentElement.style.setProperty(
      '--desktopHeaderHeight',
      newDesktopHeaderHeight,
    );
  });

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

  return (
    <m.header
      animate={activeVariant}
      className={cn(className)}
      initial="visible"
      transition={{
        duration: 0.2,
      }}
      variants={variants}
      style={style}
    >
      {children}
    </m.header>
  );
}
