import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en-us" className="h-full">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
