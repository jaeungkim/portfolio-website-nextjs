import { Suspense } from "react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="relative sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-5xl mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
