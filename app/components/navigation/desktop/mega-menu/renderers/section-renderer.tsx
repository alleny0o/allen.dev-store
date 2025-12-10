// mega-menu/renderers/section-renderer.tsx

import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {LinkSection} from '../sections/link-section';
import {SECTION_PRESETS, type SectionPreset} from '../config/layout-presets';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;

interface SectionRendererProps {
  menu: MegaMenuType;
}

/**
 * Renders mega menu in section mode
 * Blocks are organized into vertical columns based on the selected preset
 */
export function SectionRenderer({menu}: SectionRendererProps) {
  const preset =
    SECTION_PRESETS[menu.sectionPreset as SectionPreset] ||
    SECTION_PRESETS['4-sections'];

  return (
    <div className={`grid ${preset.gridCols} gap-6 section-padding`}>
      {preset.spanClasses.map((spanClass, idx) => {
        const sectionKey = `section${idx + 1}` as
          | 'section1'
          | 'section2'
          | 'section3'
          | 'section4'
          | 'section5'
          | 'section6';
        const blocks = menu[sectionKey];

        // Always render the section container, even if empty
        return (
          <div
            key={sectionKey}
            className={`${spanClass} flex flex-col gap-x-6 gap-y-9`}
          >
            {blocks?.map((block) => {
              if (block._type === 'linkSection') {
                return <LinkSection key={block._key} data={block} />;
              }
              if (block._type === 'imageBlock') {
                return null;
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
}
