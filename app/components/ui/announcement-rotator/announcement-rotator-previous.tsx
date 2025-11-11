import * as React from 'react';

import {cn} from '~/lib/utils';

import {useAnnouncementRotator} from './announcement-rotator';

type AnnouncementRotatorPreviousProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AnnouncementRotatorPrevious = React.forwardRef<
  HTMLButtonElement,
  AnnouncementRotatorPreviousProps
>(({className, ...props}, ref) => {
  const {scrollPrev, totalSlides} = useAnnouncementRotator();

  // Don't render if only 1 slide
  if (totalSlides <= 1) {
    return null;
  }

  return (
    <button
      className={cn('absolute', className)}
      onClick={scrollPrev}
      ref={ref}
      type="button"
      {...props}
    >
      <span className="sr-only">Previous slide</span>
    </button>
  );
});

AnnouncementRotatorPrevious.displayName = 'AnnouncementRotatorPrevious';
