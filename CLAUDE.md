# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Quality Checks (Run after every code edit):**
```bash
npm run typecheck
npm run lint  
npm run format:check
```

If format:check fails, run `npm run format` to auto-fix, then re-run checks.

**Development:**
```bash
npm run dev                 # Start development server with codegen
npm run build              # Build for production
npm run preview            # Preview production build
npm run codegen           # Generate Shopify GraphQL types
npm run sanity:typegen    # Generate Sanity CMS types
npm run lint:fix           # Auto-fix linting issues
npm run format             # Auto-format code with Prettier
```

**Code Generation and CMS Setup:**
```bash
npm run sanity:extract    # Extract Sanity schema
npm run sanity:generate   # Generate Sanity types
npm run create:initial    # Create initial Sanity documents
npm run create:cors       # Create CORS origin for Sanity
npm run create:token      # Create viewer token for Sanity
```

## Architecture Overview

### Framework Stack
- **Shopify Hydrogen v2025.7.0** for e-commerce
- **React Router v7** (NOT Remix) for routing and SSR
- **Sanity CMS** for content management
- **TypeScript** in strict mode
- **Tailwind CSS v4.x** for styling

### Import Patterns (Critical)
This project uses **React Router v7**, not Remix. Always use React Router imports:

```typescript
// CORRECT
import { useLoaderData, Link, Form } from 'react-router';

// INCORRECT (Remix style)  
import { useLoaderData, Link, Form } from '@remix-run/react';
```

Never use `react-router-dom` imports.

### File Naming Convention
Use **kebab-case** for all new files and directories:
- Correct: `product-card.tsx`, `user-settings.ts`
- Incorrect: `ProductCard.tsx`, `user_settings.ts`

### Project Structure

```
app/
├── routes/              # File-based routing with ($locale) pattern
├── components/          # UI components (kebab-case naming)
│   ├── ui/             # shadcn/ui components  
│   ├── sections/       # Page section components
│   ├── sanity/         # CMS integration components
│   └── layout/         # Layout components
├── data/               # Data layer
│   ├── sanity/         # CMS queries & fragments
│   └── shopify/        # Storefront API queries  
├── lib/                # Utilities & business logic
├── hooks/              # Custom React hooks
├── sanity/             # Sanity Studio configuration
└── styles/             # Tailwind CSS
```

### Routing System
- **File-based routing** using `@react-router/fs-routes`
- **Internationalization**: Routes use `($locale)._index.tsx` pattern
- **Route configuration**: Located in `routes.ts` with `hydrogenRoutes()` wrapper

### Content Management (Sanity CMS)
- **Sanity Studio** accessible at `/cms` route
- **Live preview mode** with visual editing
- **Internationalized content** using `sanity-plugin-internationalized-array`
- **Schema structure**:
  - `documents/`: Main content types (page, product, collection)
  - `objects/`: Reusable schema objects
  - `singletons/`: Global settings (header, footer, theme)

### Data Layer Architecture
- **GraphQL fragments** for consistent Shopify data fetching
- **GROQ queries** for Sanity content with TypeScript generation
- **Section resolver system** at `lib/section-resolver.ts` for dynamic section rendering
- **Optimistic cart updates** with Hydrogen's built-in cart management

### Environment Variables Required
```typescript
// Shopify
PUBLIC_STORE_DOMAIN
PUBLIC_STOREFRONT_API_TOKEN
PRIVATE_STOREFRONT_API_TOKEN
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID

// Sanity  
PUBLIC_SANITY_STUDIO_PROJECT_ID
PUBLIC_SANITY_STUDIO_DATASET
SANITY_STUDIO_TOKEN

// Sessions
SESSION_SECRET
```

### Key Development Patterns

**Root Layout (`root.tsx`):**
- Server-side data loading with locale resolution
- SEO management via meta functions
- Session management with secure cookies

**Component Organization:**
- Use existing component patterns in `components/ui/` 
- Follow shadcn/ui conventions for new UI components
- Section components handle dynamic CMS content rendering

**Styling:**
- Tailwind CSS v4.x with CSS variables for theming
- Design tokens managed through Sanity CMS
- Use `motion` library for animations

**Type Safety:**
- Always run `npm run codegen` after Shopify schema changes
- Always run `npm run sanity:typegen` after Sanity schema changes
- TypeScript strict mode is enabled

### Quality Assurance Workflow
1. Make code changes
2. Run `npm run typecheck` - fix any type errors
3. Run `npm run lint` - fix any linting errors  
4. Run `npm run format:check` - run `npm run format` if needed
5. Ensure all checks pass before proceeding

### Deployment
- **Cloudflare Workers** via `@shopify/mini-oxygen`
- **Server-side rendering** with edge deployment
- **Environment-specific configurations** for production/preview

### Common Customization Points
- Theme configuration via Sanity singletons
- Custom sections in the section resolver
- Layout modifications via component composition  
- Styling overrides through CSS variables and Tailwind
- Product customization hooks for AWS integration

## Important Reminders

**Package Manager:** This project uses **npm** (package-lock.json present), not pnpm or yarn.

**Always Run Quality Checks:** After ANY code edit, immediately run:
1. `npm run typecheck` 
2. `npm run lint`
3. `npm run format:check`

**Critical Import Pattern:** This is React Router v7, NOT Remix. Never use `@remix-run/*` or `react-router-dom` imports. Always use `react-router` for hooks and components.