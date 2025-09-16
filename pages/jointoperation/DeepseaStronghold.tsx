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

// キャプション付き画像・動画（中央寄せ・大きめ）
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 560,
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
          <video controls width={maxWidth} height={320} style={{ width: "100%", height: "auto" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={maxWidth}
            height={320}
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
        <CaptionedMedia key={item.src} {...item} maxWidth={480} />
      ))}
    </div>
  );
}

export default function DeepseaStrongholdPage() {
  return (
    <>
      <Head>
        <title>連合作戦「深海基地」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「深海基地」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-sky-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500">waves</span>
          連合作戦「深海基地」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_DeepseaStronghold.PNG"
            alt="深海基地 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点からすぐに5体のアイダ兵団と戦闘になる。<br />
          全ての敵を倒すと奥の道が開けるので、レーザー地帯を抜けて先に進むための装置を起動しよう。<br />
          起動後に床の穴から奥へ進むと敵のいる広い部屋に出るので全ての敵を倒そう。<br />
          5体のアイダ兵団を倒すと段々水位が上昇してサンダーウィング兵団との戦闘になる。<br />
          サンダーウィングを倒すと道が開けてボスのいる部屋へワープできる。
        </div>

        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_DeepseaStronghold_1.mp4",
              alt: "道中のレーザーは不屈を発動しないとはじかれる",
              caption: "道中のレーザーは不屈を発動しないとはじかれる",
            },
            {
              src: "/JointOperation/jo_DeepseaStronghold_2.mp4",
              alt: "スキルで不屈を付けたりロボットアームで無理やり突破可能",
              caption: "スキルで不屈を付けたりロボットアームで無理やり突破可能",
            },
          ]}
        />
        <CaptionedMedia
          src="/JointOperation/jo_DeepseaStronghold_3.PNG"
          alt="サンダーウィング戦は水位上昇＆電流床も相まって地味に強敵"
          caption="サンダーウィング戦は水位上昇＆電流床も相まって地味に強敵"
        />

        <SectionTitle icon="sports_kabaddi">ボス戦：グラトニー</SectionTitle>
        <div>
          周囲を水で囲まれたフィールド上で戦う。<br />
          グラトニーは如何にも泳ぎそうな見た目だが陸地でしか攻撃をしてこないので、飛び上がってからの落下攻撃などは水上に逃げると簡単に避けられる。<br />
          グラトニーのチャージがMAXになると水位が上昇して部屋全体が水没してしまう。<br />
          この状態ではまともに戦闘が出来ないのでアルケーのジェットスライダーを使って逃げに徹しよう。<br />
          しばらくすると水位も戻るのでチャージMAXが再び来る前にグラトニーを倒そう。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_DeepseaStronghold_4.PNG"
          alt="チャージMAXで部屋全体が水没する"
          caption="チャージMAXで部屋全体が水没する"
        />

        {/* 追加: ちょっとした隠し部屋(？)もある */}
        <SectionTitle icon="meeting_room">ちょっとした隠し部屋(？)もある</SectionTitle>
        <div>
          サンダーウィングと戦う部屋には隠し部屋がある。<br />
          置いてある箱の中身はショボいので完全におまけ要素となっている。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_DeepseaStronghold_5.PNG",
              alt: "入り口が足場の下にある",
              caption: "入り口が足場の下にある",
            },
            {
              src: "/JointOperation/jo_DeepseaStronghold_6.PNG",
              alt: "箱の中身は普通のアイテム",
              caption: "箱の中身は普通のアイテム",
            },
          ]}
        />
      </div>
    </>
  );
}

DeepseaStrongholdPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};