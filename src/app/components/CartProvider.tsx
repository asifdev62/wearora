"use client";

import { useEffect, type ReactNode } from "react";
import { CART_STORAGE_KEY, hydrateCart, reloadCart } from "@/lib/cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrateCart();

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === CART_STORAGE_KEY) {
        reloadCart();
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return <>{children}</>;
}
