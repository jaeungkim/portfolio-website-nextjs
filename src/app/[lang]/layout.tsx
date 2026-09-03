import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { DevAnnotationToolbar } from "@/src/components/shared/DevAnnotationToolbar";
import { LOCALES, OG_LOCALES } from "@/src/i18n/config";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/src/i18n/dictionaries";
import { cn } from "@/src/lib/cn";
import "@/src/styles/globals.css";

const pretendard = localFont({
  src: "../../../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
  preload: true,
});

const SITE_URL = "https://jaeungkim.com";

// Cache Components requires every root parameter to have at least one value.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.site.name,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.description,
    alternates: await localeAlternates(),
    icons: {
      icon: "/icons/jaekim.svg",
      shortcut: "/icons/jaekim.svg",
    },
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      title: dict.site.name,
      description: dict.site.description,
      url: `${SITE_URL}/${locale}`,
      locale: OG_LOCALES[locale],
    },
    twitter: {
      card: "summary",
      title: dict.site.name,
      description: dict.site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={await getLocale()}
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
          <DevAnnotationToolbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
