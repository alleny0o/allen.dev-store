import {useHeaderHeight} from '../hooks/use-header-height';

/** Default height when header height is not yet calculated */
const DEFAULT_HEIGHT = 0;

/**
 * Injects CSS custom property for header height into the document root.
 * Used for layout calculations that depend on header dimensions.
 */
export function HeaderHeightCssVars() {
  const {desktopHeaderHeight} = useHeaderHeight();
  const value = desktopHeaderHeight || DEFAULT_HEIGHT;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --desktopHeaderHeight: ${value}px; }`,
      }}
    />
  );
}
