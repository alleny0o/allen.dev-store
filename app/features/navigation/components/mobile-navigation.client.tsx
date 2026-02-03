import {useCallback, useState} from 'react';

import {useDevice} from '~/hooks/use-device';
import {cn} from '~/lib/utils';

import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';

import {Drawer, DrawerContent, DrawerTrigger} from '~/components/ui/drawer';
import {ScrollArea} from '~/components/ui/scroll-area';
import {MobileNavigationTrigger} from './mobile-navigation-trigger';

import type {HeaderMenu} from '../types';

const mobileMenuLinkClass = cn(
  'flex w-full items-center gap-2 rounded-xs px-4 py-2 transition-colors pointer-coarse:active:bg-accent pointer-coarse:active:text-accent-foreground pointer-fine:hover:bg-accent pointer-fine:hover:text-accent-foreground',
);

interface MobileNavigationProps {
  data?: HeaderMenu;
}

/**
 * Mobile navigation drawer component
 * Renders a slide-up/slide-right drawer with navigation links for mobile/tablet
 */
export function MobileNavigation({data}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const device = useDevice();
  const handleClose = useCallback(() => setOpen(false), []);

  if (!data) return null;

  // Todo => Add <Navlink /> support
  return (
    <div className="pointer-coarse:block lg:hidden">
      <Drawer
        direction={device === 'desktop' ? 'right' : 'bottom'}
        onOpenChange={setOpen}
        open={open}
      >
        <DrawerTrigger asChild>
          <MobileNavigationTrigger />
        </DrawerTrigger>
        <MobileNavigationContent>
          {data.length > 0 &&
            data.map((item) => (
              <li key={item._key} role="none">
                {item._type === 'internalLink' && (
                  <SanityInternalLink
                    className={mobileMenuLinkClass}
                    data={item}
                    onClick={handleClose}
                  />
                )}
                {item._type === 'externalLink' && (
                  <SanityExternalLink data={item} />
                )}
              </li>
            ))}
        </MobileNavigationContent>
      </Drawer>
    </div>
  );
}

function MobileNavigationContent(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DrawerContent
      className={cn([
        'h-(--dialog-content-height) max-h-screen w-screen bg-background p-0 text-foreground',
        '[--dialog-content-height:calc(100svh*.75)] [--dialog-content-max-width:calc(32rem)]',
        'lg:right-0 lg:left-auto lg:max-w-(--dialog-content-max-width) lg:[--dialog-content-height:100svh]',
        props.className,
      ])}
      onCloseAutoFocus={(e) => e.preventDefault()}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div className="mt-4 size-full overflow-hidden p-6">
        <ScrollArea className="size-full pr-4">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2 pb-6 text-xl font-medium" role="menu">
              {props.children}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </DrawerContent>
  );
}