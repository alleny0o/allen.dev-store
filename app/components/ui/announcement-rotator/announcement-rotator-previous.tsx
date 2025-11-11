import * as React from 'react';
import {ChevronLeft} from 'lucide-react';

import {cn} from '~/lib/utils';

import {useAnnouncementRotator} from './announcement-rotator';

type AnnouncementRotatorPreviousProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AnnouncementRotatorPrevious = React.forwardRef<
  HTMLButtonElement,
  AnnouncementRotatorPreviousProps
>(({children, className, ...props}, ref) => {
  const {scrollPrev, totalSlides} = useAnnouncementRotator();

  // Don't render if only 1 slide
  if (totalSlides <= 1) {
    return null;
  }

  return (
    <button
      className={cn('inline-flex items-center justify-center', className)}
      onClick={scrollPrev}
      ref={ref}
      type="button"
      {...props}
    >
      <span className="sr-only">Previous slide</span>
      {children || <ChevronLeft className="size-4" />}
    </button>
  );
});

AnnouncementRotatorPrevious.displayName = 'AnnouncementRotatorPrevious';