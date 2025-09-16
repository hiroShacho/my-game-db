import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";

// 拡大画像モーダル
function Modal({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  if (!open) return null;
  const isVideo = !!src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg flex flex-col items-center justify-center max-w-[98vw] max-h-[98vh]"
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
        <div className="relative w-[90vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] min-h-[200px] max-h-[80vh] flex items-center justify-center">
          {isVideo ? (
            <video src={src} controls style={{ width: "100%", height: "100%" }}>
              {alt}
            </video>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              style={{ background: "#fff" }}
              sizes="100vw"
              priority={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// キャプション付き画像（クリックで拡大）
function CaptionedImage({
  src,
  alt,
  caption,
  w = 480,
  h = 270,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}) {
  const isVideo = !!src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="flex flex-col items-center my-4 w-full">
      <div
        className="relative rounded-lg shadow border-2 border-blue-300 overflow-hidden bg-white cursor-pointer"
        style={{
          width: w,
          maxWidth: "98vw",
          aspectRatio: `${w} / ${h}`,
          background: "#fff",
        }}
        onClick={onClick}
        title="クリックで拡大"
      >
        {isVideo ? (
          <video src={src} controls style={{ width: "100%", height: "100%" }} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
          />
        )}
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
          クリックで拡大
        </span>
      </div>
      <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center max-w-xl">
        {caption}
      </div>
    </div>
  );
}

// 画像を横並び（クリックで拡大）
function RowImages({
  images,
  w = 350,
  h = 200,
  onClick,
}: {
  images: { src: string; alt: string; caption: string }[];
  w?: number;
  h?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
      {images.slice(0, 2).map((img) => {
        const isVideo = !!img.src.match(/\.(mp4|webm|ogg)$/);
        return (
          <div key={img.src} className="flex flex-col items-center">
            <div
              className="relative rounded-lg shadow border-2 border-blue-200 overflow-hidden bg-white cursor-pointer"
              style={{
                width: w,
                maxWidth: "96vw",
                aspectRatio: `${w} / ${h}`,
                background: "#fff",
              }}
              onClick={() => onClick && onClick(img.src, img.alt)}
              title="クリックで拡大"
            >
              {isVideo ? (
                <video
                  src={img.src}
                  controls
                  style={{ width: "100%", height: "100%" }}
                  poster=""
                >
                  {img.alt}
                </video>
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
              <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
                クリックで拡大
              </span>
            </div>
            <div className="bg-blue-50 px-2 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center max-w-xs">
              {img.caption}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 報酬ありマーク
function RewardBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full ml-2">
      報酬あり
    </span>
  );
}

// セクションタイトル
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-300/60 to-blue-50 border-l-8 border-blue-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-blue-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-blue-900">{children}</span>
    </div>
  );
}

export default function TriviaPage() {
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

  // 報酬ありコンテンツ
  const rewardList = [
    "連合作戦",
    "人工島建築",
    "幻影の序列",
    "討伐作戦",
    "異空間狩猟場",
    "先鋒クラッシュ",
    "虚空のアビス",
    "終焉試練",
    "起源の戦域",
    "進化辺境",
  ];

  // 解放コンテンツリスト
  const contentTable = [
    {
      level: "レベル20～29",
      contents: [
        { name: "連合作戦", reward: true },
        { name: "次元の試練", reward: false },
      ],
    },
    {
      level: "レベル30～39",
      contents: [
        { name: "PVPコンテンツ（運命の包囲網、トップリーグ、臨界の淵）", reward: false },
      ],
    },
    {
      level: "レベル40～49",
      contents: [],
    },
    {
      level: "レベル50～59",
      contents: [
        { name: "人工島", reward: false },
        { name: "幻影の序列", reward: true },
      ],
    },
    {
      level: "レベル60～69",
      contents: [
        { name: "討伐作戦", reward: true },
        { name: "人工島建築", reward: true },
      ],
    },
    {
      level: "レベル70～79",
      contents: [
        { name: "異空間狩猟場", reward: true },
      ],
    },
    {
      level: "レベル80～89",
      contents: [
        { name: "超速演算", reward: false },
        { name: "先鋒クラッシュ", reward: true },
        { name: "虚空のアビス", reward: true },
        { name: "終焉試練", reward: true },
        { name: "起源の戦域", reward: true },
      ],
    },
    {
      level: "レベル90～99",
      contents: [
        { name: "防具突破", reward: false },
        { name: "進化辺境", reward: true },
      ],
    },
    {
      level: "レベル100",
      contents: [],
    },
  ];

  return (
    <>
      <Head>
        <title>豆知識・知っておくと得すること | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の育成や報酬、PVP、ボスなど知っておくと得する豆知識をまとめて解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">lightbulb</span>
          豆知識・知っておくと得すること
        </h1>

        {/* 各レベルで解放されるコンテンツ */}
        <SectionTitle icon="table_chart">各レベルで解放されるコンテンツ</SectionTitle>
        <div className="mb-4 text-base text-gray-800">
          特に育成に関わる報酬があるコンテンツには
          <span className="inline-flex items-center px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full mx-1">
            報酬あり
          </span>
          のマークを付けています。
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm border border-blue-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="px-4 py-2 border-r border-blue-300">レベル帯</th>
                <th className="px-4 py-2">コンテンツ</th>
              </tr>
            </thead>
            <tbody>
              {contentTable.map(row => (
                <tr key={row.level} className="border-t border-blue-200">
                  <td className="px-4 py-2 font-semibold border-r border-blue-100">{row.level}</td>
                  <td className="px-4 py-2">
                    {row.contents.length === 0 ? (
                      <span className="text-gray-400">（なし）</span>
                    ) : (
                      <ul>
                        {row.contents.map(content => (
                          <li key={content.name} className="mb-1">
                            {content.name}
                            {content.reward && <RewardBadge />}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 人工島についての説明 */}
        <div className="mb-6">
          <SectionTitle icon="home">人工島について</SectionTitle>
          <div className="mb-4">
            レベル50で解放される人工島はアーシャ・ベンジスでカレイドの話を聞いた後に飛行機に乗って移動できる。<br />
            この人工島の探索値を840まで上げるかレベル60になったタイミングで人工島建築が解放される。<br />
            ワールドマップの人工島と人工島建築で入れる人工島は別扱いで、ワールドマップの方は探索があるが人工島建築の方は探索が無く施設の増築で報酬を得る形式になっている。<br />
            人工島建築の工房では専用のアイテムを消費してSSRボリションガチャを引けるぞ！
          </div>
          <RowImages
            images={[
              {
                src: "/Newbie/trivia/trivia_island1.PNG",
                alt: "レベル50でベンジスにクエストが出現",
                caption: "レベル50でベンジスにクエストが出現",
              },
              {
                src: "/Newbie/trivia/trivia_island2.PNG",
                alt: "探索値を上げるかレベルを上げて人工島建築を解放しよう！",
                caption: "探索値を上げるかレベルを上げて人工島建築を解放しよう！",
              },
            ]}
            w={350}
            h={200}
            onClick={openModal}
          />
          <RowImages
            images={[
              {
                src: "/Newbie/trivia/trivia_island3.PNG",
                alt: "人工島建築にはレジャーから入ろう！",
                caption: "人工島建築にはレジャーから入ろう！",
              },
              {
                src: "/Newbie/trivia/trivia_island4.PNG",
                alt: "「進む」を押すと人工島に入れる",
                caption: "「進む」を押すと人工島に入れる",
              },
            ]}
            w={350}
            h={200}
            onClick={openModal}
          />
          <RowImages
            images={[
              {
                src: "/Newbie/trivia/trivia_island5.PNG",
                alt: "人工島建築に入ってから工房を選択しよう",
                caption: "人工島建築に入ってから工房を選択しよう",
              },
              {
                src: "/Newbie/trivia/trivia_island6.PNG",
                alt: "工房でSSRボリションを作成できるぞ！",
                caption: "工房でSSRボリションの作成ガチャができるぞ！",
              },
            ]}
            w={350}
            h={200}
            onClick={openModal}
          />
        </div>

        {/* ■チャットスタンプの開放 */}
        <SectionTitle icon="chat">チャットスタンプの開放</SectionTitle>
        <div className="mb-4 text-base text-gray-800">
          チャットで使えるスタンプはゲーム内通貨を使って購入することで開放できる。<br />
          要求量は多いが無課金でも手に入るので余裕があれば集めていこう！
        </div>
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow border border-blue-200 bg-black mb-2 mx-auto">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/DXjvqnHv7kM?list=PLKua5tWzOdfVQEJsWjMY2GOhTlXzF643d"
            title="チャットスタンプの開放"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "12px",
              background: "#000",
              minHeight: "220px",
            }}
          />
        </div>
        <div className="text-xs text-blue-700 text-center mb-6">
          動画解説：チャットスタンプの開放方法（クリックで再生）
        </div>

        <SectionTitle icon="key">暗号BOXの鍵はヴェラで使おう！</SectionTitle>
        <div className="mb-4 text-base text-gray-800">
          暗号BOXを開けるための鍵は時空ごとに種類が分かれているが、アーシャとヴェラだけは共通のモノになっている。<br />
          アーシャに比べてヴェラの暗号BOXからはミランが出てくるため、アーシャでは鍵を使わずにヴェラで箱を開けるようにしよう！
        </div>
        <CaptionedImage
          src="/Newbie/trivia/trivia_key.PNG"
          alt="アーシャ・ヴェラ共通の鍵はヴェラで使おう！"
          caption="アーシャ・ヴェラ共通の鍵はヴェラで使おう！"
          onClick={() => openModal("/Newbie/trivia/trivia_key.PNG", "アーシャ・ヴェラ共通の鍵はヴェラで使おう！")}
        />

        {/* ワールドボスの突破モジュール選択箱 */}
        <SectionTitle icon="box">ワールドボスの突破モジュール選択箱は毎週20個獲得できる</SectionTitle>
        <div className="mb-4">
          ワールドボスの箱からは強制解読で突破モジュール選択箱が手に入る。<br />
          説明には毎週最大10個までと書かれているが、ゴゾトスの地馳までのボスは選択箱Ⅲなのに対して地馳より後のボスは選択箱Ⅵとなっている。<br />
          そのため、選択箱Ⅲと選択箱Ⅵをそれぞれ10個ずつ集めることで合計20個の突破モジュール選択箱を毎週獲得できる。<br />
          ちなみに2つの選択箱の中身は同じとなっている。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/trivia/trivia_bosstitan1.PNG",
              alt: "地馳までのボスの選択箱",
              caption: "地馳までのボスの選択箱",
            },
            {
              src: "/Newbie/trivia/trivia_bosstitan2.PNG",
              alt: "地馳より後のボスの選択箱",
              caption: "地馳より後のボスの選択箱",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />

        {/* PVPコンテンツ */}
        <SectionTitle icon="sports_martial_arts">PVPコンテンツは毎月1回参加しておくとお得</SectionTitle>
        <div className="mb-4">
          PVPコンテンツの運命の包囲網は毎月1回参加しておくと月が変わるタイミングでシーズン報酬が貰える。<br />
          戦績によって上がるランクごとに報酬が貰えるのだが、PVPは特殊な仕様が多く初見殺しが多いので初心者が育つ土壌は出来ていない。<br />
          月が替わったら1回参加して報酬だけ貰うのが精神衛生上良いとされている。<br /><br />
          トップリーグについてもランクで報酬が貰えるが、こちらは一度参加したら以降の月は放置でもOK。<br />
          放置だとランクは下がっていくが、士官～指揮官を維持していればそこまで報酬は変わらない上にランクも一気に下がりはしない。<br />
          知識と武器の所持状況は影響するが、いずれトップリーグに関する記事も作成するのでとりあえず1回参加だけはしておこう。<br /><br />
          臨界の淵はトップリーグとランキングおよび報酬が連動しているのでトップリーグをやっていれば報酬は貰える。<br />
          というかPVPで16人集めること自体が非常にハードルが高いので基本はスルーでOK。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/trivia/trivia_PVP1.PNG",
              alt: "運命の包囲網のランク報酬",
              caption: "運命の包囲網のランク報酬",
            },
            {
              src: "/Newbie/trivia/trivia_PVP2.PNG",
              alt: "トップリーグ&臨界の淵のランク報酬",
              caption: "トップリーグ&臨界の淵のランク報酬",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />

        {/* 灰蝕値（グレイバイト）に気を付けよう！ */}
        <SectionTitle icon="warning">灰蝕値（グレイバイト）に気を付けよう！</SectionTitle>
        <div className="mb-4">
          ヴェラ編実装以降、一部の敵がグレイバイトという効果を所持するようになった。<br />
          この効果を持った敵から攻撃を受けると灰蝕値ゲージが溜まっていき、このゲージが満タンになるとあらゆるバフが解除される上に即死級の大ダメージを受ける。<br />
          基本的に一部の武器に付いている死亡回避効果が無ければ灰蝕値が満タンになった時点で即死が確定するので、グレイバイト効果を持った敵の攻撃は極力受けないように立ち回ろう。<br />
          灰蝕値は時間経過意外に一部の武器で減少させることが可能だが、強攻においてはフィオナの回避と連携スキルの回復でしか減少できない。<br />
          恩恵であればブレヴィとグレイフォックスの回復効果と連携スキルに自身と味方の灰蝕値を減少させる効果が付いているので、基本的に灰蝕値の回復は恩恵頼りになる。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/trivia/trivia_grayingbite1.PNG",
              alt: "バフ解除・即死ダメージ・バフ無効の効果が発動する",
              caption: "バフ解除・即死ダメージ・バフ無効の効果が発動する",
            },
            {
              src: "/Newbie/trivia/trivia_grayingbite2.mp4",
              alt: "灰蝕値が満タンになると基本的には即死する",
              caption: "灰蝕値が満タンになると基本的には即死する",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />

        {/* 活躍値・ギルドクエスト「在りし日の幻に参加」は出入りするだけで良い */}
        <SectionTitle icon="exit_to_app">活躍値ミッションとギルドクエストの「在りし日の幻に参加」は出入りするだけで良い</SectionTitle>
        <div className="mb-4">
          毎週の活躍値のミッションとギルドクエストで出現する「在りし日の幻に参加する」は在りし日の幻に入ったら即抜けてしまっても達成になる。<br />
          敵と戦うどころか戦闘開始をする必要すらないのでこの手の挑戦の中では一番楽と言える。
        </div>
        <CaptionedImage
          src="/Newbie/trivia/trivia_bygone.PNG"
          alt="コンテンツに入ったら即抜けでOK！（ステージ中央に行って戦闘開始する必要すらない）"
          caption="コンテンツに入ったら即抜けでOK！（ステージ中央に行って戦闘開始する必要すらない）"
          onClick={() => openModal("/Newbie/trivia/trivia_bygone.PNG", "コンテンツに入ったら即抜けでOK！（ステージ中央に行って戦闘開始する必要すらない）")}
        />

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

TriviaPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};