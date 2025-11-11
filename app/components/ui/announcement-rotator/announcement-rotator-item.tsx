import * as React from 'react';

import {cn} from '~/lib/utils';

export const AnnouncementRotatorItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
  return (
    <div
      aria-roledescription="slide"
      className={cn('min-w-full shrink-0', className)}
      ref={ref}
      role="group"
      {...props}
    />
  );
});

AnnouncementRotatorItem.displayName = 'AnnouncementRotatorItem';
