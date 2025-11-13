import { ChevronRight } from 'lucide-react';
import { useAnnouncementRotator } from './announcement-rotator';
import React, { forwardRef } from 'react';
import { cn } from '~/lib/utils';

export const AnnouncementRotatorNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, disabled, ...props }, ref) => {
  const { scrollPrev, totalSlides, emblaApi, canScrollNext } = useAnnouncementRotator();

  if (totalSlides <= 1) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollPrev();
    props.onClick?.(e);
  };

  return (
    <button
      className={cn('inline-flex items-center justify-center', className)}
      onClick={handleClick}
      ref={ref}
      type="button"
      aria-label="Next slide"
      disabled={disabled || !emblaApi || !canScrollNext}
      {...props}
    >
      {children || <ChevronRight className="size-4" aria-hidden="true" />}
    </button>
  );
});

AnnouncementRotatorNext.displayName = 'AnnouncementRotatorNext';
