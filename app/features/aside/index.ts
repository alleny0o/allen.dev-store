// Components
export {Aside} from './components/aside';
export {AsideBackdrop} from './components/aside-backdrop';

// Context
export {AsideContext, AsideProvider} from './context/aside-context';

// Hooks
export {useAside} from './hooks/use-aside';
export {useAsideClose} from './hooks/use-aside-close';

// Utils
export {
  getAsideClasses,
  getSidebarClasses,
  getModalClasses,
} from './utils/aside-classnames';
export {
  getAsideVariants,
  getSidebarVariants,
  getModalVariants,
  getBackdropVariants,
} from './utils/aside-animations';
export {
  getAsideCssVars,
  getSidebarCssVars,
  getModalCssVars,
} from './utils/aside-css-vars';
export {
  resolveAsideConfig,
  SIDEBAR_DEFAULTS,
  MODAL_DEFAULTS,
} from './utils/resolve-aside-config';
export type {
  RawSidebarConfig,
  RawModalConfig,
} from './utils/resolve-aside-config';

// Types
export type {
  AsideType,
  AsideConfig,
  SidebarConfig,
  ModalConfig,
  SidebarAnimation,
  ModalAnimation,
  FullWidthBelow,
  FullScreenBelow,
  BorderRadius,
  BorderRadiusOnFullScreen,
  AsideContextValue,
  AsideProps,
} from './types';
