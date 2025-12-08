import {stegaClean} from '@sanity/client/stega';
import type {FontsQuery} from '~/lib/fonts/fonts';
import {useRootLoaderData} from '~/root';

type FontAssetsFragment = NonNullable<
  NonNullable<NonNullable<FontsQuery['body']>['font']>[number]['fontAssets']
>[number];

const defaultFontFamily =
  '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;';

export function Fonts() {
  const {sanityRoot} = useRootLoaderData();
  const fontsData = stegaClean(sanityRoot?.data?.fonts);

  if (!fontsData) {
    return null;
  }

  const fontFaces = generateFontFaces({fontsData});
  const cssFontVariables = generateCssFontVariables({fontsData});

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: fontFaces + '\n' + cssFontVariables,
      }}
    ></style>
  );
}

export function getFonts({fontsData}: {fontsData: FontsQuery}) {
  const headingFonts =
    fontsData?.heading?.font &&
    fontsData.heading.font.length > 0 &&
    fontsData.heading.font[0].fontAssets?.length &&
    fontsData.heading.font[0].fontAssets?.length > 0
      ? fontsData.heading.font[0].fontAssets
      : [];

  const bodyFonts =
    fontsData?.body?.font &&
    fontsData.body.font.length > 0 &&
    fontsData.body.font[0].fontAssets?.length &&
    fontsData.body.font[0].fontAssets?.length > 0
      ? fontsData.body.font[0].fontAssets
      : [];

  const extra1Fonts =
    fontsData?.extra1?.font &&
    fontsData.extra1.font?.length > 0 &&
    fontsData.extra1.font[0]?.fontAssets?.length &&
    fontsData.extra1.font[0]?.fontAssets?.length > 0
      ? fontsData.extra1.font[0]?.fontAssets
      : [];

  const extra2Fonts =
    fontsData?.extra2?.font &&
    fontsData.extra2.font?.length > 0 &&
    fontsData.extra2.font[0]?.fontAssets?.length &&
    fontsData.extra2.font[0]?.fontAssets?.length > 0
      ? fontsData.extra2.font[0]?.fontAssets
      : [];

  const extra3Fonts =
    fontsData?.extra3?.font &&
    fontsData.extra3.font?.length > 0 &&
    fontsData.extra3.font[0]?.fontAssets?.length &&
    fontsData.extra3.font[0]?.fontAssets?.length > 0
      ? fontsData.extra3.font[0]?.fontAssets
      : [];

  return [
    ...headingFonts,
    ...bodyFonts,
    ...extra1Fonts,
    ...extra2Fonts,
    ...extra3Fonts,
  ];
}

function generateFontFaces({fontsData}: {fontsData: FontsQuery}) {
  const fonts = getFonts({fontsData});

  if (fonts?.length > 0) {
    return fonts
      .map((font) => {
        return `
          @font-face {
            font-family: "${font.fontName}";
            src: ${resolveFontAssetUrls(font)};
            font-weight: ${font.fontWeight};
            font-style: ${font.fontStyle};
            font-display: swap;
          }
        `.trim();
      })
      .join('\n');
  }

  return '';
}

function resolveFontAssetUrls(font: FontAssetsFragment) {
  const fontAssetUrls = [];

  if (font.woff2)
    fontAssetUrls.push(`url("${font.woff2.url}") format("woff2")`);
  if (font.woff) fontAssetUrls.push(`url("${font.woff.url}") format("woff")`);
  if (font.ttf) fontAssetUrls.push(`url("${font.ttf.url}") format("truetype")`);

  return fontAssetUrls.join(', ');
}

function generateCssFontVariables({fontsData}: {fontsData: FontsQuery}) {
  const fontCategories: Array<{
    antialiased?: boolean | null;
    baseSize?: null | number;
    capitalize?: boolean | null;
    categoryName?: string;
    fontName?: null | string;
    fontStyle?: null | string;
    fontType?: null | string;
    fontWeight?: null | number;
    letterSpacing?: null | number;
    lineHeight?: null | number;
  }> = [];

  // Heading
  fontCategories.push({
    baseSize: fontsData?.heading?.baseSize,
    capitalize: fontsData?.heading?.capitalize,
    categoryName: 'heading',
    fontName: fontsData?.heading?.font?.[0]?.fontName || defaultFontFamily,
    fontType: fontsData?.heading?.font?.[0]?.fontType || 'unset',
    letterSpacing: fontsData?.heading?.letterSpacing,
    lineHeight: fontsData?.heading?.lineHeight,
    ...fontsData?.heading?.font?.[0],
  });

  // Body
  fontCategories.push({
    baseSize: fontsData?.body?.baseSize,
    capitalize: fontsData?.body?.capitalize,
    categoryName: 'body',
    fontName: fontsData?.body?.font?.[0]?.fontName || defaultFontFamily,
    fontType: fontsData?.body?.font?.[0]?.fontType || 'unset',
    letterSpacing: fontsData?.body?.letterSpacing,
    lineHeight: fontsData?.body?.lineHeight,
    ...fontsData?.body?.font?.[0],
  });

  // Extra 1
  fontCategories.push({
    baseSize: fontsData?.extra1?.baseSize,
    capitalize: fontsData?.extra1?.capitalize,
    categoryName: 'extra1',
    fontName: fontsData?.extra1?.font?.[0]?.fontName || defaultFontFamily,
    fontType: fontsData?.extra1?.font?.[0]?.fontType || 'unset',
    letterSpacing: fontsData?.extra1?.letterSpacing,
    lineHeight: fontsData?.extra1?.lineHeight,
    ...fontsData?.extra1?.font?.[0],
  });

  // Extra 2
  fontCategories.push({
    baseSize: fontsData?.extra2?.baseSize,
    capitalize: fontsData?.extra2?.capitalize,
    categoryName: 'extra2',
    fontName: fontsData?.extra2?.font?.[0]?.fontName || defaultFontFamily,
    fontType: fontsData?.extra2?.font?.[0]?.fontType || 'unset',
    letterSpacing: fontsData?.extra2?.letterSpacing,
    lineHeight: fontsData?.extra2?.lineHeight,
    ...fontsData?.extra2?.font?.[0],
  });

  // Extra 3
  fontCategories.push({
    baseSize: fontsData?.extra3?.baseSize,
    capitalize: fontsData?.extra3?.capitalize,
    categoryName: 'extra3',
    fontName: fontsData?.extra3?.font?.[0]?.fontName || defaultFontFamily,
    fontType: fontsData?.extra3?.font?.[0]?.fontType || 'unset',
    letterSpacing: fontsData?.extra3?.letterSpacing,
    lineHeight: fontsData?.extra3?.lineHeight,
    ...fontsData?.extra3?.font?.[0],
  });

  if (fontCategories?.length > 0) {
    return `
      :root {
        ${fontCategories
          .map((fontCategory) => {
            return `
              --${fontCategory.categoryName}-font-family: ${
                fontCategory.fontName ?? 'unset'
              };
              --${fontCategory.categoryName}-font-type: ${
                fontCategory.fontType ?? 'unset'
              };
              --${fontCategory.categoryName}-line-height: ${
                fontCategory.lineHeight ?? 'unset'
              };
              --${fontCategory.categoryName}-letter-spacing: ${
                fontCategory.letterSpacing ?? 'unset'
              };
              --${fontCategory.categoryName}-base-size: ${
                fontCategory.baseSize ?? 'unset'
              };
              --${fontCategory.categoryName}-capitalize: ${
                fontCategory.capitalize ? 'uppercase' : 'none'
              };
              --${fontCategory.categoryName}-font-webkit-font-smoothing: ${
                fontCategory.antialiased ? 'antialiased' : 'unset'
              };
              --${fontCategory.categoryName}-font-moz-osx-font-smoothing: ${
                fontCategory.antialiased ? 'grayscale' : 'unset'
              };
              --${fontCategory.categoryName}-font-weight: ${
                fontCategory.fontWeight ?? 'unset'
              };
              --${fontCategory.categoryName}-font-style: ${
                fontCategory.fontStyle ?? 'unset'
              };
            `.trim();
          })
          .join('\n')}
      }
    `.trim();
  }

  return '';
}