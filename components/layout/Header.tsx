import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/router";

export default function Header({
  onSidebarToggle,
}: {
  onSidebarToggle?: () => void;
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
      <div className="flex flex-row items-center justify-between px-3 py-1 relative" style={{ minHeight: 50 }}>
        {/* サイト名 - 左寄せ（mr-autoで右側スペースを広げる） */}
        <div className="text-base sm:text-lg font-bold whitespace-nowrap mr-auto">
          <Link href="/">幻塔攻略データベース｜Tower of Fantasy</Link>
        </div>
        {/* モバイル用メニューボタン（ハンバーガー+下に文字） */}
        <button
          className="lg:hidden flex flex-col items-center bg-blue-600 text-white font-bold py-0.5 px-1 shadow rounded-md mr-2"
          style={{ minWidth: 40 }}
          onClick={onSidebarToggle}
          aria-label="メニューを開く"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold leading-none">メニュー</span>
        </button>
        {/* 検索フォーム（PCのみ） */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2 ml-6">
          <input
            name="q"
            type="text"
            placeholder="サイト内検索"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-2 py-0.5 rounded text-black w-48 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-0.5 rounded hover:bg-blue-600 text-xs"
          >
            検索
          </button>
        </form>
        {/* PCメニュー */}
        <nav className="hidden lg:flex space-x-3 text-xs ml-6">
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