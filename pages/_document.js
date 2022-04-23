import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html land="en" className="bg-neutral-900">
      <Head>
        <meta name="description" content="Todo list built with typescript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main>
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}