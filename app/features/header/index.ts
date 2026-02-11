/**
 * Public API for header feature
 *
 * Exports all header-related components, contexts, and hooks for use throughout the application.
 */

export type {HeaderData, HeaderLayoutProps, AnnouncementBarEntry, UtilityLink} from './types';
export { Header } from './components/header';
export { HeaderContext, useHeaderSettings } from './components/header-context';
export { HeaderHeightCssVars } from './components/header-height-css-vars';
export { useHeaderHeight } from './hooks/use-header-height';
export { AnnouncementBar } from './components/announcement-bar/announcement-bar';
export {useMobileAsideConfig} from './hooks/use-mobile-aside-config';