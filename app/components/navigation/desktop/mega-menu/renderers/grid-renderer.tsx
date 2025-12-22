// grid-renderer.tsx

import {LinkSection} from '../sections/link-section';
import {GRID_LAYOUTS, type GridLayout} from '../config/layout-presets';
import { MegaMenuType } from '~/components/navigation/types';

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
    <div className="grid grid-cols-12 gap-x-6 gap-y-9 section-padding">
      {menu.content?.map((block) => {
        if (block._type === 'linkSection') {
          return (
            <LinkSection key={block._key} data={block} className={className} />
          );
        }
        if (block._type === 'imageBlock') {
          return null;
        }
        return null;
      })}
    </div>
  );
}
