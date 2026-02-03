import {createContext, useContext} from 'react';

import type {HeaderData} from '../types';

/** Context for accessing header settings throughout the header component tree */
export const HeaderContext = createContext<HeaderData | null>(null);

/**
 * Hook to access header settings from Sanity CMS.
 * Must be used within a HeaderContext.Provider.
 * @throws Error if used outside of HeaderContext.Provider
 */
export function useHeaderSettings(): HeaderData {
  const ctx = useContext(HeaderContext);
  if (!ctx) {
    throw new Error(
      'useHeaderSettings must be used within <HeaderContext.Provider>',
    );
  }
  return ctx;
}