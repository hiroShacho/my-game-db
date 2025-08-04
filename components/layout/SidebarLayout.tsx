import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { AdSenseSidebarUnit } from "@/components/AdSenseSidebarUnit";

const basicNavLinks = [
  { href: "/", label: "トップ" },
  { href: "/tag-search", label: "タグ検索" },
  { href: "/map/kailo_OreZero_EXpoint", label: "探索マップ" },
  { href: "/weapons", label: "武器一覧" },
  { href: "/matrices", label: "ボリション一覧" },
  { href: "/trait", label: "アバター特性一覧" },
  { href: "/relics", label: "アルケー一覧" },
  { href: "/CN_info", label: "大陸版情報", isCn: true }
];

const soloMultiPveLinks = [
  { href: "/raid", label: "討伐作戦" }
];

const latestContentsLinks = [
  { href: "/weapons/AF-010Servion", label: "シードル武器：サーバントAF-010" },
  { href: "/matrices/m_59", label: "シードルボリション" },
  { href: "/trait/t_59", label: "シードル特性" },
  { href: "/event/ver5-2/Starlit_Summer_Festival", label: "イベント「星光夏祭り」" },
  { href: "/raid/SwarmGuard", label: "討伐作戦「ガードバグ陣」" },
];

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
      <div className="flex flex-col items-center mt-1 mb-2">
        <div className="text-xs text-gray-700 mb-1">
          管理人がPC購入に使ったBTOサイト
        </div>
        <a href="https://px.a8.net/svt/ejp?a8mat=459PZA+3ENBEA+34WQ+5YZ75" rel="nofollow" target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
      {/* Skebリンクをここに移動 */}
      <div className="flex flex-col items-center m-0 p-0">
        <a
          href="/skeb"
          className="block text-base font-semibold text-sky-700 underline hover:text-pink-600 transition m-0 p-0"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          Skebで制作リクエストをしたい方へ
        </a>
      </div>
      {/* AdSense広告ユニットをSkebリンクの下に移動 */}
      <div className="text-center flex items-center justify-center rounded m-0 p-0" style={{ margin: 0, padding: 0 }}>
        <AdSenseBanner />
      </div>
      <div className="flex items-center justify-center my-2">
        <AdSenseSidebarUnit />
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

  const [latestOpen, setLatestOpen] = useState(true);
  const [basicOpen, setBasicOpen] = useState(true);
  const [soloMultiOpen, setSoloMultiOpen] = useState(true);

  const sectionBtnBase =
    "w-full flex items-center justify-between font-semibold py-2 px-4 bg-black text-white transition-colors";
  const sectionBtnHover =
    "hover:text-blue-500 hover:underline focus:text-blue-500 focus:underline";

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSidebarOpen(false);
    }
  };

  const renderNavLinks = (links: typeof basicNavLinks) => (
    <ul className="space-y-1">
      {links.map(link =>
        !link.isCn ? (
          <li key={link.href}>
            <a
              href={link.href}
              className="block text-black hover:text-blue-500 hover:underline transition-colors"
            >
              {link.label}
            </a>
          </li>
        ) : (
          <li key={link.href} className="mt-3">
            <a
              href={link.href}
              className="block font-bold text-red-700 hover:text-red-500 transition-colors"
            >
              {link.label}
              <span className="ml-1 text-xs text-gray-400 align-top">(CN、ネタバレ注意)</span>
            </a>
          </li>
        )
      )}
    </ul>
  );

  const renderSoloMultiLinks = () => (
    <ul className="space-y-1">
      {soloMultiPveLinks.map(link => (
        <li key={link.href}>
          <a
            href={link.href}
            className="block text-black hover:text-blue-500 hover:underline transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const renderLatestContentsLinks = () => (
    <ul className="space-y-1">
      {latestContentsLinks.map(link => (
        <li key={link.href}>
          <a
            href={link.href}
            className="block text-black hover:text-blue-500 hover:text-blue-500 hover:underline transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        onSidebarToggle={() => setSidebarOpen(true)}
        showSidebarButton={true}
      />
      {/* モバイルサイドバー */}
      <div>
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
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <span className="font-bold text-lg">メニュー</span>
            <button onClick={() => setSidebarOpen(false)} aria-label="閉じる">
              ×
            </button>
          </div>
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
          <nav className="pb-4">
            <button
              className={`${sectionBtnBase} ${sectionBtnHover}`}
              onClick={() => setLatestOpen(v => !v)}
              aria-expanded={latestOpen}
              aria-controls="latestNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>最新バージョンのコンテンツ</span>
              <span>{latestOpen ? "▲" : "▼"}</span>
            </button>
            <div id="latestNav" className={`${latestOpen ? "block" : "hidden"} pl-4`}>
              {renderLatestContentsLinks()}
            </div>
            <button
              className={`${sectionBtnBase} ${sectionBtnHover} mt-2`}
              onClick={() => setBasicOpen(v => !v)}
              aria-expanded={basicOpen}
              aria-controls="basicNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>基本データ</span>
              <span>{basicOpen ? "▲" : "▼"}</span>
            </button>
            <div id="basicNav" className={`${basicOpen ? "block" : "hidden"} pl-4`}>
              {renderNavLinks(basicNavLinks)}
            </div>
            <button
              className={`${sectionBtnBase} ${sectionBtnHover} mt-2`}
              onClick={() => setSoloMultiOpen(v => !v)}
              aria-expanded={soloMultiOpen}
              aria-controls="soloMultiNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>ソロ・マルチPVE</span>
              <span>{soloMultiOpen ? "▲" : "▼"}</span>
            </button>
            <div id="soloMultiNav" className={`${soloMultiOpen ? "block" : "hidden"} pl-4`}>
              {renderSoloMultiLinks()}
            </div>
          </nav>
          <hr className="border-gray-200 my-2" />
          <div className="px-4 pb-8 overflow-y-auto">
            <SidebarLinksAndAdBlock isMobile />
          </div>
        </aside>
      </div>
      <div className="flex flex-1 w-full">
        <aside className="hidden lg:block lg:w-60 bg-gray-100 border-r pt-16">
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
          <nav className="pb-4">
            <button
              className={`${sectionBtnBase} ${sectionBtnHover}`}
              onClick={() => setLatestOpen(v => !v)}
              aria-expanded={latestOpen}
              aria-controls="latestNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>最新バージョンのコンテンツ</span>
              <span>{latestOpen ? "▲" : "▼"}</span>
            </button>
            <div id="latestNav" className={`${latestOpen ? "block" : "hidden"} pl-4`}>
              {renderLatestContentsLinks()}
            </div>
            <button
              className={`${sectionBtnBase} ${sectionBtnHover} mt-2`}
              onClick={() => setBasicOpen(v => !v)}
              aria-expanded={basicOpen}
              aria-controls="basicNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>基本データ</span>
              <span>{basicOpen ? "▲" : "▼"}</span>
            </button>
            <div id="basicNav" className={`${basicOpen ? "block" : "hidden"} pl-4`}>
              {renderNavLinks(basicNavLinks)}
            </div>
            <button
              className={`${sectionBtnBase} ${sectionBtnHover} mt-2`}
              onClick={() => setSoloMultiOpen(v => !v)}
              aria-expanded={soloMultiOpen}
              aria-controls="soloMultiNav"
              type="button"
              style={{ marginBottom: "2px" }}
            >
              <span>ソロ・マルチPVE</span>
              <span>{soloMultiOpen ? "▲" : "▼"}</span>
            </button>
            <div id="soloMultiNav" className={`${soloMultiOpen ? "block" : "hidden"} pl-4`}>
              {renderSoloMultiLinks()}
            </div>
          </nav>
        </aside>
        <main className="flex-1 px-2 sm:px-4 md:px-8 py-6 max-w-4xl mx-auto bg-white shadow rounded pt-16">
          <Breadcrumb />
          {children}
        </main>
        <aside className="hidden xl:block w-64 bg-gray-50 p-0 border-l pt-16">
          <SidebarLinksAndAdBlock />
        </aside>
      </div>
      <Footer />
    </div>
  );
}