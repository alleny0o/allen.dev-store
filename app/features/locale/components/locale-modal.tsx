import {Aside, useAside, resolveAsideConfig} from '~/features/aside';
import type {RawModalConfig} from '~/features/aside';

interface LocaleModalProps {
  modalConfig: RawModalConfig;
  children: React.ReactNode;
}

/**
 * Locale selector modal container.
 * Uses the global aside system — opens via useAside().open('locale').
 * Resolves raw Sanity modal config via resolveAsideConfig.
 */
export function LocaleModal({modalConfig, children}: LocaleModalProps) {
  const config = resolveAsideConfig('modal', null, modalConfig);

  return (
    <Aside type="locale" config={config}>
      {children}
    </Aside>
  );
}

/**
 * Hook for opening/closing the locale modal.
 * Used by LocaleSelector to wire the trigger button.
 */
export function useLocaleModal() {
  const {type, open, close} = useAside();
  const isOpen = type === 'locale';

  return {
    isOpen,
    open: () => open('locale'),
    close,
    toggle: () => (isOpen ? close() : open('locale')),
  };
}