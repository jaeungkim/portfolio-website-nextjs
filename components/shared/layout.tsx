import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import { Fragment } from "react";

export const siteTitle = "Jaeung Kim Portfolio Website";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  blog?: boolean;
  home?: boolean;
}) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Jaeung Kim Blog" />
        <meta property="og:image" content="https://www.jaeungkim.com/api/og" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <div className="relative">
        <main className="sm:px-8 mt-9 mx-auto max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}
