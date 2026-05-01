import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { cn } from "@/src/lib/cn";
import "@/src/styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
  preload: true,
});

const SITE_NAME = "Jaeung Kim";
const SITE_URL = "https://jaeungkim.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Frontend developer portfolio, resume, and travel notes.",
  icons: {
    icon: "/icons/jaekim.svg",
    shortcut: "/icons/jaekim.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Frontend developer portfolio, resume, and travel notes.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: "Frontend developer portfolio, resume, and travel notes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className="[scrollbar-gutter:stable]"
    >
      <body
        suppressHydrationWarning
        className={cn(
          pretendard.className,
          "antialiased bg-background text-foreground",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
