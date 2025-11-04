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

// 画像・動画2つ横並び
function RowMedia({
  items,
}: {
  items: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3 w-full">
      {items.map((item) => (
        <CaptionedMedia key={item.src} {...item} maxWidth={480} />
      ))}
    </div>
  );
}

export default function ZenithBladePage() {
  return (
    <>
      <Head>
        <title>連合作戦「無想剣極意」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「無想剣極意」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          連合作戦「無想剣極意」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_ZenithBlade.PNG"
            alt="無想剣極意 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から進んですぐに5体の宇宙海賊と交戦。<br />
          これらを撃破すると奥に進む道のバリアが解除される。<br />
          奥に進むと再び宇宙海賊が複数いるのでこれらを倒してバリアの奥にある転送ゲートからローレンズのいるエリアに向かおう。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_ZenithBlade_1.PNG",
              alt: "最初の宇宙海賊",
              caption: "最初の宇宙海賊",
            },
            {
              src: "/JointOperation/jo_ZenithBlade_2.PNG",
              alt: "通路のバリアは敵を倒したら消える",
              caption: "通路のバリアは敵を倒したら消える",
            },
          ]}
        />
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_ZenithBlade_3.PNG",
              alt: "次の区画の宇宙海賊",
              caption: "次の区画の宇宙海賊",
            },
            {
              src: "/JointOperation/jo_ZenithBlade_4.PNG",
              alt: "バリアの奥の転送ゲートからローレンズのいるエリアへ",
              caption: "バリアの奥の転送ゲートからローレンズのいるエリアへ",
            },
          ]}
        />

        <SectionTitle icon="theater_comedy">ボス戦：ローレンズ</SectionTitle>
        <div>
          蘇った小物海賊。<br />
          特段気を付けるべき攻撃はしてこない。<br />
          なお、一部の攻撃は通常攻撃を合わせることでパリィ可能となっている。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_ZenithBlade_5.PNG"
          alt="パリィできる攻撃は出始めに青白い光が出る"
          caption="パリィできる攻撃は出始めに青白い光が出る"
        />
      </div>
    </>
  );
}

ZenithBladePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};