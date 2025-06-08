import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/src/styles/globals.css";

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
    <html lang="kr" suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-svh ${pretendard.className} antialiased bg-neutral-0 dark:bg-neutral-850`}
      >
        {children}
      </body>
    </html>
  );
}
