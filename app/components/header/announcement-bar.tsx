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
    <section className="relative bg-background text-foreground section-padding overflow-hidden" id="announcement-bar">
      <div className="py-0.5">
        <div className="h-full mx-auto max-w-full px-4 md:px-6 lg:px-8">
          <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
          <AnnouncementRotator
            autoRotate={header?.autoRotateAnnouncements ?? false}
            autoRotateInterval={5000}
            className="relative flex items-center text-[13px]"
          >
            {/* Arrows - Absolute positioned on left */}
            {isActive && (
              <div className="bg-background absolute left-0 z-10 hidden items-center gap-0 lg:flex pointer-events-auto">
                <AnnouncementRotatorPrevious className="shrink-0 rounded-md" />
                <AnnouncementRotatorNext className="shrink-0 rounded-md" />
              </div>
            )}

            {/* Announcement Content - Full width, truly centered */}
            <AnnouncementRotatorContent className="w-full lg:px-16 select-none cursor-grab active:cursor-grabbing [&>div]:pointer-events-auto [&>div]:overflow-visible">
              {announcementBar.map((item: AnnouncementBarProps) => (
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
      
      {/* Utility Links - Absolute positioned on right, hidden on lg and smaller */}
      <div className="bg-background absolute right-4 lg:right-8 top-0 bottom-0 z-10 hidden lg:flex items-center justify-end gap-4 pl-4 border-l border-current text-[13px] pointer-events-auto">
        <span className="cursor-pointer">Help</span>
        <span className="cursor-pointer">Account</span>
        <span className="cursor-pointer">US</span>
      </div>
    </section>
  );
}

function Item(props: AnnouncementBarProps) {
  if (!props.text) return null;
  const wrapperClassName = cx('flex w-full justify-center text-center');
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
    <p className={wrapperClassName}>{props.text}</p>
  );
}