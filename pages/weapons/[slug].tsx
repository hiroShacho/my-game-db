import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import weapons from "../../data/weapons.json";
import skills from "../../data/skills.json";
import matrices from "../../data/matrices.json";
import traits from "../../data/traits.json";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import StarRating from "@/components/StarRating";

const skillCategories = ["通常攻撃", "回避", "スキル", "連携スキル"];
const h2Class =
  "text-base sm:text-lg font-semibold mb-2 border-b-2 border-teal-500 pl-3 relative";
const h2Style = { borderLeft: "8px solid #17e6ff" };

export default function WeaponDetail() {
  const router = useRouter();
  const { slug, q } = router.query;
  const [selectedTab, setSelectedTab] = useState<string>("通常攻撃");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const hasScrolled = useRef(false);

  const weapon = weapons.find((w) => w.slug === String(slug));
  const skillList = weapon
    ? skills.filter(
        (s) =>
          Array.isArray(weapon.skillIds) && weapon.skillIds.includes(s.id)
      )
    : [];

  useEffect(() => {
    if (typeof window === "undefined" || !weapon) return;
    if (!hasScrolled.current && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const skill = skillList.find((s) => s.id === targetId);
      if (skill) {
        const foundCategory = skill.tags.find((tag) =>
          skillCategories.includes(tag)
        );
        if (foundCategory) {
          setSelectedTab(foundCategory);
          setHighlightId(targetId);
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
          hasScrolled.current = true;
        }
      }
    }
    if (typeof q === "string") {
      setKeyword(q.toLowerCase());
    }
  }, [slug, skillList, q, weapon]);

  const filteredSkills = skillList.filter((s) => s.tags.includes(selectedTab));
  const highlightKeyword = (text: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getEmbedUrl = (url: string): string => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  // 評価ボックスの色をPCと合わせる
  const evalBoxStyles = [
    // アタッカー
    "bg-red-100 border-red-300",
    // サポーター
    "bg-green-100 border-green-300",
    // リセマラ
    "bg-yellow-100 border-yellow-300",
    // 探索
    "bg-blue-100 border-blue-300"
  ];

  return (
    <>
      <Head>
        <title>【幻塔攻略】武器詳細 | 幻塔攻略データベース</title>
        <meta
          name="description"
          content="幻塔（Tower of Fantasy）の武器詳細を紹介。"
        />
      </Head>
      <SidebarLayout>
        <div className="max-w-3xl mx-auto space-y-6 px-2 sm:px-6 py-4">
          {!weapon ? (
            <div className="p-4">武器が見つかりません。</div>
          ) : (
            <>
              {/* 武器基本情報・description配置 */}
              <div className="flex flex-row gap-4 items-start flex-wrap">
                {/* モバイル（sm未満）は中央寄せ・descriptionは下に */}
                <div className="w-full block sm:hidden">
                  <div className="flex flex-col items-center justify-center w-full">
                    <img
                      src={`/images/${weapon.id}_img.PNG`}
                      alt={weapon.name}
                      className="w-32 h-32 object-contain"
                    />
                    <h1 className="text-2xl font-bold mt-2 text-center">{weapon.name}</h1>
                    <div className="flex gap-4 items-center justify-center flex-wrap mt-1">
                      <img
                        src={`/images/${weapon.tags.find((tag) =>
                          ["R", "SR", "SSR"].includes(tag)
                        )}.png`}
                        alt="レア度"
                        className="h-6"
                      />
                      <div className="text-center">
                        <img
                          src={`/images/${weapon.tags.find((tag) =>
                            ["強攻", "剛毅", "恩恵"].includes(tag)
                          )}.png`}
                          alt="共鳴"
                          className="h-6"
                        />
                        <div className="text-xs text-center">
                          {weapon.tags.find((tag) =>
                            ["強攻", "剛毅", "恩恵"].includes(tag)
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <img
                          src={`/images/${weapon.tags.find((tag) =>
                            tag.match(/雷|氷|炎|物理|異能/)
                          )}.png`}
                          alt="属性"
                          className="h-6"
                        />
                        <div className="text-xs text-center">
                          {weapon.tags.find((tag) =>
                            tag.match(/雷|氷|炎|物理|異能/)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* descriptionを下に配置。max-w, min-w, word-break対策 */}
                  <div className="flex justify-center mt-4 mb-2 w-full">
                    <div
                      className="bg-white border-2 border-emerald-500/90 shadow-lg rounded-lg px-3 py-2 text-sm text-gray-900 whitespace-pre-line font-semibold w-full max-w-md text-center"
                      style={{
                        minWidth: 0,
                        maxWidth: "340px",
                        wordBreak: "break-word"
                      }}
                    >
                      {weapon.description}
                    </div>
                  </div>
                </div>
                {/* PC/タブレットは従来通り（横並び） */}
                <div className="hidden sm:flex flex-col items-start min-w-[140px] flex-shrink-0">
                  <img
                    src={`/images/${weapon.id}_img.PNG`}
                    alt={weapon.name}
                    className="w-32 h-32 sm:w-32 sm:h-32 object-contain"
                  />
                  <h1 className="text-2xl sm:text-3xl font-bold mt-2">{weapon.name}</h1>
                  <div className="flex gap-4 items-start flex-wrap mt-1">
                    <img
                      src={`/images/${weapon.tags.find((tag) =>
                        ["R", "SR", "SSR"].includes(tag)
                      )}.png`}
                      alt="レア度"
                      className="h-6 sm:h-8"
                    />
                    <div className="text-center">
                      <img
                        src={`/images/${weapon.tags.find((tag) =>
                          ["強攻", "剛毅", "恩恵"].includes(tag)
                        )}.png`}
                        alt="共鳴"
                        className="h-6 sm:h-8"
                      />
                      <div className="text-xs sm:text-sm">
                        {weapon.tags.find((tag) =>
                          ["強攻", "剛毅", "恩恵"].includes(tag)
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <img
                        src={`/images/${weapon.tags.find((tag) =>
                          tag.match(/雷|氷|炎|物理|異能/)
                        )}.png`}
                        alt="属性"
                        className="h-6 sm:h-8"
                      />
                      <div className="text-xs sm:text-sm">
                        {weapon.tags.find((tag) =>
                          tag.match(/雷|氷|炎|物理|異能/)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* PC/タブレット用: description右側（max-width/min-width/word-break対策） */}
                <div className="hidden sm:flex flex-1 min-w-0 items-start">
                  <div
                    className="bg-white border-2 border-emerald-500/90 shadow-lg rounded-lg px-3 py-2 text-sm text-gray-900 whitespace-pre-line font-semibold w-full"
                    style={{
                      minWidth: 0,
                      maxWidth: "340px",
                      wordBreak: "break-word"
                    }}
                  >
                    {weapon.description}
                  </div>
                </div>
              </div>
              {/* タグ */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold mb-2 pl-3 relative">
                  タグ
                </h2>
                <div className="mt-1 flex flex-wrap gap-2">
                  {weapon.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
              {/* 評価点 */}
              <section>
                <h2 className={h2Class} style={h2Style}>
                  評価点
                </h2>
                {(weapon.tags.includes("限定") || weapon.tags.includes("恒常")) && (
                  <div className="text-xs text-gray-600 mb-1">
                    {weapon.tags.includes("限定") && "※限定武器の中での評価です"}
                    {weapon.tags.includes("恒常") && "※恒常武器の中での評価です"}
                  </div>
                )}
                {/* PC表示（総合評価・テーブル） */}
                <div className="hidden sm:flex justify-center items-center mt-3 mb-4">
                  <div className="bg-yellow-200 border-4 border-yellow-400 rounded-lg shadow-lg px-8 py-4 flex flex-col items-center">
                    <span className="text-xl sm:text-2xl font-bold text-yellow-700 mb-2">
                      総合評価
                    </span>
                    <div className="flex items-center">
                      <StarRating score={weapon.ratingScore ?? 0} />
                      <span className="ml-3 text-2xl sm:text-3xl font-bold text-yellow-700">
                        {weapon.ratingScore !== undefined
                          ? weapon.ratingScore
                          : "未登録"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto w-full hidden sm:block">
                  <table className="w-full border border-gray-300 text-center bg-white rounded-lg shadow-sm">
                    <thead>
                      <tr>
                        <th className="border-b border-r border-gray-300 px-2 py-2 bg-red-100 font-semibold">
                          アタッカー評価
                        </th>
                        <th className="border-b border-r border-gray-300 px-2 py-2 bg-green-100 font-semibold">
                          サポーター評価
                        </th>
                        <th className="border-b border-r border-gray-300 px-2 py-2 bg-yellow-100 font-semibold">
                          リセマラ評価
                        </th>
                        <th className="border-b border-gray-300 px-2 py-2 bg-blue-100 font-semibold">
                          探索評価
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-4 border-r border-b border-gray-200 align-top">
                          <div className="flex flex-col items-center justify-center">
                            <StarRating score={weapon.ratingAttacker ?? 0} />
                            <span className="mt-2 text-lg text-gray-700 font-bold">
                              {weapon.ratingAttacker !== undefined
                                ? weapon.ratingAttacker
                                : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4 border-r border-b border-gray-200 align-top">
                          <div className="flex flex-col items-center justify-center">
                            <StarRating score={weapon.ratingSupporter ?? 0} />
                            <span className="mt-2 text-lg text-gray-700 font-bold">
                              {weapon.ratingSupporter !== undefined
                                ? weapon.ratingSupporter
                                : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4 border-r border-b border-gray-200 align-top">
                          <div className="flex flex-col items-center justify-center">
                            <StarRating score={weapon.ratingReroll ?? 0} />
                            <span className="mt-2 text-lg font-bold text-gray-700">
                              {weapon.ratingReroll !== undefined
                                ? weapon.ratingReroll
                                : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4 border-b border-gray-200 align-top">
                          <div className="flex flex-col items-center justify-center">
                            <StarRating score={weapon.ratingExplore ?? 0} />
                            <span className="mt-2 text-lg font-bold text-gray-700">
                              {weapon.ratingExplore !== undefined
                                ? weapon.ratingExplore
                                : "-"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* モバイル専用総合評価 */}
                <div className="sm:hidden w-full">
                  {/* 総合評価（装飾豪華版、キラキラなし、サイズはそのまま） */}
                  <div className="w-full flex justify-center items-center mb-2">
                    <div
                      className="flex flex-col items-center w-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl px-4 py-3 shadow-lg relative"
                      style={{
                        boxShadow:
                          "0 2px 8px 0 rgba(255, 200, 50, 0.15), 0 0 0 4px #ffe06644",
                        borderImage:
                          "linear-gradient(135deg, #ffd700 40%, #fff3cd 100%) 1",
                      }}
                    >
                      {/* 総合評価タイトル */}
                      <span className="text-base font-bold text-yellow-800 mb-1 tracking-wide drop-shadow">
                        総合評価
                      </span>
                      <div className="flex items-center">
                        <StarRating score={weapon.ratingScore ?? 0} />
                        <span className="ml-2 text-xl font-bold text-yellow-700 drop-shadow">
                          {weapon.ratingScore !== undefined
                            ? weapon.ratingScore
                            : "未登録"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 1段目：アタッカー＋サポーター */}
                  <div className="flex w-full gap-2 mb-2">
                    <div className={`flex-1 flex flex-col items-center p-2 border rounded ${evalBoxStyles[0]}`}>
                      <span className="text-xs font-semibold mb-1">アタッカー評価</span>
                      <StarRating score={weapon.ratingAttacker ?? 0} />
                      <span className="mt-1 text-lg font-bold text-gray-700">
                        {weapon.ratingAttacker ?? "-"}
                      </span>
                    </div>
                    <div className={`flex-1 flex flex-col items-center p-2 border rounded ${evalBoxStyles[1]}`}>
                      <span className="text-xs font-semibold mb-1">サポーター評価</span>
                      <StarRating score={weapon.ratingSupporter ?? 0} />
                      <span className="mt-1 text-lg font-bold text-gray-700">
                        {weapon.ratingSupporter ?? "-"}
                      </span>
                    </div>
                  </div>
                  {/* 2段目：リセマラ＋探索 */}
                  <div className="flex w-full gap-2">
                    <div className={`flex-1 flex flex-col items-center p-2 border rounded ${evalBoxStyles[2]}`}>
                      <span className="text-xs font-semibold mb-1">リセマラ評価</span>
                      <StarRating score={weapon.ratingReroll ?? 0} />
                      <span className="mt-1 text-lg font-bold text-gray-700">
                        {weapon.ratingReroll ?? "-"}
                      </span>
                    </div>
                    <div className={`flex-1 flex flex-col items-center p-2 border rounded ${evalBoxStyles[3]}`}>
                      <span className="text-xs font-semibold mb-1">探索評価</span>
                      <StarRating score={weapon.ratingExplore ?? 0} />
                      <span className="mt-1 text-lg font-bold text-gray-700">
                        {weapon.ratingExplore ?? "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {weapon.ratingText ? (
                    <p className="whitespace-pre-wrap">{weapon.ratingText}</p>
                  ) : (
                    <p className="text-gray-500">※コメントは未登録です。</p>
                  )}
                </div>
              </section>
              {/* --- 以下はそのまま --- */}
              <section>
                <h2 className={h2Class} style={h2Style}>運用方法</h2>
                {weapon.strategy ? (
                  <p className="text-xs sm:text-sm text-gray-800 mt-1 whitespace-pre-wrap">
                    {weapon.strategy}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">※運用方法は未登録です。</p>
                )}
              </section>
              <section>
                <h2 className={h2Class} style={h2Style}>凸効果</h2>
                {Array.isArray(weapon.constellations) && weapon.constellations.length > 0 ? (
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-1">
                    {weapon.constellations.map((e, i) => (
                      <li key={i}>
                        <strong>{e.level}</strong>: {e.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    この武器には凸効果が存在しません。
                  </p>
                )}
              </section>
              <section>
                <h2 className={h2Class} style={h2Style}>スキル</h2>
                <div className="flex gap-1 sm:gap-2 mb-2">
                  {skillCategories.map((category: string) => (
                    <button
                      key={category}
                      onClick={() => setSelectedTab(category)}
                      className={`px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm ${
                        selectedTab === category
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      id={skill.id}
                      className={`border p-2 sm:p-3 rounded shadow-sm mb-2 scroll-mt-20 ${
                        highlightId === skill.id ? "bg-yellow-100" : ""
                      }`}
                    >
                      <h3 className="font-bold">
                        {highlightKeyword(skill.name)}
                      </h3>
                      <p className="text-xs sm:text-sm whitespace-pre-wrap">
                        {highlightKeyword(skill.description)}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {skill.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    該当カテゴリのスキルはありません。
                  </p>
                )}
              </section>
              <section>
                <h2 className={h2Class} style={h2Style}>ボリション</h2>
                {weapon.avatar ? (
                  matrices.some((m) => m.avatar === weapon.avatar) ? (
                    <div className="flex flex-col gap-2 mt-2">
                      {matrices
                        .filter((m) => m.avatar === weapon.avatar)
                        .map((matrix) => (
                          <div
                            key={matrix.id}
                            className="border p-2 sm:p-3 rounded shadow-sm"
                          >
                            <Link
                              href={`/matrices/${matrix.id}`}
                              className="flex items-center gap-2 sm:gap-4 mb-1"
                            >
                              <img
                                src={`/images/${matrix.id}_img.PNG`}
                                alt={matrix.name}
                                className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                              />
                              <div className="text-xs sm:text-sm font-semibold">
                                {matrix.name}
                              </div>
                            </Link>
                            <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                              {Array.isArray(matrix.effects) &&
                                matrix.effects.map((e, i) => (
                                  <div key={i}>
                                    <strong>{e.set}:</strong> {e.effect}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500">
                      ※該当するボリションは見つかりませんでした。
                    </p>
                  )
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    ※この武器には対応アバター情報がありません。
                  </p>
                )}
              </section>
              <section>
                <h2 className={h2Class} style={h2Style}>アバター特性</h2>
                {weapon.avatar ? (
                  traits.some((t) => t.avatar === weapon.avatar) ? (
                    <div className="flex flex-col gap-2 mt-2">
                      {traits
                        .filter((t) => t.avatar === weapon.avatar)
                        .map((trait) => (
                          <div
                            key={trait.id}
                            className="border p-2 sm:p-3 rounded shadow-sm"
                          >
                            <Link
                              href={`/trait/${trait.id}`}
                              className="flex items-center gap-2 sm:gap-4 mb-1"
                            >
                              <img
                                src={`/images/${trait.id}_img.PNG`}
                                alt={trait.name}
                                className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                              />
                              <div className="text-xs sm:text-sm font-semibold">
                                {trait.name}
                              </div>
                            </Link>
                            <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line font-mono">
                              {trait.description}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500">
                      ※該当するアバター特性は見つかりませんでした。
                    </p>
                  )
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">
                    ※この武器には対応アバター情報がありません。
                  </p>
                )}
              </section>
              {/* 武器解説動画 */}
              {Array.isArray(weapon.videoUrls) && weapon.videoUrls.length > 0 && (
                <section>
                  <h2 className={h2Class} style={h2Style}>
                    武器解説動画
                  </h2>
                  <div className="flex flex-col gap-4 mt-2">
                    {weapon.videoUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative pb-[56.25%] h-0 overflow-hidden rounded"
                      >
                        <iframe
                          src={getEmbedUrl(url)}
                          title={`${weapon.name} の武器解説動画 ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded"
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}