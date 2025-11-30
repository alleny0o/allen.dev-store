import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type {EmblaCarouselType} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

export type AnnouncementRotatorProps = {
  autoRotate?: boolean;
  autoRotateInterval?: number;
  children: React.ReactNode;
  className?: string;
  transitionMode?: 'slide' | 'fade'; // New prop
};

export type AnnouncementRotatorContextProps = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  totalSlides: number;
  currentSlide: number;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  transitionMode: 'slide' | 'fade'; // Add to context
};

type AnnouncementRotatorInternalContextProps =
  AnnouncementRotatorContextProps & {
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
  transitionMode = 'slide', // Default to slide
}) => {
  const totalSlides = React.Children.count(children);

  // --- Stable autoplay instance ---
  const autoplay = React.useMemo(() => {
    return Autoplay({
      delay: autoRotateInterval,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    });
  }, [autoRotateInterval]);

  // Build plugins array based on mode
  const plugins = React.useMemo(() => {
    const pluginList = [];

    if (transitionMode === 'fade') {
      pluginList.push(Fade());
    }

    if (autoRotate) {
      pluginList.push(autoplay);
    }

    return pluginList;
  }, [transitionMode, autoRotate, autoplay]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, align: 'start'},
    plugins,
  );

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  const scrollNext = () => emblaApi?.scrollPrev();
  const scrollPrev = () => emblaApi?.scrollNext();

  // --- Handle slide selection and nav state ---
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());
    };

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
        canScrollNext,
        canScrollPrev,
        transitionMode,
      }}
    >
      <div className={className}>{children}</div>
    </AnnouncementRotatorContext.Provider>
  );
};

AnnouncementRotatorComponent.displayName = 'AnnouncementRotator';
export const AnnouncementRotator = React.memo(AnnouncementRotatorComponent);
