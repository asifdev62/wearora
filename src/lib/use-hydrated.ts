"use client";

import { useEffect, useState } from "react";

/** True once the client has mounted, so localStorage-backed views can skip
 * their empty state during server rendering. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
