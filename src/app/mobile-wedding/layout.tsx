import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김재웅 ♥ 고아라의 결혼식",
  description: "김재웅 ♥ 고아라의 결혼식",
  other: {
    "color-scheme": "light",
  },
};

export default function MobileWeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="light">{children}</div>;
}
