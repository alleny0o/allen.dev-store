import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {Link} from 'react-router';
import {cx} from 'class-variance-authority';
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
      padding: null,
    },
  });

  const isActive = (announcementBar?.length ?? 0) > 1;
  if (!announcementBar) return null;

  return (
    <section className="relative bg-background text-foreground section-padding" id="announcement-bar">
      <div className="py-1.25">
        <div className="h-full mx-auto max-w-full px-4 md:px-6 lg:px-8">
          <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
          <AnnouncementRotator
            autoRotate={header?.autoRotateAnnouncements ?? false}
            autoRotateInterval={5000}
            className="relative flex items-center text-[13px]"
          >
            {/* Arrows - Absolute positioned on left */}
            {isActive && (
              <div className="absolute left-0 z-10 hidden items-center gap-0 bg-transparent lg:flex">
                <AnnouncementRotatorPrevious className="shrink-0 rounded-md" />
                <AnnouncementRotatorNext className="shrink-0 rounded-md" />
              </div>
            )}

            {/* Announcement Content - Full width, truly centered */}
            <AnnouncementRotatorContent className="w-full px-4 md:px-6 lg:px-8 select-none overflow-visible">
              {announcementBar?.map((item: any) => (
                <AnnouncementRotatorItem key={item._key}>
                  <Item
                    _key={item._key}
                    externalLink={item.externalLink}
                    link={item.link}
                    openInNewTab={item.openInNewTab}
                    text={item.text}
                  />
                </AnnouncementRotatorItem>
              ))}
            </AnnouncementRotatorContent>
          </AnnouncementRotator>
        </div>
      </div>
      
      {/* Utility Links - Absolute positioned on right, hidden on md and smaller */}
      <div className="absolute right-4 md:right-6 lg:right-8 top-0 bottom-0 z-10 hidden items-center justify-end gap-3 bg-transparent pl-4 lg:flex border-l border-current text-[13px]">
        <span className="cursor-pointer">Help</span>
        <span className="cursor-pointer">Account</span>
        <span className="cursor-pointer">🇺🇸 US</span>
      </div>
    </section>
  );
}

function Item(props: AnnouncementBarProps) {
  if (!props.text) return null;
  const wrapperClassName = cx('flex w-full justify-center text-center');
  const linkClassName = cx('underline underline-offset-4 decoration-current');

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
    <p className={wrapperClassName}>{props.text}</p>
  );
}