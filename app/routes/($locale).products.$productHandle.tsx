// ========================================
// 🛍️ PRODUCT PAGE ROUTE
// ========================================

// ---------- Imports ----------
import type {PRODUCT_QUERYResult} from 'types/sanity/sanity.generated';
import type {ProductQuery} from 'types/shopify/storefrontapi.generated';

import {
  Analytics,
  getSelectedProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {FALLBACK_LOCALE} from '~/lib/locale/fallbacks';
import invariant from 'tiny-invariant';

import type {Route} from './+types/($locale).products.$productHandle';

import {CmsSection} from '~/components/cms-section';
import {PRODUCT_QUERY as CMS_PRODUCT_QUERY} from '~/data/sanity/queries';
import {PRODUCT_QUERY} from '~/data/shopify/queries';
import {resolveShopifyPromises} from '~/lib/resolve-shopify-promises';
import {getSeoMetaFromMatches} from '~/lib/seo';
import {seoPayload} from '~/lib/seo.server';
import {mergeRouteModuleMeta} from '~/lib/meta';
import {ProductProvider} from '~/components/product/product-provider';

// ========================================
// 🔖 META FUNCTION
// ========================================
export const meta: Route.MetaFunction = mergeRouteModuleMeta(({matches}) =>
  getSeoMetaFromMatches(matches),
);

// ========================================
// 📦 LOADER FUNCTION
// ========================================
export async function loader({context, params, request}: Route.LoaderArgs) {
  // --- Extract data from Remix context ---
  const {productHandle} = params;
  const {locale, sanity, storefront} = context;
  const language = locale?.language.toLowerCase();

  // --- Ensure required param exists ---
  invariant(productHandle, 'Missing productHandle param, check route filename');

  // --- Extract selected variant options from URL ---
  const selectedOptions = getSelectedProductOptions(request);

  // --- Prepare parameters for Sanity query ---
  const queryParams = {
    defaultLanguage: FALLBACK_LOCALE.language.toLowerCase(),
    language,
    productHandle,
  };

  // --- Fetch CMS and Shopify data in parallel ---
  const productData = Promise.all([
    sanity.loadQuery<PRODUCT_QUERYResult>(CMS_PRODUCT_QUERY, queryParams),
    storefront.query<ProductQuery>(PRODUCT_QUERY, {
      variables: {
        country: storefront.i18n.country,
        handle: productHandle,
        language: storefront.i18n.language,
        selectedOptions,
      },
    }),
  ]);

  // --- Await both results ---
  const [cmsProduct, {product}] = await productData;

  // --- Handle missing product or CMS entry ---
  if (!product?.id || !cmsProduct) {
    throw new Response('product', {status: 404});
  }

  // --- Determine variants ---
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);

  // --- Resolve additional Shopify promises (collections, related, etc.) ---
  const {
    collectionListPromise,
    featuredCollectionPromise,
    featuredProductPromise,
    relatedProductsPromise,
  } = resolveShopifyPromises({
    document: cmsProduct,
    productId: product.id,
    request,
    storefront,
  });

  // --- SEO setup ---
  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  // --- Return everything for the component ---
  return {
    cmsProduct,
    collectionListPromise,
    featuredCollectionPromise,
    featuredProductPromise,
    product,
    relatedProductsPromise,
    seo,
    variants,
  };
}

// ========================================
// 🧱 PRODUCT COMPONENT
// ========================================
export default function Product({loaderData}: Route.ComponentProps) {
  // --- Extract CMS + Shopify product data ---
  const {
    cmsProduct: {data},
    product,
  } = loaderData;

  // --- Sync selected variant with URL (no navigation) ---
  useSelectedOptionInUrlParam(
    product.selectedOrFirstAvailableVariant?.selectedOptions || [],
  );

  // --- Determine which product template to use ---
  const template = data?.product?.template || data?.defaultProductTemplate;

  // --- Render product page layout ---
  return (
    <ProductProvider product={product}>
      {template?.sections &&
        template.sections.length > 0 &&
        template.sections.map((section, index) => (
          <CmsSection data={section} index={index} key={section._key} />
        ))}

      {/* 🧾 Analytics tracking for product view */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              price:
                product.selectedOrFirstAvailableVariant?.price.amount || '0',
              quantity: 1,
              title: product.title,
              variantId: product.selectedOrFirstAvailableVariant?.id || '',
              variantTitle:
                product.selectedOrFirstAvailableVariant?.title || '',
              vendor: product.vendor,
            },
          ],
        }}
      />
    </ProductProvider>
  );
}
