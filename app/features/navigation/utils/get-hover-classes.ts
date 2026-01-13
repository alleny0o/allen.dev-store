/**
 * Returns Tailwind classes for navigation hover effects
 */
export function getHoverClasses(effect: string | null | undefined): string {
  switch (effect) {
    case 'underline':
      return 'relative after:absolute after:bottom-[0px] after:left-[var(--nav-padding-x)] after:right-[var(--nav-padding-x)] after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-out hover:after:w-[calc(100%-var(--nav-padding-x)*2)] [&.active]:after:w-[calc(100%-var(--nav-padding-x)*2)]';

    case 'underlineInstant':
      return 'relative after:absolute after:bottom-[0px] after:left-[var(--nav-padding-x)] after:right-[var(--nav-padding-x)] after:h-[1.5px] after:w-0 after:bg-current hover:after:w-[calc(100%-var(--nav-padding-x)*2)] [&.active]:after:w-[calc(100%-var(--nav-padding-x)*2)]';

    case 'color':
      return 'transition-colors duration-300 hover:text-primary';

    case 'background':
      return 'relative transition-colors duration-300 before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-300 before:-z-10 hover:before:opacity-10';

    case 'scale':
      return 'transition-transform duration-300 hover:scale-105';

    case 'none':
    default:
      return '';
  }
}
