import type { Metadata } from "next";
import ScrollToTopButton from "@/src/components/common/buttons/ScrollToTopButton";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "김재웅 ♥ 고아라의 결혼식",
  description: "김재웅 ♥ 고아라의 소중한 날을 함께 축하해주세요.",

  // Open Graph metadata for Facebook/LinkedIn sharing
  openGraph: {
    title: "김재웅 ♥ 고아라의 결혼식",
    description: "김재웅 ♥ 고아라의 소중한 날을 함께 축하해주세요.",
    images: [
      {
        url: "https://images.jaeungkim.com/mobile-wedding/gallery/wedding12.jpeg",
        width: 1200,
        height: 630,
        alt: "김재웅 ♥ 고아라의 결혼식",
      },
    ],
    type: "website",
  },
};

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
