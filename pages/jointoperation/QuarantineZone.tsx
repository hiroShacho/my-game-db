import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-sky-300/60 to-sky-50 border-l-8 border-sky-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-sky-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-sky-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 500,
}: {
  src: string;
  alt: string;
  caption: string;
  maxWidth?: number;
}) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div
      className="flex flex-col items-center my-3 mx-auto"
      style={{ width: "100%", maxWidth }}
    >
      <div
        className="rounded-lg shadow border-2 border-sky-300 overflow-hidden bg-black mx-auto"
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
        <div className="bg-sky-50 px-2 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center">
          {caption}
        </div>
      </div>
    </div>
  );
}

// 画像・動画2つ横並び
function RowMedia({
  items,
}: {
  items: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3 w-full">
      {items.map((item) => (
        <CaptionedMedia key={item.src} {...item} maxWidth={500} />
      ))}
    </div>
  );
}

export default function QuarantineZonePage() {
  return (
    <>
      <Head>
        <title>連合作戦「隔離区域」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「隔離区域」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-sky-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500">coronavirus</span>
          連合作戦「隔離区域」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_QuarantineZone.PNG"
            alt="隔離区域 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* ダンジョン構成 */}
        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          最初の部屋とその隣の部屋にミュータントが4体ずついる。<br />
          それらを倒すと通路への道が開き、梯子を上って階段の先の扉の前につくと
          扉を巨大ミュータントが突進で破壊する。<br />
          この巨大ミュータントと破壊された扉の先の敵を一掃することで広場への道が開ける。<br />
          広場にいる数体の敵と提督・ハバカを倒すとバルバロッサが出現する。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_QuarantineZone_1.PNG",
              alt: "最初の部屋の敵もしっかり倒すこと",
              caption: "最初の部屋の敵もしっかり倒すこと",
            },
            {
              src: "/JointOperation/jo_QuarantineZone_2.mp4",
              alt: "階段にいる敵はスルーしてOK",
              caption: "階段にいる敵はスルーしてOK",
            },
          ]}
        />
        <CaptionedMedia
          src="/JointOperation/jo_QuarantineZone_3.mp4"
          alt="扉を破壊した巨大ミュータントも忘れずに倒そう"
          caption="扉を破壊した巨大ミュータントも忘れずに倒そう"
        />

        {/* ボス戦 */}
        <SectionTitle icon="theater_comedy">ボス戦：提督・ハバカ & バルバロッサ</SectionTitle>
        <div>
          ハバカとバルバロッサは共にギミック等の無い普通のボス敵だが、<br />
          バルバロッサは連合のボスの中でもトップレベルにHPが高いので倒すのに少し時間がかかる。<br />
          不屈が無いと拘束攻撃で時間を取られてしまうので、ムービーが開けたらしっかりバフをかけ直すようにしよう。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_QuarantineZone_4.PNG",
              alt: "ハバカはHPも高くないので余裕",
              caption: "ハバカはHPも高くないので余裕",
            },
            {
              src: "/JointOperation/jo_QuarantineZone_5.PNG",
              alt: "バルバロッサはかなりタフ",
              caption: "バルバロッサはかなりタフ",
            },
          ]}
        />

        {/* ジェットパック */}
        <SectionTitle icon="flight_takeoff">梯子登りはジェットパックで快適に</SectionTitle>
        <div>
          道中で梯子を登るシーンはジェットパックや飛行武器で登ると快適だぞ！
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_QuarantineZone_6.mp4"
          alt="何だかんだジェットパックが一番楽"
          caption="何だかんだジェットパックが一番楽"
        />
      </div>
    </>
  );
}

QuarantineZonePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};