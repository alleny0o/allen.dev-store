import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useRootLoaderData} from '~/root';

import {
  AnnouncementRotator,
  AnnouncementRotatorContent,
  AnnouncementRotatorItem,
  AnnouncementRotatorNext,
  AnnouncementRotatorPrevious,
} from '~/components/ui/announcement-rotator';

import {AnnouncementItem} from './announcement-item';

type AnnouncementBarEntry = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBar']
>[number];

export function AnnouncementBar() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const header = data?.header;
  const announcementBar = header?.announcementBar;
  const utilityLinks = header?.utilityLinks;

  // NEW: typography — only used for spacing, not sizing icons
  const announcementSize =
    sanityRoot?.data?.fonts?.announcement?.baseSize ?? 13;

  const paddingTop = header?.announcementBarPadding?.top ?? 0;
  const paddingBottom = header?.announcementBarPadding?.bottom ?? 0;

  const isArrowsActive =
    header?.showAnnouncementArrows && (announcementBar?.length ?? 0) > 1;

  const isUtilitiesActive = (utilityLinks?.length ?? 0) > 0;

  // MUST stay
  const colorsCssVars = useColorsCssVars({
    selector: `#announcement-bar`,
    settings: {
      colorScheme: header?.announcementBarColorScheme ?? null,
      customCss: null,
      hide: null,
      padding: header?.announcementBarPadding ?? null,
    },
  });

  if (!announcementBar) return null;

  return (
    <section
      className="relative container overflow-hidden bg-background px-0! text-foreground sm:px-0! md:px-0!"
      id="announcement-bar"
      // Make announcementSize available as a CSS var
      style={
        {
          '--announcement-size': `${announcementSize}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${isArrowsActive && isUtilitiesActive ? 'lg:px-(--container-padding)' : ''} ${
          isArrowsActive ? 'lg:pl-(--container-padding)' : ''
        } ${isUtilitiesActive ? 'lg:pr-(--container-padding)' : ''}`}
      >
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />

        <div className="announcement-text">
          <AnnouncementRotator
            autoRotate={header?.autoRotateAnnouncements ?? false}
            className="relative"
          >
            {isArrowsActive && (
              <div className="pointer-events-auto absolute top-0 bottom-0 left-0 z-10 hidden items-center gap-0 bg-background lg:flex">
                <AnnouncementRotatorPrevious className="shrink-0 rounded-md">
                  <ChevronLeft
                    className="announcement-arrow"
                    aria-hidden="true"
                  />
                </AnnouncementRotatorPrevious>

                <AnnouncementRotatorNext className="shrink-0 rounded-md">
                  <ChevronRight
                    className="announcement-arrow"
                    aria-hidden="true"
                  />
                </AnnouncementRotatorNext>
              </div>
            )}

            <AnnouncementRotatorContent
              className={`select-none [&>div]:pointer-events-auto [&>div]:overflow-visible ${
                isArrowsActive && !isUtilitiesActive ? 'lg:pr-8' : ''
              } ${!isArrowsActive && isUtilitiesActive ? 'lg:pl-8' : ''}`}
              style={{
                paddingTop: `calc(${paddingTop}px + 2px)`,
                paddingBottom: `calc(${paddingBottom}px + 2px)`,
              }}
            >
              {announcementBar.map((item: AnnouncementBarEntry) => (
                <AnnouncementRotatorItem key={item._key}>
                  <div className="flex items-center justify-center lg:px-[var(--container-padding)*2]">
                    <AnnouncementItem {...item} />
                  </div>
                </AnnouncementRotatorItem>
              ))}
            </AnnouncementRotatorContent>
          </AnnouncementRotator>
        </div>
      </div>

      {isUtilitiesActive && (
        <div
          className="pointer-events-auto absolute top-0 right-4 bottom-0 z-10 hidden items-center justify-end gap-4 border-l border-current bg-background pl-4 lg:right-8 lg:flex announcement-text"
        >
          {utilityLinks?.map((link: any) => (
            <span key={link._key} className="cursor-pointer">
              {link.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
