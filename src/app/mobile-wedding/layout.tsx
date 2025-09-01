import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Wedding Day",
  description: "김재웅 · 고아라의 결혼식",
};

export default function MobileWeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className="bg-white text-gray-900 antialiased" style={{ colorScheme: 'light' }}>
        {children}
      </body>
    </html>
  );
}
