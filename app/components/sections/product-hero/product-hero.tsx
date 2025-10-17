import type {SectionDefaultProps, SectionOfType} from 'types';
import type {RootLoaderData} from '~/root';
import {useRouteLoaderData} from 'react-router';
import {cn} from '~/lib/utils';

export type ProductHeroSectionProps = SectionOfType<'productHeroSection'>;

type Props = SectionDefaultProps & {
  data: ProductHeroSectionProps;
};

// Pre-defined Tailwind column span classes for dynamic usage
const COL_SPAN_MAP: Record<number, Record<string, string>> = {
  1: {lg: 'lg:col-span-1', md: 'md:col-span-1'},
  2: {lg: 'lg:col-span-2', md: 'md:col-span-2'},
  3: {lg: 'lg:col-span-3', md: 'md:col-span-3'},
  4: {lg: 'lg:col-span-4', md: 'md:col-span-4'},
  5: {lg: 'lg:col-span-5', md: 'md:col-span-5'},
  6: {lg: 'lg:col-span-6', md: 'md:col-span-6'},
  7: {lg: 'lg:col-span-7', md: 'md:col-span-7'},
  8: {lg: 'lg:col-span-8', md: 'md:col-span-8'},
  9: {lg: 'lg:col-span-9', md: 'md:col-span-9'},
  10: {lg: 'lg:col-span-10', md: 'md:col-span-10'},
  11: {lg: 'lg:col-span-11', md: 'md:col-span-11'},
  12: {lg: 'lg:col-span-12', md: 'md:col-span-12'},
};

const GAP_MAP: Record<number, Record<string, string>> = {
  16: {mobile: 'gap-4', desktop_lg: 'lg:gap-4', desktop_md: 'md:gap-4'},
  24: {mobile: 'gap-6', desktop_lg: 'lg:gap-6', desktop_md: 'md:gap-6'},
  32: {mobile: 'gap-8', desktop_lg: 'lg:gap-8', desktop_md: 'md:gap-8'},
  40: {mobile: 'gap-10', desktop_lg: 'lg:gap-10', desktop_md: 'md:gap-10'},
  48: {mobile: 'gap-12', desktop_lg: 'lg:gap-12', desktop_md: 'md:gap-12'},
};

const ORDER_MAP: Record<number, Record<string, string>> = {
  1: {lg: 'lg:order-1', md: 'md:order-1', base: 'order-1'},
  2: {lg: 'lg:order-2', md: 'md:order-2', base: 'order-2'},
};

export function ProductHeroSection({data}: Props) {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  const design = rootData?.sanityRoot?.data?.productSectionDesign;

  // Layout configuration
  const breakpoint = design?.breakpoint ?? 'lg';
  const isFlipped = design?.flipLayout ?? false;

  // Parse columnRatio - handle both "7:5" string format and number format
  let mediaCols = 7;
  if (design?.columnRatio) {
    if (typeof design.columnRatio === 'string') {
      const parts = design.columnRatio.split(':');
      mediaCols = Number(parts[0]) || 7;
    } else {
      mediaCols = Number(design.columnRatio) || 7;
    }
  }
  const detailCols = 12 - mediaCols;

  // Spacing - find closest gap value
  const gapDesktop = design?.gap?.desktop ?? 40;
  const gapMobile = design?.gap?.mobile ?? 24;

  const getClosestGap = (value: number): number => {
    const gapOptions = [16, 24, 32, 40, 48];
    return gapOptions.reduce((closest, current) =>
      Math.abs(current - value) < Math.abs(closest - value) ? current : closest,
    );
  };

  const closestMobileGap = getClosestGap(gapMobile);
  const closestDesktopGap = getClosestGap(gapDesktop);

  // Get gap classes
  const getGapClasses = () => {
    const mobileGapClass = GAP_MAP[closestMobileGap]?.mobile ?? 'gap-6';
    const desktopKey = breakpoint === 'md' ? 'desktop_md' : 'desktop_lg';
    const desktopGapClass =
      GAP_MAP[closestDesktopGap]?.[desktopKey] ?? 'lg:gap-10';
    return `${mobileGapClass} ${desktopGapClass}`;
  };

  // Get order classes
  const getOrderClasses = (order: number) => {
    const base = ORDER_MAP[order]?.base ?? `order-${order}`;

    if (!isFlipped) {
      return base;
    }

    const flipped = order === 1 ? 2 : 1;
    const breakpointKey = breakpoint === 'md' ? 'md' : 'lg';
    const breakpointOrder =
      ORDER_MAP[flipped]?.[breakpointKey] ?? `${breakpoint}:order-${flipped}`;

    return `${base} ${breakpointOrder}`;
  };

  // Get column span classes
  const mediaColClass =
    COL_SPAN_MAP[mediaCols]?.[breakpoint] ?? 'lg:col-span-7';
  const detailColClass =
    COL_SPAN_MAP[detailCols]?.[breakpoint] ?? 'lg:col-span-5';

  // Grid classes
  const gridClasses = cn(
    'grid grid-cols-1',
    breakpoint === 'md' ? 'md:grid-cols-12' : 'lg:grid-cols-12',
    getGapClasses(),
  );

  return (
    <div id="product-hero-section" className="w-full">
      <div className="mx-auto w-full">
        <div className={gridClasses}>
          <div className={cn(getOrderClasses(1), mediaColClass)}>
            Product Media
          </div>
          <div className={cn(getOrderClasses(2), detailColClass)}>
            Product Details
          </div>
        </div>
      </div>
    </div>
  );
}
