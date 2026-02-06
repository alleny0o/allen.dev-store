import {useHeaderSettings} from '~/features/header';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useTypographyCssVars} from '~/hooks/use-typography-css-vars';

/**
 * Generates CSS variables for mega menu styling
 * Combines dropdown colors, heading typography, and link typography
 */
export function useMegaMenuStyles(): string {
  const header = useHeaderSettings();

  const dropdownCssVars = useColorsCssVars({
    selector: '#mega-menu-dropdown',
    settings: {
      colorScheme: header?.desktopMegaMenuColorScheme ?? null,
      padding: header?.desktopMegaMenuPadding,
      separatorLine: header?.desktopMegaMenuSeparatorLine ?? null,
    },
  });

  const headingTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .mega-menu-heading',
    override: header?.desktopMegaMenuHeadingTypography,
  });

  const linkTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .mega-menu-link',
    override: header?.desktopMegaMenuLinkTypography,
  });

  return dropdownCssVars + headingTypographyCss + linkTypographyCss;
}
