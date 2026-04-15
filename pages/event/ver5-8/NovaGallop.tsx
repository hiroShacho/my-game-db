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
        <title>イベント「春の駆け馬」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「春の駆け馬」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「春の駆け馬」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="春の駆け馬 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="💽">追憶の連なり（4人マッチ）【4/14～5/19】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="追憶の連なり"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          メモリーチップを装備して駐屯スフィアと戦うイベント。<br />
          前提クエストとしてゴゾトスで受けられるサブクエが出現しているのでまずはそれを終わらせよう。（前回開催時にやっていれば最初からマッチング可能）<br />
          メモリーチップを全種類集めれば称号も貰えるので頑張ってスフィアを周回しよう。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "ボスは非常に弱い",
              caption: "ボスは非常に弱い",
            },
          ]}
        />

        <SectionTitle icon="🃏">神算鬼謀（2人マッチ）【4/21～5/19】</SectionTitle>
        <div>
          5体のモンスターをランダムに選んでそれを戦わせる1対1のバトル。<br />
          ランダム性が強く、強いカードを多く引けた方が勝ちやすいので運ゲーではある。<br />
          強いカードを引けても弱いカードをぶつけられると無駄になるので相手の動きを予想する戦略は必要だぞ！<br />
        </div>

        <SectionTitle icon="🔫">弾雨激闘（8人マッチ）【4/28～5/19】</SectionTitle>
        <div>
          4体4の銃撃オンリーのPVP。<br />
          アナベラの狙撃やフレイムリボルバーの空中狙撃連打が非常に強く、金武器を拾えたら相手によっては無双できる。<br />
          基本的には数が多い方が勝つので集団行動を心掛けるようにしよう。<br />
          前回と同じなら強力な金武器の出現位置は固定になっている。<br />
          プレイヤースキルが出やすい上に銅貨を賭けた戦いになるので始まってすぐの情報把握を忘れずに。<br />
        </div>

        <SectionTitle icon="🔽">床ドンバトル（2人マッチ）【5/5～5/19】</SectionTitle>
        <div>
          Mi-aになって光ったスイッチを踏みまくるゲーム。<br />
          スイッチを踏むと対戦相手のエリアにレーザーが発生するので連続してスイッチを踏んで相手を倒そう。<br />
          相手がスイッチを踏んで飛んできたレーザーはジャンプで避けられるので、どちらが先にライフを失うかのデスマッチになる。
        </div>
      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};