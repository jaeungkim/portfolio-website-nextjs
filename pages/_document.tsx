import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en-us" className="h-full">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mouse-follower@1/dist/mouse-follower.min.css"
        />
        <script src="https://unpkg.com/mouse-follower@1/dist/mouse-follower.min.js"></script>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
