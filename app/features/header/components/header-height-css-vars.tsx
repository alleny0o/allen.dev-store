import {useHeaderHeight} from '../hooks/use-header-height';

export function HeaderHeightCssVars() {
  const {desktopHeaderHeight} = useHeaderHeight();
  const value = desktopHeaderHeight || 0;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --desktopHeaderHeight: ${value}px; }`,
      }}
    />
  );
}
