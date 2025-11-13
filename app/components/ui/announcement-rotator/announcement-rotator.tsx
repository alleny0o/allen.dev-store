import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type {EmblaCarouselType, EmblaOptionsType} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import type {AutoplayOptionsType} from 'embla-carousel-autoplay';

export type AnnouncementRotatorProps = {
  autoRotate?: boolean;
  autoRotateInterval?: number;
  children: React.ReactNode;
  className?: string;
};

export type AnnouncementRotatorContextProps = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: EmblaCarouselType | undefined;
  scrollNext: () => void;
  scrollPrev: () => void;
  totalSlides: number;
};

const AnnouncementRotatorContext =
  React.createContext<AnnouncementRotatorContextProps | null>(null);

export function useAnnouncementRotator() {
  const context = React.useContext(AnnouncementRotatorContext);
  if (!context) {
    throw new Error(
      'useAnnouncementRotator must be used within <AnnouncementRotator />',
    );
  }
  return context;
}

const AnnouncementRotatorComponent: React.FC<AnnouncementRotatorProps> = ({
  autoRotate = false,
  autoRotateInterval = 7000,
  children,
  className,
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const plugins = React.useMemo(() => {
    const list = [];
    if (autoRotate) {
      list.push(
        Autoplay({
          delay: autoRotateInterval,
        } as AutoplayOptionsType),
      );
    }
    return list;
  }, [autoRotate, autoRotateInterval]);

  const options = React.useMemo<EmblaOptionsType>(
    () => ({
      loop: true,
      containScroll: false,
      skipSnaps: false,
      dragThreshold: 1,
    }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );
  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!emblaApi) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [emblaApi, scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    return () => emblaApi?.destroy();
  }, [emblaApi]);

  return (
    <AnnouncementRotatorContext.Provider
      value={{
        emblaRef,
        emblaApi,
        scrollNext,
        scrollPrev,
        totalSlides,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={className}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-live="polite"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {children}
      </div>
    </AnnouncementRotatorContext.Provider>
  );
};

AnnouncementRotatorComponent.displayName = 'AnnouncementRotator';
export const AnnouncementRotator = React.memo(AnnouncementRotatorComponent);
