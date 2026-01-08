// use-mega-menu-styles.ts

import {useHeaderSettings} from '~/features/header';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useTypographyCssVars} from '~/hooks/use-typography-css-vars';

/**
 * Generates CSS variables for mega menu styling
 */
export function useMegaMenuStyles() {
  const header = useHeaderSettings();

  const dropdownCssVars = useColorsCssVars({
    selector: '#mega-menu-dropdown',
    settings: {
      colorScheme: header?.megaMenuColorScheme ?? null,
      padding: header?.megaMenuPadding,
      separatorLine: header?.megaMenuSeparatorLine ?? null,
    },
  });

  const headingTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .mega-menu-heading',
    override: header?.megaMenuHeadingTypography,
  });

  const linkTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .mega-menu-link',
    override: header?.megaMenuLinkTypography,
  });

  return dropdownCssVars + headingTypographyCss + linkTypographyCss;
}
