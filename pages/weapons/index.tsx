import { ReactElement, useState, useEffect } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Image from "next/image";
import weapons from "@/data/weapons.json";
import Head from "next/head";
import { useRouter } from "next/router";

// 並び替えタブのラベル
const SORT_TABS = [
  { key: "default", label: "実装順" },
  { key: "rarity", label: "レア度順" },
  { key: "resonance", label: "共鳴順" },
  { key: "trait", label: "特質順" },
  { key: "limited", label: "限定/恒常" },
];

export default function WeaponsPage() {
  const router = useRouter();

  const getSortFromQuery = () => {
    const q = typeof router.query.sort === "string" ? router.query.sort : "";
    if (SORT_TABS.some(tab => tab.key === q)) return q as typeof SORT_TABS[number]["key"];
    return "default";
  };

  const [sortKey, setSortKey] = useState<string>("default");

  useEffect(() => {
    if (!router.isReady) return;
    setSortKey(getSortFromQuery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.sort]);

  const handleSortChange = (key: string) => {
    setSortKey(key);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, sort: key } },
      undefined,
      { shallow: true }
    );
  };

  // クエリがreadyじゃなければnull返す（白画面対策でローディング表示でもOK）
  if (!router.isReady) return null;

  // w_1 ～ w_9（昇順）
  const group1 = weapons
    .filter((w) => /^w_[1-9]$/.test(w.id))
    .sort((a, b) => parseInt(a.id.split("_")[1]) - parseInt(b.id.split("_")[1]));

  // w_10 以降（降順）
  const group2 = weapons
    .filter((w) => /^w_(\d{2,})$/.test(w.id))
    .sort((a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1]));

  let sortedWeapons = [...group2, ...group1];

  // 通常ソート
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

  // 限定/恒常分離
  let limitedWeapons: typeof weapons = [];
  let permanentWeapons: typeof weapons = [];
  if (sortKey === "limited") {
    limitedWeapons = sortedWeapons.filter((w) => w.tags.includes("限定"));
    permanentWeapons = sortedWeapons.filter((w) => w.tags.includes("恒常"));
  }

  return (
   <>
    <Head>
      <title>【幻塔攻略】武器性能一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の武器データ・性能を紹介。" />
    </Head>

    <div className="mx-auto max-w-md px-4">
      <h1 className="text-xl font-bold mb-4">武器一覧</h1>

      {/* 並び替えタブ */}
      <div className="mb-4 flex space-x-2">
        {SORT_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`px-3 py-1 rounded-t ${
              sortKey === tab.key
                ? "bg-blue-500 text-white font-bold shadow"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100"
            } text-sm transition`}
            onClick={() => setSortKey(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 並び順に応じてリスト表示 */}
      {sortKey === "limited" ? (
        // 2カラム（限定・恒常）
        <div className="grid grid-cols-2 gap-4">
          {/* 限定武器 */}
          <div>
            <h2 className="text-sm font-semibold border-b-2 border-pink-400 text-pink-500 mb-2 text-center">限定武器</h2>
            <div className="space-y-4">
              {limitedWeapons.map((weapon) => (
                <WeaponCardVertical key={weapon.id} weapon={weapon} />
              ))}
              {limitedWeapons.length === 0 && <div className="text-xs text-gray-400 text-center">なし</div>}
            </div>
          </div>
          {/* 恒常武器 */}
          <div>
            <h2 className="text-sm font-semibold border-b-2 border-sky-400 text-sky-600 mb-2 text-center">恒常武器</h2>
            <div className="space-y-4">
              {permanentWeapons.map((weapon) => (
                <WeaponCardVertical key={weapon.id} weapon={weapon} />
              ))}
              {permanentWeapons.length === 0 && <div className="text-xs text-gray-400 text-center">なし</div>}
            </div>
          </div>
        </div>
      ) : (
        // 通常 横並びカード
        <div className="space-y-6">
          {sortedWeapons.map((weapon) => (
            <WeaponCardHorizontal key={weapon.id} weapon={weapon} />
          ))}
        </div>
      )}
    </div>
   </>
  );
}

// 横並び（レア度・画像・名前、隣に共鳴と特質）-- 画像サイズUP＆武器名改行防止
function WeaponCardHorizontal({ weapon }: { weapon: any }) {
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
    <div className="flex flex-col sm:flex-row items-center border p-2 sm:p-4 rounded shadow hover:bg-gray-50">
      {/* 左: レア度＋武器画像＋名前 */}
      <div className="flex items-center">
        {/* レア度 */}
        <div className="w-14 flex justify-center mr-2">
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
          className="flex flex-col items-center w-28 sm:w-32"
          style={{ minWidth: "5rem" }}
        >
          <Image
            src={`/images/${weapon.id}_img.PNG`}
            alt={weapon.name}
            width={72}
            height={72}
            className="rounded"
          />
          <span
            className="text-sm sm:text-base text-blue-700 mt-1 hover:underline text-center font-semibold"
            style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "7.5rem" }}
            title={weapon.name}
          >
            {weapon.name}
          </span>
        </Link>
      </div>
      {/* 右: 共鳴＋特質 */}
      <div className="flex flex-row items-center ml-4">
        {resonanceTag && (
          <div className="flex flex-col items-center w-16 sm:w-20 mr-2">
            <Image
              src={`/images/${resonanceTag}.png`}
              alt={resonanceTag}
              width={48}
              height={48}
            />
            <span className="text-xs sm:text-sm mt-1">{resonanceTag}</span>
          </div>
        )}
        <div className="flex space-x-2 sm:space-x-3">
          {traitTags.map((tag) => (
            <div key={tag} className="flex flex-col items-center">
              <Image
                src={`/images/${tag}.png`}
                alt={tag}
                width={48}
                height={48}
              />
              <span className="text-xs sm:text-sm mt-1">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// 縦並び（限定/恒常2カラム用）
function WeaponCardVertical({ weapon }: { weapon: any }) {
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
      className="flex flex-col items-center justify-between border p-2 sm:p-4 rounded shadow hover:bg-gray-50 w-full"
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
}

WeaponsPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};