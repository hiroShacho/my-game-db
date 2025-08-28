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

export default function CarnivalPartyPage() {
  return (
    <>
      <Head>
        <title>連合作戦「パーティタイム」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「パーティタイム」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          連合作戦「パーティタイム」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_CarnivalParty.PNG"
            alt="パーティタイム ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          ボス戦とリズムゲーだけの独特なダンジョン。<br />
          スタート地点からまっすぐ進むとすぐにボス戦が始まり、<br />
          ステージから降りてくるボスを1体ずつ倒すとリズムゲーが始まる。<br />
          リズムゲーでは迫りくる攻撃の種類に応じたアクションをすることでダメージを防げる。<br />
          青（白）の攻撃は通常攻撃を当てれば破壊でき、金色の攻撃はジャンプで躱せる。<br />
          赤い両サイドから挟んでくる攻撃は挟まれるタイミングで回避することで対応可能。<br />
          一定時間経過でリズムゲーが終了し、再びステージに向かうと2体のボスが同時に檀上から降りてくる。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_CarnivalParty_1.PNG",
              alt: "最初は1体ずつ相手にする",
              caption: "最初は1体ずつ相手にする",
            },
            {
              src: "/JointOperation/jo_CarnivalParty_2.PNG",
              alt: "リズムゲーは色に対応したアクションで躱そう",
              caption: "リズムゲーは色に対応したアクションで躱そう",
            },
          ]}
        />
        <CaptionedMedia
          src="/JointOperation/jo_CarnivalParty_3.PNG"
          alt="リズムゲー終了で敵にダメージが入る"
          caption="リズムゲー終了で敵にダメージが入る"
        />

        <SectionTitle icon="theater_comedy">ボス戦</SectionTitle>
        <div>
          最初は1体ずつ戦い、リズムゲーの後は2体同時に相手をする。<br />
          特にギミック等は無いが、不屈が無いと敵の攻撃で打ち上げられて時間を取られるので不屈効果を忘れずに。<br />
          2体は別々に動くので距離が離れると少し倒すのが面倒かも。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_CarnivalParty_4.mp4"
          alt="特別なギミックは無いので一気に倒してしまおう"
          caption="特別なギミックは無いので一気に倒してしまおう"
        />
      </div>
    </>
  );
}

CarnivalPartyPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};