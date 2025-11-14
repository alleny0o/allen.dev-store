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

  const plugins = autoRotate ? [autoplay] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, align: 'start'},
    plugins,
  );

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  // NOTE: Embla’s visual slide motion feels reversed in our announcement bar layout.
  // By default, emblaApi.scrollNext() moves the track to the *right*, which visually
  // looks like moving to the *previous* slide in our design. To keep the UX intuitive
  // (Next = move left, Prev = move right), we intentionally invert the controls below.
  //
  // scrollNext → emblaApi.scrollPrev()
  // scrollPrev → emblaApi.scrollNext()
  //
  // This keeps button labels, autoplay behavior, and slide indexing consistent with
  // expected carousel semantics while preserving the desired visual animation direction.
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

    onSelect(); // Sync initial UI state
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
      }}
    >
      <div className={className}>{children}</div>
    </AnnouncementRotatorContext.Provider>
  );
};

AnnouncementRotatorComponent.displayName = 'AnnouncementRotator';
export const AnnouncementRotator = React.memo(AnnouncementRotatorComponent);
