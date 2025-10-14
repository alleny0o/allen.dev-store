import type {SectionDefaultProps, SectionOfType} from 'types';

import {stegaClean} from '@sanity/client/stega';

import {cn, getAspectRatioData} from '~/lib/utils';
import {MediaGallery} from '../../product/media-gallery';
import {ProductDetails} from '../../product/product-details';

export type ProductHeroSectionProps =
  SectionOfType<'productHeroSection'>;

export function ProductHeroSection(
  props: SectionDefaultProps & {
    data: ProductHeroSectionProps;
  },
) {
  const {data} = props;
  const aspectRatio = getAspectRatioData(data.mediaAspectRatio);

  return (
    <ProductHeroGrid
      data={stegaClean(data)}
      mediaGallery={<MediaGallery aspectRatio={aspectRatio} />}
      productDetails={<ProductDetails data={data} />}
    />
  );
}

function ProductHeroGrid({
  data,
  mediaGallery,
  productDetails,
}: {
  data: ProductHeroSectionProps;
  mediaGallery: React.ReactNode;
  productDetails: React.ReactNode;
}) {
  const desktopMediaPosition = data?.desktopMediaPosition;
  const desktopMediaWidth = data?.desktopMediaWidth;
  return (
    <div className="lg:container">
      <div className={cn('grid gap-10 lg:grid-cols-12')}>
        <div
          className={cn(
            'lg:col-span-6',
            desktopMediaPosition === 'right' && 'lg:order-last',
            desktopMediaWidth === 'small' && 'lg:col-span-5',
            desktopMediaWidth === 'large' && 'lg:col-span-7',
          )}
        >
          {mediaGallery}
        </div>
        <div
          className={cn(
            'lg:col-span-6',
            desktopMediaWidth === 'small' && 'lg:col-span-7',
            desktopMediaWidth === 'large' && 'lg:col-span-5',
          )}
        >
          {productDetails}
        </div>
      </div>
    </div>
  );
}
