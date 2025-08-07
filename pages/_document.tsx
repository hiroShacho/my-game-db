import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ここにmetaタグを追加 */}
        <meta name="google-adsense-account" content="ca-pub-9748053430759774" />
        <meta name="google-site-verification" content="dDw-5-QPWvJIxqIHSdRmkpauCzPxngxUV_jsHg1kEJ0" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="幻塔 攻略データベース | Tower of Fantasy" />
        <meta property="og:description" content="幻塔の攻略サイト兼データベース㌥" />
        <meta property="og:image" content="https://tofguideanddb.vercel.app/ogp.png" />
        <meta property="og:url" content="https://tofguideanddb.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="幻塔 攻略データベース | Tower of Fantasy" />
        <meta name="twitter:description" content="幻塔の攻略サイト兼データベース㌥" />
        <meta name="twitter:image" content="https://tofguideanddb.vercel.app/ogp.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "幻塔攻略データベース｜Tower of Fantasy", // ←ここがサイト名
              "url": "https://tofguideanddb.vercel.app/"
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}