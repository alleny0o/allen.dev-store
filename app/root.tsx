// react-router types
import type {ShouldRevalidateFunction} from 'react-router';

// react-router
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

// shopify + hydrogen
import {getShopAnalytics, Analytics, useNonce} from '@shopify/hydrogen';

// route type
import type {Route} from './+types/root';

// components
import {AppLayout} from './components/layout';
import {Fonts} from './components/fonts';
import {CssVars} from './components/css-vars';
import {CustomAnalytics} from './components/custom-analytics';
import {Button} from './components/ui/button';

// hooks
import {useSanityThemeContent} from './hooks/use-sanity-theme-content';
import {useLocalePath} from './hooks/use-locale-path';

// helpers
import {resolveShopifyPromises} from './lib/resolve-shopify-promises';
import {generateFontsPreloadLinks} from './lib/fonts';
import {generateFaviconUrls} from './lib/generate-favicon-urls';

// locale resolver
import {resolveLocaleServer} from './lib/locale/resolve-locale-server';

// sanity loader
import {loadSanityRoot} from './lib/sanity/load-sanity-root';

// constants
import {SANITY_STUDIO_PATH} from './sanity/constants';

// styles
import tailwindCss from './styles/tailwind.css?url';

export type RootLoaderData = Route.ComponentProps['loaderData'];

/**
 * Avoid reloading root data unless:
 * - locale changes
 * - non-GET form submission occurs
 * - manual revalidation
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  const currLocale = currentUrl.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i)?.[1];
  const nextLocale = nextUrl.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i)?.[1];

  if (currLocale !== nextLocale) return true;
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;

  return false;
};

export const meta: Route.MetaFunction = ({loaderData}) => {
  const fontsPreloadLinks = generateFontsPreloadLinks({
    fontsData: loaderData?.sanityRoot.data?.fonts,
  });
  const faviconUrls = loaderData ? generateFaviconUrls(loaderData) : [];
  return [...faviconUrls, ...fontsPreloadLinks];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const {cart, customerAccount, env, storefront, sanity, sanityPreviewMode} =
    context;

  // ✅ Resolve locale pipeline (URL → Cookie → Header → Fallback)
  const {locale, cookie, shouldRedirect, redirectUrl, localizations} =
    await resolveLocaleServer(context, request);

  if (shouldRedirect && redirectUrl) {
    throw redirect(redirectUrl, {
      headers: cookie ? {'Set-Cookie': cookie} : {},
    });
  }

  // ✅ Apply locale to Shopify storefront queries
  storefront.i18n.country = locale.country;
  storefront.i18n.language = locale.language;

  // ✅ Load Sanity content in correct locale
  const {sanityRoot, seo} = await loadSanityRoot(sanity, env, request, locale);

  // Resolve product / collection Shopify promises referenced in CMS content
  const {
    collectionListPromise,
    featuredCollectionPromise,
    featuredProductPromise,
  } = resolveShopifyPromises({document: sanityRoot, request, storefront});

  const isLoggedInPromise = customerAccount.isLoggedIn();

  return {
    cart: cart.get(),
    collectionListPromise,
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
    env,
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
  const {pathname} = useLocation();
  const nonce = useNonce();
  const isCmsRoute = pathname.includes(SANITY_STUDIO_PATH);
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