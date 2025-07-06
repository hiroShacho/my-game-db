import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Image from "next/image";
import weapons from "@/data/weapons.json";
import Head from "next/head";

export default function WeaponsPage() {
  const [sortKey, setSortKey] = useState<"rarity" | "resonance" | "trait" | "default">("default");

  // w_1 ～ w_9（昇順）
  const group1 = weapons
    .filter((w) => /^w_[1-9]$/.test(w.id))
    .sort((a, b) => parseInt(a.id.split("_")[1]) - parseInt(b.id.split("_")[1]));

  // w_10 以降（降順）
  const group2 = weapons
    .filter((w) => /^w_(\d{2,})$/.test(w.id))
    .sort((a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1]));

  let sortedWeapons = [...group2, ...group1];

  if (sortKey === "rarity") {
    const rarityOrder = { SSR: 0, SR: 1, R: 2 };
    sortedWeapons.sort((a, b) => {
      const rA = a.tags.find((t: string) => ["R", "SR", "SSR"].includes(t)) || "SSR";
      const rB = b.tags.find((t: string) => ["R", "SR", "SSR"].includes(t)) || "SSR";
      return rarityOrder[rA as keyof typeof rarityOrder] - rarityOrder[rB as keyof typeof rarityOrder];
    });
  } else if (sortKey === "resonance") {
    const resonanceOrder = { "強攻": 0, "剛毅": 1, "恩恵": 2 };
    sortedWeapons.sort((a, b) => {
      const aTag = a.tags.find((t: string) => Object.keys(resonanceOrder).includes(t));
      const bTag = b.tags.find((t: string) => Object.keys(resonanceOrder).includes(t));
      if (!aTag) return 1;
      if (!bTag) return -1;
      return (resonanceOrder[aTag as keyof typeof resonanceOrder] ?? 99)
         - (resonanceOrder[bTag as keyof typeof resonanceOrder] ?? 99);
    });
  } else if (sortKey === "trait") {
    sortedWeapons.sort((a, b) => {
      const traitA = a.tags.find((tag: string) =>
        ["雷", "氷", "炎", "物理", "雷・氷", "氷・雷", "炎・物理", "物理・炎", "異能"].includes(tag)
      ) || "";
      const traitB = b.tags.find((tag: string) =>
        ["雷", "氷", "炎", "物理", "雷・氷", "氷・雷", "炎・物理", "物理・炎", "異能"].includes(tag)
      ) || "";
      return traitA.localeCompare(traitB, "ja");
    });
  }

  return (
   <>
    <Head>
      <title>【幻塔攻略】武器性能一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の武器データ・性能を紹介。" />
    </Head>

    <div className="mx-auto max-w-md px-4">
      <h1 className="text-xl font-bold mb-4">武器一覧</h1>

      {/* ソートメニュー */}
      <div className="mb-4 text-sm space-x-4">
        <label>
          並び替え：
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="ml-2 px-2 py-1 border text-sm rounded"
          >
            <option value="default">実装順</option>
            <option value="rarity">レア度順</option>
            <option value="resonance">共鳴順</option>
            <option value="trait">特質順</option>
          </select>
        </label>
      </div>

      <div className="space-y-6">
        {sortedWeapons.map((weapon) => {
          const traitTags = weapon.tags.filter((tag: string) =>
            [
              "雷", "氷", "炎", "物理",
              "雷・氷", "氷・雷",
              "炎・物理", "物理・炎",
              "異能"
            ].includes(tag)
          );
          const resonanceTag = weapon.tags.find((tag: string) =>
            ["強攻", "剛毅", "恩恵"].includes(tag)
          );
          const rarityTag = weapon.tags.find((tag: string) =>
            ["R", "SR", "SSR"].includes(tag)
          );

          return (
            <div
              key={weapon.id}
              className="flex flex-col sm:flex-row items-center justify-between border p-2 sm:p-4 rounded shadow hover:bg-gray-50 w-full"
            >
              {/* レア度 */}
              <div className="w-16 flex justify-center mb-2 sm:mb-0">
                {rarityTag && (
                  <Image
                    src={`/images/${rarityTag}.png`}
                    alt={rarityTag}
                    width={48}
                    height={48}
                  />
                )}
              </div>

              {/* 武器画像 + 名前（リンク） */}
              <Link
                href={`/weapons/${weapon.slug}`}
                className="flex flex-col items-center w-24 sm:w-32"
              >
                <Image
                  src={`/images/${weapon.id}_img.PNG`}
                  alt={weapon.name}
                  width={64}
                  height={64}
                  className="rounded"
                />
                <span className="text-xs sm:text-sm text-blue-700 mt-1 hover:underline text-center">
                  {weapon.name}
                </span>
              </Link>

              {/* 共鳴 */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                {resonanceTag && (
                  <>
                    <Image
                      src={`/images/${resonanceTag}.png`}
                      alt={resonanceTag}
                      width={40}
                      height={40}
                    />
                    <span className="text-xs sm:text-sm mt-1">{resonanceTag}</span>
                  </>
                )}
              </div>

              {/* 特質 */}
              <div className="flex space-x-2 sm:space-x-4">
                {traitTags.map((tag) => (
                  <div key={tag} className="flex flex-col items-center">
                    <Image
                      src={`/images/${tag}.png`}
                      alt={tag}
                      width={40}
                      height={40}
                    />
                    <span className="text-xs sm:text-sm mt-1">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
   </>
  );
}

WeaponsPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};