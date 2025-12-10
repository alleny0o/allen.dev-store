// mega-menu/sections/image-block.tsx

import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import { SanityImage } from '~/components/sanity/sanity-image';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;
type ImageBlockType = Extract<
  NonNullable<MegaMenuType['content']>[number],
  {_type: 'imageBlock'}
>;

interface ImageBlockProps {
  data: ImageBlockType;
  className?: string; // ← Add this
}

export function ImageBlock({data, className}: ImageBlockProps) {
  return (
    <div className={className}>
      <SanityReferenceLink data={data.link} className="group block">
        <div className="space-y-3">
          <SanityImage
            data={data.image}
            alt={data.alt}
            className="aspect-[4/3] w-full object-cover rounded-lg"
          />
          
          <div className="space-y-2">
            {data.heading && (
              <h3 className="mega-menu-heading">{data.heading}</h3>
            )}
            
            {data.description && (
              <p className="text-sm text-foreground/70">{data.description}</p>
            )}
            
            {data.linkText && (
              <span className="mega-menu-link inline-block">
                {data.linkText} →
              </span>
            )}
          </div>
        </div>
      </SanityReferenceLink>
    </div>
  );
}