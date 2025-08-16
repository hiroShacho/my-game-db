import { useState } from "react";
import Head from "next/head";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Image from "next/image";
import Link from "next/link";

// --- Ver5.2新武器・ボリション・アバター特性データ ---
const weapon = {
  id: "w_64",
  slug: "EternalSalvation",
  name: "ホーリージャッジメント",
  avatar: "ラクシス",
  description: "優しい光を放つ巨大な鎌。生きる希望を断ち切るよりも、死の繋がりを断ち切ることを望んでいる。",
  strategy: "炎強攻編成ではスキル使用後に通常攻撃5段と通常長押しのシャドーアタックから通常長押しで派生する3種のチャージ攻撃の愛の狂想、虹色の波、輝光インパクトで火力を出す。\nチャージ攻撃は使用するたびに次の段階が解放される形式になっている。スキル使用後は武器3凸未満では通常5段×1回とチャージ攻撃3回、武器3凸からは通常5段×2回とチャージ攻撃2回で回しを構築することになる。\nスキル・通常攻撃は追尾性能が高めなので問題ないが、チャージ攻撃はそこまで追尾してくれない上に外すとチャージ時間ごとDPSが下がることになるので癖は強めかも。",
  ratingScore: 4,
  ratingAttacker: 3.5,
  ratingSupporter: 4.5,
  ratingReroll: 4,
  ratingExplore: 0,
  ratingText: "限定で初の炎・恩恵武器。炎強攻編成ではメインアタッカーを努め、恩恵では編成に入れているだけで仕事をしてくれる。というより味方への回復・バフ効果が全てお供のコハルビに搭載されているので、ラクシスの武器本体で回復・バフを撒くことはできない。バフについては武器5凸とボリション4セットに効果が付いているので、恩恵で採用する場合にはそれなりにリソースをつぎ込む必要がある(ボリションは無凸でOK)。",
  videoUrls: ["https://youtu.be/CWW446lx_UI"],
  tags: ["限定","SSR","炎・物理","恩恵","アタッカー/サポーター"],
  skillIds: [
    "s_6401",
    "s_6402",
    "s_6403",
    "s_6404",
    "s_6405",
    "s_6406",
    "s_6407",
    "s_6408",
    "s_6409",
    "s_6410"
  ],
  constellations: [
    {
      level: "1凸",
      description: "最終ダメージ+9%。コハルビの攻撃光線がターゲットに現在の属性攻撃力×21%の炎ダメージを与える。武器-ホーリージャッジメントで通常攻撃を行う、もしくは回避が成功するたび、自身のHPが2%回復する。",
      tags: ["最終ダメージUP","回復"]
    },
    {
      level: "2凸",
      description: "現在の武器の攻撃力基本成長率+16%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "3凸",
      description: "スキル-断ち切る！心の鎖発動中は、直接スキル-虹色の波を開放し、合計で2回特殊攻撃を発動できる。コハルビの回復でオーバーした分はシールドに転換される(最大HP×30%相当分まで)。",
      tags: ["HPシールド"]
    },
    {
      level: "4凸",
      description: "現在の武器の攻撃力基本成長率+32%。",
      tags: ["基本成長率UP"]
    },
    {
      level: "5凸",
      description: "最終ダメージ+9%。コハルビの光線の発射間隔が3秒に短縮される。恩恵共鳴発動時、コハルビの光線に当たったターゲットは衆心激昂効果を付与される。全属性ダメージ+22%、5秒間持続(スタック不可)。",
      tags: ["最終ダメージUP","全属性ダメージUP","チームバフ"]
    },
    {
      level: "6凸",
      description: "炎ダメージ+26%。恩恵共鳴発動時、スキル-リップ・ザ・シャドー、スキル-愛の狂想、スキル-虹色の波、スキル-輝光インパクトが、HPを16%未満のモンスターを瞬殺する。",
      tags: ["炎ダメージUP","斬殺"]
    }
  ]
};

const matrix = {
  id: "m_60",
  name: "命のフーガ",
  avatar: "ラクシス",
  description: "ラクシスのボリション（テストサーバー）",
  effects: [
    {
      set: "2セット効果",
      effect: "全属性の攻撃力+26%/28%/30%/32%。スキル-輝光インパクトのダメージ係数が19,075%までアップし、回復効果+25%。装備すると常時有効。複数セット装着している場合は★ランクが一番高いセットのみ有効。",
      tags: ["全属性攻撃力UP","回復量UP","常時有効"]
    },
    {
      set: "4セット効果",
      effect: "武器-ホーリージャッジメント装備時、最終ダメージ+18%/22%/26%/30%。恩恵共鳴でない場合、追加で全属性のダメージ+16%。恩恵共鳴発動中は仲間にハートライト効果を付与する(仲間の攻撃力に、自身の一番強い属性の基礎攻撃力/200000を上乗せ。最終ダメージ×30%を上限とする)。",
      tags: ["最終ダメージUP","全属性ダメージUP","チームバフ","常時有効"]
    }
  ],
  ratingComment: "無条件で全属性攻撃力UPという中々の無法っぷり。4セット効果の味方へのバフは基礎攻撃力6万で最大になる。恩恵でラクシスを採用するのであれば無凸4セットで良いので確保したい。",
  ratingStars: "4.5"
};

const trait = {
  id: "t_60",
  name: "新生",
  avatar: "ラクシス",
  description: "最終ダメージ+18%。\n武器-ホーリージャッジメント装備時、炎ダメージ+7%。恩恵共鳴でない場合、自身の最終ダメージ+7%。恩恵共鳴発動中は自身の全属性の攻撃力+10,000。",
  rating: "炎強攻はヴォイド特性よりこちらを優先して良さそう。恩恵はラクシスのボリション4セットやフィオナのリンクを強化できるので相性は良いが、他の味方にバフを配れる特性の方が効果量は大きいので優先度は低い。(ラクシス特性でUPするボリ4セットのバフ量は最終ダメージ+5%だが、ブレヴィ特性は最終ダメージ+6%、グレイフォックス特性は最終ダメージ+10%)",
  tags: ["最終ダメージUP", "炎ダメージUP","全属性攻撃力UP"]
};

type TabType = "weapon" | "matrix" | "trait";

export default function Ver52NewCharaPage() {
  const [tab, setTab] = useState<TabType>("weapon");

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.2新武器・ボリション・アバター特性まとめ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）Ver5.2新武器・ボリション・アバター特性のテストサーバー先行情報まとめページ。" />
      </Head>
      <SidebarLayout>
        <div className="max-w-3xl mx-auto space-y-8 px-2 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Ver5.2 新武器・ボリション・アバター特性まとめ</h1>
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
              {/* 解説動画 */}
              {Array.isArray(weapon.videoUrls) && weapon.videoUrls.length > 0 && weapon.videoUrls[0] && (
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/CWW446lx_UI`}
                    title="ホーリージャッジメント性能解説動画"
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
              {/* 対応武器へのリンク */}
              <div className="text-center mt-4 space-y-2">
                <Link href={`/weapons/${weapon.slug}`}>
                  <Image
                    src={`/images/${weapon.id}_img.PNG`}
                    alt={`${weapon.name}の画像`}
                    width={80}
                    height={80}
                    className="rounded mx-auto hover:opacity-80 transition"
                  />
                </Link>
                <div>
                  <Link
                    href={`/weapons/${weapon.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    アバター「{matrix.avatar}」の武器を見る
                  </Link>
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
              {/* アバター武器リンク */}
              <div className="mt-4">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">武器リンク：</div>
                <Link href={`/weapons/${weapon.slug}`} className="inline-block">
                  <Image
                    src={`/images/${weapon.id}_img.PNG`}
                    alt={`${weapon.name}の画像`}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="text-blue-600 hover:underline sm:text-sm text-center mt-1">アバター「{trait.avatar}」の武器を見る</div>
                </Link>
              </div>
            </section>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}