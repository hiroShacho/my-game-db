import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function Home() {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* サイト紹介 */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">幻塔攻略データベース</h1>
        <p className="text-sm sm:text-base text-gray-600">
          本サイトは、幻塔の最新コンテンツ・各種武器等を確認できる非公式データベースです。
          各種コンテンツの情報は徐々に更新していきます。お待ちくだセい。現在はテストバージョン㌥。
        </p>
      </section>
    
      {/* NEWS（ゲーム更新情報） */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">NEWS</h2>
        <ul className="space-y-1 text-sm sm:text-base text-gray-700">
          <li>・2025/06/26 「ver5.1の注目コンテンツ」にイベント「キルオの守護者」のページを追加。</li>
          <li>・2025/06/25 PC・スマホの表示を調整。</li>
          <li>・2025/06/25 アストールの武器およびいくつかのデータを追加しました。</li>
          <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
        </ul>
      </section>
       
      {/* 最新バージョンの注目コンテンツ */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.1の注目コンテンツ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 新キャラカード */}
          <Link href="/weapons/w_62" className="block">
            <div
              className="relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group"
              style={{
                backgroundImage: "url('/ver_event/New_Character.png')",
                backgroundSize: "cover",
                backgroundPosition: "left",
              }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                  アストール
                </h3>
                <p className="text-sm sm:text-base text-white drop-shadow">
                  アストールの武器詳細をチェック
                </p>
              </div>
            </div>
          </Link>

          {/* 新イベントカード */}
          <Link href="/event/ver5-1/guardian-of-kailo" className="block">
            <div
              className="relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group"
              style={{
                backgroundImage: "url('/ver_event/New_Event_1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                  新イベント「キルオの守護者」
                </h3>
                <p className="text-sm sm:text-base text-white drop-shadow">
                  「キルオの守護者」の詳細はこちら
                </p>
              </div>
            </div>
          </Link>

          {/* 以下 準備中ボックス */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="block bg-gray-100 p-4 sm:p-6 rounded text-center text-sm sm:text-base text-gray-400">
              （準備中）
            </div>
          ))}
        </div>

        {/* カレンダー */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-2">公式イベントカレンダー</h3>
            <Image
              src="/official-calendar.png"
              alt="公式カレンダー"
              width={900}
              height={400}
              className="w-full h-auto rounded shadow"
            />
          </div>

          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-2">2025年6月</h3>
            <Image
              src="/edited-calendar.png"
              alt="2025年6月イベントカレンダー"
              width={900}
              height={600}
              className="w-full h-auto rounded shadow"
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