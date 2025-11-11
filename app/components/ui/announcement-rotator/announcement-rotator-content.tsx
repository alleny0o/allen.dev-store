import * as React from 'react';
import {cn} from '~/lib/utils';
import {useAnnouncementRotator} from './announcement-rotator';

export const AnnouncementRotatorContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({children, className, ...props}, ref) => {
  const {
    animation,
    currentIndex,
    translateX,
    isTransitioning,
    totalSlides,
    slides,
  } = useAnnouncementRotator();
  
  const childSlides = React.Children.toArray(children);
  
  // For seamless infinite scroll, we create clones:
  // [last slide clone] [original slides] [first slide clone]
  const infiniteSlides = React.useMemo(() => {
    if (animation !== 'slide' || totalSlides <= 1) {
      return childSlides;
    }
    
    return [
      childSlides[childSlides.length - 1], // Clone of last slide
      ...childSlides,                       // All original slides
      childSlides[0],                       // Clone of first slide
    ];
  }, [childSlides, animation, totalSlides]);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      ref={ref}
      {...props}
    >
      {animation === 'slide' ? (
        <div
          className={cn(
            'flex',
            isTransitioning && 'transition-transform duration-500 ease-in-out'
          )}
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          {infiniteSlides.map((slide, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`slide-${index}`}
              className="min-w-full shrink-0"
              aria-roledescription="slide"
              role="group"
            >
              {slide}
            </div>
          ))}
        </div>
      ) : (
        // Fade animation - simple index-based
        <div className="relative">
          {childSlides.map((slide, index) => (
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