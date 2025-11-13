import React, { forwardRef } from 'react';
import { cn } from '~/lib/utils';
import { useAnnouncementRotator } from './announcement-rotator';

export const AnnouncementRotatorItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { slideIndex?: number }
>(({ className, slideIndex, ...props }, ref) => {
  const { currentSlide, totalSlides } = useAnnouncementRotator();
  const isActive = slideIndex === currentSlide;
  
  return (
    <div
      aria-roledescription="slide"
      aria-label={slideIndex !== undefined ? `Slide ${slideIndex + 1} of ${totalSlides}` : undefined}
      aria-current={isActive ? 'true' : 'false'}
      className={cn('min-w-full shrink-0', className)}
      ref={ref}
      role="group"
      {...props}
    />
  );
});

AnnouncementRotatorItem.displayName = 'AnnouncementRotatorItem';