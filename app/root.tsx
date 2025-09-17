// react-router types
import type {ShouldRevalidateFunction} from 'react-router';

// sanity types
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

// react-router functions & components
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  useMatches,
  useNavigate,
  useRouteError,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteLoaderData,
  redirect,
} from 'react-router';

// shopify / hydrogen
import {getShopAnalytics, Analytics, useNonce} from '@shopify/hydrogen';

// route types
import type {Route} from './+types/root';

// components
import {Fonts} from './components/fonts';
import {CssVars} from './components/css-vars';
import {CustomAnalytics} from './components/custom-analytics';
import {AppLayout} from './components/layout';
import {Button} from './components/ui/button';

// data / queries
import {ROOT_QUERY} from './data/sanity/queries';
import {ALL_LOCALIZATION_QUERY} from './data/shopify/queries';

// hooks
import {useLocalePath} from './hooks/use-locale-path';
import {useSanityThemeContent} from './hooks/use-sanity-theme-content';

// lib utilities
import {generateFontsPreloadLinks} from './lib/fonts';
import {resolveShopifyPromises} from './lib/resolve-shopify-promises';
import {seoPayload} from './lib/seo.server';
import {generateFaviconUrls} from './lib/generate-favicon-urls';
import {resolveEffectiveLocale} from './lib/locale/resolver';

// styles
import tailwindCss from './styles/tailwind.css?url';

// constants
import {SANITY_STUDIO_PATH} from './sanity/constants';

export type RootLoaderData = Route.ComponentProps['loaderData'];

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when the locale changes
  const currLocale = currentUrl.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i)?.[1];
  const nextLocale = nextUrl.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i)?.[1];
  if (currLocale !== nextLocale) return true;

  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

export const meta: Route.MetaFunction = ({loaderData}) => {
  // Preload fonts files to avoid FOUT (flash of unstyled text)
  const fontsPreloadLinks = generateFontsPreloadLinks({
    fontsData: loaderData?.sanityRoot.data?.fonts,
  });

  const faviconUrls = loaderData ? generateFaviconUrls(loaderData) : [];

  return [...faviconUrls, ...fontsPreloadLinks];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const {cart, customerAccount, env, sanity, sanityPreviewMode, storefront} =
    context;

  const url = new URL(request.url);
  const isLoggedInPromise = customerAccount.isLoggedIn();

  // 1. Fetch Shopify localizations
  const localizations = await storefront.query(ALL_LOCALIZATION_QUERY, {
    cache: storefront.CacheLong(),
  });

  // 2. Resolve locale with content language mapping
  const {locale, cookie, shouldRedirect, redirectUrl} = resolveEffectiveLocale(
    request,
    localizations,
    url.pathname,
  );

  // 3. Handle redirect if needed
  if (shouldRedirect && redirectUrl) {
    throw redirect(redirectUrl, {
      headers: cookie ? {'Set-Cookie': cookie} : {},
    });
  }

  // 4. Set Shopify storefront context for API calls
  if (locale?.country) {
    context.storefront.i18n.country = locale.country;
  }
  if (locale?.language) {
    context.storefront.i18n.language = locale.language;
  }

  // 5. Fetch Sanity root data with resolved content language
  const sanityRoot = await sanity.loadQuery<ROOT_QUERYResult>(ROOT_QUERY, {
    language: locale?.language.toLowerCase() || 'en',
    defaultLanguage: 'en', // Always fallback to English
  });

  // 6. Generate SEO data
  const seo = seoPayload.root({
    root: sanityRoot.data,
    sanity: {
      dataset: env.PUBLIC_SANITY_STUDIO_DATASET,
      projectId: env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
    },
    url: request.url,
  });

  // 7. Resolve Shopify promises from Sanity document
  const {
    collectionListPromise,
    featuredCollectionPromise,
    featuredProductPromise,
  } = resolveShopifyPromises({
    document: sanityRoot,
    request,
    storefront,
  });

  // 8. Return all data with locale and localizations
  return {
    cart: cart.get(),
    collectionListPromise,
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
    env: {
      /*
       * Be careful not to expose any sensitive environment variables here.
       */
      NODE_ENV: env.NODE_ENV,
      PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
      PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN,
      PUBLIC_STOREFRONT_API_VERSION: env.PUBLIC_STOREFRONT_API_VERSION,
      PUBLIC_SANITY_STUDIO_DATASET: env.PUBLIC_SANITY_STUDIO_DATASET,
      PUBLIC_SANITY_STUDIO_PROJECT_ID: env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_USE_PREVIEW_MODE: env.SANITY_STUDIO_USE_PREVIEW_MODE,
    },
    featuredCollectionPromise,
    featuredProductPromise,
    isLoggedIn: isLoggedInPromise,
    locale,
    localizations,
    sanityPreviewMode,
    sanityRoot,
    seo,
    shop: getShopAnalytics({
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
      storefront,
    }),
  };
}

export function Layout({children}: {children: React.ReactNode}) {
  const data = useRouteLoaderData<RootLoaderData>('root');
  const nonce = useNonce();
  const {pathname} = useLocation();
  const isCmsRoute = pathname.includes(SANITY_STUDIO_PATH);

  // Use resolved locale language or fallback to 'en'
  const language = data?.locale?.language?.toLowerCase() || 'en';

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preload" as="style" href={tailwindCss} />
        <link rel="preconnect" href="https://shop.app" />
        <Meta />
        <Fonts />
        <link rel="stylesheet" href={tailwindCss} />
        <Links />
        <CssVars />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        {isCmsRoute ? (
          children
        ) : data ? (
          <Analytics.Provider
            cart={data.cart}
            consent={data.consent}
            shop={data.shop}
          >
            <AppLayout
              cart={data.cart}
              isLoggedIn={data.isLoggedIn}
              publicStoreDomain={data.env.PUBLIC_STORE_DOMAIN}
            >
              {children}
            </AppLayout>
            <CustomAnalytics />
          </Analytics.Provider>
        ) : (
          <AppLayout>{children}</AppLayout>
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
  const {themeContent} = useSanityThemeContent();
  const errorStatus = isRouteError ? routeError.status : 500;
  const collectionsPath = useLocalePath({path: '/collections'});
  const navigate = useNavigate();

  let title = themeContent?.error?.serverError;
  let pageType = 'page';

  if (isRouteError) {
    title = themeContent?.error?.pageNotFound;
    if (errorStatus === 404) pageType = routeError.data || pageType;
  }

  return (
    <section>
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <span>{errorStatus}</span>
        <h1 className="mt-5">{title}</h1>
        {errorStatus === 404 ? (
          <Button asChild className="mt-6" variant="secondary">
            <Link to={collectionsPath}>
              {themeContent?.cart?.continueShopping}
            </Link>
          </Button>
        ) : (
          <Button
            className="mt-6"
            onClick={() => navigate(0)}
            variant="secondary"
          >
            {themeContent?.error?.reloadPage}
          </Button>
        )}
      </div>
    </section>
  );
}

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.loaderData as RootLoaderData;
};
