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
        <title>イベント「夏の叙事詩」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「夏の叙事詩」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「夏の叙事詩」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="夏の叙事詩 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="💸">競売大作戦（一撃落札、4人マッチ）【9/15～10/20】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="競売大作戦"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          4人マッチの一撃落札。<br />
          競売品に対してひたすら入札を入れて最高額を出した人が勝つゲーム。<br />
          入札時に表示される「2位の〇倍の入札額でオークションに勝利」の条件を満たすとその時点で勝者が決定する。<br />
          1ターン目は様子見して、2ターン目で一気に決めるのが良いかもしれない。<br />
          お供のキャラには品総件数が分かるハルモフェウスを採用すると大まかな価格を予想できるかも？<br />
          なお、イベントポイントは競売で競り落としたアイテムをミニゲームのページにある倉庫から売却することで獲得できる。<br />
        </div>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1_1.PNG"
            alt="新衣装"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <SectionTitle icon="💣">爆撃アリーナ（爆弾PVP、8人マッチ）【9/24～10/20】</SectionTitle>
        <div>
          8人マッチの爆弾PVP。<br />
          溶岩爆弾などを相手の陣地に投げつけて足場を崩して落下を狙おう。<br />
          設置されている爆弾は範囲が広いが投げるまでの隙が大きかったり溶岩爆弾で迎撃されたりするので注意。<br />
          やろうと思えば設置されている爆弾の周りを破壊して孤立させることも可能。（相手の攻撃手段が減る）<br />
        </div>

        <SectionTitle icon="🧟">異化の危機（感染鬼ごっこ、8人マッチ）【10/2～10/20】</SectionTitle>
        <div>
          8人マッチの増やし鬼。<br />
          ミュータントに攻撃されると感染して鬼になるのでひたすら逃げ続けよう。<br />
          逃げる側は遠距離武器による攻撃が可能な他、時間切れ付近になるとメリルアムドに変身して戦えたりする。<br />
        </div>

        <SectionTitle icon="🌟">星の砂リサイクル（収集PVP、8人マッチ）【10/9～10/20】</SectionTitle>
        <div>
          8人マッチのアイテム収集速度を競うPVP。<br />
          Mi-a等に変身してマップ上に落ちている星の砂を拾い集めてマップ中央に放出するとポイントを獲得できる。<br />
          スピードアップのアイテムを複数獲得するととんでもない速度でフィールドを駆けまわれて操作が楽しいぞ！<br />
        </div>


      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};