"use client";

import { useEffect, type ReactNode } from "react";
import { CART_STORAGE_KEY, hydrateCart, reloadCart } from "@/lib/cart";
import { ORDERS_STORAGE_KEY, hydrateOrders, reloadOrders } from "@/lib/orders";
import {
  WISHLIST_STORAGE_KEY,
  hydrateWishlist,
  reloadWishlist,
} from "@/lib/wishlist";

export default function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrateCart();
    hydrateWishlist();
    hydrateOrders();

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === CART_STORAGE_KEY) {
        reloadCart();
      }
      if (event.key === null || event.key === WISHLIST_STORAGE_KEY) {
        reloadWishlist();
      }
      if (event.key === null || event.key === ORDERS_STORAGE_KEY) {
        reloadOrders();
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return <>{children}</>;
}
