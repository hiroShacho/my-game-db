import Link from "next/link";

export default function InternalLinksBlock() {
  return (
    <div className="my-4">
      <div className="text-xs text-gray-500 mb-1">最新バージョンのコンテンツ</div>
      <ul className="space-y-1">
        <li>
          <Link href="/weapons/TwinStars" className="hover:underline text-blue-700">アストール武器：二重星</Link>
        </li>
        <li>
          <Link href="/matrices/m_58" className="hover:underline text-blue-700">アストールボリション</Link>
        </li>
        <li>
          <Link href="/trait/t_58" className="hover:underline text-blue-700">アストール特性</Link>
        </li>
        <li>
          <Link href="/event/ver5-1/guardian-of-kailo" className="hover:underline text-blue-700">イベント「キルオの守護者」</Link>
        </li>
        <li>
          <Link href="/event/ver5-1/ver5-2_testserver" className="hover:underline text-blue-700">Ver5.2先行テストサーバー</Link>
        </li>
      </ul>
    </div>
  );
}