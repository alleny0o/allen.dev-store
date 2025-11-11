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
    <section className="bg-background text-foreground" id="announcement-bar">
      <div className="container">
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
        <AnnouncementRotator 
          animation="fade" 
          autoRotate={header?.autoRotateAnnouncements ?? false}
          autoRotateInterval={5000}
          className="flex items-center justify-center gap-4"
        >
          {/* Flexible layout - you can rearrange these however you want! */}
          {isActive && (
            <AnnouncementRotatorPrevious 
              className="shrink-0 rounded-md p-2 transition-colors hover:bg-foreground/10"
            />
          )}
          
          <AnnouncementRotatorContent className="flex-1">
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

          {isActive && (
            <AnnouncementRotatorNext 
              className="shrink-0 rounded-md p-2 transition-colors hover:bg-foreground/10"
            />
          )}
        </AnnouncementRotator>
      </div>
    </section>
  );
}

function Item(props: AnnouncementBarProps) {
  if (!props.text) return null;

  const className = cx('flex w-full justify-center text-center');

  return props.link ? (
    <SanityInternalLink
      className={cx(['group', className])}
      data={{
        _key: props.link.slug?.current ?? '',
        _type: 'internalLink',
        anchor: null,
        link: props.link,
        name: props.text,
      }}
    >
      <LinkWrapper>{props.text}</LinkWrapper>
    </SanityInternalLink>
  ) : props.externalLink ? (
    <Link
      className={cx(['group', className])}
      rel={props.openInNewTab ? 'noopener noreferrer' : ''}
      target={props.openInNewTab ? '_blank' : undefined}
      to={props.externalLink}
    >
      <LinkWrapper>{props.text}</LinkWrapper>
    </Link>
  ) : (
    <p className={className}>{props.text}</p>
  );
}

function LinkWrapper({children}: {children: React.ReactNode}) {
  return (
    <p className="flex items-center text-sm underline-offset-4 group-hover:underline">
      <span className="relative z-2 block bg-background pr-2">{children}</span>
    </p>
  );
}