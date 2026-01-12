import {useHeaderSettings} from '~/features/header';
import {getHoverClasses} from '../utils/get-hover-classes';

type NavHoverType = 'navigation' | 'heading' | 'link';

/**
 * Returns hover effect classes for navigation elements
 */
export function useNavHoverClasses(type: NavHoverType): string {
  const header = useHeaderSettings();

  let effect: string | null | undefined;

  switch (type) {
    case 'navigation':
      effect = header?.desktopNavigationHoverEffect;
      break;
    case 'heading':
      effect = header?.desktopMegaMenuHeadingHoverEffect;
      break;
    case 'link':
      effect = header?.desktopMegaMenuLinkHoverEffect;
      break;
  }

  return getHoverClasses(effect);
}
