import SidebarLayout from "@/components/layout/SidebarLayout";
import traits from "@/data/traits.json";
import weapons from "@/data/weapons.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function TraitListPage() {
  // idの数字が大きい順にソート
  const sortedTraits = [...traits].sort(
    (a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1])
  );

  return (
   <>
    <Head>
      <title>【幻塔攻略】アバター特性性能一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）のアバター特性データ・性能を紹介。" />
    </Head>

    <SidebarLayout>
      <div className="px-2 sm:px-8 max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">アバター特性一覧</h1>
        <div className="space-y-4">
          {sortedTraits.map((trait) => {
            const weapon = weapons.find((w) => w.avatar === trait.avatar);
            return (
              <div
                key={trait.id}
                className="flex flex-col sm:flex-row items-center border p-2 sm:p-4 rounded shadow-sm gap-4"
              >
                {/* 画像エリア（リンク付き、青背景を削除して中央配置） */}
                <Link href={`/trait/${trait.id}`} className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
                    <Image
                      src={`/images/${trait.id}_img.PNG`}
                      alt={trait.name}
                      width={80}
                      height={80}
                      className="object-contain rounded"
                    />
                  </div>
                </Link>
                {/* 情報エリア */}
                <div className="flex flex-col justify-center w-full">
                  <Link href={`/trait/${trait.id}`}>
                    <h2 className="text-sm sm:text-base font-semibold text-blue-700 hover:underline mb-1">
                      {trait.name}
                    </h2>
                  </Link>
                  <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line font-mono">{trait.description}</div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {trait.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {weapon && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs sm:text-sm text-gray-500">対応武器:</span>
                      <Link href={`/weapons/${weapon.id}`} className="flex items-center gap-1">
                        <Image
                          src={`/images/${weapon.id}_img.PNG`}
                          alt={weapon.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span className="text-xs sm:text-sm">{weapon.name}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SidebarLayout>
   </>
  );
}