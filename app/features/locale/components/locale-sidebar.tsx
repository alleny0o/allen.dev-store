import {Aside, useAside, resolveAsideConfig} from '~/features/aside';
import type {RawSidebarConfig} from '~/features/aside';

interface LocaleSidebarProps {
  sidebarConfig: RawSidebarConfig;
  children: React.ReactNode;
}

/**
 * Locale selector sidebar container.
 * Uses the global aside system — opens via useAside().open('locale').
 * Resolves raw Sanity sidebar config via resolveAsideConfig.
 */
export function LocaleSidebar({sidebarConfig, children}: LocaleSidebarProps) {
  const config = resolveAsideConfig('sidebar', sidebarConfig, null);

  return (
    <Aside type="locale" config={config}>
      {children}
    </Aside>
  );
}

/**
 * Hook for opening/closing the locale sidebar.
 * Used by LocaleSelector to wire the trigger button.
 */
export function useLocaleSidebar() {
  const {type, open, close} = useAside();
  const isOpen = type === 'locale';

  return {
    isOpen,
    open: () => open('locale'),
    close,
    toggle: () => (isOpen ? close() : open('locale')),
  };
}
