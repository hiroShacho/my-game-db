import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import points from '@/data/maps/kailo_BrightonZone_points.json';
import type { Point } from '@/components/maps/ExplorationMap';

const ExplorationMap = dynamic(() => import('@/components/maps/ExplorationMap'), { ssr: false });

// セクションタイトル（見本に合わせた装飾）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-pink-300/60 to-pink-50 border-l-8 border-pink-500 rounded px-4 py-2 my-5 shadow">
      {icon && <span className="material-symbols-outlined text-pink-600 text-2xl">{icon}</span>}
      <span className="text-2xl font-bold text-pink-900">{children}</span>
    </div>
  );
}

// キャプション付き画像（クリックで拡大）
function CaptionedImage({
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
  return (
    <div className="flex flex-col items-center my-3 mx-auto" style={{ width: "100%", maxWidth }}>
      <div
        className="relative rounded-lg shadow border-2 border-pink-300 overflow-hidden bg-black cursor-pointer"
        style={{ width: "100%" }}
        onClick={onClick}
        title={caption ? "クリックで拡大" : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={maxWidth}
          height={Math.round((maxWidth * 480) / 900)}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {caption && (
        <div className="bg-pink-50 px-2 py-1 text-xs text-pink-800 border-t border-pink-200 w-full text-center">
          {caption}
        </div>
      )}
    </div>
  );
}

// 画像を最大2枚横並び（以降は改行）
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
            <CaptionedImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              maxWidth={maxWidth}
              onClick={onClick ? () => onClick(img.src, img.alt) : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 拡大モーダル
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
        <title>探索マップ「キルオ：ブライトン区」 | 幻塔攻略データベース</title>
        <meta name="description" content="探索マップ：キルオ ブライトン区 の探索ポイント・掃討リスト等" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">map</span>
          探索マップ「キルオ：ブライトン区」
        </h1>

        <SectionTitle icon="track_changes">探索マップ</SectionTitle>

        {/* 見本パターンに合わせた地図ツールの表示 */}
        <div className="my-4">
          <ExplorationMap
            mapId="kailo_BrightonZone"
            imageUrl="/map/kailo_BrightonZone.png"
            imageWidth={1050}
            imageHeight={850}
            points={points as Point[]}
          />
        </div>

        <SectionTitle icon="assignment_turned_in">掃討リスト</SectionTitle>
        <div>
          ブライトン区の1層に4体（ワールドボスを含む）、2層には3体のネームドがいる。<br />
          1層は普通に戦う敵だが2層のネームドはメカに乗って戦うものになっている。<br />
          また、1層のネームドは建物の壁にある入り口から入れる小部屋におり、2層では普段は戦闘態勢になっておらず話しかけると戦闘が始まる。
        </div>
        <ImageRow
          images={[
            { src: "/map/BrightonZone_TargetList_1.PNG", alt: "1層のネームドの位置", caption: "1層のネームドの位置" },
            { src: "/map/BrightonZone_TargetList_2.PNG", alt: "2層のネームドの位置", caption: "2層のネームドの位置" },
            { src: "/map/BrightonZone_TargetList_3.PNG", alt: "1層のネームドは小部屋の中にいる", caption: "1層のネームドは小部屋の中にいる" },
            { src: "/map/BrightonZone_TargetList_4.PNG", alt: "2層のネームドは話しかけると戦闘", caption: "2層のネームドは話しかけると戦闘" },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="store">星間探検値</SectionTitle>
        <div>
          ブライトン区での星間探検値の提出場所は2層にある。
        </div>
        <ImageRow
          images={[
            { src: "/map/BrightonZone_StellarSeekers_1.PNG", alt: "提出場所は2層の転送ゲート前", caption: "提出場所は2層の転送ゲート前" },
            { src: "/map/BrightonZone_StellarSeekers_2.PNG", alt: "今回は探索のみでMAXになるぞ！（サブクエスト不要）", caption: "今回は探索のみでMAXになるぞ！（サブクエスト不要）" },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="store">アイテム商店</SectionTitle>
        <div>
          クレジットを使ってアイテムを購入できる商店が5カ所存在する。
        </div>
        <CaptionedImage
          src="/map/BrightonZone_shop.PNG"
          alt="中心部の両サイドに商店がある"
          caption="中心部の両サイドに商店がある"
          onClick={() => openModal("/map/BrightonZone_shop.PNG", "中心部の両サイドに商店がある")}
        />
        <div>
          持続の長いバフのチョコレートや乗り物の車いす、宇宙支援システムで使えるゼロコア等魅力的なラインナップとなっている。
        </div>
        <ImageRow
          images={[
            { src: "/map/BrightonZone_shop_1.PNG", alt: "ショコラ工房には持続の長いバフが売っている", caption: "ショコラ工房には持続の長いバフが売っている" },
            { src: "/map/BrightonZone_shop_2.PNG", alt: "ベイツの宿屋には変身注射とVIPカードが売っている", caption: "ベイツの宿屋には変身注射とVIPカードが売っている" },
            { src: "/map/BrightonZone_shop_3.PNG", alt: "メカコア部品には乗り物と整備パーツが売っている", caption: "メカコア部品には乗り物と整備パーツが売っている" },
            { src: "/map/BrightonZone_shop_4.PNG", alt: "ゼロコア購買所にはゼロコアとレッドコアが売っている", caption: "ゼロコア購買所にはゼロコアとレッドコアが売っている" },
            { src: "/map/BrightonZone_shop_5.PNG", alt: "ブライトン美食特区には美味しそうな食事が売っている", caption: "ブライトン美食特区には美味しそうな食事が売っている" },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="terrain">オーディン酒場</SectionTitle>
        <div>
          1層のマップ南東にあるオーディン酒場では2種類のミニゲームが遊べる。<br />
          AIのラナと同じダンスをタイミング良く踊るファントムビートと、カードの数値で陣取りをする表裏闘争で遊べるぞ！<br />
          どちらのミニゲームも専用のポイントが貰えて、近くの交換所でレッドコアと交流アクションが購入できる。<br />
          ポイントは1日に稼げる上限が1000ポイントとなっているので、全ての報酬を交換するのに最低でも14日かかるようになっている。<br />
          ダンスは1人で出来る代わりに1000ポイント貰えるパーフェクトクリアが少し難しく、カードは談合が可能だが勝者しかポイントが貰えず一度に500ポイントなのでどうしてもダンスが出来ない場合に利用しよう。
        </div>
        <ImageRow
          images={[
            { src: "/map/BrightonZone_Odin_1.PNG", alt: "ブライトン区1層の南東にあるオーディン酒場で遊べる", caption: "ブライトン区1層の南東にあるオーディン酒場で遊べる" },
            { src: "/map/BrightonZone_Odin_2.PNG", alt: "ラナのダンスを真似するファントムビート", caption: "ラナのダンスを真似するファントムビート" },
            { src: "/map/BrightonZone_Odin_3.PNG", alt: "カードで陣取りをする表裏闘争", caption: "カードで陣取りをする表裏闘争" },
            { src: "/map/BrightonZone_Odin_4.PNG", alt: "交換所ではレッドコアと交流アクションが貰えるぞ！", caption: "交換所ではレッドコアと交流アクションが貰えるぞ！" },
          ]}
          onClick={openModal}
        />

        <SectionTitle icon="terrain">ケイジアビス</SectionTitle>
        <div>
          2層ではメカに乗って挑むソロコンテンツ「ケイジアビス」が遊べる。<br />
          エリアはスタート地点と1～3層の戦闘エリアで構成されており、1層から3層まで降りた後に再びスタート地点がある1層まで戻って再び1層から3層を目指すという流れを繰り返す。<br />
          全27階の戦闘を超えるとクリアとなり報酬としてメカの強化素材とレッドコア、煙水晶が貰える。<br />
          報酬に演算データ等の育成に使うアイテムが無い上に、探索の進捗にも関わらないので興味がない人はスルーしてしまってもOK。<br />
          なお、月替わりでクリアタイムを競うランキングが存在し、1～5位には専用の称号が用意されている。
        </div>
        <ImageRow
          images={[
            { src: "/map/BrightonZone_HangarAbyss_1.PNG", alt: "ブライトン区2層で遊べる", caption: "ブライトン区2層で遊べる" },
            { src: "/map/BrightonZone_HangarAbyss_2.PNG", alt: "ランキングや報酬などはここの画面で見れる", caption: "ランキングや報酬などはここの画面で見れる" },
            { src: "/map/BrightonZone_HangarAbyss_3.PNG", alt: "ランキングで貰える称号一覧", caption: "ランキングで貰える称号一覧" },
            { src: "/map/BrightonZone_HangarAbyss_4.PNG", alt: "称号は非常によく目立つ", caption: "称号は非常によく目立つ" },
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