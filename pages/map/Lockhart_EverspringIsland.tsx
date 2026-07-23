import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import points from "@/data/maps/kailo_BrightonZone_points.json";
import type { Point } from "@/components/maps/ExplorationMap";

const ExplorationMap = dynamic(() => import("@/components/maps/ExplorationMap"), { ssr: false });

// セクションタイトル（見本に合わせた装飾）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-pink-300/60 to-pink-50 border-l-8 border-pink-500 rounded px-4 py-2 my-5 shadow">
      {icon && <span className="material-symbols-outlined text-pink-600 text-2xl">{icon}</span>}
      <span className="text-2xl font-bold text-pink-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 900,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
  onClick?: () => void;
}) {
  const isVideo = src.toLowerCase().endsWith(".mp4");

  return (
    <div className="flex flex-col items-center my-3 mx-auto" style={{ width: "100%", maxWidth }}>
      <div
        className={`relative rounded-lg shadow border-2 border-pink-300 overflow-hidden bg-black ${
          isVideo ? "" : "cursor-pointer"
        }`}
        style={{ width: "100%" }}
        onClick={!isVideo ? onClick : undefined}
        title={!isVideo && caption ? "クリックで拡大" : undefined}
      >
        {isVideo ? (
          <video
            controls
            preload="metadata"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={maxWidth}
            height={Math.round((maxWidth * 480) / 900)}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        )}
      </div>
      {caption && (
        <div className="bg-pink-50 px-2 py-1 text-xs text-pink-800 border-t border-pink-200 w-full text-center">
          {caption}
        </div>
      )}
    </div>
  );
}

// 画像・動画を最大2枚横並び（以降は改行）
function ImageRow({
  images,
  maxWidth = 480,
  onClick,
}: {
  images: { src: string; alt: string; caption?: string }[];
  maxWidth?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  const chunks: { src: string; alt: string; caption?: string }[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    chunks.push(images.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map((img) => (
            <CaptionedMedia
              key={img.src}
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              maxWidth={maxWidth}
              onClick={
                onClick && !img.src.toLowerCase().endsWith(".mp4")
                  ? () => onClick(img.src, img.alt)
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 拡大モーダル（画像のみ）
function Modal({
  open,
  src,
  alt,
  onClose,
}: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
          <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" style={{ background: "#fff" }} />
        </div>
      </div>
    </div>
  );
}

export default function KailoBrightonZoneEXpointPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  const openModal = (src: string, alt: string) => {
    setModalSrc(src);
    setModalAlt(alt);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalSrc("");
    setModalAlt("");
  };

  return (
    <>
      <Head>
        <title>探索マップ「ロックハート」 | 幻塔攻略データベース</title>
        <meta name="description" content="探索マップ：ロックハート の探索ポイント・掃討リスト等" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <SectionTitle icon="map">ロックハートについて</SectionTitle>
        <div>
          Ver6.0で実装されたロックハートはストーリー進行で入れるようになるマップで、現地通貨はフレイア銀貨。（赦しの天使のフレイヤとはおそらく関係ない）
          <br />
          これまでのマップと違う点として、<span className="font-bold text-orange-600">基礎ステータスが固定・アルケー使用不可</span>となっている。
          <br />
          ボリションは基礎ステータスこそ伸びるがメインの2セット/4セット効果は発動せず、アバター特性も発動しない。
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_1.PNG", alt: "基礎ステータスは固定", caption: "基礎ステータスは固定" },
            {
              src: "/map/Lockhart_EverspringIsland_2.PNG",
              alt: "バフ欄を見てもボリション効果などは発動していない",
              caption: "バフ欄を見てもボリション効果などは発動していない",
            },
          ]}
          onClick={openModal}
        />
        <div>
          Ver6.1以前は<span className="font-bold text-orange-600">ヴェラ時空の武器が強い</span>ように調整がされていたが、Ver6.1からは
          <span className="font-bold text-orange-600">最新武器でもダメージを出せる</span>ようになっている。
          <br />
          アルケーが使用できない代わりにロックハート専用のシステム「
          <span className="font-bold text-orange-600">マキナ・ベスティアリア</span>」が使用可能だぞ！
          <br />
        </div>
        <ImageRow
          images={[
            {
              src: "/map/Lockhart_EverspringIsland_3.mp4",
              alt: "Ver6.1より前はヴェラ武器が強かった",
              caption: "Ver6.1より前はヴェラ武器が強かった",
            },
            {
              src: "/map/Lockhart_EverspringIsland_4.mp4",
              alt: "魔法のような「マキナ・ベスティアリア」が使用可能！",
              caption: "魔法のような「マキナ・ベスティアリア」が使用可能！",
            },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="assignment_turned_in">見えない探索ポイント＆掃討リスト</SectionTitle>
        <div>
          ロックハートにはマップ上に<span className="font-bold text-orange-600">探索ポイントが表示されない</span>探索が存在する。
          <br />
          さすがに情報無しでコンプリートするのは骨が折れるので、掃討リストと併せて画像を掲載する。
          <br />
          画像中のマップピンはそれぞれ、三角矢印マークが風車ギミック、箱マークが鳥ギミック、猪マークが掃討リストとなっている。
          <br />
          なお、風車ギミックはマキナ・ベスティアリアの流風の領域が必要なので持ってない場合は
          <span className="font-bold text-orange-600">まずストーリーを進めよう</span>。
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_5.PNG", alt: "ベルナタウン", caption: "ベルナタウン" },
            { src: "/map/Lockhart_EverspringIsland_6.PNG", alt: "マップ上部", caption: "マップ上部" },
            { src: "/map/Lockhart_EverspringIsland_7.PNG", alt: "マップ左下", caption: "マップ左下" },
            {
              src: "/map/Lockhart_EverspringIsland_8.PNG",
              alt: "「流風の領域」はストーリー進行で入手",
              caption: "「流風の領域」はストーリー進行で入手",
            },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="auto_awesome">マキナ・ベスティアリア</SectionTitle>
        <div>
          ロックハートでのみ使えるアルケーの代わりになるシステム。
          <br />
          ストーリー中に訪れる政務庁のグルマンと会話することで使用可能になる。
          <br />
          元素エナジーをセットすることで対応した技を使用でき、元素エナジーは
          <span className="font-bold text-orange-600">探索値報酬で1個、ストーリー進行で3個</span>入手できる。
          <br />
          一部の探索ギミックではマキナ・ベスティアリアを使用する他、原鉱・原核によってステータスを底上げすることも可能となっている。
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_9.PNG", alt: "グルマンに話しかけて解放", caption: "グルマンに話しかけて解放" },
            {
              src: "/map/Lockhart_EverspringIsland_10.PNG",
              alt: "4種の元素エナジーを使いこなそう！",
              caption: "4種の元素エナジーを使いこなそう！",
            },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="diamond">原鉱と原核加工所</SectionTitle>
        <div>
          ロックハートでは雑魚敵から「<span className="font-bold text-orange-600">原鉱</span>」というアイテムがドロップする。
          <br />
          この原鉱を原核加工所で加工することで、マキナ・ベスティアリアの元素エナジーに装備可能な原核が入手できる。
          <br />
          原核は装備できる元素エナジーの種類と装備スロットの位置、原核の品質、サブステータス2個がランダムで決定される。
          <br />
          これらのランダム要素は原鉱の加工中、徐々に情報が明かされる。
          <br />
          なお、原鉱の雑魚ドロップは<span className="font-bold text-orange-600">1日5個</span>と上限が決まっているので厳選するなら毎日上限まで集めるようにしよう。
          <br />
        </div>
        <ImageRow
          images={[
            {
              src: "/map/Lockhart_EverspringIsland_11.PNG",
              alt: "ネームドの原鉱獣からは確定ドロップ",
              caption: "ネームドの原鉱獣からは確定ドロップ",
            },
            {
              src: "/map/Lockhart_EverspringIsland_12.PNG",
              alt: "ロックハート内限定の厳選要素",
              caption: "ロックハート内限定の厳選要素",
            },
          ]}
          onClick={openModal}
        />
        <div>
          加工所では原鉱を切断する度に完成する原核の情報が明かされ、切断は最大4回まで可能となっている。
          <br />
          情報はまず1回目の切断で候補が表示され、切断する度に候補から絞り込みが行われる。
          <br />
          例として、最初の切断で品質の候補が3つ表示されたなら、2回目の切断で品質が2つに絞り込まれ、3回目で品質が1つに絞られる。
          <br />
          切断中の原鉱は後述のアポロドーム広場で
          <span className="font-bold text-orange-600">他のプレイヤーに販売できる</span>ので、自分の目当てではないが良さそうな石が出来たら取っておくと後で売れるかもしれないぞ！
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_13.PNG", alt: "切断する度に情報が判明", caption: "切断する度に情報が判明" },
            {
              src: "/map/Lockhart_EverspringIsland_14.PNG",
              alt: "良さそうな原鉱は取っておくとお得かも？",
              caption: "良さそうな原鉱は取っておくとお得かも？",
            },
          ]}
          onClick={openModal}
        />
        <div>
          切断のたびに判明する情報の中で特に大事なのが左下の「<span className="font-bold text-orange-600">品質</span>」で、この品質が高いほど
          <span className="font-bold text-orange-600">サブステータスの数値も高くなる</span>ように設定されている。
          <br />
          そのため、厳選をするなら品質が「<span className="font-bold text-orange-600">無キズ</span>」の原鉱をひたすら集める必要があるので、
          <span className="font-bold text-orange-600">無キズ確定</span>または
          <span className="font-bold text-orange-600">無キズ候補</span>の原鉱は価値が高くなる。
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_15.PNG", alt: "無キズはサブステータスが高い", caption: "無キズはサブステータスが高い" },
            {
              src: "/map/Lockhart_EverspringIsland_16.PNG",
              alt: "無キズ候補でも十分価値はある",
              caption: "無キズ候補でも十分価値はある",
            },
          ]}
          onClick={openModal}
        />
        <div>
          原核のサブステータスは品質によって数値固定かつ
          <span className="font-bold text-orange-600">同じ種類のステータスが2つ付く</span>こともある。（1つの原核に会心が2個付いたりする）
          <br />
          ちなみに原鉱は加工所で<span className="font-bold text-orange-600">リサイクルするとフレイア銀貨になる</span>が、無キズ無し確定だと40以下、未加工なら53、無キズ候補なら58～90、
          <span className="font-bold text-orange-600">無キズ確定なら140</span>となっており、無キズになる可能性があるかどうかでかなり価値が変わる。
          <br />
        </div>
        <ImageRow
          images={[
            {
              src: "/map/Lockhart_EverspringIsland_17.PNG",
              alt: "同じステータスが同時に2個付くことも",
              caption: "同じステータスが同時に2個付くことも",
            },
            {
              src: "/map/Lockhart_EverspringIsland_18.PNG",
              alt: "リサイクル目的で買うのもあり？",
              caption: "リサイクル目的で買うのもあり？",
            },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="store">アポロドーム広場</SectionTitle>
        <div>
          ロックハート実装と共にレジャーに追加されたアポロドーム広場では、ロックハートでお店を出す権利を宣伝大使形式で獲得できる。（フレイア銀貨を使った競り）
          <br />
          毎週<span className="font-bold text-orange-600">月曜・金曜の5時～20時</span>に競りが行われ、店を勝ち取った人は原鉱か雑魚ドロップのアイテムを売る店を出店できる。
          店は<span className="font-bold text-orange-600">1人3店舗</span>まで獲得でき、店舗ごとに最初に原鉱と雑魚ドロップのどちらを売るか決定できる。何を売るかは一度決めたら変えられないが、店の名前は今のバージョンの間は自由に変更可能。
          <br />
          お店で売る雑魚ドロップのアイテムは<span className="font-bold text-orange-600">出店した後からドロップする</span>ようになるので事前に集めることは出来ないのと、
          <span className="font-bold text-orange-600">時間経過で消滅する</span>ので次回のために取っておくことも出来ない。
          <br />
        </div>
        <ImageRow
          images={[
            {
              src: "/map/Lockhart_EverspringIsland_19.PNG",
              alt: "お店はチャンネルごとに独立なのでチャンスは多いぞ！",
              caption: "お店はチャンネルごとに独立なのでチャンスは多いぞ！",
            },
            {
              src: "/map/Lockhart_EverspringIsland_20.PNG",
              alt: "雑魚ドロップはお店を出してからドロップするようになる",
              caption: "雑魚ドロップはお店を出してからドロップするようになる",
            },
          ]}
          onClick={openModal}
        />
        <div>
          雑魚ドロップを売れる獲物取引所を作ると<span className="font-bold text-orange-600">獲物バイヤー</span>でフレイア銀貨に交換できるアイテムを他プレイヤーに販売可能になる。
          獲物バイヤーはアポロドーム広場とは別のNPCと取引するお店で、毎日値段が変わる雑魚ドロップを20個まで売ってフレイア銀貨を稼げるようになっている。
          <br />
          店舗を持っていないプレイヤーは<span className="font-bold text-orange-600">自分で雑魚ドロップのアイテムを集めることが出来ない</span>ので、そういうプレイヤーに対して「これくらいなら買っても良いか」と思えるような値段でアイテムを売って稼ぐ王道の取引所となっている。
          <br />
          当然、店舗を持っているプレイヤーは自分で雑魚を狩って獲物バイヤーに売りつけることもできる。
          <br />
          なお、獲物バイヤーで売れるアイテムの値段は<span className="font-bold text-orange-600"> 毎日変化＆プレイヤー毎に違う </span>ので大体の値段を予想して売るようにしよう。
          <br />
        </div>
        <ImageRow
          images={[
            {
              src: "/map/Lockhart_EverspringIsland_21.PNG",
              alt: "NPCの獲物バイヤーと密接に関わる店舗",
              caption: "NPCの狩猟取引所と密接に関わる店舗",
            },
            {
              src: "/map/Lockhart_EverspringIsland_22.PNG",
              alt: "値段はプレイヤー毎に違う",
              caption: "値段はプレイヤー毎に違う",
            },
          ]}
          onClick={openModal}
        />
        <div>
          原鉱を売れる原鉱取引所を作ると<span className="font-bold text-orange-600">毎日20個</span>の原鉱を獲得できる。そしてこれは1店舗ごとに20個獲得できるので、3店舗の原鉱ショップを作ったら
          <span className="font-bold text-orange-600">毎日60個</span>の原鉱を獲得可能になる。
          <br />
          厳選をするなら原鉱自体が貴重なのに加え、厳選をしない人も未加工の原鉱20個をリサイクルするだけで毎日1000以上のフレイア銀貨を得られる。そのため、原鉱ショップは1店舗出すだけで3日で
          <span className="font-bold text-orange-600">原鉱60個 or 3000フレイア銀貨</span>を回収できる破格の店舗となっている。
          <br />
        </div>
        <ImageRow
          images={[
            { src: "/map/Lockhart_EverspringIsland_23.PNG", alt: "毎日20個の原鉱が貰える", caption: "毎日20個の原鉱が貰える" },
            {
              src: "/map/Lockhart_EverspringIsland_24.PNG",
              alt: "正直、自分が稼ぐのが目的なら原鉱ショップだけで良いレベルで破格",
              caption: "正直、自分が稼ぐのが目的なら原鉱ショップだけで良いレベルで破格",
            },
          ]}
          onClick={openModal}
        />

        <Modal open={modalOpen} src={modalSrc} alt={modalAlt} onClose={closeModal} />
      </div>
    </>
  );
}

KailoBrightonZoneEXpointPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};