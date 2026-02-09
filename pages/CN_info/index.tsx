import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const cnCharacters = [
  { id: "hipper", name: "シードル", subName: "Hipper" },
  { id: "helen", name: "ヘレンネ", subName: "Helen" },
  { id: "nanto", name: "ナント", subName: "Nanto" },
  { id: "veronica", name: "ヴェロニカ", subName: "Veronica" },
  { id: "lana", name: "ラナ", subName: "Lana" },
  { id: "salidy", name: "サリディ", subName: "Salidy" },
  { id: "grayfox_x", name: "グレイフォックス", subName: "Grayfox" },
  // 今後追加キャラもここに
];

export default function CNInfoIndex() {
  return (
    <>
      <Head>
        <title>【幻塔攻略】大陸版キャラ情報一覧 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）の大陸（CN）版キャラ情報まとめ。グローバル未実装キャラの武器・ボリション・アバター特性などを紹介。" />
      </Head>

      <div className="mx-auto max-w-md px-4">
        <h1 className="text-xl font-bold mb-4">大陸版（CN）キャラクター情報</h1>
        <p className="mb-6 text-gray-700">
          ここでは中国（大陸）版で先行実装されているキャラクターの武器・ボリション・アバター特性などの情報を掲載します。<br />
          ※データは非公式・大陸版の内容であり、グローバル版実装時には変更される可能性があります。(数値は確実に変更になります)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cnCharacters.map((chara) => (
            <Link
              key={chara.id}
              href={`/CN_info/${chara.id}`}
              className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition group relative"
            >
              {/* 背景画像 */}
              <div className="relative w-full h-40">
                <Image
                  src={`/CN_info/${chara.id}_img.PNG`}
                  alt={chara.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="transition group-hover:brightness-90"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                  <span className="text-white text-lg font-bold">{chara.name}</span>
                  {chara.subName && (
                    <span className="text-gray-200 text-sm ml-2">（{chara.subName}）</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

CNInfoIndex.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};