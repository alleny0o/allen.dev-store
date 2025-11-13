import { ChevronLeft } from 'lucide-react';
import { useAnnouncementRotator } from './announcement-rotator';
import React, { forwardRef } from 'react';
import { cn } from '~/lib/utils';

export const AnnouncementRotatorPrevious = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, disabled, ...props }, ref) => {
  const { scrollNext, totalSlides, emblaApi, canScrollPrev } = useAnnouncementRotator();

  if (totalSlides <= 1) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollNext();
    props.onClick?.(e);
  };

  return (
    <button
      className={cn('inline-flex items-center justify-center', className)}
      onClick={handleClick}
      ref={ref}
      type="button"
      aria-label="Previous slide"
      disabled={disabled || !emblaApi || !canScrollPrev}
      {...props}
    >
      {children || <ChevronLeft className="size-4" aria-hidden="true" />}
    </button>
  );
});

AnnouncementRotatorPrevious.displayName = 'AnnouncementRotatorPrevious';
