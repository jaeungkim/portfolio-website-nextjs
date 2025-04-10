import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/src/app/styles/globals.css";
import ThemeProvider from "@/src/components/common/ThemeProvider";

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
      <body
        className={`flex flex-col min-h-svh ${pretendard.className} antialiased bg-neutral-0 dark:bg-neutral-850`}
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
