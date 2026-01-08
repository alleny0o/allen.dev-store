import { ROOT_QUERYResult } from 'types/sanity/sanity.generated';
import {getImageDimensions} from '@sanity/asset-utils';
import {useRootLoaderData} from '~/root';

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
    logo?._ref && width && height ? (desktopLogoWidth * height) / width : 44;

  const desktopHeaderHeight = (desktopLogoHeight + headerBorder).toFixed(2);

  return {desktopHeaderHeight};
}
