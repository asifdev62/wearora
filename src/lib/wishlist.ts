"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";

export const WISHLIST_STORAGE_KEY = "wearora-wishlist";

const EMPTY_WISHLIST: string[] = [];

const store = createLocalStore<string[]>({
  storageKey: WISHLIST_STORAGE_KEY,
  empty: EMPTY_WISHLIST,
  parse: (value) =>
    Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : EMPTY_WISHLIST,
});

export function hydrateWishlist() {
  store.hydrate();
}

export function reloadWishlist() {
  store.reload();
}

export function toggleWishlist(productId: string) {
  store.update((ids) =>
    ids.includes(productId)
      ? ids.filter((id) => id !== productId)
      : [productId, ...ids],
  );
}

export function removeFromWishlist(productId: string) {
  store.update((ids) => ids.filter((id) => id !== productId));
}

export function useWishlist() {
  const ids = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return {
    ids,
    count: ids.length,
    has: (productId: string) => ids.includes(productId),
    toggle: toggleWishlist,
    remove: removeFromWishlist,
  };
}
