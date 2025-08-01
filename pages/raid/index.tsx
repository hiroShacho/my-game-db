import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const raids = [
  { key: "ScorchingNightmare", title: "燃え上がるナイトメア", href: "/raid/ScorchingNightmare" },
  { key: "TrafficControl", title: "交通管制", href: "/raid/TrafficControl" },
  // 他の討伐作戦...
];

export default function RaidIndexPage() {
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
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow mb-2">討伐作戦一覧</h1>
          <p className="text-white text-base sm:text-lg font-semibold bg-emerald-700/60 px-4 py-1 rounded">
            幻塔の討伐作戦一覧・攻略ページ
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* ▼ナビゲーションカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Link href="/raid/TrafficControl" className="group bg-white rounded-lg shadow-lg p-4 hover:-translate-y-1 hover:shadow-2xl transition flex flex-col items-center border-2 border-emerald-400">
            <Image src="/raid/TrafficControl.PNG" alt="交通管制" width={200} height={112} className="rounded mb-2" />
            <span className="text-lg font-bold text-emerald-800 group-hover:text-emerald-600">交通管制</span>
            <span className="text-xs text-emerald-700 mt-2 bg-emerald-100 rounded px-2 py-1">開催中</span>
          </Link>
          {/* 他のレイドもカードで追加 */}
        </div>

        {/* ▼アーカイブ/過去の討伐作戦 */}
        <section>
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">過去の討伐作戦アーカイブ</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/raid/ScorchingNightmare"
              className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <Image
                src="/raid/ScorchingNightmare.PNG"
                alt="燃え上がるナイトメア"
                width={120}
                height={68}
                className="rounded mb-1"
                style={{ objectFit: "contain", maxHeight: "60px" }}
              />
              <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">燃え上がるナイトメア<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span></span>
            </Link>
            <Link
              href="/raid/Traffic Control"
              className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <Image
                src="/raid/TrafficControl.PNG"
                alt="交通管制"
                width={120}
                height={68}
                className="rounded mb-1"
                style={{ objectFit: "contain", maxHeight: "60px" }}
              />
              <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">交通管制<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span></span>
            </Link>
            {/* 空き枠や新作予定はグレーアウトで表現 */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-28 text-gray-400 font-bold">
              随時追加予定
            </div>
            {/* 他の討伐作戦... */}
          </div>
        </section>
      </div>
    </>
  );
}

RaidIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};