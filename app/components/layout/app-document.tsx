/**
 * AppDocument
 *
 * This component provides the <html>, <head>, and <body> structure
 * for the entire app. It is the "document shell" of the site.
 *
 * Root.tsx Layout will wrap the app inside this component.
 * This keeps layout UI separate from HTML document scaffolding.
 */

import {Meta, Links, ScrollRestoration, Scripts} from 'react-router';
import {useNonce} from '@shopify/hydrogen';

export function AppDocument({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) {
  const nonce = useNonce();

  return (
    <html lang={language}>
      <head>
        {/* Meta tags + linked stylesheets */}
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {/* Page content */}
        {children}

        {/* Browser navigation + script loader */}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
