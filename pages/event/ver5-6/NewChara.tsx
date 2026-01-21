import { useState } from "react";
import Head from "next/head";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Image from "next/image";
import Link from "next/link";

// --- Ver5.65新武器・ボリション・アバター特性データ ---
const weapon = {
  id: "w_69",
  slug: "Bloodfin",
  name: "ブラッディ・シャーク",
  avatar: "サリディ",
  description: "手に入らないものは、ぜーんぶ切り刻んじゃえばいいの～",
  strategy: "スキル使用後は通常攻撃を連打すればOK。スキル使用後の10秒間が特に高火力なので、サポーターのバフ等は最初のスキル使用後の10秒間に間に合うようにしよう。",
  ratingScore: 4,
  ratingAttacker: 4.5,
  ratingSupporter: 1,
  ratingReroll: 3,
  ratingExplore: 2.5,
  ratingText: "炎のアタッカーキャラ。耐性無視や回復が揃っていてスキル回しも簡単なのでかなり扱いやすい武器になっている。\n特にボリション2セットの効果でスキル使用後の10秒間の火力がとんでもないことになっているので、ボリションは確実に確保しておきたい。",
  videoUrls: ["https://youtu.be/340d8Q58yf0"],
  tags: ["限定","SSR","炎・物理","強攻","アタッカー"],
  skillIds: [
    "s_6901",
    "s_6902",
    "s_6903",
    "s_6904",
    "s_6905",
    "s_6906",
    "s_6907",
    "s_6908",
    "s_6909",
    "s_6910",
    "s_6911",
    "s_6912",
  ],
  constellations: [
    {
      level: "1凸",
      description: "炎属性ダメージ+8%。\n武器-ブラッディ・シャークのスキルおよび通常攻撃がターゲットに命中すると、ターゲットを有害状態にする。10秒間持続。有害状態のターゲットの与ダメージ-15%。",
      tags: ["炎属性ダメージUP","与ダメージDOWN"]
    },
    {
      level: "2凸",
      description: "現在の武器の攻撃力基本成長率+16%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "3凸",
      description: "全属性耐性を25%無視する（無視する属性耐性の合計値はそれぞれ30%を超えない）。周囲に有害状態の敵が1体以上いる時、炎属性ダメージ+3%。",
      tags: ["全属性耐性無視","耐性無視","炎属性ダメージUP"]
    },
    {
      level: "4凸",
      description: "現在の武器の攻撃力基本成長率+32%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "5凸",
      description: "最終ダメージ+7%。武器-ブラッディ・シャークがターゲットに命中すると、自身の最大HPの6%を回復する。1秒ごとに最大1回発動可能。",
      tags: ["全属性耐性無視","耐性無視","死亡回避"]
    },
    {
      level: "6凸",
      description: "最終ダメージ+26%、炎属性ダメージ+8%。",
      tags: ["最終ダメージUP","炎属性ダメージUP"]
    }
  ]
};

const matrix = {
  id: "m_65",
  name: "狂笑の断面",
  avatar: "サリディ",
  description: "サリディのボリション（テストサーバー）",
  effects: [
    {
      set: "2セット効果",
      effect: "炎属性攻撃力+26%/28%/30%/32%。\nスキル-決死の深呑発動後10秒間、武器-ブラッディ・シャークによる与ダメージ+300%。装備すると常時有効。複数セット装着している場合は★ランクが一番高いセットのみ有効。",
      tags: ["炎属性攻撃力UP","与ダメージUP","常時有効"]
    },
    {
      set: "4セット効果",
      effect: "炎属性ダメージ+22%/26%/30%/34%、武器-ブラッディ・シャーク装備後、炎属性ダメージ+16%。装備すると常時有効。複数セット装着している場合は★ランクが一番高いセットのみ有効。",
      tags: ["炎属性ダメージUP","常時有効"]
    }
  ],
  ratingComment: "与ダメージ+300%。サリディは明らかに2セット効果前提で作られている。",
  ratingStars: "4.5"
};

const trait = {
  id: "t_65",
  name: "人外のフィジカル",
  avatar: "サリディ",
  description: "最終ダメージ+18%。\n「旋回」の体力消費-50%。（移動技のスタミナ消費半減）",
  rating: "おもちゃ",
  tags: ["最終ダメージUP"]
};

type TabType = "weapon" | "matrix" | "trait";

// YouTube埋め込みURL変換関数
const getEmbedUrl = (url: string): string => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export default function Ver52NewCharaPage() {
  const [tab, setTab] = useState<TabType>("weapon");

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.65新武器・ボリション・アバター特性まとめ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）Ver5.65新武器・ボリション・アバター特性のテストサーバー先行情報まとめページ。" />
      </Head>
      <SidebarLayout>
        <div className="max-w-3xl mx-auto space-y-8 px-2 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Ver5.65 新武器・ボリション・アバター特性まとめ</h1>
          <div className="mb-4 flex gap-2">
            <button
              className={`px-4 py-2 rounded font-bold ${tab === "weapon" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTab("weapon")}
            >
              武器
            </button>
            <button
              className={`px-4 py-2 rounded font-bold ${tab === "matrix" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTab("matrix")}
            >
              ボリション
            </button>
            <button
              className={`px-4 py-2 rounded font-bold ${tab === "trait" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTab("trait")}
            >
              アバター特性
            </button>
          </div>

          {/* 武器 */}
          {tab === "weapon" && (
            <section>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <Image
                  src={`/images/${weapon.id}_img.PNG`}
                  alt={weapon.name}
                  width={96}
                  height={96}
                  className="rounded shadow"
                />
                <div className="space-y-2 w-full">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {weapon.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {weapon.tags.map(tag => (
                      <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line mt-2">
                    {weapon.description}
                  </div>
                </div>
              </div>

              {/* 評価テーブル */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-300 text-center bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr>
                      <th className="border-b border-r border-gray-300 px-2 py-2 bg-yellow-100 font-semibold">
                        総合評価
                      </th>
                      <th className="border-b border-r border-gray-300 px-2 py-2 bg-red-100 font-semibold">
                        アタッカー
                      </th>
                      <th className="border-b border-r border-gray-300 px-2 py-2 bg-blue-100 font-semibold">
                        サポーター
                      </th>
                      <th className="border-b border-r border-gray-300 px-2 py-2 bg-green-100 font-semibold">
                        リセマラ
                      </th>
                      <th className="border-b border-gray-300 px-2 py-2 bg-gray-100 font-semibold">
                        探索
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-4 border-r border-b border-gray-200 align-top font-bold text-lg">{weapon.ratingScore}</td>
                      <td className="px-2 py-4 border-r border-b border-gray-200 align-top">{weapon.ratingAttacker}</td>
                      <td className="px-2 py-4 border-r border-b border-gray-200 align-top">{weapon.ratingSupporter}</td>
                      <td className="px-2 py-4 border-r border-b border-gray-200 align-top">{weapon.ratingReroll}</td>
                      <td className="px-2 py-4 border-b border-gray-200 align-top">{weapon.ratingExplore}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 評価コメント */}
              <div className="mb-4 text-sm whitespace-pre-wrap">{weapon.ratingText}</div>
              {/* 解説動画（埋め込み） */}
              {Array.isArray(weapon.videoUrls) && weapon.videoUrls.length > 0 && weapon.videoUrls[0] && (
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow mb-4">
                  <iframe
                    src={getEmbedUrl(weapon.videoUrls[0])}
                    title="性能解説動画"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded"
                  ></iframe>
                </div>
              )}
              {/* 運用方法 */}
              <section className="mb-4">
                <h3 className="font-bold text-base mb-1">運用方法</h3>
                <div className="text-xs sm:text-sm whitespace-pre-wrap">{weapon.strategy}</div>
              </section>
              {/* 凸効果 */}
              <section>
                <h3 className="font-bold text-base mb-1">凸効果</h3>
                {Array.isArray(weapon.constellations) && weapon.constellations.length > 0 ? (
                  <ul className="list-disc list-inside text-xs sm:text-sm mt-1 space-y-1">
                    {weapon.constellations.map((e, i) => (
                      <li key={i}>
                        <strong>{e.level}</strong>: {e.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500">この武器には凸効果が存在しません。</p>
                )}
              </section>
            </section>
          )}

          {/* ボリション */}
          {tab === "matrix" && (
            <section>
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                <Image
                  src={`/images/${matrix.id}_img.PNG`}
                  alt={matrix.name}
                  width={96}
                  height={96}
                  className="rounded shadow"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-1">{matrix.name}</h2>
                  <div className="text-xs sm:text-sm mb-2">{matrix.description}</div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {matrix.effects.map((eff, idx) => (
                  <div key={idx} className="bg-gray-100 p-3 sm:p-4 rounded shadow">
                    <div className="font-semibold text-sm sm:text-base text-gray-700 whitespace-pre-line">{eff.set}</div>
                    <div className="text-sm sm:text-base text-gray-800 whitespace-pre-line">{eff.effect}</div>
                    {eff.tags && eff.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {eff.tags.map((tag, i) => (
                          <span key={i} className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* 評価 */}
              <div className="bg-gray-100 p-3 rounded space-y-1 mb-4">
                <div className="font-semibold text-sm text-gray-700">評価</div>
                <div className="text-yellow-700 font-bold">{matrix.ratingStars}</div>
                <div className="text-sm text-gray-800">
                  {matrix.ratingComment || "評価コメントは準備中です。"}
                </div>
              </div>
            </section>
          )}

          {/* アバター特性 */}
          {tab === "trait" && (
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">{trait.name}（{trait.avatar}）</h2>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-4">
                <div className="flex-shrink-0 flex items-center sm:items-start justify-center sm:justify-center sm:h-full">
                  <div className="w-32 h-32 sm:w-48 sm:h-[250px] flex items-center justify-center">
                    <Image
                      src={`/images/${trait.id}_img.PNG`}
                      alt={`${trait.name}の画像`}
                      width={160}
                      height={160}
                      className="object-contain rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-1 justify-center">
                  <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold mb-1">効果</h2>
                    <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line font-mono">{trait.description}</div>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold mb-1">評価</h2>
                    <p className="text-sm sm:text-base">{trait.rating || '評価は未設定です。'}</p>
                  </div>
                  {trait.tags && trait.tags.length > 0 && (
                    <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
                      <h2 className="text-base sm:text-lg font-semibold mb-1">タグ</h2>
                      <div className="flex flex-wrap gap-2">
                        {trait.tags.map((tag) => (
                          <span key={tag} className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}