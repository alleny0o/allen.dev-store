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
  direction: 'next' | 'prev';
  scrollNext: () => void;
  scrollPrev: () => void;
  totalSlides: number;
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

// Main component placeholder
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
  const [direction, setDirection] = React.useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = React.useState(false);

  // Navigation functions
  const scrollNext = React.useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const scrollPrev = React.useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-rotation effect
  React.useEffect(() => {
    if (!autoRotate || isHovered || totalSlides <= 1) {
      return;
    }

    const interval = setInterval(() => {
      scrollNext();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, isHovered, autoRotateInterval, scrollNext, totalSlides]);

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
        direction,
        scrollNext,
        scrollPrev,
        totalSlides,
      }}
    >
      <div
        aria-roledescription="carousel"
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
