import Head from "next/head";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔攻略データベースのプライバシーポリシーはこちら。" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">プライバシーポリシー</h1>
        {/* 以下はひな型内容 */}
        <p className="mb-4">
          当サイト（以下「当サイト」といいます）では、第三者配信による広告サービス（Google AdSense等）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示しています。
        </p>
        <p className="mb-4">
          広告配信事業者は、ユーザーの当サイトや他サイトへのアクセスに関する情報（Cookie）を使用することがあります。ただし、氏名、住所、メール アドレス、電話番号などの個人情報は含まれません。
        </p>
        <p className="mb-4">
          Cookieを無効にする設定やGoogleの広告におけるCookieの詳細については、
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            Googleのポリシーと規約
          </a>
          をご確認ください。
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">アクセス解析について</h2>
        <p className="mb-4">
          当サイトでは、Google Analytics によるアクセス解析を使用しています。トラフィックデータの収集は匿名で行われ、個人を特定するものではありません。
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">免責事項</h2>
        <p className="mb-4">
          当サイトに掲載する情報は可能な限り正確な情報を掲載するよう努めていますが、正確性や安全性を保証するものではありません。
        </p>
        <p className="mb-4">
          また、リンクやバナーなどで移動したサイトで提供される情報・サービスについて、当サイトは一切の責任を負いません。
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">著作権について</h2>
        <p className="mb-4">
          当サイトに掲載している文章・画像・動画等の著作権は各権利所有者に帰属します。問題がある場合は
          <a href="/contact" className="text-blue-600 underline mx-1">お問い合わせ</a>
          よりご連絡ください。迅速に対応いたします。
        </p>
      </main>
    </>
  );
}

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};