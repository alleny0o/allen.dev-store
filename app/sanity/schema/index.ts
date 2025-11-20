// ─────────────────────────────────────────────
// 🧩 Plugins
// ─────────────────────────────────────────────
import colorPicker from '../plugins/color-picker';
import rangeSlider from '../plugins/range-slider';

// ─────────────────────────────────────────────
// 📄 Document Types
// ─────────────────────────────────────────────
import blogPost from './documents/blog-post';
import collection from './documents/collection';
import collectionTemplate from './documents/collection-template';
import color from './documents/color';
import font from './documents/font';
import page from './documents/page';
import product from './documents/product';
import productTemplate from './documents/product-template';
import productVariant from './documents/product-variant';

// ─────────────────────────────────────────────
// 🧰 Objects: Global (utilities, layout, content)
// ─────────────────────────────────────────────
import announcementBar from './objects/global/announcement-bar';
import aspectRatios from './objects/global/aspect-ratios';
import bannerRichtext from './objects/global/banner-richtext';
import contentAlignment from './objects/global/content-alignment';
import contentPosition from './objects/global/content-position';
import footersList from './objects/global/footers-list';
import padding from './objects/global/padding';
import productRichtext from './objects/global/product-richtext';
import richtext from './objects/global/richtext';
import sectionSettings from './objects/global/section-settings';
import seo from './objects/global/seo';
import sectionsList, {
  collectionSections,
  productSections,
} from './objects/global/sections-list';

// ─────────────────────────────────────────────
// 🧭 Objects: Navigation
// ─────────────────────────────────────────────
import anchor from './objects/navigation/anchor';
import externalLink from './objects/navigation/external-link';
import headerNavigation from './objects/navigation/header-navigation';
import internalButton from './objects/navigation/internal-button';
import internalLink from './objects/navigation/internal-link';
import link from './objects/navigation/link';
import nestedNavigation from './objects/navigation/nested-navigation';

// ─────────────────────────────────────────────
// 🅰️ Objects: Font
// ─────────────────────────────────────────────
import fontAsset from './objects/font/font-asset';
import fontCategory from './objects/font/font-category';

// ─────────────────────────────────────────────
// 🦶 Objects: Footers
// ─────────────────────────────────────────────
import socialLinksOnly from './objects/footers/social-links-only';

// ─────────────────────────────────────────────
// 🛍️ Objects: Shopify Integration
// ─────────────────────────────────────────────
import inventory from './objects/shopify/inventory';
import options from './objects/shopify/options';
import placeholderString from './objects/shopify/placeholder-string';
import priceRange from './objects/shopify/price-range';
import proxyString from './objects/shopify/proxy-string';
import shopifyCollection from './objects/shopify/shopify-collection';
import shopifyCollectionRule from './objects/shopify/shopify-collection-rule';
import shopifyProduct from './objects/shopify/shopify-product';
import shopifyProductVariant from './objects/shopify/shopify-product-variant';

// ─────────────────────────────────────────────
// 🧱 Objects: Sections
// ─────────────────────────────────────────────
import carouselSection from './objects/sections/carousel-section';
import collectionBanner from './objects/sections/collection-banner';
import collectionListSection from './objects/sections/collection-list-section';
import collectionProductGrid from './objects/sections/collection-product-grid';
import featuredCollectionSection from './objects/sections/featured-collection-section';
import featuredProductSection from './objects/sections/featured-product-section';
import imageBannerSection from './objects/sections/image-banner-section';
import productHeroSection from './objects/sections/product-hero-section';
import relatedProductsSection from './objects/sections/related-products-section';
import richtextSection from './objects/sections/richtext-section';

// ─────────────────────────────────────────────
// ⚙️ Singletons
// ─────────────────────────────────────────────
import footer from './singletons/footer';
import header from './singletons/header';
import home from './singletons/home';
import settings from './singletons/settings';
import themeContent from './singletons/theme-content';
import productSectionDesign from './singletons/product-section-design';
import megaMenu from './objects/navigation/mega-menu';

// ─────────────────────────────────────────────
// 📦 Schema Groups
// ─────────────────────────────────────────────
const singletons = [
  home,
  header,
  footer,
  settings,
  themeContent,
  productSectionDesign,
];

const documents = [
  blogPost,
  collection,
  collectionTemplate,
  color,
  font,
  page,
  product,
  productTemplate,
  productVariant,
];

const sections = [
  carouselSection,
  collectionBanner,
  collectionListSection,
  collectionProductGrid,
  featuredCollectionSection,
  featuredProductSection,
  imageBannerSection,
  productHeroSection,
  relatedProductsSection,
  richtextSection,
];

const footers = [socialLinksOnly];

const objects = [
  // Global
  announcementBar,
  aspectRatios,
  bannerRichtext,
  colorPicker,
  contentAlignment,
  contentPosition,
  footersList,
  padding,
  productRichtext,
  rangeSlider,
  richtext,
  sectionSettings,
  sectionsList,
  collectionSections,
  productSections,
  seo,

  // Navigation
  anchor,
  externalLink,
  headerNavigation,
  internalButton,
  internalLink,
  link,
  nestedNavigation,
  megaMenu,

  // Font
  fontAsset,
  fontCategory,

  // Shopify
  inventory,
  options,
  placeholderString,
  priceRange,
  proxyString,
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,
  shopifyCollectionRule,
];

// ─────────────────────────────────────────────
// 🧠 Export Schema
// ─────────────────────────────────────────────
export const schemaTypes = [
  ...objects,
  ...documents,
  ...sections,
  ...footers,
  ...singletons,
];
