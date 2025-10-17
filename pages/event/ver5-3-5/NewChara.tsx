import { useState } from "react";
import Head from "next/head";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Image from "next/image";
import Link from "next/link";

// --- Ver5.4新武器・ボリション・アバター特性データ ---
const weapon = {
  id: "w_66",
  slug: "Frostfang",
  name: "青霜",
  avatar: "ナント",
  description: "アンフォル集団の前任安全管理部責任者レヴンが主導して開発した高性能ガントレット。彼の指揮下にあった行動正体「青霜」の秘密兵器。皮肉にも、この精密な道具の最初の標的となったのは、創造者自身だった。「静寂の庭」作戦において、ナントは青霜を使い、内通者と断定されたレヴンを自らの手で処刑した。霜は音もなく訪れる。雨や雪のように華やかではないが、一夜にして世界の姿を変えてしまう力を持っている。",
  strategy: "基本的にはスキルを使ったら｛通常2回 ⇒ 通常長押し ⇒ スキル2回 ⇒ スキル長押し｝の動きをループするのが良さそう。",
  ratingScore: 3.5,
  ratingAttacker: 4,
  ratingSupporter: 1,
  ratingReroll: 3,
  ratingExplore: 2,
  ratingText: "物理のメインアタッカー。いわゆる裏ダメージは無く、バフ系の効果は全て常時発動となっている。本人が純粋なアタッカーなのでバフ役目当てで引くのはおススメしない。",
  videoUrls: ["https://youtu.be/cbe8NIEYgiQ"],
  tags: ["限定","SSR","物理・炎","強攻","アタッカー"],
  skillIds: [
    "s_6601",
    "s_6602",
    "s_6603",
    "s_6604",
    "s_6605",
    "s_6606",
    "s_6607",
    "s_6608",
    "s_6609",
    "s_6610",
    "s_6611"
  ],
  constellations: [
    {
      level: "1凸",
      description: "物理ダメージ+5%、スキル「玄宿・潜龍溯淵」発動時に獲得する闘気が60ポイントから120ポイントに増加する。",
      tags: ["物理ダメージUP"]
    },
    {
      level: "2凸",
      description: "現在の武器の攻撃力基本成長率+16%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "3凸",
      description: "通常攻撃-斗宿・見龍のダメージ倍率が1500%に上昇。\n闘気を60ポイント消費するごとに闘気余震を1つ獲得する（最大2つまで）。\nスキル「玄宿・澄空破」発動時に闘気余震を1つ消費して周囲のターゲットに3000%のダメージを与える（このダメージは通常攻撃扱い）。",
      tags: []
    },
    {
      level: "4凸",
      description: "現在の武器の攻撃力基本成長率+32%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "5凸",
      description: "最終与ダメージ+8%。闘気を20ポイント消費するごとに自身の最大HPの5%を回復する。ダメージを受けると10%の被ダメージ減少を獲得し、最大30%まで。30秒間持続。",
      tags: ["最終ダメージUP","回復","被ダメージDOWN"]
    },
    {
      level: "6凸",
      description: "物理属性ダメージ+23%。闘気余震のダメージが6900%まで上昇する。。",
      tags: ["物理ダメージUP"]
    }
  ]
};

const matrix = {
  id: "m_62",
  name: "アウトサイダー",
  avatar: "ナント",
  description: "ナントのボリション（テストサーバー）",
  effects: [
    {
      set: "2セット効果",
      effect: "物理攻撃力+26%/28%/30%/32%。スキル「玄宿・風巻残雲」の第1段のダメージが2400%まで上昇、第2段のダメージが3750%まで上昇する。装備すると常時有効。複数セット装着している場合は★ランクが一番高いセットのみ有効。",
      tags: ["物理攻撃力UP","常時有効"]
    },
    {
      set: "4セット効果",
      effect: "全属性ダメージ+16%/20%/24%/38%。武器「青霜」をセットするとキャラクターは追加で最終ダメージ+14%。装備すると常時有効。複数セット装着している場合は★ランクが一番高いセットのみ有効。",
      tags: ["全属性ダメージUP","最終ダメージUP","常時有効"]
    }
  ],
  ratingComment: "ヘレンネ同様、スキル発動などの条件を必要としない常時発動のバフ効果で火力を底上げしてくれる。欲を言うならボリションか凸効果に裏ダメージがあったらより嬉しかったかも？",
  ratingStars: "3.5"
};

const trait = {
  id: "t_62",
  name: "黒の書",
  avatar: "ナント",
  description: "最終ダメージ+18%。\n武器-青霜をセットすると、物理武器を1本装備するごとに物理与ダメージ+10%。",
  rating: "最大30%の物理ダメージUPが得られる強力な特性。これまで最高峰とされてきたクローディア・ストームアイと同等のバフ量をアタッカーの特性で用意できるのは編成を組みやすくて非常に嬉しい。",
  tags: ["最終ダメージUP", "物理ダメージUP"]
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
        <title>【幻塔攻略】Ver5.4新武器・ボリション・アバター特性まとめ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）Ver5.4新武器・ボリション・アバター特性のテストサーバー先行情報まとめページ。" />
      </Head>
      <SidebarLayout>
        <div className="max-w-3xl mx-auto space-y-8 px-2 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Ver5.4 新武器・ボリション・アバター特性まとめ</h1>
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