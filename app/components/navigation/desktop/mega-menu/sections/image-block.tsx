import {SanityImage} from '~/components/sanity/sanity-image';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;
type ImageBlockType = Extract<NonNullable<MegaMenuType['content']>[number], {_type: 'imageBlock'}>;

interface ImageBlockProps {
  data: ImageBlockType;
}

export function ImageBlock({data}: ImageBlockProps) {
  return (
    <div className="col-span-3">
      <div className="space-y-4">
        {data.image && (
          <SanityImage data={data.image} alt={data.alt || ''} />
        )}
        {data.heading && (
          <h3 className="font-semibold text-lg">{data.heading}</h3>
        )}
        {data.description && (
          <p className="text-sm text-gray-600">{data.description}</p>
        )}
        {data.link && (
          <SanityReferenceLink data={data.link} className="inline-block">
            {data.linkText || 'Learn More'}
          </SanityReferenceLink>
        )}
      </div>
    </div>
  );
}