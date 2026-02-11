import {Aside} from '~/features/aside';
import {useMobileAsideConfig} from '~/features/header/hooks/use-mobile-aside-config';
import {useHeaderSettings} from '~/features/header';
import {MobileNavigationTrigger} from './mobile-navigation-trigger';
import {MobileNavContent} from './mobile-nav-content';
import type {HeaderMenu} from '../types';

interface MobileNavigationProps {
  data?: HeaderMenu;
}

/**
 * Mobile navigation — trigger + aside shell + content.
 *
 * - Trigger opens the aside via useAside
 * - Aside shell is configured by Sanity (sidebar or modal)
 * - Content renders nav links, reads nav-specific config from useHeaderSettings
 */
export function MobileNavigation({data}: MobileNavigationProps) {
  const config = useMobileAsideConfig();
  const header = useHeaderSettings();

  if (!data) return null;

  return (
    <>
      <MobileNavigationTrigger />

      <Aside
        type="mobile"
        config={config}
        colorScheme={{colorScheme: header?.mobileNavigationColorScheme}}
        closeAbove="lg"
      >
        <MobileNavContent data={data} />
      </Aside>
    </>
  );
}
