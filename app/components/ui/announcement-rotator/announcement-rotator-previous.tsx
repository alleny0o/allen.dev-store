import {ChevronLeft} from 'lucide-react';
import {useAnnouncementRotator} from './announcement-rotator';
import React, {forwardRef} from 'react';
import {cn} from '~/lib/utils';

export const AnnouncementRotatorPrevious = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({children, className, disabled, onClick, ...props}, ref) => {
  const {scrollPrev, totalSlides, emblaApi, canScrollPrev} =
    useAnnouncementRotator();

  // Hide if there's only one slide
  if (totalSlides <= 1) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollPrev(); // <-- Correct for inverted direction logic
    onClick?.(e);
  };

  const isDisabled = disabled || !emblaApi || !canScrollPrev;

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-label="Previous slide"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children || <ChevronLeft className="size-4" aria-hidden="true" />}
    </button>
  );
});

AnnouncementRotatorPrevious.displayName = 'AnnouncementRotatorPrevious';
