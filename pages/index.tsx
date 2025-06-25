import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function Home() {
  return (
    <div className="p-4 space-y-8">
      {/* サイト紹介 */}
      <section>
        <h1 className="text-2xl font-bold mb-2">幻塔攻略データベースへようこそ</h1>
        <p className="text-sm text-gray-600">
          本サイトは、幻塔の最新コンテンツ・各種武器等を確認できる非公式データベースです。
          各種コンテンツの情報は徐々に更新していきます。お待ちくだセい。現在はテストバージョン㌥。
        </p>
      </section>
    
      {/* NEWS（ゲーム更新情報） */}
      <section>
        <h2 className="text-lg font-semibold mb-2">NEWS</h2>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>・2025/06/25 アストールの武器およびいくつかのデータを追加しました。</li>
          <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
        </ul>
      </section>
       
      {/* 最新バージョンの注目コンテンツ */}
      <section>
        <h2 className="text-lg font-semibold mb-2">ver5.1の注目コンテンツ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/weapons/w_62" className="block bg-white shadow p-4 rounded hover:bg-blue-50">
            <h3 className="font-semibold">アストール</h3>
            <p className="text-sm text-gray-600">アストールの武器詳細をチェック</p>
          </Link>

          <div className="block bg-gray-100 p-4 rounded text-center text-sm text-gray-400">
            （準備中）
          </div>
          <div className="block bg-gray-100 p-4 rounded text-center text-sm text-gray-400">
            （準備中）
          </div>
          <div className="block bg-gray-100 p-4 rounded text-center text-sm text-gray-400">
            （準備中）
          </div>
          <div className="block bg-gray-100 p-4 rounded text-center text-sm text-gray-400">
            （準備中）
          </div>
          <div className="block bg-gray-100 p-4 rounded text-center text-sm text-gray-400">
            （準備中）
          </div>
        </div>

        {/* カレンダー */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-md font-semibold mb-2">公式イベントカレンダー</h3>
            <Image
              src="/official-calendar.png"
              alt="公式カレンダー"
              width={900}
              height={400}
              className="rounded shadow"
            />
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">2025年6月</h3>
            <Image
              src="/edited-calendar.png"
              alt="2025年6月イベントカレンダー"
              width={900}
              height={600}
              className="rounded shadow"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
