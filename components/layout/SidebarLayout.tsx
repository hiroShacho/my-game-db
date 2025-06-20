import { ReactNode, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">
      {/* 固定ヘッダー */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* ヘッダー高さ分スペース確保 */}
      <div className="pt-16 flex flex-1 min-w-[1024px]">
        {/* ナビゲーション（左） */}
        <aside className="w-60 bg-gray-100 p-4 border-r overflow-y-auto relative">
          {/* 検索フォーム */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="サイト内検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            />
            <button
              onClick={handleSearch}
              className="mt-2 w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
            >
              検索
            </button>
          </div>

          <hr className="my-2 border-gray-300" />

          <nav className="space-y-2 text-sm">
            <a href="/" className="block hover:text-blue-600">トップ</a>
            <a href="/tag-search" className="block hover:text-blue-600">タグ検索</a>
            <hr className="border-gray-300" />
            <a href="/map/kailo_OreZero_EXpoint" className="block hover:text-blue-600">探索マップ</a>
            <a href="/weapons" className="block hover:text-blue-600">武器一覧</a>
            <a href="/matrices" className="block hover:text-blue-600">ボリション一覧</a>
            <a href="/trait" className="block hover:text-blue-600">アバター特性一覧</a>
            <a href="/relics" className="block hover:text-blue-600">アルケー一覧</a>
          </nav>
        </aside>

        {/* メインコンテンツ（中央） */}
        <main className="relative z-0 flex-1 max-w-4xl p-6 bg-white">
          {children}
        </main>

        {/* 外部リンクと広告スペース（右） */}
        <aside className="w-64 bg-gray-50 p-4 border-l">
          <div className="text-sm text-gray-600 mb-2">幻塔公式リンク</div>
          <div className="flex flex-col items-center space-y-3 mb-6">
            <a href="https://tof.perfectworld.com/jp/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/ToF-official-HOME-icon.PNG"
                alt="公式サイト"
                width={200}
                height={200}
              />
            </a>
            <a href="https://x.com/ToF_JP" target="_blank" rel="noopener noreferrer">
              <Image
                src="/ToF-official-x-icon.PNG"
                alt="公式X"
                width={200}
                height={200}
              />
            </a>
            <a href="https://www.youtube.com/@toweroffantasyJP" target="_blank" rel="noopener noreferrer">
              <Image
                src="/ToF-official-youtube-icon.PNG"
                alt="公式YouTube"
                width={200}
                height={200}
              />
            </a>
          </div>

          <div className="text-sm text-gray-600 mb-2">管理人のSNSリンク</div>
          <div className="flex justify-center">
            <a
              href="https://x.com/hiro28298793"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/x-icon.png"
                alt="X (旧Twitter)"
                width={200}
                height={200}
              />
            </a>
          </div>
          <div className="mb-4 flex justify-center">
            <a
              href="https://www.youtube.com/@hiro_Shacho_ToF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/youtube-icon.png"
                alt="YouTube"
                width={200}
                height={200}
              />
            </a>
          </div>

          <div className="text-sm text-gray-600 mt-6">広告スペース</div>
          <div className="mt-2 h-96 bg-gray-200 text-center flex items-center justify-center">
            Ad
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
