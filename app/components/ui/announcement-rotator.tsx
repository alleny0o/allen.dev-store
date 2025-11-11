import { Children, useCallback, useEffect, useState } from "react";

type AnimationType = 'slide' | 'fade';

type AnnouncementRotatorProps = {
    animation: AnimationType;
    autoRotate: boolean;
    autoRotateInterval?: number;
    children: React.ReactNode;
    className?: string;
};


export const AnnouncementRotator: React.FC<AnnouncementRotatorProps> = (props: AnnouncementRotatorProps) => {
    const {animation, autoRotate, autoRotateInterval = 5000, children, className} = props;

    // convert children to array for easier handling
    const slides = Children.toArray(children);
    const totalSlides = slides.length;

    // state management
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [isHovered, setIsHovered] = useState(false);

    // navigation functions
    const scrollNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, [totalSlides]);

    const scrollPrev = useCallback(() => {
        setDirection('prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // auto-rotation effect
    useEffect(() => {
        if (!autoRotate || isHovered || totalSlides <= 1) return;

        const interval = setInterval(() => {
            scrollNext();
        }, autoRotateInterval);

        return () => clearInterval(interval);
    }, [autoRotate, autoRotateInterval, isHovered, scrollNext, totalSlides]);

    return (
        <div></div>
    )
};