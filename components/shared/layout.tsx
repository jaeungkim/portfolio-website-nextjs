import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

export const siteTitle = "Jaeung Kim Portfolio Website";

interface LayoutProps {
  children: React.ReactNode;
  blog?: boolean;
  home?: boolean;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Jaeung Kim Blog" />
        <meta property="og:image" content="https://www.jaeungkim.com/api/og" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="relative sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
