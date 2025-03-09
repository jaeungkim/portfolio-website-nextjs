"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function InitialScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialScreen, setInitialScreen] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("initialScreenShown")
    ) {
      const timer = setTimeout(() => {
        setInitialScreen(false);
        localStorage.setItem("initialScreenShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
    setInitialScreen(false);
  }, []);

  if (initialScreen) return <Loader />;

  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
