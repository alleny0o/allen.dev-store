import {createContext, useContext, useState, useCallback, type ReactNode} from 'react';
import {useMegaMenu} from '~/features/navigation/mega-menu/context/mega-menu-context';
import type {AsideContextValue, AsideType} from '../types';

export const AsideContext = createContext<AsideContextValue | null>(null);

/**
 * Provides aside panel state and controls to child components
 * Automatically closes mega menu when aside opens
 */
export function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');
  const {closeMenu} = useMegaMenu();

  const open = useCallback(
    (mode: AsideType) => {
      closeMenu(); // Close mega menu when aside opens
      setType(mode);
    },
    [closeMenu],
  );

  const close = useCallback(() => {
    setType('closed');
  }, []);

  return (
    <AsideContext.Provider
      value={{
        type,
        open,
        close,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
}

/**
 * Hook to access aside state and controls
 * Must be used within an AsideProvider
 */
export function useAside(): AsideContextValue {
  const context = useContext(AsideContext);
  if (!context) {
    throw new Error('useAside must be used within AsideProvider');
  }
  return context;
}