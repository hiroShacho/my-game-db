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
        <title>イベント「終巡の冬」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「終巡の冬」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「終巡の冬」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="終巡の冬 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="ac_unit">極寒生態</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="極寒生態"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          ノア星で集めたアイテムを納品するイベント。<br />
          アイテムはノア星の雑魚敵を倒すことでドロップし、敵によって落とすアイテムが変化する。<br />
          ドロップしたアイテムは地面に落ちることが多いので倒した後で回収するのを忘れずに。<br />
          納品回数はどんどん溜まっていくので後でまとめて納品するのもあり。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "アイテムは地面に落ちてるので回収しよう",
              caption: "アイテムは地面に落ちてるので回収しよう",
            },
          ]}
        />

        <SectionTitle icon="casino">幸運の連続（4人）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_2.PNG"
            alt="幸運の連続 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          弓を使う落ちものパズル。<br />
          ある程度同じ色のパネルが並んでいる所を撃ち抜くとポイントが入る。<br />
          フィールド中央付近に置いてある爆弾を投げつければ一気にポイントを稼げるので爆弾がリポップしているかにも意識を向けよう。<br />
          何故か他人のパネルを撃って援護できるので2vs2で遊べたりする。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_2_1.PNG",
              alt: "どこを撃てばいいかを即座に判断する能力が求められる",
              caption: "どこを撃てばいいかを即座に判断する能力が求められる",
            },
          ]}
        />

        <SectionTitle icon="attractions">氷と火の戦舞（8人マッチ）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_3.PNG"
            alt="氷と火の戦舞 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          4vs4の拠点防衛ゲーム。<br />
          拠点に対してモンスターが進行してくるのでこれを撃破して防衛しよう。<br />
          モンスターを倒すと相手側にモンスターを送り込めるので、ひたすらモンスターを倒して相手側にプレッシャーをかけ続けるのが重要。<br />
          モンスターはどんどん強くなるので一度劣勢になるとそのまま押し込まれやすい。<br />
          従来通りなら両チームのフィールドは見えない壁で区切られているが、変身銃などで邪魔もできたはずなので思わぬ横やりには注意㌥。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_3_1.PNG",
              alt: "雑魚敵を倒すとバフをドロップする",
              caption: "雑魚敵を倒すとバフをドロップする",
            },
            {
              src: "/ver_event/New_Event_3_2.PNG",
              alt: "ボスは時々強い個体が出てくるので注意（普通に即死する）",
              caption: "ボスは時々強い個体が出てくるので注意（普通に即死する）",
            },
          ]}
        />

        <SectionTitle icon="directions_car">トナカイラッシュ（8人マッチ）</SectionTitle>
        <div>
          ペアでプレゼントをどれだけ多く持ち帰れるか競うミニゲーム。<br />
          ペアの1人はプレゼントを持ち帰る役、もう1人は車を動かして他プレイヤーを妨害する役に分かれる。<br />
          妨害側は相当よく狙わないと車を当てられず、そもそも道路の白線上に立たれると車が当たらないので初心者狩りくらいしかできない。<br />
          プレゼントを持ち帰る時は多く持つほど歩行速度が遅くなるので帰り道はご安全に㌥。
        </div>

      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};