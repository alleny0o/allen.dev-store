import {ChevronRight} from 'lucide-react';
import {useAnnouncementRotator} from './announcement-rotator';
import React, {forwardRef} from 'react';
import {cn} from '~/lib/utils';

export const AnnouncementRotatorNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({children, className, disabled, onClick, ...props}, ref) => {
  const {scrollNext, totalSlides, emblaApi, canScrollNext} =
    useAnnouncementRotator();

  // Hide if there's only one slide
  if (totalSlides <= 1) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollNext(); // <-- this is already inverted in the provider
    onClick?.(e);
  };

  const isDisabled = disabled || !emblaApi || !canScrollNext;

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-label="Next slide"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children || <ChevronRight className="size-4" aria-hidden="true" />}
    </button>
  );
});

AnnouncementRotatorNext.displayName = 'AnnouncementRotatorNext';
