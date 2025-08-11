import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const raids = [
  { key: "ElementAlart", title: "元素警戒", href: "/raid/ElementAlart" },
  { key: "MatrixHacking", title: "マトリックスハッキング", href: "/raid/MatrixHacking" },
  { key: "ScorchingNightmare", title: "燃え上がるナイトメア", href: "/raid/ScorchingNightmare" },
  { key: "TrafficControl", title: "交通管制", href: "/raid/TrafficControl" },
  { key: "SwarmGuard", title: "ガードバグ陣", href: "/raid/SwarmGuard" },
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
          {/* 開催中（マトリックスハッキングに変更） */}
          <Link href="/raid/MatrixHacking" className="group bg-white rounded-lg shadow-lg p-4 hover:-translate-y-1 hover:shadow-2xl transition flex flex-col items-center border-2 border-emerald-400">
            <Image src="/raid/MatrixHacking.PNG" alt="マトリックスハッキング" width={200} height={112} className="rounded mb-2" />
            <span className="text-lg font-bold text-emerald-800 group-hover:text-emerald-600">マトリックスハッキング</span>
            <span className="text-xs text-emerald-700 mt-2 bg-emerald-100 rounded px-2 py-1">開催中</span>
          </Link>
          {/* ガードバグ陣（限定討伐） */}
          <Link href="/raid/SwarmGuard" className="group bg-yellow-50 border-yellow-400 border-2 rounded-lg shadow-lg p-4 hover:-translate-y-1 hover:shadow-2xl transition flex flex-col items-center">
            <Image src="/raid/SwarmGuard.PNG" alt="ガードバグ陣" width={200} height={112} className="rounded mb-2 border border-yellow-300" />
            <span className="text-lg font-bold text-yellow-900 group-hover:text-yellow-700">ガードバグ陣</span>
            <span className="text-xs text-yellow-900 mt-2 bg-yellow-200 rounded px-2 py-1 font-bold">限定討伐</span>
          </Link>
          {/* 他のレイドもカードで追加 */}
        </div>

        {/* ▼アーカイブ/過去の討伐作戦 */}
        <section>
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">過去の討伐作戦アーカイブ</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/raid/ElementAlart"
              className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <Image
                src="/raid/ElementAlart.PNG"
                alt="元素警戒"
                width={120}
                height={68}
                className="rounded mb-1"
                style={{ objectFit: "contain", maxHeight: "60px" }}
              />
              <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">元素警戒<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span></span>
            </Link>
            {/* 追加: マトリックスハッキング（アーカイブ: 元素警戒と燃え上がるナイトメアの間） */}
            <Link
              href="/raid/MatrixHacking"
              className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <Image
                src="/raid/MatrixHacking.PNG"
                alt="マトリックスハッキング"
                width={120}
                height={68}
                className="rounded mb-1"
                style={{ objectFit: "contain", maxHeight: "60px" }}
              />
              <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">
                マトリックスハッキング<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span>
              </span>
            </Link>
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
              href="/raid/TrafficControl"
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
            {/* ガードバグ陣（アーカイブには通常色で追加） */}
            <Link
              href="/raid/SwarmGuard"
              className="group bg-white border-2 border-emerald-400 rounded flex flex-col items-center justify-center h-28 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <Image
                src="/raid/SwarmGuard.PNG"
                alt="ガードバグ陣"
                width={120}
                height={68}
                className="rounded mb-1"
                style={{ objectFit: "contain", maxHeight: "60px" }}
              />
              <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-600">
                ガードバグ陣<br /><span className="text-xs text-emerald-500">(詳細ページへ)</span>
              </span>
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