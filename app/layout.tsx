import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./global.css";
import Head from "next/head";
import InitialScreenProvider from "@/app/client/InitialScreenProvider";

const pretendard = localFont({
  src: "../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "JaeKim_Portfolio",
  description: "Jae Kim Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${pretendard.variable}`}>
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
