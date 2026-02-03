import {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {getImageDimensions} from '@sanity/asset-utils';
import {useRootLoaderData} from '~/root';

/** Default logo height in pixels when dimensions cannot be calculated */
const DEFAULT_LOGO_HEIGHT = 44;
/** Number of decimal places for header height calculation */
const DECIMAL_PLACES = 2;

/**
 * Custom hook to calculate header height based on logo dimensions and separator line.
 * @returns Object containing desktopHeaderHeight as a string with pixel value
 */
export function useHeaderHeight() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;

  const desktopLogoWidth = header?.desktopLogoWidth || 1;
  const headerBorder = header?.separatorLine?.height || 0;

  const sanitySettings = data?.settings;
  const logo = sanitySettings?.logo;
  const width = logo?._ref ? getImageDimensions(logo._ref).width : 0;
  const height = logo?._ref ? getImageDimensions(logo._ref).height : 0;

  const desktopLogoHeight =
    logo?._ref && width && height
      ? (desktopLogoWidth * height) / width
      : DEFAULT_LOGO_HEIGHT;

  const desktopHeaderHeight = (desktopLogoHeight + headerBorder).toFixed(
    DECIMAL_PLACES,
  );

  return {desktopHeaderHeight};
}
