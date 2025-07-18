import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import Breadcrumb from "@/components/Breadcrumb";
import InternalLinksBlock from "@/components/InternalLinksBlock";

// サイドバーメニュー構成を共通化
const navLinks = [
  { href: "/", label: "トップ" },
  { href: "/tag-search", label: "タグ検索" },
  { href: "/map/kailo_OreZero_EXpoint", label: "探索マップ" },
  { href: "/weapons", label: "武器一覧" },
  { href: "/matrices", label: "ボリション一覧" },
  { href: "/trait", label: "アバター特性一覧" },
  { href: "/relics", label: "アルケー一覧" },
];

const cnInfoLink = { href: "/CN_info", label: "大陸版情報" };

function SidebarLinksAndAdBlock({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-2 mt-4">幻塔公式SNSリンク</div>
      <div className={`flex flex-col items-center ${isMobile ? "space-y-2 mb-4" : "space-y-3 mb-6"}`}>
        <a href="https://tof.perfectworld.com/jp/" target="_blank" rel="noopener noreferrer">
          <Image src="/ToF-official-HOME-icon.PNG" alt="公式サイト" width={isMobile ? 200 : 180} height={isMobile ? 200 : 180} />
        </a>
        <a href="https://x.com/ToF_JP" target="_blank" rel="noopener noreferrer">
          <Image src="/ToF-official-x-icon.PNG" alt="公式X" width={isMobile ? 200 : 180} height={isMobile ? 200 : 180} />
        </a>
        <a href="https://www.youtube.com/@toweroffantasyJP" target="_blank" rel="noopener noreferrer">
          <Image src="/ToF-official-youtube-icon.PNG" alt="公式YouTube" width={isMobile ? 200 : 180} height={isMobile ? 200 : 180} />
        </a>
      </div>
      <div className="text-sm text-gray-600 mb-2">管理人SNSリンク</div>
      <div className="flex flex-col items-center space-y-2">
        <a href="https://x.com/hiro28298793" target="_blank" rel="noopener noreferrer">
          <Image src="/x-icon.png" alt="X (旧Twitter)" width={isMobile ? 200 : 180} height={isMobile ? 200 : 180} />
        </a>
        <a href="https://www.youtube.com/@hiro_Shacho_ToF" target="_blank" rel="noopener noreferrer">
          <Image src="/youtube-icon.png" alt="YouTube" width={isMobile ? 200 : 180} height={isMobile ? 200 : 180} />
        </a>
      </div>
      <div className="text-sm text-gray-600 mt-4">広告スペース</div>
      {/* バナーを広告スペース見出し直下、AdSenseBannerの上に表示 */}
      <div className="flex flex-col items-center mt-1 mb-2">
        <div className="text-xs text-gray-700 mb-1">
          管理人がPC購入に使ったBTOサイト
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="https://px.a8.net/svt/ejp?a8mat=459PZA+3ENBEA+34WQ+5YZ75" rel="nofollow" target="_blank">
          <img
            src="https://www26.a8.net/svt/bgt?aid=250716358206&wid=001&eno=01&mid=s00000014633001003000&mc=1"
            alt="Sycomバナー"
            width={234}
            height={60}
            style={{ marginBottom: 4, border: "none" }}
          />
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www14.a8.net/0.gif?a8mat=459PZA+3ENBEA+34WQ+5YZ75"
          width={1}
          height={1}
          alt=""
          style={{ display: "none" }}
        />
      </div>
      <div className={`mt-2 ${isMobile ? "h-32" : "h-64"} text-center flex items-center justify-center rounded`}>
        <AdSenseBanner />
      </div>
    </div>
  );
}

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 固定ヘッダー */}
      <Header
        onSidebarToggle={() => setSidebarOpen(true)}
        showSidebarButton={true}
      />

      {/* サイドバー（モバイルはドロワーのみ。PCは非表示） */}
      <div>
        {/* Overlay for mobile sidebar */}
        <div
          className={`fixed inset-0 z-[9998] bg-black bg-opacity-30 transition-opacity duration-200 ${
            sidebarOpen ? "block" : "hidden"
          } lg:hidden`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`
            fixed top-0 left-0 z-[9999] h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:hidden
            overflow-y-auto
          `}
        >
          {/* ドロワーヘッダー（モバイルのみ） */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <span className="font-bold text-lg">メニュー</span>
            <button onClick={() => setSidebarOpen(false)} aria-label="閉じる">
              ×
            </button>
          </div>
          {/* 検索フォーム */}
          <div className="p-4">
            <input
              type="text"
              placeholder="サイト内検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm mb-2"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
            >
              検索
            </button>
          </div>
          <nav className="space-y-2 text-sm px-4 pb-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="block hover:text-blue-600">
                {link.label}
              </a>
            ))}
            {/* 大陸版情報へのリンクを他項目と少し離して */}
            <div className="my-4" />
            <a
              href={cnInfoLink.href}
              className="block font-bold text-red-700 hover:text-red-500"
            >
              {cnInfoLink.label}
              <span className="ml-1 text-xs text-gray-400 align-top">(CN、ネタバレ注意)</span>
            </a>
          </nav>
          <hr className="border-gray-200 my-2" />
          {/* モバイル時だけ下部に外部リンク・広告 */}
          <div className="px-4 pb-8 overflow-y-auto">
            <InternalLinksBlock />
            <SidebarLinksAndAdBlock isMobile />
          </div>
        </aside>
      </div>

      {/* 3カラム構成（PCはヘッダー下でライン揃え） */}
      <div className="flex flex-1 w-full">
        {/* サイドバー（PCのみ） */}
        <aside className="hidden lg:block lg:w-60 bg-gray-100 border-r pt-16">
          {/* 検索フォーム */}
          <div className="p-4">
            <input
              type="text"
              placeholder="サイト内検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm mb-2"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
            >
              検索
            </button>
          </div>
          <nav className="space-y-2 text-sm px-4 pb-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="block hover:text-blue-600">
                {link.label}
              </a>
            ))}
            {/* 大陸版情報へのリンクを他項目と少し離して */}
            <div className="my-4" />
            <a
              href={cnInfoLink.href}
              className="block font-bold text-red-700 hover:text-red-500"
            >
              {cnInfoLink.label}
              <span className="ml-1 text-xs text-gray-400 align-top">(CN、ネタバレ注意)</span>
            </a>
          </nav>
          <div className="px-4 pb-4">
            <InternalLinksBlock />
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 px-2 sm:px-4 md:px-8 py-6 max-w-4xl mx-auto bg-white shadow rounded pt-16">
          <Breadcrumb />
          {children}
        </main>

        {/* 広告・外部リンク（PCのみ） */}
        <aside className="hidden xl:block w-64 bg-gray-50 p-4 border-l pt-16">
          <SidebarLinksAndAdBlock />
        </aside>
      </div>
      <Footer />
    </div>
  );
}