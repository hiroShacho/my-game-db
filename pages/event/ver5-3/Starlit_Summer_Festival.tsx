import React, { useState } from "react";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";

// セクションタイトル
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

// イベントごとの背景色
const eventBgColors = [
  "bg-[#f0fbfa]", // イベント1
  "bg-[#faf6ef]", // イベント2
  "bg-[#f6faff]", // イベント3
  "bg-[#fff8f4]", // イベント4
];

type ModalImage = {
  src: string;
  alt: string;
};

export default function StarlitSummerFestival() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

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
        <section className={`rounded-xl px-2 sm:px-6 py-4 mb-2 shadow ${eventBgColors[0]}`}>
          <SectionTitle icon="🎆">イベント①：星の花火</SectionTitle>
          {/* トップ画像 */}
          <div className="relative w-full h-36 sm:h-48 rounded-lg overflow-hidden shadow mb-4 flex justify-center">
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
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            毎日変わるミッションをクリアすることで暗号化コアを入手。<br />
            この暗号化コアを使用してフィールドのデコーダーでモンスターを召喚、これを倒すことでイベントポイントとステッカー・アクセ箱の欠片が手に入るぞ！
          </div>
          {/* 画像（中央寄せ、白背景＋影） */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow bg-white">
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
          {/* 注意書き（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-xs text-red-600">
            ※欠片は毎日獲得上限が増えるタイプなので、無限に欠片を手に入れることはできない
          </div>
        </section>

        {/* イベント② 秩序熱戦 */}
        <section className={`rounded-xl px-2 sm:px-6 py-4 mb-2 shadow ${eventBgColors[1]}`}>
          <SectionTitle icon="🔥">イベント②：秩序熱戦</SectionTitle>
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            バトルコインを使って武器やアルケーを購入して7回の戦闘を乗り越えよう！<br />
            武器は同一のものを購入することでその武器を強化したり、特定の属性・共鳴を集めることで特殊な効果が発動する。
          </div>
          {/* 拡大画像（中央寄せ、クリックで拡大） */}
          <div className="flex justify-center my-4">
            <div className="relative w-full max-w-2xl h-60 sm:h-80 rounded-lg overflow-hidden shadow bg-white">
              <button
                className="absolute inset-0 w-full h-full focus:outline-none"
                aria-label="秩序熱戦を拡大表示"
                onClick={() =>
                  openModal("/ver_event/New_Event_1_2_1.png", "秩序熱戦")
                }
                style={{ zIndex: 2 }}
              />
              <Image
                src="/ver_event/New_Event_1_2_1.png"
                alt="秩序熱戦"
                fill
                className="object-contain w-full h-full rounded"
                sizes="(max-width: 1024px) 95vw, 750px"
                priority={false}
                style={{ zIndex: 1 }}
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                クリックで拡大
              </span>
            </div>
          </div>
          {/* モーダル */}
          {modalOpen && modalImage && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
              onClick={closeModal}
              aria-modal="true"
              tabIndex={-1}
            >
              <div
                className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
                  onClick={closeModal}
                  aria-label="閉じる"
                  type="button"
                >
                  ×
                </button>
                <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
                  <Image
                    src={modalImage.src}
                    alt={modalImage.alt}
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
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            コインを溜めてガチャレベルを上げ、強力な武器を購入しよう！<br />
            ルール説明はゲーム内にもあるのでそちらも要チェック！
          </div>
          {/* 画面画像（中央寄せ） */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow bg-white">
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
        <section className={`rounded-xl px-2 sm:px-6 py-4 mb-2 shadow ${eventBgColors[2]}`}>
          <SectionTitle icon="🍉">イベント③：果敢なサバイバル</SectionTitle>
          {/* トップ画像 */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_3.png"
                alt="果敢なサバイバル"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
          </div>
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            過去のイベント「フルーツショット」とゲーム内容は同じ。<br />
            Mi-aがピョンピョン飛び跳ねたりしゃがむ姿がキュート㌥
          </div>
          {/* 画像2枚横並び（拡大対応・やや大きく） */}
          <div className="flex flex-row gap-4 mt-2 w-full justify-center">
            <div className="relative w-52 h-36 sm:w-72 sm:h-48 rounded-lg overflow-hidden shadow bg-white">
              <button
                className="absolute inset-0 w-full h-full focus:outline-none"
                aria-label="称号画像1を拡大"
                onClick={() =>
                  openModal("/ver_event/New_Event_1_3_2.png", "2分称号画像1")
                }
                style={{ zIndex: 2 }}
              />
              <Image
                src="/ver_event/New_Event_1_3_2.png"
                alt="2分称号画像1"
                fill
                className="object-contain w-full h-full rounded"
                sizes="(max-width: 768px) 50vw, 300px"
                priority={false}
                style={{ zIndex: 1 }}
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                クリックで拡大
              </span>
            </div>
            <div className="relative w-52 h-36 sm:w-72 sm:h-48 rounded-lg overflow-hidden shadow bg-white">
              <button
                className="absolute inset-0 w-full h-full focus:outline-none"
                aria-label="称号画像2を拡大"
                onClick={() =>
                  openModal("/ver_event/New_Event_1_3_3.png", "2分称号画像2")
                }
                style={{ zIndex: 2 }}
              />
              <Image
                src="/ver_event/New_Event_1_3_3.png"
                alt="2分称号画像2"
                fill
                className="object-contain w-full h-full rounded"
                sizes="(max-width: 768px) 50vw, 300px"
                priority={false}
                style={{ zIndex: 1 }}
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                クリックで拡大
              </span>
            </div>
          </div>
          {/* モーダル（称号画像用も共用） */}
          {modalOpen && modalImage && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
              onClick={closeModal}
              aria-modal="true"
              tabIndex={-1}
            >
              <div
                className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
                  onClick={closeModal}
                  aria-label="閉じる"
                  type="button"
                >
                  ×
                </button>
                <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
                  <Image
                    src={modalImage.src}
                    alt={modalImage.alt}
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
          {/* ポイント（白＋左緑線、中央寄せ、やや大きめ） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-2 mt-4 text-xs text-emerald-800 font-semibold w-full max-w-md mx-auto text-center">
            2分耐久で称号を獲得できるぞ！
          </div>
          {/* 下部画像＋キャプション */}
          <div className="flex flex-col items-center my-2">
            <div className="relative w-full max-w-md h-44 sm:h-64 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_3_1.png"
                alt="色んなMi-aが見れるキュートなミニゲーム"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">
              色んなMi-aが見れるキュートなミニゲーム
            </span>
          </div>
        </section>

        {/* イベント④ ヤシ島大乱闘 */}
        <section className={`rounded-xl px-2 sm:px-6 py-4 mb-2 shadow ${eventBgColors[3]}`}>
          <SectionTitle icon="🏝️">イベント④：ヤシ島大乱闘</SectionTitle>
          {/* トップ画像 */}
          <div className="flex justify-center my-2">
            <div className="relative w-full max-w-md h-40 sm:h-56 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_4.png"
                alt="ヤシ島大乱闘"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
          </div>
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            マッチングしたらカードを3枚獲得できる。<br />
            ゲームでは自身のいる島から飛び移る島の方向を決めて、他の人と被らなければ島にあるヤシの実を獲得できる。<br />
            被るとお互いヤシの実を手に入れられないので、基本は誰とも被らないところを狙ってヤシの実を稼ごう。
          </div>
          {/* ギミック画像＋キャプション */}
          <div className="flex flex-col items-center my-4">
            <div className="relative w-full max-w-md h-44 sm:h-64 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_4_1.png"
                alt="ヤシ島大乱闘 ギミック"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 95vw, 400px"
                priority={false}
              />
            </div>
            <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-2 mt-2 text-xs text-gray-600 w-full max-w-md text-center">
              被るとお互い何も得られないぞ！
            </div>
          </div>
          {/* 本文（白＋左緑線） */}
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            最初に貰ったカードには様々な効果があり、飛び移る方向を選ぶ際にカードを選択することでその効果を使用できる。<br />
            ヤシの実を追加で獲得できるカードは他の人と被った際には効果が無いので注意しよう。
          </div>
        </section>
      </div>
    </>
  );
}

StarlitSummerFestival.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};