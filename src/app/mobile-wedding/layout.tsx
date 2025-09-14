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

export default function MobileWeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`light relative ${maruburi.className} antialiased`}>
      {children}
      <ScrollToTopButton />
    </div>
  );
}
