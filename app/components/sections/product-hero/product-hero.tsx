import type {SectionDefaultProps, SectionOfType} from 'types';
import type {RootLoaderData} from '~/root';
import {useRouteLoaderData} from 'react-router';

import {cn} from '~/lib/utils';

export type ProductHeroSectionProps = SectionOfType<'productHeroSection'>;

type Props = SectionDefaultProps & {
  data: ProductHeroSectionProps;
};

export function ProductHeroSection({data}: Props) {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  const design = rootData?.sanityRoot?.data?.productSectionDesign;

  // Layout configuration
  const breakpoint = design?.breakpoint ?? 'lg';
  const isFlipped = design?.flipLayout ?? false;
  const columnRatio = design?.columnRatio ?? '7:5';
  const [mediaColsStr, detailColsStr] = columnRatio.split(':');

  // Spacing
  const gapDesktop = design?.gap?.desktop ?? 40;
  const gapMobile = design?.gap?.mobile ?? 24;

  // Map to actual Tailwind classes
  const getColSpan = (cols: string, breakpoint: string) => {
    const colNum = parseInt(cols);
    
    if (breakpoint === 'md') {
      switch(colNum) {
        case 3: return 'md:col-span-3';
        case 4: return 'md:col-span-4';
        case 5: return 'md:col-span-5';
        case 6: return 'md:col-span-6';
        case 7: return 'md:col-span-7';
        case 8: return 'md:col-span-8';
        case 9: return 'md:col-span-9';
        default: return 'md:col-span-6';
      }
    } else {
      switch(colNum) {
        case 3: return 'lg:col-span-3';
        case 4: return 'lg:col-span-4';
        case 5: return 'lg:col-span-5';
        case 6: return 'lg:col-span-6';
        case 7: return 'lg:col-span-7';
        case 8: return 'lg:col-span-8';
        case 9: return 'lg:col-span-9';
        default: return 'lg:col-span-6';
      }
    }
  };

  const getGapClasses = () => {
    // Map to closest Tailwind gap values
    const mobileGap = gapMobile <= 16 ? 'gap-4' : gapMobile <= 24 ? 'gap-6' : gapMobile <= 32 ? 'gap-8' : 'gap-10';
    const desktopGap = breakpoint === 'md' 
      ? (gapDesktop <= 32 ? 'md:gap-8' : gapDesktop <= 40 ? 'md:gap-10' : 'md:gap-12')
      : (gapDesktop <= 32 ? 'lg:gap-8' : gapDesktop <= 40 ? 'lg:gap-10' : 'lg:gap-12');
    return `${mobileGap} ${desktopGap}`;
  };

  const getOrderClasses = (defaultOrder: number) => {
    if (!isFlipped) return defaultOrder === 1 ? 'order-1' : 'order-2';
    
    const flippedOrder = defaultOrder === 1 ? 2 : 1;
    return breakpoint === 'md' 
      ? `order-${defaultOrder} md:order-${flippedOrder}`
      : `order-${defaultOrder} lg:order-${flippedOrder}`;
  };

  // Column spans
  const mediaColSpan = getColSpan(mediaColsStr, breakpoint);
  const detailColSpan = getColSpan(detailColsStr, breakpoint);

  // Grid classes
  const gridClasses = cn(
    'grid grid-cols-1',
    breakpoint === 'md' ? 'md:grid-cols-12' : 'lg:grid-cols-12',
    getGapClasses()
  );

  return (
    <div id="product-hero-section" className="w-full">
      <div className="mx-auto w-full">
        <div className={gridClasses}>
          <div className={cn(getOrderClasses(1), mediaColSpan)}>
            Product Media
          </div>
          <div className={cn(getOrderClasses(2), detailColSpan)}>
            Product Details
          </div>
        </div>
      </div>
    </div>
  );
}