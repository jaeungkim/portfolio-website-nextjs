"use client";

import { useEffect, useState, type ComponentType } from "react";

export function DevAnnotationToolbar() {
  const [Toolbar, setToolbar] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    void import("agentation").then((m) => setToolbar(() => m.Agentation));
  }, []);

  return Toolbar ? <Toolbar /> : null;
}
