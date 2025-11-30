import {createContext, useContext, useState, type ReactNode} from 'react';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface MegaMenuContextType {
  openMenu: MegaMenuType | null;
  setOpenMenu: (menu: MegaMenuType | null) => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | null>(null);

export function MegaMenuProvider({children}: {children: ReactNode}) {
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);

  return (
    <MegaMenuContext.Provider value={{openMenu, setOpenMenu}}>
      {children}
    </MegaMenuContext.Provider>
  );
}

export function useMegaMenu() {
  const context = useContext(MegaMenuContext);
  if (!context) {
    throw new Error('useMegaMenu must be used within MegaMenuProvider');
  }
  return context;
}
