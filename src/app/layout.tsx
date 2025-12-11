import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "@/src/styles/globals.css";
import ConditionalLayout from "@/src/components/layout/ConditionalLayout";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

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
        className={`flex flex-col min-h-svh ${pretendard.className} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
