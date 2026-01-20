// mega-menu/renderers/section-renderer.tsx

import {m} from 'motion/react';
import {LinkSection} from '../sections/link-section';
import {ImageBlock} from '../sections/image-block';
import {SECTION_PRESETS, type SectionPreset} from '~/features/navigation/mega-menu/constants';
import {MegaMenuType} from '~/features/navigation/types';
import {useHeaderSettings} from '~/features/header';
import {getStaggerVariant} from '../../animations/stagger-variants';

interface SectionRendererProps {
  menu: MegaMenuType;
  shouldAnimate: boolean;
}

/**
 * Renders mega menu in section mode
 * Blocks are organized into vertical columns based on the selected preset
 */
export function SectionRenderer({menu, shouldAnimate}: SectionRendererProps) {
  const preset =
    SECTION_PRESETS[menu.sectionPreset as SectionPreset] ||
    SECTION_PRESETS['4-sections'];

  // Get stagger settings from header
  const header = useHeaderSettings();
  const staggerType = header?.desktopMegaMenuContentStagger ?? 'none';
  const staggerDelay = (header?.desktopMegaMenuStaggerDelay ?? 50) / 1000; // Convert to seconds
  const staggerStartDelay =
    (header?.desktopMegaMenuStaggerStartDelay ?? 0) / 1000; // Convert to seconds

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
            {blocks?.map((block, blockIndex) => {
              let content = null;

              if (block._type === 'linkSection') {
                content = <LinkSection data={block} />;
              } else if (block._type === 'imageBlock') {
                content = <ImageBlock data={block} />;
              }

              if (!content) return null;

              // If should animate, wrap in motion div
              if (shouldAnimate && staggerType !== 'none') {
                return (
                  <m.div
                    key={block._key}
                    initial="hidden"
                    animate="visible"
                    variants={getStaggerVariant(staggerType)}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                      delay: staggerStartDelay + blockIndex * staggerDelay,
                    }}
                  >
                    {content}
                  </m.div>
                );
              }

              // Otherwise, just render plain div
              return <div key={block._key}>{content}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}