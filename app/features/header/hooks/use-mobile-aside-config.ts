import {useHeaderSettings} from '../components/header-context';
import {resolveAsideConfig} from '~/features/aside/utils/resolve-aside-config';
import type {AsideConfig} from '~/features/aside';

/**
 * Resolves mobile navigation aside config from Sanity header settings.
 * Delegates all mapping logic to resolveAsideConfig.
 */
export function useMobileAsideConfig(): AsideConfig {
  const header = useHeaderSettings();

  return resolveAsideConfig(
    header?.mobileDrawerType,
    header?.mobileSidebarConfig,
    header?.mobileModalConfig,
  );
}