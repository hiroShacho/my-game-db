import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed !== "") {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50 shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 py-3 space-y-2 lg:space-y-0">
        {/* 上段：タイトルとハンバーガー */}
        <div className="flex justify-between items-center w-full">
          <div className="text-xl font-bold whitespace-nowrap">
            <Link href="/">幻塔攻略データベース｜Tower of Fantasy</Link>
          </div>
          <button
            className="block lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* PCメニュー + 検索フォーム */}
        <div className="hidden lg:flex justify-between items-center w-full">
          {/* 左側に検索フォーム */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mr-4">
            <input
              name="q"
              type="text"
              placeholder="サイト内検索"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-3 py-1 rounded text-black w-64"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              検索
            </button>
          </form>

          <nav className="flex space-x-4 text-sm">
            <Link href="/" className="hover:text-blue-400">トップ</Link>
            <Link href="/tag-search" className="hover:text-blue-400">タグ検索</Link>
            <Link href="/map/kailo_OreZero_EXpoint" className="hover:text-blue-400">探索マップ</Link>
            <Link href="/weapons" className="hover:text-blue-400">武器一覧</Link>
            <Link href="/matrices" className="hover:text-blue-400">ボリション一覧</Link>
            <Link href="/relics" className="hover:text-blue-400">アルケー一覧</Link>
          </nav>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-700 px-4 py-2 space-y-2 text-sm">
          {/* モバイル検索フォーム */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              name="q"
              type="text"
              placeholder="サイト内検索"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-3 py-1 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              検索
            </button>
          </form>

          <Link href="/" className="block hover:text-blue-300">トップ</Link>
          <Link href="/tag-search" className="block hover:text-blue-300">タグ検索</Link>
          <Link href="/map/kailo_OreZero_EXpoint" className="block hover:text-blue-300">探索マップ</Link>
          <Link href="/weapons" className="block hover:text-blue-300">武器一覧</Link>
          <Link href="/matrices" className="block hover:text-blue-300">ボリション一覧</Link>
          <Link href="/relics" className="block hover:text-blue-300">アルケー一覧</Link>
        </div>
      )}
    </header>
  );
}
