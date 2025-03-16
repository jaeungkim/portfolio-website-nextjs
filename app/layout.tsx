import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Suspense } from "react";
import "./global.css";
import Head from "next/head";
import InitialScreenProvider from "@/app/client/InitialScreenProvider";
import Navbar from "@/app//components/navbar/Navbar";
import Footer from "@/app/components/Footer";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className="dark">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css"
        />
      </Head>
      <body className={`${notoSansKr.className} noto-font antialiased`}>
        <InitialScreenProvider>{children}</InitialScreenProvider>
      </body>
    </html>
  );
}
