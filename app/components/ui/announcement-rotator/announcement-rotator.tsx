import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type {EmblaCarouselType} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

export type AnnouncementRotatorProps = {
  autoRotate?: boolean;
  autoRotateInterval?: number;
  children: React.ReactNode;
  className?: string;
};

export type AnnouncementRotatorContextProps = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  totalSlides: number;
  currentSlide: number;
  canScrollNext: boolean;
  canScrollPrev: boolean;
};

type AnnouncementRotatorInternalContextProps = AnnouncementRotatorContextProps & {
  emblaApi: EmblaCarouselType | undefined;
};

const AnnouncementRotatorContext =
  React.createContext<AnnouncementRotatorInternalContextProps | null>(null);

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
  autoRotateInterval = 5000,
  children,
  className,
}) => {
  const totalSlides = React.Children.count(children);

  const plugins = autoRotate
    ? [
        Autoplay({
          delay: autoRotateInterval,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const scrollNext = () => emblaApi?.scrollNext();
  const scrollPrev = () => emblaApi?.scrollPrev();

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    
    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <AnnouncementRotatorContext.Provider
      value={{
        emblaRef,
        emblaApi,
        scrollNext,
        scrollPrev,
        totalSlides,
        currentSlide,
        canScrollNext: emblaApi?.canScrollNext() ?? false,
        canScrollPrev: emblaApi?.canScrollPrev() ?? false,
      }}
    >
      <div className={className}>{children}</div>
    </AnnouncementRotatorContext.Provider>
  );
};

AnnouncementRotatorComponent.displayName = 'AnnouncementRotator';
export const AnnouncementRotator = React.memo(AnnouncementRotatorComponent);