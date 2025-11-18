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

  const textSize = header?.announcementBarTextSize ?? 13;

  const paddingTop = header?.announcementBarPadding?.top ?? 0;
  const paddingBottom = header?.announcementBarPadding?.bottom ?? 0;

  const isActive =
    header?.showAnnouncementArrows && (announcementBar?.length ?? 0) > 1;

  // MUST be called before any conditional return
  const colorsCssVars = useColorsCssVars({
    selector: `#announcement-bar`,
    settings: {
      colorScheme: header?.announcementBarColorScheme ?? null,
      customCss: null,
      hide: null,
      padding: header?.announcementBarPadding ?? null,
    },
  });

  // safe early return now
  if (!announcementBar) return null;

  return (
    <section
      className="relative container overflow-hidden bg-background text-foreground"
      id="announcement-bar"
      style={
        {
          '--announcement-bar-text-size': `${textSize}px`,
        } as React.CSSProperties
      }
    >
      <div className={isActive ? 'lg:px-8' : 'lg:pr-8'}>
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
        <div style={{fontSize: `${textSize}px`}}>
          <AnnouncementRotator
            autoRotate={header?.autoRotateAnnouncements ?? false}
            className="relative"
          >
            {isActive && (
              <div className="pointer-events-auto absolute top-0 bottom-0 left-0 z-10 hidden items-center gap-0 bg-background lg:flex">
                <AnnouncementRotatorPrevious className="shrink-0 rounded-md">
                  <ChevronLeft
                    style={{
                      width: `${textSize + 4}px`,
                      height: `${textSize + 4}px`,
                    }}
                    aria-hidden="true"
                  />
                </AnnouncementRotatorPrevious>

                <AnnouncementRotatorNext className="shrink-0 rounded-md">
                  <ChevronRight
                    style={{
                      width: `${textSize + 4}px`,
                      height: `${textSize + 4}px`,
                    }}
                    aria-hidden="true"
                  />
                </AnnouncementRotatorNext>
              </div>
            )}

            <AnnouncementRotatorContent
              className="select-none [&>div]:pointer-events-auto [&>div]:overflow-visible"
              style={{
                paddingTop: `calc(${paddingTop}px + 2px)`,
                paddingBottom: `calc(${paddingBottom}px + 2px)`,
              }}
            >
              {announcementBar.map((item: AnnouncementBarEntry) => (
                <AnnouncementRotatorItem key={item._key}>
                  <div className="flex items-center justify-center lg:px-16">
                    <AnnouncementItem {...item} />
                  </div>
                </AnnouncementRotatorItem>
              ))}
            </AnnouncementRotatorContent>
          </AnnouncementRotator>
        </div>
      </div>

      <div
        className="pointer-events-auto absolute top-0 right-4 bottom-0 z-10 hidden items-center justify-end gap-4 border-l border-current bg-background pl-4 lg:right-8 lg:flex"
        style={{fontSize: `${textSize}px`}}
      >
        <span className="cursor-pointer">Help</span>
        <span className="cursor-pointer">Account</span>
        <span className="cursor-pointer">US</span>
      </div>
    </section>
  );
}
