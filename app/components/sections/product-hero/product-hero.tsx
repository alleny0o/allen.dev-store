import type {SectionDefaultProps, SectionOfType} from 'types';
import type {RootLoaderData} from '~/root';
import {useRouteLoaderData} from 'react-router';

import {cn, getAspectRatioData} from '~/lib/utils';

import {MediaGallery} from '~/components/product/media-gallery';
import {ProductDetails} from '~/components/product/product-details';

/* ----------------------------- Types ----------------------------- */
export type ProductHeroSectionProps = SectionOfType<'productHeroSection'>;

type Props = SectionDefaultProps & {
  data: ProductHeroSectionProps;
};

/* -------------------------- Component ---------------------------- */
export function ProductHeroSection({data}: Props) {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  const design = rootData?.sanityRoot?.data?.productSectionDesign;

  /* ------------------------- Derived values ------------------------ */
  const isFlipped = design?.flipLayout ?? false;

  const columnRatio = design?.columnRatio || '7:5';
  const [mediaCols, detailCols] = columnRatio.split(':');

  const gapDesktop = design?.gap?.desktop ?? 40;
  const gapMobile = design?.gap?.mobile ?? 24;

  /* --------------------------- Classes ----------------------------- */
  const gridClasses = cn(
    'grid w-full mx-auto items-start',
    `gap-[${gapMobile}px] lg:gap-[${gapDesktop}px]`,
    'grid-cols-1 lg:grid-cols-12'
  );

  const mediaColSpan = `lg:col-span-${mediaCols}`;
  const detailColSpan = `lg:col-span-${detailCols}`;

  /* ---------------------------- Render ----------------------------- */

  return (
    <section id="product-hero-section" className="py-12 lg:py-24">
      <div className={gridClasses}>
        {isFlipped ? (
          <>
            <div className={cn('order-2 lg:order-1', detailColSpan)}>
              <ProductDetails data={data} />
            </div>
            <div className={cn('order-1 lg:order-2', mediaColSpan)}>
              {/* <MediaGallery
                data={data}
                design={design}
                aspectRatio={aspectRatio}
              /> */}
            </div>
          </>
        ) : (
          <>
            <div className={cn('order-1', mediaColSpan)}>
              {/* <MediaGallery
                data={data}
                design={design}
                aspectRatio={aspectRatio}
              /> */}
            </div>
            <div className={cn('order-2', detailColSpan)}>
              <ProductDetails data={data} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
