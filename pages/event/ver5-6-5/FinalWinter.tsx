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
        <title>イベント「色あせることのない楽園」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「色あせることのない楽園」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「色あせることのない楽園」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="色あせることのない楽園 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="ac_unit">初雪の邂逅</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="初雪の邂逅"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ゴゾトスネットワークで遊べるソロ用のすごろく。<br />
          ダイスを振って進めた駒に触れてイベントポイントを稼ぐのがメインになっている。<br />
          ダイスはデイリーミッションを達成することで獲得でき、毎日連合作戦3回と料理1回で全ミッションをクリア可能。<br />
          ソロで出来てポイント効率も良いので基本はこれで稼ごう。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "すごろくはゴゾトスネットワークで遊べる",
              caption: "すごろくはゴゾトスネットワークで遊べる",
            },
          ]}
        />

        <SectionTitle icon="casino">ラッキーフリップ（1～4人）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_2.PNG"
            alt="ラッキーフリップ トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          カードをめくって敵を倒してイベントポイントを稼ぐイベント。<br />
          挑戦前に全員でクーポンを使ってバフを獲得し、その後カードをめくって戦闘を進める。<br />
          基本は4人マッチで遊ぶがマッチングしない場合は1人で挑戦も可能。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_2_1.PNG",
              alt: "クーポンはデイリー懸賞とキルオの箱から獲得",
              caption: "クーポンはデイリー懸賞とキルオの箱から獲得",
            },
          ]}
        />

        <SectionTitle icon="attractions">遊園地のお楽しみ巡り</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_3.PNG"
            alt="遊園地のお楽しみ巡り トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ミッション達成＆スロット形式のイベント。<br />
          ミッションを達成すると報酬進捗が進み、さらにスロットを回せるようになる。<br />
          ミッション形式なので多少面倒くさいが狙って欠片を集められるのでコスチュームなどが欲しい場合はやっておきたい。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_3_1.PNG",
              alt: "スロットからもポイント等を稼げる",
              caption: "スロットからもポイント等を稼げる",
            },
          ]}
        />

        <SectionTitle icon="directions_car">カート大冒険（8人マッチ）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_4.PNG"
            alt="カート大冒険 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          4vs4の対戦イベント。<br />
          カート内に味方が1人でもいればカートが進むが、敵が1人でもいるとカートが止まる。<br />
          どちらの陣営もひたすら敵を蹴散らしながら、攻撃側はカートを進めて防衛側はカートを止めよう。
        </div>

        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_4_1.PNG",
              alt: "カート内に防衛側がいると進行が止まる",
              caption: "カート内に防衛側がいると進行が止まる",
            },
          ]}
        />
        <div>
          対単体ではエスター・シロあたりが強いが、遠距離武器や剛毅武器が絡んでくると1人で対処するのは難しい。<br />
          フィールド上の黄色や紫のオブジェクトは様々なバフが獲得できるので積極的に触れていきたい。
        </div>

        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_4_2.PNG",
              alt: "エスターは1人はいた方が良いかも",
              caption: "エスターは1人はいた方が良いかも",
            },
            {
              src: "/ver_event/New_Event_4_3.PNG",
              alt: "バフを活用しよう",
              caption: "バフを活用しよう",
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