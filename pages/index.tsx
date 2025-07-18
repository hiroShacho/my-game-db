import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { GanttCalendar, GanttEvent } from "@/components/GanttCalendar";
import { GiftCodeList } from "@/components/GiftCodeList";
import Head from "next/head";

// Ganttイベント定義
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
  }
];

const GANTT_MONTH = 7;
const GANTT_YEAR = 2025;
const GANTT_DAYS = 31;

const eventImages: (string | null)[] = [
  "/ver_event/Outfit_Meadow Whimsy.PNG",
  "/ver_event/Simulacrum_Anka.PNG",
  "/ver_event/Simulacrum_Plotti.PNG",
  "/ver_event/Simulacrum_Asurada.PNG",
  "/ver_event/Outfit_Seabreeze Whispers.PNG",
  "/ver_event/Outfit_Seaside Vacation.PNG",
];

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

export default function Home() {
  return (
    <>
      <Head>
        <title>【幻塔攻略】トップページ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔（Tower of Fantasy）の攻略・データベースのトップページです。" />
      </Head>
      <div className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden mb-6 shadow-lg">
        <Image
          src="/hero-banner.png" // 任意の目立つ画像を用意
          alt="幻塔メインビジュアル"
          className="object-cover w-full h-full"
          fill
          priority
          sizes="100vw"
          style={{ zIndex: 1, objectPosition: "center bottom" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-6"
          style={{ zIndex: 2 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow mb-2">
            幻塔攻略データベース
          </h1>
          <div className="text-lg sm:text-2xl text-orange-200 font-semibold drop-shadow">
            最新イベント・攻略・ガチャ情報をお届けする㌥！
          </div>
        </div>
      </div>
      <div className="w-full max-w-full min-h-screen space-y-6 px-2 sm:px-6 py-4 overflow-x-hidden">
        {/* サイト紹介 */}
        <section>
          <p className="text-sm sm:text-base text-gray-600">
            本サイトは、幻塔の最新コンテンツ・各種武器等を確認できる非公式の攻略サイトです。
            各種コンテンツの情報は徐々に更新していきます。お待ちくだセい。現在はテストバージョン㌥。
          </p>
        </section>
        {/* NEWS */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 relative">NEWS<span className="absolute left-0 -bottom-1 h-1 w-12 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full"></span></h2>
          <ul className="space-y-1 text-sm sm:text-base text-gray-700">
            <li>・2025/07/18 幻塔アニバーサリー記念投稿イベントのイベント紹介ページを作成しました。</li>
            <li>・2025/07/17 テストサーバーでの新キャラの情報を更新。武器一覧などにも掲載しているのでネタバレが嫌な人は注意。</li>
            <li>･･･</li>
            <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
          </ul>
        </section>
        {/* 注目コンテンツ */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.1の注目コンテンツ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/weapons/TwinStars" className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  hover:scale-105
                  hover:shadow-2xl
                  hover:ring-2 hover:ring-sky-400
                  cursor-pointer
                "
                style={{
                  backgroundImage: "url('/ver_event/New_Character.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "left"
                }}
              >
                {/* オーバーレイ: ホバーで色が濃く */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-200" />
                {/* テキスト部分 */}
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
            <Link href="/event/ver5-1/guardian-of-kailo" className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  hover:scale-105
                  hover:shadow-2xl
                  hover:ring-2 hover:ring-sky-400
                  cursor-pointer
                "
                style={{
                  backgroundImage: "url('/ver_event/New_Event_1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* オーバーレイ: ホバーで色が濃く */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-200" />
                {/* テキスト部分 */}
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    イベント「キルオの守護者」
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    「キルオの守護者」の詳細はこちら
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/event/ver5-1/ver5-2_testserver" className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  hover:scale-105
                  hover:shadow-2xl
                  hover:ring-2 hover:ring-sky-400
                  cursor-pointer
                "
                style={{
                  backgroundImage: "url('/ver_event/New_Event_2_0.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top"
                }}
              >
                {/* オーバーレイ: ホバーで色が濃く */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-200" />
                {/* テキスト部分 */}
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    Ver5.2先行テストサーバー
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    先行テストスタート！新キャラクターなどの情報はこちら！
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/event/ver5-1/Anniversary_Commemorative_Submission" className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  hover:scale-105
                  hover:shadow-2xl
                  hover:ring-2 hover:ring-sky-400
                  cursor-pointer
                "
                style={{
                  backgroundImage: "url('/ver_event/New_Event_3.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top"
                }}
              >
                {/* オーバーレイ: ホバーで色が濃く */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-200" />
                {/* テキスト部分 */}
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    幻塔アニバーサリー記念投稿イベント
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    楽曲「Meant to Be」二次創作企画に参加してみよう！
                  </p>
                </div>
              </div>
            </Link>
            <div className="sm:col-span-2">
              <GiftCodeList codes={GIFT_CODES} />
            </div>
          </div>
          <div className="mt-8 space-y-6">
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
            <div>
              <h3 className="text-md sm:text-lg font-semibold mb-2">公式イベントカレンダー</h3>
              <Image
                src="/official-calendar.png"
                alt="公式カレンダー"
                width={800}
                height={400}
                className="w-full h-auto rounded shadow max-w-full"
                sizes="100vw"
                style={{ maxWidth: "100%" }}
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