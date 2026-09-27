"use client";

import type React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const scriptProps = {
  type: typeof window === "undefined" ? undefined : "text/plain",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
