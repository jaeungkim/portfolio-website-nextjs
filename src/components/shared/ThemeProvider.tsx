"use client";

import type React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes renders its no-flash `<script>` inside the provider. Switching
 * locale remounts the whole `[lang]` root segment on the client, so React
 * re-creates that script where it can never run and warns in dev
 * (pacocoursey/next-themes#397). Client renders mark it as a data block, which
 * is the exemption React checks for. The server copy still executes before
 * hydration; the attribute mismatch is covered by the suppressHydrationWarning
 * next-themes already sets on the tag, the same way it handles `nonce`.
 */
const scriptProps = {
  type: typeof window === "undefined" ? undefined : "text/plain",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
