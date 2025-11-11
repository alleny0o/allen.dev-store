import { Children, useState } from "react";

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

    return (
        <div></div>
    )
};