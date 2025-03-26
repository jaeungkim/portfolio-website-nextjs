import { Suspense } from "react";
import { NextIntlClientProvider, useMessages, hasLocale } from "next-intl";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/navbar/Navbar";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";
import { getMessages, setRequestLocale } from "next-intl/server";
import Head from "next/head";
import localFont from "next/font/local";
import { Metadata } from "next";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";
import InitialScreenProvider from "@/src/app/client/InitialScreenProvider";

type Params = Promise<{ locale: never }>;

export default async function PortfolioLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { locale } = await params;
  if (!["en", "kr"].includes(locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="relative sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 max-w-3xl lg:max-w-5xl mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
