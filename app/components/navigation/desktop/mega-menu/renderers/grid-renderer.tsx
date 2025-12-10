// mega-menu/renderers/grid-renderer.tsx

import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {LinkSection} from '../sections/link-section';
import {ImageBlock} from '../sections/image-block';
import {GRID_LAYOUTS, type GridLayout} from '../config/layout-presets';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface GridRendererProps {
  menu: MegaMenuType;
}

/**
 * Renders mega menu in grid mode
 * All blocks flow in a uniform grid with the same column span
 */
export function GridRenderer({menu}: GridRendererProps) {
  const className = GRID_LAYOUTS[menu.gridLayout as GridLayout] || 'col-span-3';

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-[36px] section-padding">
      {menu.content?.map((block) => {
        if (block._type === 'linkSection') {
          return (
            <LinkSection key={block._key} data={block} className={className} />
          );
        }
        if (block._type === 'imageBlock') {
          return (
            <ImageBlock key={block._key} data={block} className={className} />
          );
        }
        return null;
      })}
    </div>
  );
}
