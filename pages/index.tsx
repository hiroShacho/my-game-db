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
    label: "新コスチューム：海塩スターコーデ",
    color: "#9ccffc",
    labelColor: "#9ccffc",
    labelFontColor: "#200",
    start: 1,
    end: 28,
  },
  {
    label: "復刻コスチューム：オリジナル・サマー",
    color: "#9cccf5",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 1,
    end: 12,
  },
  {
    label: "復刻コスチューム：きらめきインニス",
    color: "#9ccccf",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 12,
    end: 28,
  },
  {
    label: "新プレアバ：シードル",
    color: "#8ffff0",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 28,
  },
  {
    label: "復刻プレアバ：榴火",
    color: "#ff4141",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 12,
  },
  {
    label: "復刻プレアバ：篁",
    color: "#e3a3f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 12,
  },
  {
    label: "復刻プレアバ：凌寒",
    color: "#8e80f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 12,
  },
  {
    label: "復刻プレアバ：フィオナ",
    color: "#4e80f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 12,
  },
  {
    label: "復刻プレアバ：ノーラ",
    color: "#ae80f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 12,
    end: 28,
  },
  {
    label: "復刻プレアバ：凛夜",
    color: "#83e28f",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 12,
    end: 28,
  }
];

const GANTT_MONTH = 8;
const GANTT_YEAR = 2025;
const GANTT_DAYS = 31;

const eventImages: (string | null)[] = [
  "/ver_event/Outfit_Cosmic Coast.PNG",
  "/ver_event/Outfit_Summer Special.PNG",
  "/ver_event/Outfit_Innarsian Fashion.PNG",
  "/ver_event/Simulacrum_Hipper.PNG",
  "/ver_event/Simulacrum_Liu.PNG",
  "/ver_event/Simulacrum_Mimi.PNG",
  "/ver_event/Simulacrum_Linghan.PNG",
  "/ver_event/Simulacrum_Fiona.PNG",
  "/ver_event/Simulacrum_Nola.PNG",
  "/ver_event/Simulacrum_Lin.PNG",

];

const GIFT_CODES = [
  {
    code: "TOF500601",
    desc: "Discord配布コード",
    expire: "2025/12/30",
  },
  {
    code: "dream729",
    desc: "ver5.2バージョン引き換えコード",
    expire: "2025/08/28",
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>【幻塔攻略】トップページ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔（Tower of Fantasy）の攻略・データベースのトップページです。" />
        {/* ▼▼▼ 追加 ▼▼▼ */}
        <link rel="canonical" href="https://tofguideanddb.vercel.app/" />
        {/* ▲▲▲ 追加 ▲▲▲ */}
      </Head>
      <div className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden mb-6 shadow-lg">
        <Image
          src="/hero-banner.png"
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
            各種コンテンツの情報は徐々に更新していきます。
          </p>
        </section>

        {/* NEWS */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 relative">NEWS
            <span className="absolute left-0 -bottom-1 h-1 w-12 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full"></span>
          </h2>
          <ul className="space-y-1 text-sm sm:text-base text-gray-700">
            <li>・2025/08/27 連合作戦「地核深焔」のページを作成。</li>
            <li>・2025/08/26 連合作戦「ロストバレー」のページを作成。大陸版新キャラクターの情報を更新。</li>
            <li>･･･</li>
            <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
          </ul>
        </section>
        {/* 注目コンテンツ */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.2の注目コンテンツ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ver5.2アップデート情報まとめバナー */}
            <Link href="/event/ver5-2/New_ver_info" className="block sm:col-span-2">
              <div
                className="
                  relative rounded-lg shadow-lg h-48 sm:h-64 flex items-center justify-center overflow-hidden group
                  transition-all duration-200
                  hover:scale-105 hover:shadow-2xl
                  hover:ring-4 hover:ring-pink-400
                  border-4 border-cyan-400
                  cursor-pointer
                "
                style={{
                  background: "linear-gradient(90deg, #4eeef8 0%, #f8b64e 100%)"
                }}
              >
                <Image
                  src="/ver_event/New_ver_top.png"
                  alt="ver5.2アップデート情報まとめ"
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center" }}
                  priority
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                {/* 横線デザイン */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(32)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full h-[2px] bg-white/30"
                      style={{
                        top: `${(100 / 33) * (i + 1)}%`
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg bg-black/75 px-6 py-3 rounded-lg border border-pink-300">
                    ver5.2アップデート情報まとめ
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/weapons/AF-010Servion" className="block">
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
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-200" />
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    シードル
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    シードルの武器詳細をチェック
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/event/ver5-2/Starlit_Summer_Festival" className="block">
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
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-200" />
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    イベント「星光夏祭り」
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    「星光夏祭り」の詳細はこちら
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/event/ver5-2/ver5-3_testserver" className="block">
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
                  backgroundImage: "url('/ver_event/New_Event_2.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    Ver5.3先行テストサーバー
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    公式Discordで募集開始！<br />
                    詳細・最新情報はこちら
                  </p>
                </div>
              </div>
            </Link>
            <div className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  cursor-default
                "
                style={{
                  backgroundImage: "url('/ver_event/Event_pre_img.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top"
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    その他のイベント
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    準備中
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <GiftCodeList codes={GIFT_CODES} />
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-md sm:text-lg font-semibold mb-2">2025年8月 衣装・プレアバ ガチャスケジュール</h3>
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