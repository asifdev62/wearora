"use client";

import { useSyncExternalStore } from "react";
import type { CartItem } from "@/lib/cart";
import { createLocalStore } from "@/lib/local-store";

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  customer: OrderCustomer;
  status: "placed";
}

export const ORDERS_STORAGE_KEY = "wearora-orders";

const EMPTY_ORDERS: Order[] = [];

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const order = value as Partial<Order>;

  return (
    typeof order.id === "string" &&
    typeof order.createdAt === "string" &&
    typeof order.subtotal === "number" &&
    Array.isArray(order.items) &&
    typeof order.customer === "object" &&
    order.customer !== null
  );
}

const store = createLocalStore<Order[]>({
  storageKey: ORDERS_STORAGE_KEY,
  empty: EMPTY_ORDERS,
  parse: (value) =>
    Array.isArray(value) ? value.filter(isOrder) : EMPTY_ORDERS,
});

export function hydrateOrders() {
  store.hydrate();
}

export function reloadOrders() {
  store.reload();
}

export function createOrderId(): string {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WR-${Date.now().toString(36).toUpperCase()}${random}`;
}

export function placeOrder(
  input: Omit<Order, "id" | "createdAt" | "status">,
): Order {
  const order: Order = {
    ...input,
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: "placed",
  };

  store.update((orders) => [order, ...orders]);

  return order;
}

export function useOrders() {
  const orders = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return {
    orders,
    latest: orders[0],
  };
}
