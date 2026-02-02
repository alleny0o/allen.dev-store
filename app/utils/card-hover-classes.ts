/**
 * Returns Tailwind classes for card/image hover effects
 * Used for image blocks, product cards, and other card-like components
 */
export function getCardHoverClasses(effect: string | null | undefined): string {
  switch (effect) {
    case 'scale':
      return 'transition-transform duration-300 hover:scale-105';
    
    case 'fade':
      return 'transition-opacity duration-300 hover:opacity-80';
    
    case 'lift':
      return 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl';
    
    case 'none':
    default:
      return '';
  }
}