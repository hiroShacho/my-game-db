import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/router";

export default function Header({
  onSidebarToggle,
  showSidebarButton = false,
}: {
  onSidebarToggle?: () => void;
  showSidebarButton?: boolean;
}) {
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
    <header className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <div className="text-lg sm:text-xl font-bold whitespace-nowrap">
          <Link href="/">幻塔攻略データベース｜Tower of Fantasy</Link>
        </div>
        {/* サイドバー用ハンバーガー */}
        {showSidebarButton && (
          <button
            className="block lg:hidden ml-2"
            onClick={onSidebarToggle}
            aria-label="サイドバーを開く"
          >
            <Menu className="w-7 h-7" />
          </button>
        )}
        {/* 検索フォーム（PCのみ） */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2 ml-8">
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
        {/* PCメニュー */}
        <nav className="hidden lg:flex space-x-4 text-sm ml-8">
          <Link href="/" className="hover:text-blue-400">トップ</Link>
          <Link href="/tag-search" className="hover:text-blue-400">タグ検索</Link>
          <Link href="/map/kailo_OreZero_EXpoint" className="hover:text-blue-400">探索マップ</Link>
          <Link href="/weapons" className="hover:text-blue-400">武器一覧</Link>
          <Link href="/matrices" className="hover:text-blue-400">ボリション一覧</Link>
          <Link href="/trait" className="hover:text-blue-400">アバター特性一覧</Link>
          <Link href="/relics" className="hover:text-blue-400">アルケー一覧</Link>
        </nav>
      </div>
    </header>
  );
}