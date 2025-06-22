import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {<meta name="google-site-verification" content="dDw-5-QPWvJIxqIHSdRmkpauCzPxngxUV_jsHg1kEJ0" />}
        <meta name="google-site-verification" content="ここにSearch Consoleで発行された文字列" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}