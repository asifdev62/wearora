# Wearora

Fashion storefront for a Bangla-market clothing brand — "Wear your story". Prices are in BDT.

Built with Next.js 16 (App Router, Turbopack), React 19, and Tailwind CSS v4.

## Features

- 28-product catalog loaded from `src/data/products.json`, with local images in `public/products/`
- Audience filtering (Men, Women, Boys, Girls), search, new arrivals, and top-rated picks
- Product detail pages with size/colour selection, stock status, and related products
- Wishlist and cart with quantity controls, persisted in `localStorage`
- Demo cash-on-delivery checkout with an order confirmation and order history
- Responsive layout with a mobile menu and search panel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Turbopack dev server on port 3000             |
| `npm run build`     | Production build (also runs TypeScript)       |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint across the repo (`eslint`)             |
| `npx tsc --noEmit`  | Typecheck without emitting files              |

There is no test runner configured.

## Routes

| Route                          | Page                                              |
| ------------------------------ | ------------------------------------------------- |
| `/`                            | Home: hero, categories, new arrivals, top rated   |
| `/components/products`         | All products, optional `?audience=Men` filter     |
| `/components/products/[slug]`  | Product details                                   |
| `/new-arrive`                  | New arrivals                                      |
| `/search?q=`                   | Search results                                    |
| `/wishlist`                    | Saved products                                    |
| `/cart`                        | Cart and order summary                            |
| `/checkout`                    | Delivery details and place order                  |
| `/checkout/success`            | Order confirmation                                |
| `/profile`                     | Demo account, saved items, order history          |

## How state works

There is no backend. Cart, wishlist, and orders are stored in the browser:

- `wearora-cart` — line items with size, colour, and quantity
- `wearora-wishlist` — saved product IDs
- `wearora-orders` — placed orders with customer and delivery details

Each store is created with `createLocalStore` (`src/lib/local-store.ts`) and hydrated once by `AppProviders` in the root layout. Views read them through `useCart()`, `useWishlist()`, and `useOrders()`.

## Notes

- Checkout is a demo: no payment, inventory, or server persistence. Orders stay in the browser.
- `nameBn` fields in the catalog were lost to an encoding issue and contain `?` placeholders.
- `next build` can exit 1 on the first run with a Next.js security-advisory reminder; re-run the command and the build completes.
- Version-matched Next.js docs are bundled at `node_modules/next/dist/docs/`.
