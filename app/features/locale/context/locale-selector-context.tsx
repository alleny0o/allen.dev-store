import {createContext, useContext, useState, type ReactNode} from 'react';

// ============================================================================
// TYPES
// ============================================================================

type LocaleSelectorContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// ============================================================================
// CONTEXT
// ============================================================================

const LocaleSelectorContext = createContext<LocaleSelectorContextValue | null>(
  null,
);

// ============================================================================
// PROVIDER
// ============================================================================

/**
 * Provides a single shared open/close state for all locale selector instances.
 * Ensures only one selector can be open at a time across header, footer, etc.
 * Should wrap any layout that renders LocaleSelector.
 */
export function LocaleSelectorProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LocaleSelectorContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </LocaleSelectorContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useLocaleSelectorContext(): LocaleSelectorContextValue {
  const ctx = useContext(LocaleSelectorContext);
  if (!ctx) {
    throw new Error(
      'useLocaleSelectorContext must be used within a LocaleSelectorProvider',
    );
  }
  return ctx;
}
