import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ここにmetaタグを追加 */}
        <meta name="google-site-verification" content="dDw-5-QPWvJIxqIHSdRmkpauCzPxngxUV_jsHg1kEJ0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
