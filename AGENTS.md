<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wearora

Single-app Next.js storefront for a Bangla-market clothing brand (prices in BDT). No backend, no database, no test suite — the catalog is a static JSON file. `README.md` is still create-next-app boilerplate; trust `package.json` and the code instead.

## Commands

- `npm run dev` — Turbopack dev server on :3000. It also rewrites the `nextjs-agent-rules` block above; keep it in diffs.
- `npm run build` — production build; it typechecks too. The first run can exit 1 with `SecurityFatalError` (a security-advisory reminder for the pinned `next@16.4.0`); re-run and it completes.
- `npm run lint` — bare `eslint` over the whole repo. `next lint` does not exist in this version. One file: `npx eslint src/app/page.tsx`.
- `npx tsc --noEmit` — typecheck (no npm script for it).
- No test runner is configured; don't invent `npm test`.

## Next.js 16.4 specifics

- Version-matched docs live in `node_modules/next/dist/docs/` — read the relevant guide before using any framework API.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Dev mode validates that every page navigates instantly and reports blocking code in the overlay. A page that legitimately blocks (e.g. awaiting `searchParams`) opts out with `export const instant = false;` — see `src/app/components/products/page.tsx`. `instant` only works in server components.
- `LayoutProps<"/">` in `src/app/layout.tsx` is a globally generated type; don't import it.

## Structure gotchas

- `src/app/components/` is a **route directory**, not just a component folder. `Navbar.tsx`, `Banner.tsx`, `ProductCard.tsx` sit there without `page.tsx` and are not routable, but `components/home/page.tsx` serves `/components/home` and `components/products/page.tsx` serves `/components/products`. Adding a `page.tsx` anywhere under `src/app/components/` creates a public URL — check the route table printed by `next build`.
- Product detail pages are `src/app/components/products/[slug]/page.tsx` (`/components/products/<slug>`), prerendered for every slug via `generateStaticParams`; the cart is `/cart`.
- `/` renders `components/home/page.tsx`, which imports `new-arrive/page.tsx`, so the New Arrivals grid appears on both `/` and `/new-arrive` and edits to that file change both pages.
- `Navbar` links to `/profile` and `/wishlist`, which have no pages yet.
- `@/*` maps to `src/*`.

## Data and styling

- Catalog data: `src/data/products.json` (28 products) imported directly by pages. Images are local files in `public/products/` referenced as `/products/<file>.jpg`; the `cdn.dummyjson.com` entry in `next.config.ts` `images.remotePatterns` is a leftover from the original dataset.
- `nameBn` values are already corrupted to `?` placeholders (encoding loss); treat them as missing text, not Bengali.
- The `Product` type and lookups (`getProductBySlug`, `getDiscountedPrice`, `getRelatedProducts`) live in `src/lib/products.ts`; import them instead of re-declaring the shape or re-filtering the JSON.
- Cart state is a module store in `src/lib/cart.ts`, persisted to `localStorage` under `wearora-cart` and exposed via `useCart()`. Only client components may call it (`CartProvider` hydrates it in the root layout).
- Tailwind v4 with no config file: `src/app/globals.css` is only `@import "tailwindcss";`, and the `@tailwindcss/turbopack` loader is wired through `turbopack.rules` in `next.config.ts` (not PostCSS). Styling uses utility classes with arbitrary hex values from a warm palette (`#65554B`/`#655549`, `#FDFBF7`, `#A88B72`, `#352B24`); stay in that palette instead of adding new colors.
- Icons come from `react-icons` (`ci`, `fa`, `fa6`, `tb`).
