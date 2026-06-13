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
        <title>イベント「永生の潮」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「永生の潮」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「永生の潮」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="永生の潮 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="🐺">星の花火（ロックハート、1～8人チーム）【5/19～6/30】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="星の花火"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ロックハートの各地にあるデコーダーでボスを召喚して倒すイベント。<br />
          召喚できるボスはストーリーでも戦ったボーンクラッシャー。<br />
          暗号化コアは毎日変わるクエスト対象を討伐することで稼げる。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "ボーンクラッシャーといつでも戦えるぞ！",
              caption: "ボーンクラッシャーといつでも戦えるぞ！",
            },
          ]}
        />

        <SectionTitle icon="🎵">燃舞狂潮（オアシス倶楽部、ダンス）【5/19～6/30】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_2.PNG"
            alt="燃舞狂潮"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          オアシス倶楽部でダンスをするイベント。<br />
          倶楽部内で放置しているだけでポイントが入るので楽と言えば楽。<br />
          オアシス倶楽部自体が21時から24時までの営業なのと、貰えるのはイベントポイントだけとなっている。<br />
        </div>

        <SectionTitle icon="🏁">スピードレーサー（フィールド、レース）【5/28～6/30】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_3.PNG"
            alt="スピードレーサー"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ロックハートの街を使ったレースイベント。<br />
          全11カ所のチェックポイントを通過することでクリアになるレースで、途中には高速で自動移動できるゲートがあって中々面白い動きをする。<br />
          いつも通り武器の制限は無いので可能ならアントリアやアストールで飛んでしまうのが楽。<br />
          ロックハートなのでジェッパキャンセルの慣性は武器切り替えで代用することになるが、そもそもある程度の長さがある直線コースが最後くらいなのであまり気にしなくて良い。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_3_1.PNG",
              alt: "前移動し続けるだけで大幅なショートカットができるゲートもあるぞ！",
              caption: "前移動し続けるだけで大幅なショートカットができるゲートもあるぞ！",
            },
          ]}
        />

        <SectionTitle icon="📦">古機解析（フィールド、アイテム提出）【6/5～6/30】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_4.PNG"
            alt="古機解析"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          アイテム提出イベント。<br />
          提出するアイテムは各地で雑魚がドロップしているアイテムなので集めること自体は苦労しないはず。<br />
          サーバー全体の進捗によってマルチコンテンツに特殊なバフが適用されるので普段と違う遊びができて楽しいぞ！<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_4_1.PNG",
              alt: "特にこだわりが無ければアイテムを持っている所でどんどん提出すればOK",
              caption: "特にこだわりが無ければアイテムを持っている所でどんどん提出すればOK",
            },
          ]}
        />

        <SectionTitle icon="🏰">城塞バトル（2人マッチ、タワーディフェンス）【6/13～6/30】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_5.PNG"
            alt="城塞バトル"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          1対1のタワーディフェンス。<br />
          カードからモンスターを召喚して戦わせ、相手のタワーを破壊したら勝ち。<br />
          前半はゆっくり目の進行だが、時間が半分を切ると召喚に使うエナジーの溜まりが加速する。<br />
          一度形成が傾くと中々逆転が難しいので攻めの姿勢を忘れずに。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_5_1.PNG",
              alt: "カードからモンスターを召喚して戦う",
              caption: "カードからモンスターを召喚して戦う",
            },
            {
              src: "/ver_event/New_Event_5_2.PNG",
              alt: "今回は事前のバフ要素も",
              caption: "今回は事前のバフ要素も",
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