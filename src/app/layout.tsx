import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import Head from "next/head";
import InitialScreenProvider from "@/src/app/client/InitialScreenProvider";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../i18n/routing";

const pretendard = localFont({
  src: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "JaeKim_Portfolio",
  description: "Jae Kim Portfolio Website",
};

type Params = Promise<{ locale: never }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`dark ${pretendard.variable}`}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css"
        />
      </Head>
      <body className={`${pretendard.className} antialiased`}>
        <InitialScreenProvider>{children}</InitialScreenProvider>
      </body>
    </html>
  );
}
