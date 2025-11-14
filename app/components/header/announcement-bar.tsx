import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {Link} from 'react-router';
import {cx} from 'class-variance-authority';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useRootLoaderData} from '~/root';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {
  AnnouncementRotator,
  AnnouncementRotatorContent,
  AnnouncementRotatorItem,
  AnnouncementRotatorNext,
  AnnouncementRotatorPrevious,
} from '~/components/ui/announcement-rotator';

type AnnouncementBarProps = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBar']
>[number];

export function AnnouncementBar() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const header = data?.header;
  const announcementBar = header?.announcementBar;

  const colorsCssVars = useColorsCssVars({
    selector: `#announcement-bar`,
    settings: {
      colorScheme: header?.announcementBarColorScheme ?? null,
      customCss: null,
      hide: null,
      padding: header?.announcementBarPadding ?? null,
    },
  });

  const textSize = header?.announcementBarTextSize ?? 13;

  // Extract padding values (in pixels)
  const paddingTop = header?.announcementBarPadding?.top ?? 0;
  const paddingBottom = header?.announcementBarPadding?.bottom ?? 0;

  const isActive = header?.showAnnouncementArrows && ((announcementBar?.length ?? 0) > 1);
  if (!announcementBar) return null;

  return (
    <section
      className="container relative overflow-hidden bg-background text-foreground"
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
            {/* Arrows - Absolute positioned on left, spans full section height */}
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

            {/* Carousel viewport with padding to make entire area swipeable */}
            <AnnouncementRotatorContent
              className="select-none [&>div]:pointer-events-auto [&>div]:overflow-visible"
              style={{
                paddingTop: `calc(${paddingTop}px + 2px)`,
                paddingBottom: `calc(${paddingBottom}px + 2px)`,
              }}
            >
              {announcementBar.map((item: AnnouncementBarProps) => (
                <AnnouncementRotatorItem key={item._key}>
                  <div className="flex items-center justify-center lg:px-16">
                    <Item
                      _key={item._key}
                      externalLink={item.externalLink}
                      link={item.link}
                      openInNewTab={item.openInNewTab}
                      text={item.text}
                    />
                  </div>
                </AnnouncementRotatorItem>
              ))}
            </AnnouncementRotatorContent>
          </AnnouncementRotator>
        </div>
      </div>

      {/* Utility Links - Absolute positioned on right, spans full section height */}
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

function Item(props: AnnouncementBarProps) {
  if (!props.text) return null;
  const wrapperClassName = cx('flex justify-center text-center');
  const linkClassName = cx('underline underline-offset-[2px]');

  return props.link ? (
    <div className={wrapperClassName}>
      <SanityInternalLink
        className={linkClassName}
        data={{
          _key: props.link.slug?.current ?? '',
          _type: 'internalLink',
          anchor: null,
          link: props.link,
          name: props.text,
        }}
      >
        {props.text}
      </SanityInternalLink>
    </div>
  ) : props.externalLink ? (
    <div className={wrapperClassName}>
      <Link
        className={linkClassName}
        rel={props.openInNewTab ? 'noopener noreferrer' : ''}
        target={props.openInNewTab ? '_blank' : undefined}
        to={props.externalLink}
      >
        {props.text}
      </Link>
    </div>
  ) : (
    <p className="inline-block text-center">{props.text}</p>
  );
}
