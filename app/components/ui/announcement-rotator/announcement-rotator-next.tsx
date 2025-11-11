import * as React from 'react';

import {cn} from '~/lib/utils';

import {useAnnouncementRotator} from './announcement-rotator';

type AnnouncementRotatorNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AnnouncementRotatorNext = React.forwardRef<
  HTMLButtonElement,
  AnnouncementRotatorNextProps
>(({className, ...props}, ref) => {
  const {scrollNext, totalSlides} = useAnnouncementRotator();

  // Don't render if only 1 slide
  if (totalSlides <= 1) {
    return null;
  }

  return (
    <button
      className={cn('absolute', className)}
      onClick={scrollNext}
      ref={ref}
      type="button"
      {...props}
    >
      <span className="sr-only">Next slide</span>
    </button>
  );
});

AnnouncementRotatorNext.displayName = 'AnnouncementRotatorNext';