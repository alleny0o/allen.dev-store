// grid-renderer.tsx

import {m} from 'motion/react';
import {LinkSection} from '../sections/link-section';
import {GRID_LAYOUTS, type GridLayout} from '../../constants';
import {MegaMenuType} from '~/features/navigation/types';
import {useHeaderSettings} from '~/features/header';
import {getStaggerVariant} from '../../animations/stagger-variants';

interface GridRendererProps {
  menu: MegaMenuType;
  shouldAnimate: boolean;
}

/**
 * Renders mega menu in grid mode
 * All blocks flow in a uniform grid with the same column span
 */
export function GridRenderer({menu, shouldAnimate}: GridRendererProps) {
  const className = GRID_LAYOUTS[menu.gridLayout as GridLayout] || 'col-span-3';

  // Get stagger settings from header
  const header = useHeaderSettings();
  const staggerType = header?.desktopMegaMenuContentStagger ?? 'none';
  const staggerDelay = (header?.desktopMegaMenuStaggerDelay ?? 50) / 1000; // Convert to seconds
  const staggerStartDelay = (header?.desktopMegaMenuStaggerStartDelay ?? 0) / 1000; // Convert to seconds

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-9 section-padding">
      {menu.content?.map((block, index) => {
        if (block._type === 'linkSection') {
          const content = <LinkSection data={block} />;

          // If should animate, wrap in motion div
          if (shouldAnimate && staggerType !== 'none') {
            return (
              <m.div
                key={block._key}
                className={className}
                initial="hidden"
                animate="visible"
                variants={getStaggerVariant(staggerType)}
                transition={{
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                  delay: staggerStartDelay + (index * staggerDelay),
                }}
              >
                {content}
              </m.div>
            );
          }

          // Otherwise, just render plain div
          return (
            <div key={block._key} className={className}>
              {content}
            </div>
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