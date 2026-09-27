import type React from "react";
import type { Metadata } from "next";
import { DevAnnotationToolbar } from "@/components/shared/DevAnnotationToolbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { LOCALES, OG_LOCALES, SITE_URL } from "@/i18n/config";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/i18n/dictionaries";
import { pretendard } from "@/styles/fonts";
import "@/styles/globals.css";

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
    icons: "/icons/jaekim.svg",
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      locale: OG_LOCALES[locale],
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
      className="motion-safe:scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning className={pretendard.className}>
        <ThemeProvider>
          {children}
          <DevAnnotationToolbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
