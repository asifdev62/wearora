<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wearora

Single-app Next.js storefront for a Bangla-market clothing brand (prices in BDT). Frontend-only: no backend, database, auth, or payments. The catalog is `src/data/products.json`; cart, wishlist, and orders live in `localStorage`.

## Commands

- `npm run dev` — Turbopack dev server on :3000. It also rewrites the `nextjs-agent-rules` block above; keep it in diffs.
- `npm run build` — production build; it typechecks too. The first run can exit 1 with `SecurityFatalError` (a security-advisory reminder for the pinned `next@16.4.0`); re-run and it completes.
- `npm run lint` — bare `eslint` over the whole repo. `next lint` does not exist in this version. One file: `npx eslint src/app/page.tsx`.
- `npx tsc --noEmit` — typecheck (no npm script for it).
- No test runner is configured; don't invent `npm test`.

## Next.js 16.4 specifics

- Version-matched docs live in `node_modules/next/dist/docs/` — read the relevant guide before using any framework API.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Dev mode validates that every page navigates instantly and reports blocking code in the overlay. A page that legitimately blocks on URL data opts out with `export const instant = false;` — see `src/app/components/products/page.tsx`. `instant` only works in server components.
- `/search` awaits `searchParams` inside `<Suspense>` instead; keep URL reads inside that boundary.
- `LayoutProps<"/">` in `src/app/layout.tsx` is a globally generated type; don't import it.

## Routes and structure

- `/` → `src/app/page.tsx` → `components/home/page.tsx`, which composes `Banner`, `CategoryTiles`, `NewArrivals`, and `FeaturedProducts`. `/components/home` serves the same content as a standalone route.
- `/components/products` is the list with an `?audience=` filter; detail pages are `/components/products/[slug]`, prerendered for every slug via `generateStaticParams`.
- `/new-arrive` reuses `components/home/NewArrivals` with `showHeader={false}`; `/wishlist`, `/cart`, `/checkout`, `/checkout/success`, and `/profile` are client-rendered views over the stores.
- `src/app/components/` is a **route directory**, not just a component folder. Most files there have no `page.tsx` and are not routable, but `components/home/page.tsx` and `components/products/page.tsx` are real URLs. Adding a `page.tsx` anywhere under `src/app/components/` creates a public route — check the route table printed by `next build`.
- Windows checkouts run with `git core.ignorecase=true`, which hides case-only renames. A tracked `productCard.tsx` once broke Linux builds while imports used `ProductCard`. After renaming a file, confirm with `git ls-files` and use a two-step `git mv` if only the case changed.
- `@/*` maps to `src/*`.

## State

- Every store is built with `createLocalStore` from `src/lib/local-store.ts`, hydrated once in `AppProviders` (root layout), and synced across tabs through `storage` events. Consume them only from client components via `useCart()`, `useWishlist()`, or `useOrders()`.
- Storage keys: `wearora-cart`, `wearora-wishlist`, `wearora-orders`.
- Stores are empty during server rendering. Wrap localStorage-backed views in `useHydrated()` (`src/lib/use-hydrated.ts`) and render a skeleton until it returns true, or the empty state flashes.
- Checkout is a demo: `CheckoutForm` writes an order to localStorage and clears the cart. There is no payment, inventory check, or server persistence.

## Data and styling

- Catalog data: `src/data/products.json` (28 products) imported directly by pages. Images are local files in `public/products/` referenced as `/products/<file>.jpg`; the `cdn.dummyjson.com` entry in `next.config.ts` `images.remotePatterns` is a leftover from the original dataset.
- `nameBn` values are already corrupted to `?` placeholders (encoding loss); treat them as missing text, not Bengali.
- `src/lib/products.ts` owns the `Product` type and all lookups (`getProductBySlug`, `getDiscountedPrice`, `getRelatedProducts`, `getProductsByIds`, `getFeaturedProducts`, `searchProducts`); import them instead of re-declaring the shape or re-filtering the JSON.
- Tailwind v4 with no config file: `src/app/globals.css` is only `@import "tailwindcss";`, and the `@tailwindcss/turbopack` loader is wired through `turbopack.rules` in `next.config.ts` (not PostCSS). Styling uses utility classes with arbitrary hex values from a warm palette (`#65554B`/`#655549`, `#FDFBF7`, `#A88B72`, `#352B24`); stay in that palette instead of adding new colors.
- Icons come from `react-icons` (`ci`, `fa`, `fa6`, `tb`).
