import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { raidCards } from "../../data/raidCards";

export default function RaidIndexPage() {
  // raidCardsから区分ごとに1つずつ取得
  const weeklyRaid = raidCards.find(r => r.category === "週討伐");
  const limitedRaid = raidCards.find(r => r.category === "限定討伐");

  const archiveRaids = [
    { key: "BlackJadeWarrior", title: "玄玉凶兵", href: "/raid/BlackJadeWarrior", img: "/raid/BlackJadeWarrior.PNG" },
    { key: "GluttonousFeast", title: "暴食の饗宴", href: "/raid/GluttonousFeast", img: "/raid/GluttonousFeast.PNG" },
    { key: "PrisonofExecution", title: "刑辟牢獄", href: "/raid/PrisonofExecution", img: "/raid/PrisonofExecution.PNG" },
    { key: "MechaSimulation", title: "機兵演習", href: "/raid/MechaSimulation", img: "/raid/MechaSimulation.PNG" },
    { key: "ElementAlart", title: "元素警戒", href: "/raid/ElementAlart", img: "/raid/ElementAlart.PNG" },
    { key: "MatrixHacking", title: "マトリックスハッキング", href: "/raid/MatrixHacking", img: "/raid/MatrixHacking.PNG" },
    { key: "RealmofPhantasm", title: "イリュージョンシフト", href: "/raid/RealmofPhantasm", img: "/raid/RealmofPhantasm.PNG" },
    { key: "PittingPredators", title: "駆虎呑狼の計", href: "/raid/PittingPredators", img: "/raid/PittingPredators.PNG" },
    { key: "ScorchingNightmare", title: "燃え上がるナイトメア", href: "/raid/ScorchingNightmare", img: "/raid/ScorchingNightmare.PNG" },
    { key: "TrafficControl", title: "交通管制", href: "/raid/TrafficControl", img: "/raid/TrafficControl.PNG" },
    { key: "SwarmGuard", title: "ガードバグ陣", href: "/raid/SwarmGuard", img: "/raid/SwarmGuard.PNG" },
    { key: "StellarManhunt", title: "星間包囲", href: "/raid/StellarManhunt", img: "/raid/StellarManhunt.PNG" },
    { key: "CalamityNo5", title: "厄災5号", href: "/raid/CalamityNo5", img: "/raid/CalamityNo5.PNG" },
  ];

  return (
    <>
      <Head>
        <title>討伐作戦ポータル | 幻塔攻略データベース</title>
      </Head>
      {/* ▼ヒーローヘッダー */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-lg shadow mb-6 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-400">
        <Image
          src="/raid/portal_main.PNG"
          alt="討伐作戦イメージ"
          fill
          style={{ objectFit: "cover", opacity: 0.5 }}
          className="pointer-events-none select-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow mb-2">討伐作戦</h1>
          <p className="text-white text-base sm:text-lg font-semibold bg-emerald-700/60 px-4 py-1 rounded">
            討伐作戦一覧・攻略ページ
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* ▼ナビゲーションカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* 週討伐 */}
          <Link
            key={weeklyRaid?.key}
            href={weeklyRaid?.href ?? "/raid/TrafficControl"}
            className="group bg-white rounded-lg shadow-lg p-4 hover:-translate-y-1 hover:shadow-2xl transition flex flex-col items-center border-2 border-emerald-400"
          >
            <Image src={weeklyRaid?.img ?? "/raid/TrafficControl.PNG"} alt={weeklyRaid?.title ?? "交通管制"} width={200} height={112} className="rounded mb-2" />
            <span className="text-lg font-bold text-emerald-800 group-hover:text-emerald-600">
              {weeklyRaid?.title ?? "交通管制"}
            </span>
            <span className="text-xs text-emerald-700 mt-2 bg-emerald-100 rounded px-2 py-1">{weeklyRaid?.status ?? "未開催"}</span>
          </Link>
          {/* 限定討伐 */}
          {limitedRaid?.status === "開催中" ? (
            <Link
              key={limitedRaid.key}
              href={limitedRaid.href}
              className="group bg-white rounded-lg shadow-lg p-4 hover:-translate-y-1 hover:shadow-2xl transition flex flex-col items-center border-2 border-yellow-400"
            >
              <Image src={limitedRaid.img} alt={limitedRaid.title} width={200} height={112} className="rounded mb-2" />
              <span className="text-lg font-bold text-yellow-900 group-hover:text-yellow-700">
                {limitedRaid.title}
              </span>
              <span className="text-xs text-yellow-900 mt-2 bg-yellow-200 rounded px-2 py-1">{limitedRaid.status}</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-yellow-400 rounded-lg shadow-lg h-[184px]">
              <span className="text-sm font-bold text-yellow-900 mb-2">
                限定討伐
              </span>
              <span className="text-sm font-bold text-yellow-900 mb-2">
                {limitedRaid?.status ?? "未開催"}
              </span>
            </div>
          )}
        </div>

        {/* ▼アーカイブ/過去の討伐作戦 */}
        <section>
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">過去の討伐作戦アーカイブ</h2>
          <div className="grid grid-cols-2 gap-4">
            {archiveRaids.map((raid) => (
              <Link
                key={raid.key}
                href={raid.href}
                className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
              >
                <Image
                  src={raid.img}
                  alt={raid.title}
                  width={120}
                  height={68}
                  className="rounded mb-1"
                  style={{ objectFit: "contain", maxHeight: "60px" }}
                />
                <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">
                  {raid.title}<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span>
                </span>
              </Link>
            ))}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-28 text-gray-400 font-bold">
              随時追加予定
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

RaidIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};