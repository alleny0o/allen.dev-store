import * as React from 'react';

import {cn} from '~/lib/utils';

import {useAnnouncementRotator} from './announcement-rotator';

export const AnnouncementRotatorContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({children, className, ...props}, ref) => {
  const {animation, currentIndex, direction} = useAnnouncementRotator();

  const slides = React.Children.toArray(children);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      ref={ref}
      {...props}
    >
      {animation === 'slide' ? (
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides}
        </div>
      ) : (
        // Fade animation
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`announcement-${index}`}
              className={cn(
                'transition-opacity duration-500 ease-in-out',
                index === currentIndex
                  ? 'opacity-100'
                  : 'absolute inset-0 opacity-0',
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

AnnouncementRotatorContent.displayName = 'AnnouncementRotatorContent';
