import Head from "next/head";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function About() {
  return (
    <>
      <Head>
        <title>運営者情報 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔攻略データベースの運営者情報はこちら。" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">運営者情報</h1>
        <p className="mb-4">
          当サイト「幻塔攻略データベース」は、Tower of Fantasy（幻塔）に関する非公式の攻略情報を発信する個人サイトです。
        </p>
        <p className="mb-4">
          運営者：hiro Shacho（公認クリエイター）<br />
          活動開始：2024年8月〜<br />
          主な活動：YouTubeでの解説動画配信、攻略記事の執筆・構成・サイト管理
        </p>
        <p className="mb-4">
          幻塔の攻略に役立つ情報を少しでも多くの方に届けることを目的として、日々更新を行っています。
        </p>
        <p>
          サイトやコンテンツに関するお問い合わせは、
          <a href="/contact" className="text-blue-600 underline mx-1">お問い合わせページ</a>
          よりお願いいたします。
        </p>
      </main>
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};