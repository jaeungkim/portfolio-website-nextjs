import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import InitialScreenProvider from "@/src/app/client/InitialScreenProvider";
import { ThemeProvider } from "next-themes";
import "@/src/app/styles/globals.css";

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
    <html lang={locale} suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css"
        />
      </Head>
      <body className={`dark ${pretendard.className} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <InitialScreenProvider>{children}</InitialScreenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
