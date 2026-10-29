import { ReactElement, useLayoutEffect, useRef, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import { Modal } from "@/components/maps/Lockhart_shared";
import LockhartEverspringIsland from "@/components/maps/Lockhart_EverspringIsland";
import LockhartEverland from "@/components/maps/Lockhart_Everland";
import LockhartLevitah from "@/components/maps/Lockhart_Levitah";

const islands = [
  {
    id: "EverspringIsland",
    name: "ベルナ島",
    Content: LockhartEverspringIsland,
    activeClass: "bg-pink-500 text-white border-pink-500",
    idleClass: "bg-pink-200 text-pink-900 border-pink-300 hover:bg-pink-300",
  },
  {
    id: "Everland",
    name: "アエテルナ島",
    Content: LockhartEverland,
    activeClass: "bg-sky-500 text-white border-sky-500",
    idleClass: "bg-sky-200 text-sky-900 border-sky-300 hover:bg-sky-300",
  },
  {
    id: "Levitah",
    name: "リヴィタ",
    Content: LockhartLevitah,
    activeClass: "bg-amber-500 text-white border-amber-500",
    idleClass: "bg-amber-200 text-amber-900 border-amber-300 hover:bg-amber-300",
  },
];

export default function KailoBrightonZoneEXpointPage() {
  const [activeId, setActiveId] = useState(islands[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  // 島ごとのスクロール位置（再描画を起こさないよう ref で保持）
  const scrollPositions = useRef<Record<string, number>>({});
  const isFirstRender = useRef(true);

  const active = islands.find((i) => i.id === activeId) ?? islands[0];

  const switchIsland = (nextId: string) => {
    if (nextId === activeId) return;
    scrollPositions.current[activeId] = window.scrollY;
    setActiveId(nextId);
  };

  // 切り替え後、その島の保存済み位置へ戻す（未訪問の島は先頭）
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, scrollPositions.current[activeId] ?? 0);
  }, [activeId]);

  const openModal = (src: string, alt: string) => {
    setModalSrc(src);
    setModalAlt(alt);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalSrc("");
    setModalAlt("");
  };

  return (
    <>
      <Head>
        <title>探索マップ「ロックハート」 | 幻塔攻略データベース</title>
        <meta name="description" content="探索マップ：ロックハート の探索ポイント・掃討リスト等" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 pb-6">
        {/* 付箋風の切り替え。スクロールしても上部に固定 */}
        <div className="sticky top-10 z-40 bg-white pt-3 border-b-4 border-pink-300">
          <div className="flex items-end gap-1 px-1">
            {islands.map((island) => {
              const selected = island.id === active.id;
              return (
                <button
                  key={island.id}
                  type="button"
                  onClick={() => switchIsland(island.id)}
                  className={`flex-1 rounded-t-xl border-2 border-b-0 px-2 text-center font-bold shadow-sm transition-all ${
                    selected
                      ? `${island.activeClass} pt-3 pb-2 text-base`
                      : `${island.idleClass} pt-1.5 pb-1 text-sm`
                  }`}
                >
                  {island.name}
                </button>
              );
            })}
          </div>
        </div>

        <active.Content openModal={openModal} />

        <Modal open={modalOpen} src={modalSrc} alt={modalAlt} onClose={closeModal} />
      </div>
    </>
  );
}

KailoBrightonZoneEXpointPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};