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

// 拡大画像モーダル
const Modal = ({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ background: "#fff" }}
            sizes="90vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

export default function TheWildBloom() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

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
        <title>イベント「咲き誇りの刻」 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔 イベント『咲き誇りの刻』イベント内容まとめ" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        {/* トップバナー */}
        <div className="relative w-full h-48 sm:h-72 rounded-lg overflow-hidden shadow mb-4">
          <Image
            src="/ver_event/New_Event_1.png"
            alt="咲き誇りの刻"
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg bg-black/60 px-6 py-3 rounded-lg border border-pink-300">
              咲き誇りの刻
            </span>
          </div>
        </div>

        {/* 救出作戦 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#f0fbfa]">
          <SectionTitle icon="🥕">救出作戦</SectionTitle>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-4 text-sm text-gray-800">
            恒例になってきたニンジンバスケット形式のイベント
          </div>
          <div className="flex justify-center my-3">
            <div className="relative w-full max-w-2xl h-64 sm:h-80 rounded-lg overflow-hidden shadow bg-white cursor-pointer"
              onClick={() => openModal("/ver_event/New_Event_1_1_1.PNG", "救出作戦マップ")}>
              <Image
                src="/ver_event/New_Event_1_1_1.PNG"
                alt="救出作戦マップ"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 1300px) 95vw, 700px"
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                クリックで拡大
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            各マスの効果は対応表を参照<br />
            とりあえず袋入りの栄養補給品を取りまくろう！
          </div>
          <div className="flex justify-center my-3">
            <div className="relative w-full max-w-xl h-44 sm:h-56 rounded-lg overflow-hidden shadow bg-white cursor-pointer"
              onClick={() => openModal("/ver_event/New_Event_1_1_2.PNG", "袋入りの栄養補給品")}>
              <Image
                src="/ver_event/New_Event_1_1_2.PNG"
                alt="袋入りの栄養補給品"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 900px) 95vw, 500px"
              />
              <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                クリックで拡大
              </span>
            </div>
          </div>
        </section>

        {/* 荒野開拓者 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#faf6ef]">
          <SectionTitle icon="🤝">荒野開拓者（未開放）</SectionTitle>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            運命の包囲網形式の協力型PVE<br />
            恐らくボスは女王中
          </div>
        </section>

        {/* 初志の招待状 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#f6faff]">
          <SectionTitle icon="🎫">初志の招待状（未開放）</SectionTitle>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            アイテム提出系のイベント
          </div>
        </section>

        {/* 夢と現実の狭間 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#fff8f4]">
          <SectionTitle icon="🫧">夢と現実の狭間（未開放）</SectionTitle>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            Mi-aになってバブルガンを撃ちあう神イベント
          </div>
        </section>

        {/* 拡大モーダル */}
        <Modal
          open={modalOpen && modalImage !== null}
          onClose={closeModal}
          src={modalImage?.src || ""}
          alt={modalImage?.alt || ""}
        />
      </div>
    </>
  );
}

TheWildBloom.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};