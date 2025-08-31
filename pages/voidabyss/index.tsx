import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import vaBuffs from "@/data/va_buffs.json";
import SidebarLayout from "@/components/layout/SidebarLayout";

// 折りたたみセクション
const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="mb-4">
      <button
        className="flex items-center gap-2 text-lg sm:text-xl font-bold bg-sky-100 border-b-2 border-sky-300 w-full px-4 py-2 rounded-t-md focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="material-symbols-outlined text-sky-500">{open ? "expand_less" : "expand_more"}</span>
        {title}
      </button>
      {open && (
        <div className="bg-white border border-t-0 border-sky-200 rounded-b-md px-4 py-4">{children}</div>
      )}
    </section>
  );
};

// 拡大画像モーダル
const Modal = ({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg w-full h-full max-w-[98vw] max-h-[98vh] flex flex-col items-center justify-center sm:max-w-4xl sm:w-[96vw] sm:h-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-[96vw] h-[60vh] sm:w-full sm:h-[60vh] min-h-[200px] max-h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ background: "#fff" }}
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

// 拡大画像＋キャプション（クリックで拡大）
function CaptionedImage({
  src,
  alt,
  caption,
  w = 500,
  h = 300,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center my-4">
      <div
        className="relative rounded-lg shadow border-2 border-sky-300 overflow-hidden bg-white cursor-pointer"
        style={{ width: w, height: h, maxWidth: "100%" }}
        onClick={onClick}
        title="クリックで拡大"
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
          クリックで拡大
        </span>
      </div>
      <div className="bg-sky-50 px-2 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center max-w-xl">
        {caption}
      </div>
    </div>
  );
}

// 画像を横並び
function RowImages({
  items,
  w = 380,
  h = 220,
  onClick,
}: {
  items: { src: string; alt: string; caption?: string }[];
  w?: number;
  h?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
      {items.map((img, i) => (
        <div key={img.src} className="flex flex-col items-center">
          <div
            className="relative rounded-lg shadow border-2 border-sky-200 overflow-hidden bg-white cursor-pointer"
            style={{ width: w, height: h, maxWidth: "100%" }}
            onClick={() => onClick && onClick(img.src, img.alt)}
            title="クリックで拡大"
          >
            <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="100vw" />
            <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
              クリックで拡大
            </span>
          </div>
          {img.caption && (
            <div className="bg-sky-50 px-2 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center max-w-xs">
              {img.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function VoidAbyssPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  // 技術バフ一覧
  const techBuffs = vaBuffs.techbuff;
  // ステージバフ一覧
  const stageBuffs = vaBuffs.stagebuff;

  return (
    <>
      <Head>
        <title>虚空のアビスバフ一覧・攻略ページ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔『虚空のアビス』の基本説明、進め方、技術バフ・ステージバフ一覧、ソロ攻略のポイントを解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        {/* ヒーローヘッダー */}
        <div className="relative w-full h-40 sm:h-60 overflow-hidden rounded-lg shadow mb-6 flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-100">
          <Image
            src="/VoidAbyss/va_TOP.PNG"
            alt="虚空のアビス"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.85 }}
            className="pointer-events-none select-none"
            priority
          />
          {/* オーバーレイで暗めに */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white drop-shadow mb-2">虚空のアビス</h1>
            <p className="text-white text-base sm:text-lg font-semibold bg-sky-700/70 px-4 py-1 rounded">
              虚空のアビスバフ一覧・攻略ページ
            </p>
          </div>
        </div>

        {/* 折りたたみ：基本説明～進め方 */}
        <CollapsibleSection
          title={
            <span>
              <span className="material-symbols-outlined text-sky-400 align-middle mr-2">info</span>
              基本説明（ここをクリックで展開・収納）
            </span>
          }
        >
          {/* 基本説明 */}
          <div className="mb-6 space-y-2">
            <div>最大4人で攻略するPVEコンテンツの1つ。<br />
              出てくるボスが毎月変化する、いわゆる月課コンテンツ。<br />
              ステージ外で集める「技術バフ」とステージ内で集めるバフ（以降はステージバフと呼ぶ）があり、
              この2つのバフでしっかり強化することでとてつもないステータス強化が可能となっている。</div>
            <CaptionedImage
              src="/VoidAbyss/va_buff_beforeafter.PNG"
              alt="技術バフとステージバフでステータスは倍以上に伸びるぞ！"
              caption="技術バフとステージバフでステータスは倍以上に伸びるぞ！"
              w={550}
              h={240}
              onClick={() => openModal("/VoidAbyss/va_buff_beforeafter.PNG", "技術バフとステージバフでステータスは倍以上に伸びるぞ！")}
            />
            <div>
              ステージは全部で6つまであり、6つ目のステージをクリアすると報酬でランダムな初期恒常SSRボリションと煙水晶が貰えるぞ！
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_rewards.PNG"
              alt="SSRボリションからはセミール、シロやココリッタ、ゼロのボリションが狙えるぞ！"
              caption="SSRボリションからはセミール、シロやココリッタ、ゼロのボリションが狙えるぞ！"
              w={500}
              h={220}
              onClick={() => openModal("/VoidAbyss/va_rewards.PNG", "SSRボリションからはセミール、シロやココリッタ、ゼロのボリションが狙えるぞ！")}
            />
          </div>

          {/* ステージバフと鍵集め */}
          <div className="mb-6 space-y-2">
            <div>
              ステージ内ではステージバフを集めながらボスエリアにワープするための鍵を探すことから始まる。<br />
              バフはそこら辺に落ちていたり、敵を倒すとドロップする。
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_stagebuff.PNG"
              alt="そこら辺に落ちている or 敵を倒すとドロップ"
              caption="そこら辺に落ちている or 敵を倒すとドロップ"
              w={520}
              h={200}
              onClick={() => openModal("/VoidAbyss/va_stagebuff.PNG", "そこら辺に落ちている or 敵を倒すとドロップ")}
            />
            <div>
              鍵は特定の敵が持っており、全部で3本集めることでボスエリアにワープ可能になる。
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_bosskey.PNG"
              alt="鍵を持っている敵は固定なので探し出そう"
              caption="鍵を持っている敵は固定なので探し出そう"
              w={520}
              h={200}
              onClick={() => openModal("/VoidAbyss/va_bosskey.PNG", "鍵を持っている敵は固定なので探し出そう")}
            />
            <div>
              ボス部屋へワープしたら恩恵のフィオナリンク/ブレヴィの親友付与などの準備をしてボスに挑もう！
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_bosswarp.PNG"
              alt="鍵が集まったらボスへワープしよう"
              caption="鍵が集まったらボスへワープしよう"
              w={520}
              h={200}
              onClick={() => openModal("/VoidAbyss/va_bosswarp.PNG", "鍵が集まったらボスへワープしよう")}
            />
          </div>

          {/* 技術バフについて */}
          <div className="mb-6 space-y-2">
            <div>
              <b>■技術バフについて</b><br />
              技術バフは「虚空エナジー」というアイテムを消費してステージ外で集めるバフ。<br />
              バフは攻撃、防御、アシストの3つの傾向から選択でき、選んだ傾向に近いバフが3択で表示される。
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_techbuff_choice.PNG"
              alt="バフは3択から1つを選択"
              caption="バフは3択から1つを選択"
              w={520}
              h={210}
              onClick={() => openModal("/VoidAbyss/va_techbuff_choice.PNG", "バフは3択から1つを選択")}
            />
            <div>
              技術バフにどのような効果があるかプレビューで見れるので、事前に把握しておくことで効果的なバフを集めやすくなるぞ！<br />
              補足として、一部のバフがプレビューに表示されていないため、ページ後半に掲載している技術バフ一覧を見ることをおススメします。
            </div>
            <RowImages
              items={[
                {
                  src: "/VoidAbyss/va_techbuff_preview1.PNG",
                  alt: "アビス技術のiマークをクリック",
                  caption: "アビス技術のiマークをクリック"
                },
                {
                  src: "/VoidAbyss/va_techbuff_preview2.PNG",
                  alt: "バフのプレビューが表示される（一部表示されてないバフもあります）",
                  caption: "バフのプレビューが表示される（一部表示されてないバフもあります）"
                }
              ]}
              w={320}
              h={180}
              onClick={openModal}
            />
            <div>
              技術バフは同じ種類のバフを3つ集めると合成して1つ上のランクのバフを獲得できる。<br />
              効果があるのは一番上のランクのバフだけなので下のランクのバフはリサイクルしてOK。<br />
              ランクⅡはランクⅠのバフを3つ、ランクⅢはランクⅡのバフを3つ必要になる。<br />
              ランクⅢを作るのは大変だが、技術バフを引く時の虚空エナジーの消費が多くなると3択に直接ランクⅡのバフが出るようになる。<br />
              そのため、狙ってランクⅢを作るなら最大の16消費になるまでバフを引き続けるのが良い。
            </div>
            <CaptionedImage
              src="/VoidAbyss/va_techbuff_rankup.PNG"
              alt="エナジーの消費が増えると直接ランクⅡのバフが出ることも"
              caption="エナジーの消費が増えると直接ランクⅡのバフが出ることも"
              w={520}
              h={220}
              onClick={() => openModal("/VoidAbyss/va_techbuff_rankup.PNG", "エナジーの消費が増えると直接ランクⅡのバフが出ることも")}
            />
          </div>

          {/* ステージバフについて */}
          <div className="mb-6 space-y-2">
            <div>
              <b>■ステージバフについて</b><br />
              ステージ内では全部で8種類のバフをそれぞれ4つずつ獲得できる。<br />
              同じ種類のバフを3つ集めると追加の効果が発動し、ステータスなどを更に強化できる。<br />
              手に入れたバフは味方に渡すことが可能なので、自分の属性以外のバフや剛毅・恩恵用のバフを渡して最大限効果を活かせるようにしよう！<br />
              また、同じ種類のバフを3つ集めたプレイヤーは「祈願」のバフを発動し、チーム全員の攻撃力+10% & HP+15%の効果が得られる。<br />
              この祈願バフは1人発動するごとに加算されていって、最大で全員の攻撃力+40% & HP+60%の効果が得られるので特に後半のステージでは発動させることを推奨する。
            </div>
            <RowImages
              items={[
                {
                  src: "/VoidAbyss/va_stagebuff_1.PNG",
                  alt: "ステージバフの例1"
                },
                {
                  src: "/VoidAbyss/va_stagebuff_2.PNG",
                  alt: "ステージバフの例2"
                }
              ]}
              w={340}
              h={180}
              onClick={openModal}
            />
          </div>

          {/* 進め方 */}
          <div className="mb-6 space-y-2">
            <div>
              <b>■進め方</b><br />
              まずは1つ目のステージをクリアして虚空エナジーを獲得しよう。<br />
              週課の活躍値報酬やショップでコインを使っての購入でも獲得可能だぞ！<br />
              技術バフを集めたら次のステージに挑戦してクリアしたら技術バフを集める流れを繰り返そう。<br />
              技術バフは強攻が攻撃、剛毅が防御、恩恵がアシストから引けば欲しいバフが集まりやすい。<br />
              バフは3択から選ぶときに引き直しができるが、消費する虚空エナジーが最大になるまでひたすらバフを取る方が良いバフが出やすくなるので途中で引き直しをする必要は無い。<br />
              また、バフをリサイクルすることで得られる虚空エナジーの量はバフによって決まっているので、序盤の内はリサイクルする前提でバフを集めると良い。
            </div>
            <RowImages
              items={[
                {
                  src: "/VoidAbyss/va_techbuff_VoidEnergy.PNG",
                  alt: "虚空エナジーを集めてバフを引こう",
                  caption: "虚空エナジーを集めてバフを引こう"
                },
                {
                  src: "/VoidAbyss/va_techbuff_Shop.PNG",
                  alt: "ショップや師弟の協力商店でも購入できるぞ！",
                  caption: "ショップや師弟の協力商店でも購入できるぞ！"
                }
              ]}
              w={340}
              h={160}
              onClick={openModal}
            />
            <div>
              なお、一度クリアしたステージに再挑戦したい場合は「月間BOSS」から挑戦したいボスの再挑戦を押そう。
            </div>
            <RowImages
              items={[
                {
                  src: "/VoidAbyss/va_boss_retry1.PNG",
                  alt: "月間BOSSを選択",
                  caption: "月間BOSSを選択"
                },
                {
                  src: "/VoidAbyss/va_boss_retry2.PNG",
                  alt: "再挑戦したいボスを選ぼう",
                  caption: "再挑戦したいボスを選ぼう"
                }
              ]}
              w={340}
              h={160}
              onClick={openModal}
            />
          </div>
        </CollapsibleSection>

        {/* おススメの技術バフ */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-3" style={{ borderLeft: "8px solid #17e6a7", borderBottom: "2.5px solid #17e6a7", paddingBottom: 2, width: "fit-content" }}>
            <span className="material-symbols-outlined text-emerald-500 text-2xl">star</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-0">おススメの技術バフ</h2>
          </div>
          <div className="mb-3">
            強攻・剛毅・恩恵のどの役割でも取っておきたいのは<strong>電子光輪</strong>。
            これを持っているだけでチーム全員のダメージが上がるので、特に剛毅と恩恵は確保必須のバフになっている。
          </div>
          <CaptionedImage
            src="/VoidAbyss/va_techbuff_ElectronHalo.PNG"
            alt="剛毅・恩恵は確保必須！強攻も基本持っててOK！"
            caption="剛毅・恩恵は確保必須！強攻も基本持っててOK！"
            w={510}
            h={200}
            onClick={() => openModal("/VoidAbyss/va_techbuff_ElectronHalo.PNG", "剛毅・恩恵は確保必須！強攻も基本持っててOK！")}
          />
          <div className="mb-3">
            強攻であれば自身の属性のバフと会心率が上がるシャドウバースト、モンスターを倒すほど強くなるイバラの心、自身のHPが一定以上で強くなる完全計算、受けるダメージは増えるが与えるダメージも大幅に増えるオーバークロック計算
          </div>
          <RowImages
            items={[
              {
                src: "/VoidAbyss/va_techbuff_Elementbuffs.PNG",
                alt: "属性バフは自分の属性のモノを選ぼう",
                caption: "属性バフは自分の属性のモノを選ぼう"
              },
              {
                src: "/VoidAbyss/va_techbuff_DPSbuffs.PNG",
                alt: "火力系のバフを集めよう（殲滅崩壊も悪くない）",
                caption: "火力系のバフを集めよう（殲滅崩壊も悪くない）"
              }
            ]}
            w={345}
            h={180}
            onClick={openModal}
          />
          <div className="mb-3">
            剛毅であればステージ6のボスに対応した属性耐性のバフとシールドブレイクを強化するブレイクスルー、生存能力を上げる運命の死者や虚空装甲を取ろう。
            余裕があればアシストから出る防御フィールドや強襲共振を取っておくと味方にバフを配れるぞ！
          </div>
          <CaptionedImage
            src="/VoidAbyss/va_techbuff_Tankbuffs.PNG"
            alt="防御・シルブレバフを狙おう（余裕があればアシストのバフも引いておこう）"
            caption="防御・シルブレバフを狙おう（余裕があればアシストのバフも引いておこう）"
            w={520}
            h={200}
            onClick={() => openModal("/VoidAbyss/va_techbuff_Tankbuffs.PNG", "防御・シルブレバフを狙おう（余裕があればアシストのバフも引いておこう）")}
          />
          <div className="mb-3">
            味方をバフできる防御フィールドと強襲共振、回避回数を増やせるスイフトレゾナンス、会心率を上げられるシャドウバーストはあると嬉しい。<br />
            シャドウバーストは攻撃タイプのバフなのでアシストでバフを集めたら攻撃でバフを引くようにしよう。
          </div>
          <CaptionedImage
            src="/VoidAbyss/va_techbuff_Benebuffs.PNG"
            alt="アシスト系のバフと会心率が上がるシャドウバーストがおススメ（属性がばらけているなら元素融合を狙っても良い）"
            caption="アシスト系のバフと会心率が上がるシャドウバーストがおススメ（属性がばらけているなら元素融合を狙っても良い）"
            w={520}
            h={200}
            onClick={() => openModal("/VoidAbyss/va_techbuff_Benebuffs.PNG", "アシスト系のバフと会心率が上がるシャドウバーストがおススメ（属性がばらけているなら元素融合を狙っても良い）")}
          />
          <div className="mb-3">
            上記以外にも武器が完凸でなければ上位感知のランクを上げることで完凸編成を再現可能だぞ！
          </div>
          <CaptionedImage
            src="/VoidAbyss/va_techbuff_KnackforAdvancement.PNG"
            alt="アビスなら高凸の能力も使えるぞ！"
            caption="アビスなら高凸の能力も使えるぞ！"
            w={510}
            h={185}
            onClick={() => openModal("/VoidAbyss/va_techbuff_KnackforAdvancement.PNG", "アビスなら高凸の能力も使えるぞ！")}
          />
        </section>

        {/* 技術バフ一覧 */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-3" style={{ borderLeft: "8px solid #17e6a7", borderBottom: "2.5px solid #17e6a7", paddingBottom: 2, width: "fit-content" }}>
            <span className="material-symbols-outlined text-blue-500 text-2xl">list</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-0">技術バフ一覧</h2>
          </div>
          <div className="mb-2 text-base text-gray-700 font-semibold">
            バフは3つのタイプで分かれているが、バフガチャからは指定のタイプ以外のバフも出てくる。<br />
            また、完全計算・重量装甲・治療過多はバフプレビューに乗っていないので注意。<br />
            <span className="text-xs text-gray-500 font-normal">補足①：元素コアの原子核ダメージUPは元素集結のダメージを強化するバフ</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full bg-white shadow rounded mb-4">
              <thead>
                <tr className="bg-sky-100 text-xs sm:text-sm">
                  <th className="px-2 py-1 border">バフ名</th>
                  <th className="px-2 py-1 border">タイプ</th>
                  <th className="px-2 py-1 border">効果</th>
                  <th className="px-2 py-1 border">リサイクル</th>
                </tr>
              </thead>
              <tbody>
                {techBuffs.map((buff, i) => (
                  <tr key={buff.name} className={i % 2 === 0 ? "bg-white" : "bg-sky-50"}>
                    <td className="px-2 py-1 border">{buff.name}</td>
                    <td className="px-2 py-1 border">{buff.type}</td>
                    <td className="px-2 py-1 border">{buff.effect}</td>
                    <td className="px-2 py-1 border">{buff.recycle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ステージバフ一覧 */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-3" style={{ borderLeft: "8px solid #17e6a7", borderBottom: "2.5px solid #17e6a7", paddingBottom: 2, width: "fit-content" }}>
            <span className="material-symbols-outlined text-cyan-600 text-2xl">layers</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-0">ステージバフ一覧</h2>
          </div>
          <div className="mb-2 text-base text-gray-700 font-semibold">
            どれか1種類でも3スタック所持していれば祈願バフが発動する。<br />
            <span className="text-xs text-gray-500 font-normal">祈願：味方の攻撃力+10%、HP+15%。祈願を発動している味方の数だけ有効。</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full bg-white shadow rounded mb-4">
              <thead>
                <tr className="bg-sky-100 text-xs sm:text-sm">
                  <th className="px-2 py-1 border">バフ名</th>
                  <th className="px-2 py-1 border">効果</th>
                  <th className="px-2 py-1 border">3スタック効果</th>
                </tr>
              </thead>
              <tbody>
                {stageBuffs.map((buff, i) => (
                  <tr key={buff.name} className={i % 2 === 0 ? "bg-white" : "bg-sky-50"}>
                    <td className="px-2 py-1 border">{buff.name}</td>
                    <td className="px-2 py-1 border">{buff.effect}</td>
                    <td className="px-2 py-1 border">{buff.effect_3stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ボス攻略 */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-3" style={{ borderLeft: "8px solid #17e6a7", borderBottom: "2.5px solid #17e6a7", paddingBottom: 2, width: "fit-content" }}>
            <span className="material-symbols-outlined text-purple-500 text-2xl">shield_person</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-0">ボス攻略</h2>
          </div>
          <div className="mb-2 text-base text-gray-700 font-semibold">特に注意が必要なボスの情報を掲載</div>
          <div className="mb-6">
            <div className="mb-4">
              <span className="font-bold text-lg text-purple-700">・ヨルムンガンド</span>
              <div className="ml-4">
                浸食ダメージが非常に厄介。<br />
                ヨルムンガンドから受けるあらゆるダメージが継続ダメージに変換される上に、ヨルムンガンドが生成する紫色の床を踏んでいるとどんどんダメージを受ける。<br />
                紫の床を踏まないように気を付けつつ、普通の攻撃もしっかりと避けるようにしよう。
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-lg text-purple-700">・饕餮</span>
              <div className="ml-4">
                ボスのいる戦闘エリアにワープすると速攻で探知されてこちらに向かってくる。<br />
                そのため、先に剛毅がワープして饕餮を引き付けてから他のプレイヤーが入るようにしよう。<br />
                シールド時の周囲から迫って来る半透明な壁は触れると大ダメージを受けるので要注意。<br />
                幻想タイム・フィオナのアクアシャックルによる拘束が有効。
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-lg text-purple-700">・刑天</span>
              <div className="ml-4">
                とにかく超高火力。<br />
                下手な剛毅では一撃でやられてしまうことも。<br />
                攻撃範囲も広く、剛毅が誘導しているだけでは味方へのダメージを防げないので恩恵の回復でカバーしてあげよう。<br />
                幻想タイム・フィオナのアクアシャックルによる拘束が有効。
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-purple-700">・鉄桶</span>
              <div className="ml-4">
                とにかく高火力。<br />
                攻撃範囲も広めで、さらにHPが減るとテリトリーを展開してダメージを軽減しながら攻撃してくる。<br />
                テリトリー内では分身が攻撃してくるが、この攻撃に対して通常攻撃を当てると分身の攻撃をはじいて中断できる。<br />
                1人が攻撃をはじくごとに鉄桶の頭上のカウントが進み、合計10回攻撃をはじくとテリトリーが解除されて鉄桶がダウンする。<br />
                幻想タイム・フィオナのアクアシャックルによる拘束が有効。
              </div>
            </div>
          </div>
        </section>

        {/* ソロ攻略は難易度高め */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-3" style={{ borderLeft: "8px solid #17e6a7", borderBottom: "2.5px solid #17e6a7", paddingBottom: 2, width: "fit-content" }}>
            <span className="material-symbols-outlined text-red-400 text-2xl">person_off</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-0">ソロ攻略は難易度高め</h2>
          </div>
          <div className="mb-2 text-sm text-gray-700">
            ソロでの攻略も可能だが、耐久力・火力ともに高めの水準を求められる上、ある程度使う武器も限られてくるのでハードルは高め。
          </div>
          <div className="w-full flex flex-col gap-8 items-center">
            {[ // 縦並び＆大きめ
              { url: "https://youtu.be/4S47t6FVWaE", title: "虚空のアビス ソロ攻略1" },
              { url: "https://youtu.be/Kjot6cBC85c", title: "虚空のアビス ソロ攻略2" },
              { url: "https://youtu.be/-tzTzWmMkSE", title: "虚空のアビス ソロ攻略3" }
            ].map(({ url, title }) => (
              <div className="w-full max-w-3xl" key={url}>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                  <iframe
                    src={url.replace("youtu.be/", "www.youtube.com/embed/")}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded shadow border border-sky-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 拡大モーダル */}
        <Modal
          open={modalOpen && modalImage !== null}
          onClose={closeModal}
          src={modalImage?.src || ""}
          alt={modalImage?.alt || ""}
        />
      </div>
    </>
  );
}

VoidAbyssPage.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;

};