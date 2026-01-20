// mega-menu/sections/image-block.tsx

import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import {SanityImage} from '~/components/sanity/sanity-image';
import {useHeaderSettings} from '~/features/header';
import {useTypographyCssVars} from '~/hooks/use-typography-css-vars';
import {getHoverClasses} from '~/utils/hover-classes';
import {getCardHoverClasses} from '~/utils/card-hover-classes';
import {
  ASPECT_RATIOS,
  BORDER_RADIUS,
  CTA_BORDER_RADIUS,
  OVERLAY_TEXT_COLORS,
  CTA_COLOR_SCHEMES,
  type AspectRatio,
  type BorderRadius,
  type CTABorderRadius,
  type OverlayTextColor,
  type CTAColorScheme,
} from '~/features/navigation/mega-menu/constants';
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import type {SanityImage as SanityImageType} from 'types';
import type {CSSProperties} from 'react';

type HeaderMenu = NonNullable<NonNullable<ROOT_QUERYResult['header']>['menu']>;
type MenuItem = HeaderMenu[number];
type MegaMenuType = Extract<MenuItem, {_type: 'megaMenu'}>;
type ImageBlockType = Extract<
  NonNullable<MegaMenuType['content']>[number],
  {_type: 'imageBlock'}
>;

interface ImageBlockProps {
  data: ImageBlockType;
  className?: string;
}

export function ImageBlock({data, className}: ImageBlockProps) {
  const header = useHeaderSettings();

  // Generate typography CSS for all three text elements
  const headingTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-heading',
    override: header?.desktopMegaMenuImageBlockHeadingTypography,
  });

  const descriptionTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-description',
    override: header?.desktopMegaMenuImageBlockDescriptionTypography,
  });

  const ctaTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-cta',
    override: header?.desktopMegaMenuCTATypography,
  });

  // Map Sanity values to classes/values
  const aspectRatioValue = ASPECT_RATIOS[data.aspectRatio as AspectRatio] || '1/1';
  const borderRadiusClass = BORDER_RADIUS[data.borderRadius as BorderRadius] || BORDER_RADIUS['none'];
  const overlayTextColorClass = OVERLAY_TEXT_COLORS[data.overlayTextColor as OverlayTextColor] || OVERLAY_TEXT_COLORS['white'];
  
  // Get content layout mode and overlay opacity
  const contentLayout = data.contentLayout || 'overlay';
  const overlayOpacity = data.overlayOpacity ?? 60;

  // Get image hover effect class
  const imageHoverClass = getCardHoverClasses(data.hoverEffect);

  // CTA rendering helper function
  const renderCTA = () => {
    if (!data.linkText) return null;

    const linkStyle = data.linkStyle || 'text';
    const ctaHoverClass = getHoverClasses(data.ctaHoverEffect);

    // TEXT ONLY STYLE
    if (linkStyle === 'text') {
      return (
        <span className={`image-block-cta ${ctaHoverClass}`}>
          {data.linkText}
        </span>
      );
    }

    // BUTTON STYLES (filled, outlined, ghost)
    const colorScheme = CTA_COLOR_SCHEMES[data.ctaColorScheme as CTAColorScheme] || CTA_COLOR_SCHEMES.primary;
    const borderRadius = CTA_BORDER_RADIUS[data.ctaBorderRadius as CTABorderRadius] || CTA_BORDER_RADIUS.md;
    const paddingX = data.ctaPaddingX ?? 16;
    const paddingY = data.ctaPaddingY ?? 8;

    const baseClasses = `inline-block image-block-cta ${borderRadius} ${ctaHoverClass}`;
    
    let styleClasses = '';
    let inlineStyles: CSSProperties = {
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
    };

    switch (linkStyle) {
      case 'filled':
        inlineStyles = {
          ...inlineStyles,
          backgroundColor: colorScheme.bg,
          color: colorScheme.text,
        };
        break;

      case 'outlined':
        styleClasses = 'border-2 bg-transparent';
        inlineStyles = {
          ...inlineStyles,
          borderColor: colorScheme.border,
          color: contentLayout === 'overlay' ? 'inherit' : colorScheme.text,
        };
        break;

      case 'ghost':
        styleClasses = 'bg-white/10 hover:bg-white/20 transition-colors';
        inlineStyles = {
          ...inlineStyles,
          color: contentLayout === 'overlay' ? 'inherit' : colorScheme.text,
        };
        break;
    }

    return (
      <span className={`${baseClasses} ${styleClasses}`} style={inlineStyles}>
        {data.linkText}
      </span>
    );
  };

  // Type guard for image
  if (!data.image) return null;

  // OVERLAY MODE
  if (contentLayout === 'overlay') {
    const content = (
      <div className={`group relative overflow-hidden ${borderRadiusClass}`}>
        {/* Typography CSS */}
        <style dangerouslySetInnerHTML={{__html: headingTypographyCss + descriptionTypographyCss + ctaTypographyCss}} />

        {/* Image */}
        <SanityImage
          data={data.image as SanityImageType}
          aspectRatio={aspectRatioValue}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`h-full w-full object-cover ${imageHoverClass}`}
          showBorder={false}
          showShadow={false}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          style={{opacity: overlayOpacity / 100}}
        />

        {/* Text Content - Bottom Left */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className={`space-y-3 ${overlayTextColorClass}`}>
            {data.heading && (
              <h3 className="image-block-heading text-xl font-semibold">
                {data.heading}
              </h3>
            )}

            {data.description && (
              <p className="image-block-description text-sm opacity-90">
                {data.description}
              </p>
            )}

            {renderCTA()}
          </div>
        </div>
      </div>
    );

    return (
      <div className={className}>
        {data.link ? (
          <SanityReferenceLink data={data.link} className="block">
            {content}
          </SanityReferenceLink>
        ) : (
          content
        )}
      </div>
    );
  }

  // BELOW MODE
  const content = (
    <div className="space-y-4">
      {/* Typography CSS */}
      <style dangerouslySetInnerHTML={{__html: headingTypographyCss + descriptionTypographyCss + ctaTypographyCss}} />

      {/* Heading Above Image */}
      {data.heading && (
        <h3 className="image-block-heading mega-menu-heading">
          {data.heading}
        </h3>
      )}

      {/* Image */}
      <div className={`group relative overflow-hidden ${borderRadiusClass}`}>
        <SanityImage
          data={data.image as SanityImageType}
          aspectRatio={aspectRatioValue}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`h-full w-full object-cover ${imageHoverClass}`}
          showBorder={false}
          showShadow={false}
        />
      </div>

      {/* Content Below Image */}
      <div className="space-y-3">
        {data.description && (
          <p className="image-block-description text-sm text-muted-foreground">
            {data.description}
          </p>
        )}

        {renderCTA()}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {data.link ? (
        <SanityReferenceLink data={data.link} className="block">
          {content}
        </SanityReferenceLink>
      ) : (
        content
      )}
    </div>
  );
}