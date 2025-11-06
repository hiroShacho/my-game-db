import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { GanttCalendar, GanttEvent } from "@/components/GanttCalendar";
import { GiftCodeList } from "@/components/GiftCodeList";
import Head from "next/head";
import { raidCards } from "../data/raidCards";
import weapons from "../data/weapons.json";

const pickupWeaponIds = [
  "w_66", "w_62", "w_57", "w_52", "w_58", "w_53", "w_43", "w_60", "w_59",
];

function getWeaponDataById(id: string) {
  return weapons.find((w: any) => w.id === id);
}

function formatWeaponName(name: string, chunkSize = 5) {
  const arr = [];
  for (let i = 0; i < name.length; i += chunkSize) {
    arr.push(name.slice(i, i + chunkSize));
  }
  return arr.join("<br/>");
}

// 高さ指定（pxで数値調整可能）
const raidframeMinHeightPx = 150;
const weaponsframeMinHeightPx = 150;

const GANTT_EVENTS: GanttEvent[] = [
  { label: "アイボリーの艦翼", color: "#9cccf5", labelColor: "#8ee2f8", labelFontColor: "#200", start: 1, end: 25, },
  { label: "マカロンシティ", color: "#9cccf5", labelColor: "#8ee2f8", labelFontColor: "#200", start: 1, end: 25, },
  { label: "復刻ドキドキカーニバルナイト", color: "#f15a22", labelColor: "#8ee2f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：アントリア", color: "#fff400", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：キャロット", color: "#f15a22", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：南音", color: "#000000", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：ネメシス・ヴォイド", color: "#e3a3f8", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：ノーラ", color: "#8e80f8", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, },
  { label: "復刻プレアバ：アンカー", color: "#ff4141", labelColor: "#e3a3f8", labelFontColor: "#200", start: 1, end: 11, }
];

const GANTT_MONTH = 11;
const GANTT_YEAR = 2025;
const GANTT_DAYS = 30;

const eventImages: (string | null)[] = [
  "/ver_event/Outfit_IvoryWing.PNG",
  "/ver_event/Outfit_MacaronTown.PNG",
  "/ver_event/Outfit_HeartbeatCarnivalNight.PNG",
  "/ver_event/Simulacrum_Antoria.PNG",
  "/ver_event/Simulacrum_Carrot.PNG",
  "/ver_event/Simulacrum_NanYin.PNG",
  "/ver_event/Simulacrum_Void.PNG",
  "/ver_event/Simulacrum_Nola.PNG",
  "/ver_event/Simulacrum_Anka_NostalgicMemories.PNG",
];

const GIFT_CODES = [
  { code: "TOF500601", desc: "Discord配布コード", expire: "2025/12/30", },
  { code: "1028nanto", desc: "Ver5.4バージョン引き換えコード", expire: "2025/11/25", }
];

export default function Home() {
  // 討伐はカテゴリ「週討伐」のものを表示
  const weeklyRaid = raidCards.find(r => r.category === "週討伐");
  const pickupWeapons = pickupWeaponIds
    .map(id => getWeaponDataById(id))
    .filter(w => !!w);

  return (
    <>
      <Head>
        <title>【幻塔攻略】トップページ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔（Tower of Fantasy）の攻略・データベースのトップページです。" />
        <link rel="canonical" href="https://tofguideanddb.vercel.app/" />
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
        {/* 今週の討伐作戦・ピックアップ中の武器を横並べ */}
        <section>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* 今週の討伐作戦 */}
            <div className="flex-1 min-w-[220px] flex flex-col">
              <div className="font-bold text-white px-3 py-2 rounded-t-lg" style={{ background: "#222" }}>
                今週の討伐作戦
              </div>
              <div
                className="bg-white rounded-b-lg px-3 py-3 border-2 border-black flex flex-col items-center justify-center"
                style={{ minHeight: `${raidframeMinHeightPx}px` }}
              >
                {weeklyRaid ? (
                  <Link href={weeklyRaid.href} key={weeklyRaid.key}>
                    <div className={`rounded-xl shadow hover:scale-105 transition border-2 ${weeklyRaid.borderColor} cursor-pointer flex flex-col items-center bg-white`} style={{ width: 150 }}>
                      <Image
                        src={weeklyRaid.img.startsWith("/") ? weeklyRaid.img : `/raid/${weeklyRaid.key}.PNG`}
                        alt={weeklyRaid.title}
                        width={140}
                        height={90}
                        className="object-cover rounded-t-xl"
                      />
                      <div className="font-bold text-xs sm:text-sm py-2 text-center">{weeklyRaid.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div className="text-gray-500 py-4">現在表示する週討伐はありません。</div>
                )}
              </div>
            </div>
            {/* ピックアップ中の武器 */}
            <div className="flex-1 min-w-[220px] flex flex-col">
              <div className="font-bold text-white px-3 py-2 rounded-t-lg" style={{ background: "#222" }}>
                ピックアップ中の武器
              </div>
              <div
                className="bg-white rounded-b-lg px-3 py-3 border-2 border-black flex flex-row flex-wrap items-start justify-start"
                style={{ minHeight: `${weaponsframeMinHeightPx}px` }}
              >
                {pickupWeapons.length > 0 ? (
                  pickupWeapons.map((w: any) => (
                    <Link href={`/weapons/${w.slug}`} key={w.id}>
                      <div className="flex flex-col items-center cursor-pointer" style={{ width: 54 }}>
                        <Image
                          src={`/images/${w.id}_img.PNG`}
                          alt={w.name}
                          width={48}
                          height={48}
                          className="object-contain rounded shadow border border-gray-300 bg-white"
                        />
                        <span
                          className="text-xs mt-1 text-black text-center leading-tight"
                          style={{ width: "48px", wordBreak: "break-all" }}
                          dangerouslySetInnerHTML={{ __html: formatWeaponName(w.name, 5) }}
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-gray-500 py-4">現在ピックアップ中の武器はありません。</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 注目コンテンツ */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.4の注目コンテンツ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ver5.4アップデート情報まとめバナー */}
            <Link href="/event/ver5-4/New_ver_info" className="block sm:col-span-2">
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
                  alt="ver5.4アップデート情報まとめ"
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
                    ver5.4アップデート情報まとめ
                  </span>
                </div>
              </div>
            </Link>
            {/* ナントの武器詳細（元のカード形式・CSSで横スクロール防止済み） */}
            <Link href="/weapons/Frostfang" className="block">
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
                    ナント武器：青霜
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    ナントの武器詳細をチェック！
                  </p>
                </div>
              </div>
            </Link>

            {/* ブライトンの救済 */}
            <div className="block sm:col-span-1">
              <Link href="/event/ver5-4/Brighton'sSalvation" className="block">
                <div
                  className="
                    relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                    transition-all duration-200
                    hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-pink-400
                    cursor-pointer focus:outline-none focus:ring-4
                  "
                  style={{
                    backgroundImage: "url('/ver_event/New_Event_TOP.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 p-4">
                    <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                      ブライトンの救済 & ゴーストツアー
                    </h3>
                    <p className="text-sm sm:text-base text-white drop-shadow">
                      イベントミニゲームの詳細をチェック！
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Ver5.5テストサーバー（有効リンク・ホバー効果追加） */}
            <div className="block sm:col-span-1">
              <Link href="/event/ver5-4/ver5-5_testserver" className="block">
                <div
                  className="
                    relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                    transition-all duration-200
                    hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-pink-400
                    cursor-pointer focus:outline-none focus:ring-4
                  "
                  style={{
                    backgroundImage: "url('/ver_event/New_Event_6.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                  }}
                >
                  <div className="absolute inset-0 bg-blue-900/30" />
                  <div className="relative z-10 p-4">
                    <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                      Ver5.5テストサーバー
                    </h3>
                    <p className="text-sm sm:text-base text-white drop-shadow">
                      テストサーバーの詳細をチェック！
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* その他のイベント（準備中） */} 
            <div className="block sm:col-span-1">
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
              <h3 className="text-md sm:text-lg font-semibold mb-2">2025年11月 衣装・プレアバ ガチャスケジュール</h3>
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