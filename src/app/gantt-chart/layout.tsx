import { Footer } from "@/src/components/layout/Footer";

export default function GanttChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full grow relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
