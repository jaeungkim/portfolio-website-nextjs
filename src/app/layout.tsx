import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "@/src/styles/globals.css";
import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/Footer";
import CursorSplash from "@/src/components/common/CursorSplash";

const pretendard = localFont({
  src: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "JaeKim_Portfolio",
  description: "Jae Kim Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-svh ${pretendard.className} antialiased bg-neutral-0 dark:bg-neutral-850`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CursorSplash />
          <Navbar />
          <main className="w-full grow relative mx-auto max-w-5xl px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
