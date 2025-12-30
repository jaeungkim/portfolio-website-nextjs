import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import SplashCursor from "@/src/components/shared/SplashCursor";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full grow relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <SplashCursor />
      <Footer />
    </>
  );
}
