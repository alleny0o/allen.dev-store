import React, { forwardRef } from 'react';
import { cn } from '~/lib/utils';
import { useAnnouncementRotator } from './announcement-rotator';

export const AnnouncementRotatorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { emblaRef } = useAnnouncementRotator();

  return (
    <div className={cn('overflow-hidden', className)} ref={emblaRef} {...props}>
      <div className="flex overflow-visible" style={{ backfaceVisibility: 'hidden' }} ref={ref}>
        {children}
      </div>
    </div>
  );
});

AnnouncementRotatorContent.displayName = 'AnnouncementRotatorContent';