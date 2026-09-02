"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Agentation's annotation toolbar, loaded only while running `next dev`.
 * The `import()` sits behind a `NODE_ENV` guard so the production build
 * treats it as dead code and never emits the chunk.
 */
export function DevAnnotationToolbar() {
  const [Toolbar, setToolbar] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    void import("agentation").then((m) => setToolbar(() => m.Agentation));
  }, []);

  return Toolbar ? <Toolbar /> : null;
}
