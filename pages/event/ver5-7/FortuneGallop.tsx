import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-pink-300/60 to-pink-50 border-l-8 border-pink-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-pink-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-pink-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 480,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
}) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div
      className="flex flex-col items-center my-3 mx-auto"
      style={{ width: "100%", maxWidth }}
    >
      <div
        className="rounded-lg shadow border-2 border-pink-300 overflow-hidden bg-black mx-auto"
        style={{ width: "100%" }}
      >
        {isVideo ? (
          <video controls width={maxWidth} height={270} style={{ width: "100%", height: "auto" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={maxWidth}
            height={270}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        <div className="bg-pink-50 px-2 py-1 text-xs text-pink-800 border-t border-pink-200 w-full text-center">
          {caption}
        </div>
      </div>
    </div>
  );
}

// 画像・動画を最大2枚ずつ横並び（以降は改行）
function RowMedia({
  items,
}: {
  items: { src: string; alt: string; caption: string }[];
}) {
  // chunk into arrays of length 2
  const chunks: { src: string; alt: string; caption: string }[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    chunks.push(items.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map((item) => (
            <CaptionedMedia key={item.src} {...item} maxWidth={480} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BrightonsSalvationPage() {
  return (
    <>
      <Head>
        <title>イベント「駿馬踏福」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「駿馬踏福」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「駿馬踏福」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="駿馬踏福 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="celebration">迎春祝い【3/10～4/14】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="迎春祝い"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          特定のワールドボスが普段とは違うモンスターに置き換わるイベント。<br />
          ボス箱を開けるとアクセサリーの欠片が貰えたりするのでキャラクリが好きな人はボス周回をしておこう。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "ボスが通常とは違うモンスターに変化！",
              caption: "ボスが通常とは違うモンスターに変化！",
            },
            {
              src: "/ver_event/New_Event_1_2.PNG",
              alt: "ボス箱から欠片を集めよう",
              caption: "ボス箱か  欠片を集めよう",
            },
          ]}
        />

        <SectionTitle icon="🎡">新春の炎火【3/10～4/14】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_2.PNG"
            alt="新春の炎火"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          一定時間ごとに開催される花火イベント。<br />
          いくつかのマップに用意された花火会場ではプレゼントボックスを開封でき、基本的にはこの箱を毎日開封しているだけでイベント通貨は溜まるようになっている。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_2_1.PNG",
              alt: "各地のイベントポイントに箱が出現",
              caption: "各地のイベントポイントに箱が出現",
            },
            {
              src: "/ver_event/New_Event_2_2.PNG",
              alt: "イベント通貨はこのイベントだけでも十分に集まる",
              caption: "イベント通貨はこのイベントだけでも十分に集まる",
            },
          ]}
        />

        <SectionTitle icon="sports_motorsports">喜楽カーニバル【3/13～4/14】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_3.PNG"
            alt="喜楽カーニバル"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ミラポリスで遊べる各種ミニゲームに報酬がつくイベント。<br />
          アミューズランドで遊べるミニゲームの中だとサッカーの森が一番効率よく稼げる。（一度ゴールを決めたら後は負ければよい）<br />
          何故かWarpサーバーではポイントを稼げないので他のイベントを優先しよう。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_3_1.PNG",
              alt: "慣れればサッカーの森が早い",
              caption: "慣れればサッカーの森が早い",
            },
            {
              src: "/ver_event/New_Event_3_2.PNG",
              alt: "Warpサーバーでは麻雀とポーカーが遊べない",
              caption: "Warpサーバーでは麻雀とポーカーが遊べない",
            },
          ]}
        />

        <SectionTitle icon="🎣">福釣り【3/25～4/14】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_4.PNG"
            alt="福釣り"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          特定の時間に釣りエリアに錦鯉が出現するようになる。<br />
          釣った錦鯉は専用の商店でアイテムと交換するための通貨として使用できる。<br />
          エントリー時間が短めなので忘れずにエントリーするようにしよう。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_4_1.PNG",
              alt: "専用の商店がある",
              caption: "専用の商店がある",
            },
          ]}
        />

        <SectionTitle icon="⚔️">構築バトル（8人マッチ）【3/31～4/14】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_5.PNG"
            alt="構築バトル"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ミニゲーム内の通貨を使って武器とアルケーを購入して戦うPVEコンテンツ。<br />
          通貨は武器・アルケーの購入の他に、ショップに出てくる武器をより良いものにできるアップグレードにも使用する。<br />
          基本的には序盤は適当な武器で戦って、最速で最高ランクの武器を手に入れるのが強い。<br />
          今回は天賦カードという新システムでバフが獲得できる。<br />
          天賦カードは獲得通貨が増えるバフを序盤に取って最速でショップをアップグレードするのが良さそう。<br /><br />
          Warpサーバーではしっかりバフを発動させないとステージ7にいくことすら難しい。<br />
          各ロール(強攻・剛毅・恩恵)をバランス良く取りつつ、剛毅3本・各ロール3本ずつのバフを発動させよう。
        </div>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_5_1.PNG"
            alt="構築バトル"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_5_2.PNG",
              alt: "今回は戦闘後に天賦カードでバフを獲得できる",
              caption: "今回は戦闘後に天賦カードでバフを獲得できる",
            },
            {
              src: "/ver_event/New_Event_5_3.mp4",
              alt: "最後は速度勝負になるのでヘレンネをアルケーでバフして一瞬で終わらせよう",
              caption: "最後は速度勝負になるのでヘレンネをアルケーでバフして一瞬で終わらせよう",
            },
          ]}
        />
      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};