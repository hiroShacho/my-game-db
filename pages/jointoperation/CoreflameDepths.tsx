import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-300/60 to-orange-50 border-l-8 border-orange-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-orange-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-orange-900">{children}</span>
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
        className="rounded-lg shadow border-2 border-orange-300 overflow-hidden bg-black mx-auto"
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
        <div className="bg-orange-50 px-2 py-1 text-xs text-orange-800 border-t border-orange-200 w-full text-center">
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

export default function CoreflameDepthsPage() {
  return (
    <>
      <Head>
        <title>連合作戦「地核深焔」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「地核深焔」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-orange-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
          連合作戦「地核深焔」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_CoreflameDepths.PNG"
            alt="地核深焔 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から真っすぐ進むと闇鬼との戦闘になる。<br />
          全ての闇鬼を倒すと奥の部屋への道を塞ぐバリアが解除され、朱厭との戦闘になる。<br />
          朱厭を倒すと奥のワープポイントから次のエリアに飛べるようになり、ワープ後真っすぐ進んだ先に南音が待ち構えている。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_CoreflameDepths_1.PNG",
              alt: "闇鬼-翼虎は少しHPが多い",
              caption: "闇鬼-翼虎は少しHPが多い",
            },
            {
              src: "/JointOperation/jo_CoreflameDepths_2.PNG",
              alt: "朱厭はワールドボスの時と動きは変わらない",
              caption: "朱厭はワールドボスの時と動きは変わらない",
            },
          ]}
        />
        <CaptionedMedia
          src="/JointOperation/jo_CoreflameDepths_3.PNG"
          alt="ワープポイントから次のエリアに向かおう"
          caption="ワープポイントから次のエリアに向かおう"
        />

        <SectionTitle icon="theater_comedy">ボス戦：南音</SectionTitle>
        <div>
          南音はHPが1ゲージ近く減るとプレイヤーにリンクを付与してくる。<br />
          このリンクが付いている間は通常攻撃が封じられるので、南音から離れてリンクを切るようにしよう。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_CoreflameDepths_4.PNG"
          alt="リンクは南音と距離を取ることで切断可能"
          caption="リンクは南音と距離を取ることで切断可能"
        />
        <div>
          また、HPがラスト1ゲージまで減るとシールドを貼って強力な攻撃を行おうとする。<br />
          チャージ中は一切動かないので攻撃が来る前にたたみ掛けて倒してしまおう。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_CoreflameDepths_5.PNG"
          alt="残り1ゲージでシールドを貼ってチャージ状態に"
          caption="残り1ゲージでシールドを貼ってチャージ状態に"
        />
        <div>
          南音戦では特定の攻撃に対して回避または通常攻撃を合わせることでパリィアクションを取れる。<br />
          パリィに成功すると行動を中断して敵の耐性を下げることが可能だが、さすがに連合では普通に攻撃して倒すのを優先した方が早く終わる。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_CoreflameDepths_6.PNG"
          alt="特定行動をパリィ可能だが連合ではさすがに不要"
          caption="特定行動をパリィ可能だが連合ではさすがに不要"
        />

        <SectionTitle icon="warning">南音の攻撃が痛い</SectionTitle>
        <div>
          南音の攻撃はシンプルに痛い。<br />
          回復やHPシールドを獲得できる効果が無いと気づいたら瀕死になっていたなんてことも多い。<br />
          連合作戦では武器が完凸になっているので、自分の武器が持っている防御寄りの凸効果も活かすようにしよう！
        </div>
      </div>
    </>
  );
}

CoreflameDepthsPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};