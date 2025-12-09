"use client";

import { usePathname } from "next/navigation";
import CursorSplash from "@/src/components/shared/CursorSplash";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

export default function ConditionalLayout({
  children,
  navbar,
  footer,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isStandalone = pathname?.startsWith("/gantt-chart");

  if (isStandalone) {
    return <div className="w-full h-svh">{children}</div>;
  }

  return (
    <>
      <CursorSplash />
      {navbar}
      <main className="w-full grow relative mx-auto max-w-5xl px-8">
        {children}
      </main>
      {footer}
    </>
  );
}
