import { ChevronRight } from 'lucide-react';
import { useAnnouncementRotator } from './announcement-rotator';
import React from 'react';
import { cn } from '~/lib/utils';

export const AnnouncementRotatorNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, disabled, ...props }, ref) => {
  const { scrollNext, totalSlides, emblaApi } = useAnnouncementRotator();

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
      aria-label="Next slide"
      disabled={disabled || !emblaApi}
      {...props}
    >
      {children || <ChevronRight className="size-4" aria-hidden="true" />}
    </button>
  );
});

AnnouncementRotatorNext.displayName = 'AnnouncementRotatorNext';
