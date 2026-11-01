import { useSyncExternalStore } from "react";

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
let cart: CartItem[] = EMPTY_CART;
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function persist() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be unavailable (private mode, quota); the cart still works
    // for the current session.
  }
}

function commit(next: CartItem[]) {
  cart = next;
  persist();
  emit();
}

export function itemKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}::${item.size}::${item.color}`;
}

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

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return EMPTY_CART;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY_CART;
    }

    return parsed.filter(isCartItem);
  } catch {
    return EMPTY_CART;
  }
}

/** Loads the persisted cart once, on the client. Safe to call repeatedly. */
export function hydrateCart() {
  if (hydrated || typeof window === "undefined") {
    return;
  }

  hydrated = true;
  cart = readStoredCart();
  emit();
}

/** Re-reads storage after a change from another tab. */
export function reloadCart() {
  if (typeof window === "undefined") {
    return;
  }

  cart = readStoredCart();
  emit();
}

export function addToCart(
  input: Omit<CartItem, "quantity">,
  quantity = 1,
): void {
  const existing = cart.find((item) => itemKey(item) === itemKey(input));

  if (existing) {
    const maxQuantity = Math.max(existing.stock, 1);
    commit(
      cart.map((item) =>
        item === existing
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, maxQuantity),
            }
          : item,
      ),
    );
    return;
  }

  commit([
    ...cart,
    {
      ...input,
      quantity: Math.min(quantity, Math.max(input.stock, 1)),
    },
  ]);
}

export function setQuantity(key: string, quantity: number): void {
  commit(
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
  commit(cart.filter((item) => itemKey(item) !== key));
}

export function clearCart(): void {
  commit(EMPTY_CART);
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return cart;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
