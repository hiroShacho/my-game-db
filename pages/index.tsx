import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { GanttCalendar, GanttEvent } from "@/components/GanttCalendar";
import { GiftCodeList } from "@/components/GiftCodeList";
import Head from "next/head";

// --- Gantt Chart Calendar Data（カレンダーに表示する内容） ---
const GANTT_EVENTS: GanttEvent[] = [
  {
    label: "新コスチューム・田園フェアリー",
    color: "#83e28f",
    labelColor: "#83e28f",
    labelFontColor: "#200",
    start: 1,
    end: 29,
  },
  {
    label: "復刻プレアバ・アンカー",
    color: "#ff4141",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 8,
  },
  {
    label: "復刻プレアバ・パロッティ",
    color: "#e3a3f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 4,
    end: 18,
  },
  {
    label: "復刻プレアバ・アスラーダ",
    color: "#8e80f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 15,
    end: 29,
  },
  {
    label: "復刻コスチューム・海辺の休日",
    color: "#9cccf5",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 4,
    end: 18,
  },
  {
    label: "復刻コスチューム・海風のささやき",
    color: "#396eb5",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 15,
    end: 29,
  },
];
const GANTT_MONTH = 7;
const GANTT_YEAR = 2025;
const GANTT_DAYS = 31; // 1日〜31日まで

const eventImages: (string | null)[] = [
  "/ver_event/Outfit_Meadow Whimsy.PNG",       // 田園フェアリー
  "/ver_event/Simulacrum_Anka.PNG",            // アンカー
  "/ver_event/Simulacrum_Plotti.PNG",          // パロッティ
  "/ver_event/Simulacrum_Asurada.PNG",         // アスラーダ
  "/ver_event/Outfit_Seabreeze Whispers.PNG",  // 海風のささやき
  "/ver_event/Outfit_Seaside Vacation.PNG",    // 海辺の休日
];

// ギフトコード一覧（内容はindex.tsxで管理）
const GIFT_CODES = [
  {
    code: "TOF500601",
    desc: "Discord配布コード",
    expire: "2025/12/30",
  },
  {
    code: "624star",
    desc: "ver5.1バージョン引き換えコード",
    expire: "2025/07/29",
  }
];

// ---- ここから既存ページ内容 ----

export default function Home() {
  return (
   <>
    <Head>
      <title>【幻塔攻略】トップページ | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の攻略・データベースのトップページです。" />
    </Head>

    <div className="p-4 sm:p-8 space-y-8">
      {/* サイト紹介 */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">幻塔攻略データベース</h1>
        <p className="text-sm sm:text-base text-gray-600">
          本サイトは、幻塔の最新コンテンツ・各種武器等を確認できる非公式の攻略サイトです。
          各種コンテンツの情報は徐々に更新していきます。お待ちくだセい。現在はテストバージョン㌥。
        </p>
      </section>

      {/* NEWS（ゲーム更新情報） */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">NEWS</h2>
        <ul className="space-y-1 text-sm sm:text-base text-gray-700">
          <li>・2025/07/08 イベント「キルオの守護者」の「星々闘技場」について追記。探索ポイントを少し追加。</li>
          <li>・2025/07/07 Ver5.2の先行テストサーバーのページを作成。一部キャラ情報を追加。</li>
          <li>･･･</li>
          <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
        </ul>
      </section>

      {/* 最新バージョンの注目コンテンツ */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.1の注目コンテンツ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 新キャラカード */}
          <Link href="/weapons/TwinStars" className="block">
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

          {/* 新イベントカード：Ver5.2先行テストサーバー */}
          <Link href="/event/ver5-1/ver5-2_testserver" className="block">
            <div
              className="relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group"
              style={{
                backgroundImage: "url('/ver_event/New_Event_2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                  Ver5.2先行テストサーバー
                </h3>
                <p className="text-sm sm:text-base text-white drop-shadow">
                  Discordでテストサーバー募集開始！詳細・応募方法はこちら
                </p>
              </div>
            </div>
          </Link>

          {/* ギフトコード一覧 */}
          <div className="sm:col-span-2">
            <GiftCodeList codes={GIFT_CODES} />
          </div>
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
            <h3 className="text-md sm:text-lg font-semibold mb-2">2025年7月 衣装・プレアバ ガチャスケジュール</h3>
            <GanttCalendar
              events={GANTT_EVENTS}
              images={eventImages}
              year={GANTT_YEAR}
              month={GANTT_MONTH}
              days={GANTT_DAYS}
            />
          </div>
        </div>
      </section>
    </div>
   </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};