import * as React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import GoogleAnalytics from "../components/GoogleAnalytics";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="shortcut icon"
            href="/otomad-search.svg"
            key="shortcutIcon"
          />
          <GoogleAnalytics />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
