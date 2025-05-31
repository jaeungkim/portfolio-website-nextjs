import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/Footer";
import ThemeProvider from "@/src/components/common/ThemeProvider";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!["en", "kr"].includes(locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <main className="w-full grow relative mx-auto max-w-5xl px-8">
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
