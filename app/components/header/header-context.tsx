import {createContext, useContext} from 'react';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

export type HeaderData = ROOT_QUERYResult['header'];

export const HeaderContext = createContext<HeaderData | null>(null);

export function useHeaderSettings() {
  const ctx = useContext(HeaderContext);
  if (!ctx) {
    throw new Error('useHeaderSettings must be used within <HeaderContext.Provider>');
  }
  return ctx;
}
