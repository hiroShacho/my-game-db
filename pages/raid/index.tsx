import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// データ一元管理
const raids = [
  { key: "ScorchingNightmare", title: "燃え上がるナイトメア", href: "/raid/ScorchingNightmare" },
  // { key: "AnotherRaid", title: "別の討伐作戦", href: "/raid/AnotherRaid" },
];

// 表示したいkeyをここで選ぶだけ
const currentWeekKeys = ["ScorchingNightmare"];
const limitedKey: string | null = null; // 例: "AnotherRaid"

const PLACEHOLDER_PAST_RAIDS = 6;

export default function RaidIndexPage() {
  const [pastOpen, setPastOpen] = useState(true);

  // 過去の討伐作戦（空き枠埋めあり）
  const filledPastRaids = [
    ...raids,
    ...Array(Math.max(0, PLACEHOLDER_PAST_RAIDS - raids.length)).fill({ placeholder: true }),
  ];

  // 今週・限定討伐を選択
  const weeklyRaids = raids.filter(r => currentWeekKeys.includes(r.key));
  const limitedRaid = limitedKey ? raids.find(r => r.key === limitedKey) : null;

  return (
    <>
      <Head>
        <title>討伐作戦ポータル | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の各種討伐作戦へのリンク・今週/限定討伐情報をまとめたページです。" />
      </Head>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold mb-6">討伐作戦一覧</h1>

        {/* 過去の討伐作戦（折りたたみ） */}
        <section className="mb-8">
          <button
            className="w-full flex justify-between items-center bg-gray-200 rounded px-3 py-2 mb-2 font-semibold text-base focus:outline-none"
            onClick={() => setPastOpen(o => !o)}
            aria-expanded={pastOpen}
            aria-controls="pastRaidsPanel"
            type="button"
          >
            <span>過去の討伐作戦</span>
            <span>{pastOpen ? "▲" : "▼"}</span>
          </button>
          <div id="pastRaidsPanel" className={pastOpen ? "block" : "hidden"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border p-4 bg-white">
              {filledPastRaids.map((raid, idx) =>
                raid.placeholder ? (
                  <div
                    key={`placeholder-${idx}`}
                    className="flex flex-col items-center justify-center border-4 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-400 min-h-[160px]"
                  >
                    <span className="text-lg font-bold">随時追加</span>
                  </div>
                ) : (
                  <Link
                    href={raid.href}
                    key={raid.key}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="flex items-center justify-center border-4 border-green-600 rounded-lg mb-2"
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        minHeight: "110px",
                        background: "white",
                        boxSizing: "border-box",
                      }}
                    >
                      <Image
                        src={`/raid/${raid.key}.PNG`}
                        alt={raid.title}
                        fill={false}
                        width={320}
                        height={180}
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    <div className="w-full text-center">
                      <span className="text-base text-blue-700 font-bold hover:underline">
                        {raid.title}
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* 今週の討伐作戦（画像大きめ） */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">今週の討伐作戦</h2>
          {weeklyRaids.length === 0 ? (
            <div className="text-gray-500">今週の討伐作戦はありません</div>
          ) : (
            <ul className="space-y-6">
              {weeklyRaids.map(raid => (
                <li key={raid.key} className="flex items-center space-x-4">
                  <div className="relative w-44 h-24 flex-shrink-0">
                    <Image
                      src={`/raid/${raid.key}.PNG`}
                      alt={raid.title}
                      fill
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                      sizes="176px"
                    />
                  </div>
                  <Link href={raid.href} className="text-blue-700 font-semibold hover:underline text-lg">
                    {raid.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 限定討伐 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">限定討伐</h2>
          {limitedRaid ? (
            <div className="flex items-center space-x-3">
              <div className="relative w-20 h-12 flex-shrink-0">
                <Image
                  src={`/raid/${limitedRaid.key}.PNG`}
                  alt={limitedRaid.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  sizes="80px"
                />
              </div>
              <Link href={limitedRaid.href} className="text-red-600 font-bold hover:underline">
                {limitedRaid.title}
              </Link>
            </div>
          ) : (
            <div className="text-gray-500">現在開催中の限定討伐はありません</div>
          )}
        </section>
      </div>
    </>
  );
}

// サイドバー付きレイアウトでラップ
RaidIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};