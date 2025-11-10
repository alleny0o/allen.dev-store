import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

import {Link} from 'react-router';
import {cx} from 'class-variance-authority';
import Autoplay from 'embla-carousel-autoplay';
import {useMemo} from 'react';

import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useRootLoaderData} from '~/root';

import {IconArrowRight} from '~/components/icons/icon-arrow-right';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';

// Represents one announcement entry
type AnnouncementBarProps = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBar']
>[number];

export function AnnouncementBar() {
  // Header settings + announcement items from Sanity
  const {sanityRoot} = useRootLoaderData();
  const header = sanityRoot?.data?.header;
  const announcementBar = header?.announcementBar;

  // Enable autoplay only when autoRotateAnnouncements is true
  const plugins = useMemo(
    () =>
      header?.autoRotateAnnouncements
        ? [Autoplay({delay: 5000, stopOnMouseEnter: true})]
        : [],
    [header],
  );

  // Scoped CSS vars for color + padding (affects this section only)
  const colorsCssVars = useColorsCssVars({
    selector: `#announcement-bar`,
    settings: {
      colorScheme: header?.announcementBarColorScheme ?? null,
      padding: header?.announcementBarPadding ?? null,
    },
  });

  // Only show carousel controls if there's more than one item
  const isActive = (announcementBar?.length ?? 0) > 1;

  if (!announcementBar) return null;

  return (
    <section
      className="bg-background section-padding text-foreground"
      id="announcement-bar"
    >
      <div className="container">
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
        <Carousel
          opts={{
            active: isActive,
            align: 'center',
            loop: true,
          }}
          plugins={plugins}
          className="w-full"
        >
          {/* Simple layout: < text > */}
          <div className="flex items-center justify-center gap-4">
            {/* LEFT arrow */}
            {isActive && (
              <CarouselPrevious className="static size-5 translate-y-0 border-none bg-transparent p-0 transition-opacity hover:bg-transparent hover:opacity-60" />
            )}

            {/* CENTER - Carousel content */}
            <div className="flex-1 overflow-hidden">
              <CarouselContent className="-ml-0">
                {announcementBar?.map((item: any) => (
                  <CarouselItem key={item._key} className="pl-0">
                    <Item {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            {/* RIGHT arrow */}
            {isActive && (
              <CarouselNext className="static size-5 translate-y-0 border-none bg-transparent p-0 transition-opacity hover:bg-transparent hover:opacity-60" />
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
}

// Renders one announcement entry w/ correct link behavior
function Item(props: AnnouncementBarProps) {
  const className = cx('flex w-full justify-center text-center text-sm');
  const {text} = props;
  if (!text) return null;

  if (props.link) {
    return (
      <SanityInternalLink
        className={cx('group', className)}
        data={{
          _key: props.link.slug?.current ?? '',
          _type: 'internalLink',
          link: props.link,
          anchor: null,
          name: text,
        }}
      >
        <LinkWrapper>{text}</LinkWrapper>
      </SanityInternalLink>
    );
  }

  if (props.externalLink) {
    return (
      <Link
        className={cx('group', className)}
        to={props.externalLink}
        target={props.openInNewTab ? '_blank' : undefined}
        rel={props.openInNewTab ? 'noopener noreferrer' : undefined}
      >
        <LinkWrapper>{text}</LinkWrapper>
      </Link>
    );
  }

  return <p className={className}>{text}</p>;
}

// Text
function LinkWrapper({children}: {children: React.ReactNode}) {
  return (
    <p className="flex items-center text-sm underline-offset-4 group-hover:underline">
      <span className="relative z-2 block bg-background pr-2">{children}</span>
    </p>
  );
}
