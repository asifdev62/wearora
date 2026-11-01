"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  stock: number;
}

export const CART_STORAGE_KEY = "wearora-cart";

const EMPTY_CART: CartItem[] = [];

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Partial<CartItem>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.size === "string" &&
    typeof item.color === "string" &&
    typeof item.quantity === "number" &&
    typeof item.stock === "number" &&
    item.quantity > 0
  );
}

function parseCart(value: unknown): CartItem[] {
  return Array.isArray(value) ? value.filter(isCartItem) : EMPTY_CART;
}

const store = createLocalStore<CartItem[]>({
  storageKey: CART_STORAGE_KEY,
  empty: EMPTY_CART,
  parse: parseCart,
});

export function itemKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}::${item.size}::${item.color}`;
}

/** Loads the persisted cart once, on the client. Safe to call repeatedly. */
export function hydrateCart() {
  store.hydrate();
}

/** Re-reads storage after a change from another tab. */
export function reloadCart() {
  store.reload();
}

export function addToCart(
  input: Omit<CartItem, "quantity">,
  quantity = 1,
): void {
  store.update((cart) => {
    const existing = cart.find((item) => itemKey(item) === itemKey(input));

    if (existing) {
      const nextStock = Math.max(input.stock, 1);

      return cart.map((item) =>
        item === existing
          ? {
              ...item,
              stock: input.stock,
              quantity: Math.min(item.quantity + quantity, nextStock),
            }
          : item,
      );
    }

    return [
      ...cart,
      {
        ...input,
        quantity: Math.min(quantity, Math.max(input.stock, 1)),
      },
    ];
  });
}

export function setQuantity(key: string, quantity: number): void {
  store.update((cart) =>
    cart.map((item) =>
      itemKey(item) === key
        ? {
            ...item,
            quantity: Math.min(Math.max(quantity, 1), Math.max(item.stock, 1)),
          }
        : item,
    ),
  );
}

export function removeItem(key: string): void {
  store.update((cart) => cart.filter((item) => itemKey(item) !== key));
}

export function clearCart(): void {
  store.set(EMPTY_CART);
}

export function useCart() {
  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return {
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
    addToCart,
    setQuantity,
    removeItem,
    clearCart,
  };
}
