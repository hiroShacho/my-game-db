import { ReactElement, useState, useEffect } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Image from "next/image";
import weapons from "@/data/weapons.json";
import Head from "next/head";
import { useRouter } from "next/router";

const SORT_TABS = [
  { key: "default", label: "実装順" },
  { key: "resonance", label: "共鳴順" },
  { key: "trait", label: "特質順" },
  { key: "limited", label: "限定/恒常" },
];

// 期間ラベルの設定
const PERIOD_LABELS = [
  { from: 1, to: 22, label: "Ver1.0～1.5（アーシャ編）" },
  { from: 23, to: 36, label: "Ver2.0～2.5（ヴェラ編）" },
  { from: 37, to: 50, label: "Ver3.0～3.8（九域編）" },
  { from: 51, to: 60, label: "Ver4.0～4.8（ゴゾトス編）" },
  { from: 61, to: 65, label: "Ver5.0～5.35（キルオ編）" },
];

function getPeriodLabel(idNum: number) {
  for (const period of PERIOD_LABELS) {
    if (idNum >= period.from && idNum <= period.to) {
      return period.label;
    }
  }
  return "";
}

// 期間ごとに武器をグルーピング（最新バージョンが上になるよう逆順）
// w_1～w_9は昇順、w_10以降は降順
function groupWeaponsByPeriod(weaponsList: typeof weapons) {
  const groups: { [period: string]: typeof weapons } = {};
  for (const weapon of weaponsList) {
    const idNum = parseInt(weapon.id.split("_")[1]);
    const period = getPeriodLabel(idNum);
    if (!period) continue;
    if (!groups[period]) groups[period] = [];
    groups[period].push(weapon);
  }
  // PERIOD_LABELSを逆順で返す（最新Verが上）
  // 各グループの中でw_1～w_9は昇順、w_10以降は降順
  return [...PERIOD_LABELS]
    .reverse()
    .map(({ label }) => {
      const ws = groups[label] || [];
      const group1 = ws.filter(w => {
        const idNum = parseInt(w.id.split("_")[1]);
        return idNum >= 1 && idNum <= 9;
      }).sort((a, b) => parseInt(a.id.split("_")[1]) - parseInt(b.id.split("_")[1]));
      const group2 = ws.filter(w => {
        const idNum = parseInt(w.id.split("_")[1]);
        return idNum >= 10;
      }).sort((a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1]));
      return {
        label,
        weapons: [...group2, ...group1],
      };
    })
    .filter((g) => g.weapons.length > 0);
}

// --- 簡易表示用: 表形式で各バージョンごとに武器画像を8個ずつ横並びで表示（大きい枠＋枠付きバージョン表記＋段揃え） ---
function SimpleWeaponTable() {
  const tableGroups = groupWeaponsByPeriod(weapons);
  const IMAGE_SIZE = 48;
  const IMAGES_PER_ROW = 8;
  // バージョン表記（例: "Ver1.0～1.5（アーシャ編）"）を数値と編に分ける
  function extractVersionParts(label: string) {
    const match = label.match(/^Ver([\d\.～]+)（(.+)編）$/);
    return match ? { ver: match[1], arc: match[2] } : { ver: label, arc: "" };
  }

  return (
    <div className="mb-8">
      <div className="border-2 border-blue-400 bg-blue-50 rounded-xl p-4 shadow-md">
        <div className="text-lg font-bold mb-4 text-blue-700 text-center">簡易表示</div>
        <div className="space-y-2"> {/* ← ここを space-y-2 に変更して隙間を小さく */}
          {tableGroups.map((group) => {
            // 8個ずつ分割
            const rows: Array<typeof weapons[0][]> = [];
            for (let i = 0; i < group.weapons.length; i += IMAGES_PER_ROW) {
              rows.push(group.weapons.slice(i, i + IMAGES_PER_ROW));
            }
            // 段数・最大武器数（横幅揃え用）
            const maxRowLength = IMAGES_PER_ROW;
            const versionParts = extractVersionParts(group.label);

            return (
              <div key={group.label} className="mb-2"> {/* ← 各バージョン間の余白を小さく */}
                {rows.map((row, idx) => (
                  <div className="flex items-center mb-0.5" key={idx}> {/* ← 各行の余白も小さく */}
                    {/* 最初の行の左端に枠付きバージョン表記 */}
                    {idx === 0 ? (
                      <div className="flex flex-col items-center justify-center mr-2">
                        <div
                          className="border border-gray-400 rounded-lg px-2 py-1 bg-white text-center min-w-[80px] max-w-[120px] shadow"
                          style={{ boxSizing: "border-box" }}
                        >
                          <span className="block text-xs font-bold text-blue-800">{versionParts.ver}</span>
                          <span className="block text-[0.8rem] text-gray-600">{versionParts.arc}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="min-w-[80px] mr-2"></div>
                    )}
                    {/* 武器画像（リンク）を隙間なく横並び。段の横幅を揃える */}
                    {row.map((weapon) => (
                      <Link href={`/weapons/${weapon.slug}`} key={weapon.id} className="inline-block mx-0">
                        <Image
                          src={`/images/${weapon.id}_img.PNG`}
                          alt={weapon.name}
                          width={IMAGE_SIZE}
                          height={IMAGE_SIZE}
                          className="rounded border border-gray-200 bg-white"
                          style={{ display: "block", margin: 0, padding: 0 }}
                        />
                      </Link>
                    ))}
                    {/* 横幅揃えのための空セル（武器が足りない場合） */}
                    {[...Array(maxRowLength - row.length)].map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        style={{
                          width: IMAGE_SIZE,
                          height: IMAGE_SIZE,
                          display: "inline-block",
                          margin: 0,
                          padding: 0,
                          background: "transparent",
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function WeaponsPage() {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<string>("default");

  // セッションストレージKEY
  const STORAGE_KEY = "weaponListOpenPeriods";

  // 折りたたみ状態管理：periodLabel => boolean
  const [openPeriods, setOpenPeriods] = useState<{ [period: string]: boolean }>({});

  // 展開状態の保存
  const saveOpenPeriods = (periods: { [period: string]: boolean }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
    }
  };

  // 並び替え変更
  const handleSortChange = (key: string) => {
    setSortKey(key);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, sort: key } },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    const q = typeof router.query.sort === "string" ? router.query.sort : "";
    if (SORT_TABS.some(tab => tab.key === q)) {
      setSortKey(q);
    } else {
      setSortKey("default");
    }
  }, [router.query.sort]);

  // 並びロジック
  const group1 = weapons
    .filter((w) => /^w_[1-9]$/.test(w.id))
    .sort((a, b) => parseInt(a.id.split("_")[1]) - parseInt(b.id.split("_")[1]));
  const group2 = weapons
    .filter((w) => /^w_(\d{2,})$/.test(w.id))
    .sort((a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1]));
  let sortedWeapons = [...group2, ...group1];

  if (sortKey === "resonance") {
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

  let limitedWeapons: typeof weapons = [];
  let permanentWeapons: typeof weapons = [];
  if (sortKey === "limited") {
    limitedWeapons = sortedWeapons.filter((w) => w.tags.includes("限定"));
    permanentWeapons = sortedWeapons.filter((w) => w.tags.includes("恒常"));
  }

  // 実装順の場合のみ初期展開状態（セッションストレージ優先・なければ全開）
  useEffect(() => {
    if (sortKey === "default") {
      const saved = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        setOpenPeriods(JSON.parse(saved));
      } else {
        const group = groupWeaponsByPeriod(sortedWeapons);
        const allOpen: { [period: string]: boolean } = {};
        group.forEach((g) => { allOpen[g.label] = true; });
        setOpenPeriods(allOpen);
        saveOpenPeriods(allOpen);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey]);

  // 折りたたみボタンの切り替え
  const togglePeriod = (periodLabel: string) => {
    setOpenPeriods((prev) => {
      const next = { ...prev, [periodLabel]: !prev[periodLabel] };
      saveOpenPeriods(next);
      return next;
    });
  };

  // 実装順のみバージョン区切りごとに折りたたみ（最新バージョンが上）
  function renderCollapsiblePeriods() {
    const groups = groupWeaponsByPeriod(sortedWeapons);
    return groups.map(({ label, weapons }) => (
      <div key={label}>
        <button
          type="button"
          className="w-full flex justify-between items-center bg-gray-100 border-b border-gray-300 py-2 px-3 font-bold text-xs text-gray-700 hover:bg-blue-100 transition"
          onClick={() => togglePeriod(label)}
          aria-expanded={openPeriods[label]}
        >
          <span>{label}</span>
          <span>{openPeriods[label] ? "▲" : "▼"}</span>
        </button>
        <div className={`${openPeriods[label] ? "block" : "hidden"} space-y-6`}>
          {weapons.map((weapon) => (
            <WeaponCardHorizontal key={weapon.id} weapon={weapon} />
          ))}
        </div>
      </div>
    ));
  }

  return (
   <>
    <Head>
      <title>【幻塔攻略】武器性能一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の武器データ・性能を紹介。" />
    </Head>

    <div className="mx-auto max-w-md px-4">
      <h1 className="text-xl font-bold mb-4">武器一覧</h1>

      {/* 簡易表示（追加部分） */}
      <SimpleWeaponTable />

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
            onClick={() => handleSortChange(tab.key)}
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
        // 実装順（折りたたみ区切り）・共鳴順・特質順
        <div className="space-y-6">
          {sortKey === "default"
            ? renderCollapsiblePeriods()
            : sortedWeapons.map((weapon) => (
                <WeaponCardHorizontal key={weapon.id} weapon={weapon} />
              ))
          }
        </div>
      )}
    </div>
   </>
  );
}

// --- 以下はそのまま ---

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
          href={{
            pathname: `/weapons/${weapon.slug}`,
            query: { sort: undefined }
          }}
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
          {traitTags.map((tag: string) => (
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
        href={{
          pathname: `/weapons/${weapon.slug}`,
          query: { sort: undefined }
        }}
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
        {traitTags.map((tag: string) => (
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