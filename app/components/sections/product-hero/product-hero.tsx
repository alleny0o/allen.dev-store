import type {SectionDefaultProps, SectionOfType} from 'types';
import type {RootLoaderData} from '~/root';
import {useRouteLoaderData} from 'react-router';

import {cn} from '~/lib/utils';

import {MediaGallery} from '~/components/product/media-gallery';
import {ProductDetails} from '~/components/product/product-details';

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
  const [mediaCols, detailCols] = columnRatio.split(':');

  // Spacing
  const gapDesktop = design?.gap?.desktop ?? 40;
  const gapMobile = design?.gap?.mobile ?? 24;

  // Responsive breakpoint prefix
  const bp = breakpoint === 'md' ? 'md' : 'lg';

  // Grid classes
  const gridClasses = cn(
    'mx-auto grid w-full items-start',
    `gap-[${gapMobile}px] ${bp}:gap-[${gapDesktop}px]`,
    `grid-cols-1 ${bp}:grid-cols-12`,
  );

  // Column spans
  const mediaColSpan = `${bp}:col-span-${mediaCols}`;
  const detailColSpan = `${bp}:col-span-${detailCols}`;

  return (
    <section id="product-hero-section">
      <div className={gridClasses}>
        {isFlipped ? (
          <>
            <div className={cn('order-2 lg:order-1', detailColSpan)}>
              {/* Product Details */}
            </div>
            <div className={cn('order-1 lg:order-2', mediaColSpan)}>
              {/* Product Media */}
            </div>
          </>
        ) : (
          <>
            <div className={cn('order-1', mediaColSpan)}>
              {/* Product Media */}
            </div>
            <div className={cn('order-2', detailColSpan)}>
              {/* Product Details */}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
