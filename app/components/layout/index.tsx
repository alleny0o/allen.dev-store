// react / framework
import {Suspense} from 'react';

// shopify / hydrogen
import {ShopifyProvider} from '@shopify/hydrogen-react';

// app-level hooks
import {useRootLoaderData} from '~/root';

// shared utilities / helpers
import {ClientOnly} from '../client-only';
import {Motion} from './motion';
import {NavigationProgressBar} from './navigation-progress-bar.client';

// sanity / cms utilities
import {TogglePreviewMode} from '../sanity/toggle-preview-mode';
import {VisualEditing} from '../sanity/visual-editing.client';

// layout / ui components
import {AnnouncementBar} from '../header/announcement-bar/announcement-bar';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {TailwindIndicator} from '../tailwind-indicator';

// aside / ui components
import {AsideComponent} from '../aside';

import {type CartReturn} from '@shopify/hydrogen';

export type LayoutProps = {
  children?: React.ReactNode;
  cart?: Promise<CartReturn | null>;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain?: string;
};

export function AppLayout({
  children,
  cart = Promise.resolve(null),
  isLoggedIn = Promise.resolve(false),
  publicStoreDomain = '',
}: LayoutProps) {
  const {env, locale, sanityPreviewMode} = useRootLoaderData();

  return (
    <ShopifyProvider
      countryIsoCode={locale.country}
      languageIsoCode={locale.language}
      storeDomain={env.PUBLIC_STORE_DOMAIN}
      storefrontApiVersion={env.PUBLIC_STOREFRONT_API_VERSION}
      storefrontToken={env.PUBLIC_STOREFRONT_API_TOKEN}
    >
      <AsideComponent.Provider>
        <Motion>
          <ClientOnly fallback={null}>
            {() => <NavigationProgressBar />}
          </ClientOnly>
          <AnnouncementBar />
          <Header />
          <main className="flex min-h-[90vh] grow flex-col gap-y-[calc(var(--space-between-template-sections)*.75)] sm:gap-y-(--space-between-template-sections)">
            {children}
          </main>
          <Footer />
          <TailwindIndicator />
          {sanityPreviewMode ? (
            <ClientOnly fallback={null}>
              {() => (
                <Suspense>
                  <VisualEditing />
                </Suspense>
              )}
            </ClientOnly>
          ) : (
            <TogglePreviewMode />
          )}
        </Motion>
      </AsideComponent.Provider>
    </ShopifyProvider>
  );
}
