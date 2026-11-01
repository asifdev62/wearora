"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once React has hydrated on the client, false during server rendering.
 * Used to avoid rendering localStorage-backed empty states into the static HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
