import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// 仮の10つの連合作戦データ
const jointOps = [
  { key: "Jo1", title: "深海基地", img: "/JointOperation/jo_DeepseaStronghold.PNG", link: "/jointoperation/DeepseaStronghold" },
  { key: "Jo2", title: "深海訓練所", img: "/JointOperation/jo_DeepseaProvingGround.PNG", link: "/jointoperation/DeepseaProvingGround" },
  { key: "Jo3", title: "隔離区域", img: "/JointOperation/jo_QuarantineZone.PNG", link: "/jointoperation/QuarantineZone" },
  { key: "Jo4", title: "ハイエナアリーナ", img: "/JointOperation/jo_HyenaArena.PNG", link: "/jointoperation/HyenaArena" },
  { key: "Jo5", title: "最終公演", img: "/JointOperation/jo_TheEndGame.PNG", link: "/jointoperation/TheEndGame" },
  { key: "Jo6", title: "ロストバレー", img: "/JointOperation/jo_SadnessValley.PNG", link: "/jointoperation/SadnessValley" },
  { key: "Jo7", title: "パーティータイム", img: "/JointOperation/jo_CarnivalParty.PNG", link: "/jointoperation/CarnivalParty" },
  { key: "Jo8", title: "運命の追撃", img: "/JointOperation/jo_PursuitofFate.PNG", link: "/jointoperation/PursuitofFate" },
  { key: "Jo9", title: "地核深焔", img: "/JointOperation/jo_CoreflameDepths.PNG", link: "/jointoperation/CoreflameDepths" },
  { key: "Jo10", title: "無想剣極意", img: "/JointOperation/jo_ZenithBlade.PNG", link: "/jointoperation/ZenithBlade" },
];

// 武器リスト（簡略 ver.）
const weapons = [
  {
    slug: "AF-010Servion",
    name: "シードル",
    img: "/images/w_63_img.PNG",
    desc: "ver5.3以前は火力最強だったがほどほどの強さに調整された。それでも攻撃の倍率自体は高めなのでアントリアとセットで運用しよう。",
  },
  {
    slug: "Requiem",
    name: "アントリア",
    img: "/images/w_59_img.PNG",
    desc: "移動性能に秀でた武器。スキル使用後に裏に回した際の「サポート攻撃システムS.A.S」が非常に強力。表運用でもスキル使用後時間経過で使用できる「特殊攻撃パターン-豪雨」は一瞬で敵の体力を消し飛ばせる火力を秘めている。移動はアントリア、戦闘はシードルという使い分けが楽なのでおススメ。",
  },
  {
    slug: "TwinStars",
    name: "アストール",
    img: "/images/w_62_img.PNG",
    desc: "一定水準の移動性能と攻撃性能を合わせ持つ武器。移動性能は高いがアントリアほど操作がお手軽ではない。アントリアとシードルのセットが無ければアストールで蹴散らすのも十分あり。",
  },
];

const moveWeapons = [
  {
    slug: "UnyieldingWing",
    name: "不滅の翼",
    img: "/images/w_29_img.PNG",
  },
  {
    slug: "Rumble",
    name: "ノイズ",
    img: "/images/w_53_img.PNG",
  },
  {
    slug: "TheWitch'sKey",
    name: "魔女の鍵",
    img: "/images/w_56_img.PNG",
  },
];

export default function JointOperationIndex() {
  const [open, setOpen] = useState(false);
  // 拡大画像モーダル用
  const [modalImg, setModalImg] = useState<null | { src: string; alt: string }>(null);

  // 緑のライン＋下線用スタイル
  const h2Class =
    "text-base sm:text-lg font-semibold mb-2 pl-3 relative border-b-2 border-emerald-500";
  const h2Style = { borderLeft: "8px solid #17e6ff" };

  // サブ見出し用
  const subH3Class =
    "text-base font-bold mt-4 mb-2 border-b border-dashed border-emerald-400 pl-2";
  const subH3Style = { borderLeft: "6px solid #14b8a6" };

  // モーダル
  const Modal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      style={{ cursor: "zoom-out" }}
    >
      <div
        className="relative max-w-[96vw] max-h-[90vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={600}
          className="rounded shadow-lg"
          style={{ maxWidth: "96vw", maxHeight: "90vh", objectFit: "contain" }}
        />
        <button
          className="absolute top-2 right-2 p-2 bg-black/70 rounded-full text-white text-xl"
          aria-label="閉じる"
          onClick={onClose}
        >×</button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>連合作戦ポータル | 幻塔攻略データベース</title>
      </Head>
      {/* 拡大モーダル */}
      {modalImg && (
        <Modal
          src={modalImg.src}
          alt={modalImg.alt}
          onClose={() => setModalImg(null)}
        />
      )}
      {/* ヒーローヘッダー */}
      <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-lg shadow mb-4 flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-300">
        <Image
          src="/JointOperation/jo_main.PNG"
          alt="連合作戦イメージ"
          fill
          style={{ objectFit: "cover", objectPosition: "0% 20%", opacity: 0.8 }}
          className="pointer-events-none select-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-white drop-shadow mb-1">連合作戦</h1>
          <p className="text-white text-sm sm:text-base font-semibold bg-cyan-700/60 px-4 py-1 rounded">
            連合作戦ダンジョン一覧・攻略ページ
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-4">
        {/* 3×3カードグリッド（小さめ） */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          {jointOps.map((jo) =>
            jo.link ? (
              <Link
                href={jo.link}
                key={jo.key}
                className="group bg-white rounded-lg shadow hover:shadow-xl transition flex flex-col items-center border border-cyan-300 py-2 px-2 sm:py-3 sm:px-3"
                style={{ minHeight: 120, minWidth: 0 }}
              >
                <div className="w-[50px] h-[90px] sm:w-[90px] sm:h-[90px] flex items-center justify-center mb-1">
                  <Image
                    src={jo.img}
                    alt={jo.title}
                    width={120}
                    height={120}
                    className="rounded object-cover"
                    style={{ maxWidth: "200%", maxHeight: "200%" }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-cyan-800 group-hover:text-cyan-600 text-center">{jo.title}</span>
              </Link>
            ) : (
              <div
                key={jo.key}
                className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-cyan-200 rounded-lg py-2 px-2 sm:py-3 sm:px-3 min-h-[120px]"
                style={{ minHeight: 120 }}
              >
                <div className="w-[90px] h-[90px] sm:w-[90px] sm:h-[90px] flex items-center justify-center mb-1 opacity-40">
                  <Image
                    src={jo.img}
                    alt={jo.title}
                    width={120}
                    height={120}
                    className="rounded object-cover"
                    style={{ maxWidth: "200%", maxHeight: "200%" }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-400 text-center">{jo.title}</span>
                <span className="text-[11px] text-cyan-600 font-semibold mt-2">随時追加</span>
              </div>
            )
          )}
        </div>

        {/* 基本説明 */}
        <section className="mb-5">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="bg-cyan-600 text-white rounded px-4 py-1 font-bold hover:bg-cyan-700 transition"
            aria-expanded={open}
            aria-controls="jointop-desc"
            style={{ marginBottom: 0 }}
          >
            {open ? "▲ 基本説明を閉じる" : "▼ 基本説明を開く"}
          </button>
          <div
            id="jointop-desc"
            className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[4000px] mt-4" : "max-h-0"} `}
          >
            <h2 className={h2Class} style={h2Style}>基本説明</h2>
            <div className="space-y-2">
              {/* ■連合作戦とは */}
              <h3 className={subH3Class} style={subH3Style}>連合作戦とは</h3>
              <p>
                連合作戦は毎日9つのダンジョンからランダムに1つが選ばれ、<br />
                ダンジョンを攻略することで報酬を獲得できるコンテンツ。
                <br />
                毎日1回連合作戦をクリアすることで1度だけ獲得できるデイリー報酬と<br />
                活力を90消費して開けられるダンジョン報酬が存在する。
              </p>
              <div className="flex flex-col items-center">
                <Image src="/JointOperation/jo_Reward.PNG" alt="連合作戦報酬" width={800} height={100} className="rounded shadow" />
              </div>

              {/* ■報酬 */}
              <h3 className={subH3Class} style={subH3Style}>報酬</h3>
              <p>
                デイリー報酬の内容は固定だが、ダンジョン報酬で手に入る防具はある程度傾向を選べるようになっている。<br />
                優先報酬の防具をクリックすると選択画面が表示され、<br />
                特定の属性攻撃・耐性を持った防具だけか特定の部位だけが出るように選択できる。
              </p>
              <div className="flex flex-row flex-wrap gap-2 justify-center">
                <button
                  onClick={() =>
                    setModalImg({
                      src: "/JointOperation/jo_PreferredRewards1.PNG",
                      alt: "優先報酬1（クリックで拡大）",
                    })
                  }
                  className="focus:outline-none bg-transparent p-0 border-0"
                  tabIndex={0}
                  aria-label="優先報酬1を拡大"
                  style={{ cursor: "zoom-in" }}
                >
                  <Image
                    src="/JointOperation/jo_PreferredRewards1.PNG"
                    alt="優先報酬1（クリックで拡大）"
                    width={350}
                    height={65}
                    className="rounded shadow"
                  />
                </button>
                <button
                  onClick={() =>
                    setModalImg({
                      src: "/JointOperation/jo_PreferredRewards2.PNG",
                      alt: "優先報酬2（クリックで拡大）",
                    })
                  }
                  className="focus:outline-none bg-transparent p-0 border-0"
                  tabIndex={0}
                  aria-label="優先報酬2を拡大"
                  style={{ cursor: "zoom-in" }}
                >
                  <Image
                    src="/JointOperation/jo_PreferredRewards2.PNG"
                    alt="優先報酬2（クリックで拡大）"
                    width={350}
                    height={65}
                    className="rounded shadow"
                  />
                </button>
              </div>

              {/* ■ランダム効果 */}
              <h3 className={subH3Class} style={subH3Style}>ランダム効果</h3>
              <p>
                ダンジョンには毎日変化するランダムな効果が適用されている。<br />
                どの効果がどの曜日に適用されるかは毎週変化し、その内容は連合の「今週のおすすめ装備プレビュー」で確認できる。
              </p>
              <div className="flex flex-col items-center">
                <Image src="/JointOperation/jo_RandomEffect.PNG" alt="ランダム効果" width={310} height={65} className="rounded shadow" />
              </div>
              <p>
                この中でも特殊確立ドロップ系の効果はダンジョン報酬の箱から追加のアイテムがドロップするようになるので、ボスアクセの欠片やボリションの欠片を集めたい時には活力薬を使ってその日のダンジョンを周回するようにしよう！
              </p>

              {/* ■連合補給チップ */}
              <h3 className={subH3Class} style={subH3Style}>連合補給チップ</h3>
              <p>
                連合作戦のダンジョン報酬から手に入る防具は確定で全て入手できるわけではなく、<br />
                アイテムの連合補給チップを使うことで確定で入手できるようになる。
              </p>
              <div className="flex flex-row flex-wrap gap-2 justify-center">
                <Image src="/JointOperation/jo_SupplyChip.PNG" alt="連合補給チップ" width={310} height={65} className="rounded shadow" />
              </div>
              <p>
                チップは最大で30スタックまで効果を保有でき、箱を1つ開けることで3スタック消費する。
              </p>
              <div className="flex flex-col items-center">
                <Image src="/JointOperation/jo_SupplyChip_state.PNG" alt="チップスタック" width={800} height={100} className="rounded shadow" />
              </div>
              <p>
                スタックの消費が3つずつなのは少し前の連合作戦の名残。以前は3つの箱を開けてそれぞれ1スタック消費していた。<br />
                なお、チップは毎回バックから使わなくても連合の画面下部にあるショートカットにチェックを入れていれば自動で使用してくれる。
              </p>
              <div className="flex flex-row flex-wrap gap-2 justify-center">
                <Image src="/JointOperation/jo_SupplyChip_auto.PNG" alt="チップ自動使用" width={800} height={100} className="rounded shadow" />
              </div>

              {/* ■マッチング */}
              <h3 className={subH3Class} style={subH3Style}>マッチング</h3>
              <p>
                普通にマッチングして遊ぶ場合は「マッチング開始」を押してマッチするのを待とう。<br />
                1人で攻略したい場合は「進む」を押すと1人でダンジョンに挑戦できる。<br />
                「アシストマッチング」を押すとマッチング待ちの人や新人プレイヤーと優先的にマッチされ、人数が足りない場合は4人未満でもマッチング成立としてダンジョンに挑戦できる。<br />
                連合作戦ではプレイヤーのステータスは統一され、武器も全て完凸扱いになるので基本はアシストマッチングでちゃちゃっと終わらせるのがおススメ。
              </p>
              <div className="flex flex-col items-center">
                <Image src="/JointOperation/jo_matching.PNG" alt="マッチング画面" width={800} height={100} className="rounded shadow" />
              </div>
            </div>
          </div>
        </section>

        {/* おススメ武器編成 */}
        <section>
          <h2 className={h2Class + " mt-8"} style={h2Style}>おススメ武器</h2>
          <div className="flex flex-col gap-4 mt-2">
            <div className="text-xs sm:text-sm text-gray-800 font-semibold bg-emerald-50 border-l-4 border-emerald-400 px-3 py-2 rounded mb-1">
              連合作戦ではプレイヤーのステータスは統一され、持っている武器は全て完凸扱いになる。<br />
              そのため、連合作戦で強い武器を無凸で持っていれば初心者でもダメージを出すことが可能となっている。あとはどれだけ早く正確に攻撃を当てるかのレースになるので、左上のダメージ結果が全然振るわないからといって落ち込む必要はないぞ！<br />
              武器選択さえ間違えなければソロでも攻略できるが、好きな武器で戦いたいからと連合では弱い武器を持って行くと苦労することになるので注意しよう。<br />基本的には最近の武器であればダメージを出せるようになっているが、特におススメの武器は以下の通り。
            </div>
            {/* メイン武器3つ */}
            {weapons.map((w) => (
              <div key={w.slug} className="flex gap-3 items-center border border-gray-200 rounded-lg bg-white p-2 shadow-sm" style={{ minHeight: 72 }}>
                <div className="flex flex-col items-center">
                  <Link href={`/weapons/${w.slug}`}>
                    <Image src={w.img} alt={w.name} width={60} height={60} className="rounded mb-1 shadow" />
                  </Link>
                  <div className="text-[15px] font-bold text-center">{w.name}</div>
                </div>
                <div className="flex-1 text-xs sm:text-sm text-gray-800 font-semibold">{w.desc}</div>
              </div>
            ))}
            {/* その他移動武器 */}
            <div className="flex gap-3 items-center border border-gray-200 rounded-lg bg-white p-2 shadow-sm min-h-[56px]">
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  {moveWeapons.map((w) => (
                    <Link href={`/weapons/${w.slug}`} key={w.slug}>
                      <Image src={w.img} alt={w.name} width={60} height={60} className="rounded shadow" />
                    </Link>
                  ))}
                </div>
                <div className="text-[15px] font-bold text-center mt-1">移動系武器</div>
              </div>
              <div className="flex-1 text-xs sm:text-sm text-gray-800 font-semibold">
                ノーラやグレイフォックス等の移動性能を持った武器は連合を快適に攻略するうえで重要。アントリアかアストールが無い場合はその他の移動性能を持った武器を活用しよう！
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

JointOperationIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};