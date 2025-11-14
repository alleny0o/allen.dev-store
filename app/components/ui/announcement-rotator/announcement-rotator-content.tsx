import React, {forwardRef, Children, isValidElement, cloneElement} from 'react';
import {cn} from '~/lib/utils';
import {useAnnouncementRotator} from './announcement-rotator';

export const AnnouncementRotatorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({children, className, ...props}, _ref) => {
  const {emblaRef, currentSlide, totalSlides} = useAnnouncementRotator();

  return (
    <>
      {/* Embla viewport */}
      <div
        className={cn('overflow-hidden', className)}
        ref={emblaRef}
        aria-roledescription="carousel"
        {...props}
      >
        {/* Embla container */}
        <div
          className="flex overflow-visible"
          style={{
            backfaceVisibility: 'hidden',
            touchAction: 'pan-y',
          }}
          role="group"
        >
          {Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child as React.ReactElement<any>, {
                slideIndex: index,
              });
            }
            return child;
          })}
        </div>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </>
  );
});

AnnouncementRotatorContent.displayName = 'AnnouncementRotatorContent';
