import type { Metadata } from "next";
import ScrollToTopButton from "@/src/components/common/buttons/ScrollToTopButton";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "김재웅 ♥ 고아라의 결혼식",
  description: "김재웅 ♥ 고아라의 결혼식",
};

const suit = localFont({
  src: "../../../public/fonts/suit/SUIT-Regular.ttf",
  variable: "--font-suit",
});

const maruburi = localFont({
  src: "../../../public/fonts/maruburi/MaruBuri-Regular.ttf",
  variable: "--font-maruburi",
});

const hakgyoansim = localFont({
  src: "../../../public/fonts/hakgyo-ansim/Hakgyoansim.ttf",
  variable: "--font-hakgyoansim",
});

export default function MobileWeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`light relative ${hakgyoansim.className} antialiased`}>
      {children}
      <ScrollToTopButton />
    </div>
  );
}
