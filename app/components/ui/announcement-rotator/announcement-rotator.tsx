import * as React from 'react';

// Type definitions
type AnimationType = 'slide' | 'fade';

type AnnouncementRotatorProps = {
  animation: AnimationType;
  autoRotate: boolean;
  autoRotateInterval?: number;
  children: React.ReactNode;
  className?: string;
};

type AnnouncementRotatorContextProps = {
  animation: AnimationType;
  currentIndex: number;
  translateX: number;
  isTransitioning: boolean;
  direction: 'next' | 'prev';
  scrollNext: () => void;
  scrollPrev: () => void;
  totalSlides: number;
  slides: React.ReactNode[];
};

// Context creation
const AnnouncementRotatorContext =
  React.createContext<AnnouncementRotatorContextProps | null>(null);

// Custom hook to use context
export function useAnnouncementRotator() {
  const context = React.useContext(AnnouncementRotatorContext);

  if (!context) {
    throw new Error(
      'useAnnouncementRotator must be used within an <AnnouncementRotator />',
    );
  }

  return context;
}

// Main component
export const AnnouncementRotator: React.FC<AnnouncementRotatorProps> = (
  props,
) => {
  const {
    animation,
    autoRotate,
    autoRotateInterval = 5000,
    children,
    className,
  } = props;

  // Convert children to array for easier handling
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  // State management
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [translateX, setTranslateX] = React.useState(-100); // Start showing first real slide
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [direction, setDirection] = React.useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPausedFromInteraction, setIsPausedFromInteraction] =
    React.useState(false);

  const transitionTimeoutRef = React.useRef<NodeJS.Timeout>();
  const resetTimeoutRef = React.useRef<NodeJS.Timeout>();

  // Navigation function for going to next slide
  const scrollNext = React.useCallback(() => {
    if (totalSlides <= 1) return;

    // Clear any pending timeouts
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    setDirection('next');
    setIsTransitioning(true);

    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);

    // Move to next position
    setTranslateX((prev) => prev - 100);

    // If we're moving to the clone of the first slide
    if (nextIndex === 0) {
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setTranslateX(-100); // Reset to real first slide position
        resetTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(true);
        }, 20);
      }, 500);
    }

    // Pause auto-rotation temporarily when user manually navigates
    setIsPausedFromInteraction(true);
    setTimeout(() => setIsPausedFromInteraction(false), autoRotateInterval);
  }, [currentIndex, totalSlides, autoRotateInterval]);

  // Navigation function for going to previous slide
  const scrollPrev = React.useCallback(() => {
    if (totalSlides <= 1) return;

    // Clear any pending timeouts
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    setDirection('prev');
    setIsTransitioning(true);

    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(prevIndex);

    // Move to previous position
    setTranslateX((prev) => prev + 100);

    // If we're moving to the clone of the last slide
    if (prevIndex === totalSlides - 1) {
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setTranslateX(-100 * totalSlides); // Reset to real last slide position
        resetTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(true);
        }, 20);
      }, 500);
    }

    // Pause auto-rotation temporarily when user manually navigates
    setIsPausedFromInteraction(true);
    setTimeout(() => setIsPausedFromInteraction(false), autoRotateInterval);
  }, [currentIndex, totalSlides, autoRotateInterval]);

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current)
        clearTimeout(transitionTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // Auto-rotation effect
  React.useEffect(() => {
    if (
      !autoRotate ||
      isHovered ||
      isPausedFromInteraction ||
      totalSlides <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      scrollNext();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [
    autoRotate,
    isHovered,
    isPausedFromInteraction,
    autoRotateInterval,
    scrollNext,
    totalSlides,
  ]);

  // Keyboard navigation handler
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <AnnouncementRotatorContext.Provider
      value={{
        animation,
        currentIndex,
        translateX,
        isTransitioning,
        direction,
        scrollNext,
        scrollPrev,
        totalSlides,
        slides,
      }}
    >
      <div
        className={className}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </AnnouncementRotatorContext.Provider>
  );
};
