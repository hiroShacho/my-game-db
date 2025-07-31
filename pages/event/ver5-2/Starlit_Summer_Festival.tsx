import React, { useState } from "react";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";

const SectionTitle = ({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="flex items-center gap-2 mb-2 pl-3"
    style={{
      borderLeft: "8px solid #17e6a7",
      borderBottom: "2.5px solid #17e6a7",
      paddingBottom: 2,
      width: "fit-content",
    }}
  >
    {icon && <span className="text-2xl">{icon}</span>}
    <h2 className="text-lg sm:text-xl font-semibold mb-0">{children}</h2>
  </div>
);

export default function StarlitSummerFestival() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>星光夏祭り | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔 ver5.2 星光夏祭りイベント情報" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        {/* トップバナー */}
        <div className="relative w-full h-40 sm:h-56 rounded-lg overflow-hidden shadow mb-4">
          <Image
            src="/ver_event/New_Event_1.png"
            alt="星光夏祭り"
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg bg-black/60 px-6 py-3 rounded-lg border border-pink-300">
              星光夏祭り
            </span>
          </div>
        </div>

        {/* イベント① 星の花火 */}
        <section>
          <SectionTitle icon="🎆">イベント①：星の花火</SectionTitle>
          <div className="relative w-full h-36 sm:h-48 rounded-lg overflow-hidden shadow mb-4">
            <Image
              src="/ver_event/New_Event_1_1.png"
              alt="星の花火"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="bg-gray-50 border-l-4 border-sky-400 p-4 rounded mb-4 text-sm text-gray-800">
            毎日変わるミッションをクリアすることで暗号化コアを入手。<br />
            この暗号化コアを使用してフィールドのデコーダーでモンスターを召喚、
            これを倒すことでイベントポイントとステッカー・アクセ箱の欠片が手に入るぞ！
          </div>
          {/* 画像全体をやや小さめで表示（max-w-md固定・中央寄せ、object-contain） */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow">
              <Image
                src="/ver_event/New_Event_1_1_1.png"
                alt="ステッカー・アクセ箱の欠片"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2 mb-4">
            ※欠片は毎日獲得上限が増えるタイプなので、無限に欠片を手に入れることはできない
          </div>
        </section>

        {/* イベント② 秩序熱戦 */}
        <section>
          <SectionTitle icon="🔥">イベント②：秩序熱戦</SectionTitle>
          <div className="bg-gray-50 border-l-4 border-sky-400 p-4 rounded mb-4 text-sm text-gray-800">
            バトルコインを使って武器やアルケーを購入して7回の戦闘を乗り越えよう！<br />
            武器は同一のものを購入することでその武器を強化したり、特定の属性・共鳴を集めることで特殊な効果が発動する。
          </div>
          {/* New_Event_1_2_1.pngを大きめ＆クリックで拡大 */}
          <div className="flex justify-center my-2">
            <button
              className="relative w-full max-w-2xl h-60 sm:h-80 rounded-lg overflow-hidden shadow border-2 border-green-400 focus:outline-none"
              style={{ background: "#fff" }}
              type="button"
              aria-label="秩序熱戦を拡大表示"
              onClick={() => setModalOpen(true)}
            >
              <Image
                src="/ver_event/New_Event_1_2_1.png"
                alt="秩序熱戦"
                fill
                className="object-contain w-full h-full transition duration-200 hover:scale-105"
                sizes="(max-width: 1024px) 95vw, 750px"
                priority={false}
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                クリックで拡大
              </span>
            </button>
          </div>
          {/* モーダル拡大表示 */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
              onClick={() => setModalOpen(false)}
              aria-modal="true"
              tabIndex={-1}
            >
              <div
                className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
                  onClick={() => setModalOpen(false)}
                  aria-label="閉じる"
                  type="button"
                >
                  ×
                </button>
                <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
                  <Image
                    src="/ver_event/New_Event_1_2_1.png"
                    alt="秩序熱戦 拡大"
                    fill
                    className="object-contain"
                    style={{ background: "#fff" }}
                    sizes="90vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="bg-gray-50 border-l-4 border-green-400 p-4 rounded mb-4 text-sm text-gray-800">
            コインを溜めてガチャレベルを上げ、強力な武器を購入しよう！<br />
            ルール説明はゲーム内にもあるのでそちらも要チェック！
          </div>
          {/* 全体表示かつやや小さめ（max-w-md） */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow">
              <Image
                src="/ver_event/New_Event_1_2_2.png"
                alt="秩序熱戦の画面"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
          </div>
        </section>

        {/* イベント③ 果敢なサバイバル */}
        <section>
          <SectionTitle icon="🍉">イベント③：果敢なサバイバル</SectionTitle>
          <div className="bg-gray-50 border-l-4 border-green-400 p-4 rounded mb-2 text-sm text-gray-800">
            未開催<br />
            過去のイベント「フルーツショット」と同様の内容と思われる。
          </div>
        </section>

        {/* イベント④ ヤシ島大乱闘 */}
        <section>
          <SectionTitle icon="🏝️">イベント④：ヤシ島大乱闘</SectionTitle>
          <div className="bg-gray-50 border-l-4 border-green-400 p-4 rounded mb-2 text-sm text-gray-800">
            未開催
          </div>
        </section>
      </div>
    </>
  );
}

StarlitSummerFestival.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};