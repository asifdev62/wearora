"use client";

export interface LocalStore<T> {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (listener: () => void) => () => void;
  hydrate: () => void;
  reload: () => void;
  set: (next: T) => void;
  update: (updater: (current: T) => T) => void;
}

/**
 * A tiny module-scoped store persisted to localStorage.
 *
 * State starts as `empty` on the server and on first render so markup matches,
 * then `hydrate()` swaps in the stored value after mount. Consumers read it
 * through `useSyncExternalStore` to avoid hydration mismatches.
 */
export function createLocalStore<T>({
  storageKey,
  empty,
  parse,
}: {
  storageKey: string;
  empty: T;
  parse: (value: unknown) => T;
}): LocalStore<T> {
  let state = empty;
  let hydrated = false;

  const listeners = new Set<() => void>();

  function emit() {
    for (const listener of listeners) {
      listener();
    }
  }

  function read(): T {
    if (typeof window === "undefined") {
      return empty;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return empty;
      }

      return parse(JSON.parse(raw));
    } catch {
      return empty;
    }
  }

  function persist(next: T) {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage can be unavailable (private mode, quota); state still works
      // for the current session.
    }
  }

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => empty,
    subscribe: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    hydrate: () => {
      if (hydrated || typeof window === "undefined") {
        return;
      }

      hydrated = true;
      state = read();
      emit();
    },
    reload: () => {
      if (typeof window === "undefined") {
        return;
      }

      state = read();
      emit();
    },
    set: (next) => {
      state = next;
      persist(next);
      emit();
    },
    update: (updater) => {
      state = updater(state);
      persist(state);
      emit();
    },
  };
}
