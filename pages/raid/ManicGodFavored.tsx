import { ReactElement } from "react";
import { useEffect, useRef } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

/**
 * 共通コンポーネント（FortuneGallop / ScorchingNightmare と同様の実装）
 */

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-emerald-400/60 to-emerald-100 border-l-8 border-emerald-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-emerald-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-emerald-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画（拡張：.mp4 を動画と判定）
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 640,
}: {
  src: string;
  alt?: string;
  caption?: string;
  maxWidth?: number;
}) {
  const isVideo = src.endsWith(".mp4");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // クライアント側マウント時に動画の初期音量を設定（30%）
    if (isVideo && videoRef.current) {
      try {
        videoRef.current.volume = 0.3; // 0.0 - 1.0
      } catch (e) {
        // セキュリティやブラウザポリシーで設定できない場合もあるので安全に無視
        // console.warn("Unable to set video volume", e);
      }
    }
  }, [isVideo, src]);

  return (
    <div className="flex flex-col items-center my-3 mx-auto" style={{ width: "100%", maxWidth }}>
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden bg-black mx-auto" style={{ width: "100%" }}>
        {isVideo ? (
          <video controls width={maxWidth} height={270} style={{ width: "100%", height: "auto", display: "block" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt ?? ""}
            width={maxWidth}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        )}
        <div className="bg-emerald-50 px-4 py-1 text-xs text-emerald-800 border-t border-emerald-200 w-full text-center">
          {caption}
        </div>
      </div>
    </div>
  );
}

// 画像を最大2枚横並び（連続する画像群を受け取るときに使えるユーティリティ）
function RowMedia({ items }: { items: { src: string; alt?: string; caption?: string }[] }) {
  // chunk into arrays of length 2
  const chunks: { src: string; alt?: string; caption?: string }[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    chunks.push(items.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map((item) => (
            <div key={item.src} style={{ width: "100%", maxWidth: 640 }}>
              <CaptionedMedia {...item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ManicGodFavoredPage() {
  return (
    <>
      <Head>
        <title>暴走する神眷 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「暴走する神眷」の攻略ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">🐺</span>
          討伐作戦：暴走する神眷
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/ManicGodFavored.PNG"
            alt="ManicGodFavored トップ"
            width={880}
            height={360}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="bolt">ギミックダメージが大きく比較的クリアしやすい討伐</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この討伐では約1分ごとに飛んでくる特定のギミックをクリアすると敵に最大HP10%程のダメージが入る。<br />
そのため、イカロス恩恵/アストール剛毅の固定ダメージ + フィオナ/ラクシス斬殺があれば強攻が火力を出さなくてもクリア可能となっている。
        </pre>

        <SectionTitle icon="🩸">ギミック①：血の渇望 &amp; 満月</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ボーンクラッシャーはプレイヤーに「血の渇望」というスタックを付与してくる。（1～5スタック）<br />
このスタック数は常に各プレイヤーの頭上に表示されており、プレイヤーはスタック数に応じて増加する持続ダメージを受ける。<br />
また、血の渇望が最大のプレイヤーは定期的に頭上に赤い「満月」のマークが表示されて大ダメージを受ける。
        </pre>

        <RowMedia
          items={[
            {
              src: "/raid/ManicGodFavored_1_1.PNG",
              alt: "頭上に血の渇望スタックが表示される",
              caption: "頭上に「血の渇望」スタックが表示される",
            },
            {
              src: "/raid/ManicGodFavored_1_2.PNG",
              alt: "定期的に赤い満月が表示されて大ダメージ",
              caption: "定期的に赤い「満月」が表示されて大ダメージ",
            },
          ]}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

「血の渇望」のスタックはフィールド中央の噴水に近づくと表示される「聖なる泉を浴びる」というインタラクトを実行することでリセットできる。
この噴水のインタラクトは5秒程度のクールタイムがあり、クールタイムはプレイヤー間で共有されている。<br />
そのため、一度に全員が噴水に殺到するとクールタイムの関係で中々スタックをリセットできなくなるので注意しよう。
        </pre>

        <CaptionedMedia
          src="/raid/ManicGodFavored_1_3.PNG"
          alt="噴水のインタラクトで血の渇望をリセット可能"
          caption="噴水のインタラクトで「血の渇望」をリセット可能"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ただ、この2つのギミックはそこまでダメージが痛いわけではないので無理に血の渇望のリセットを狙う必要性は薄い。<br />
泉のクールタイムもそこまで気になる長さじゃないので、スタックが溜まってることに気づいたら「一応リセットしておくか～」くらいの感覚で使ってしまって問題無い。
        </pre>

        <SectionTitle icon="💢">ギミック②：ボス狼の怒り</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ボーンクラッシャーは約1分ごとにターゲットを取っているプレイヤーを拘束してくる。
拘束されたプレイヤーは一切行動が出来なくなり、拘束から一定時間経過で即死級の範囲ダメージが発生する投げ技を放ってくる。
        </pre>

        <CaptionedMedia
          src="/raid/ManicGodFavored_2_1.PNG"
          alt="タゲを取っているプレイヤー拘束される"
          caption="タゲを取っているプレイヤー拘束される"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この拘束はボーンクラッシャーに対して一定回数攻撃を当てることで解除でき、解除に成功すると最大HP5～10%程のダメージを与えられる。
また、拘束解除直後はダメージが通りやすくなっているので可能ならこのタイミングに大技を合わせるようにしたい。
        </pre>

        <CaptionedMedia
          src="/raid/ManicGodFavored_2_2.mp4"
          alt="一定回数ヒットで拘束解除 ＆ ギミックダメージ"
          caption="一定回数ヒットで拘束解除 ＆ ギミックダメージ"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

全員でひたすら攻撃するだけで解除できてダメージも大きいため、今回の討伐はこのギミックと剛毅・恩恵の固定ダメージと斬殺効果だけでもクリア可能となっている。
        </pre>

        <SectionTitle icon="⛲">ギミック③：先導者の力 &amp; 血と酒</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ボーンクラッシャーは自身の頭上に表示されているカウントが90になると2種類の攻撃から1つを繰り出してカウントをリセットする。<br />
1回目の90カウントはプレイヤー1名を中心とした範囲円に複数のプレイヤーが入ることでダメージを軽減できる頭割りギミック。<br />
2回目の90カウントはプレイヤー1名を狙って何回かステージ外から突進してくる純粋な回避ギミックとなっている。
        </pre>

        <RowMedia
          items={[
            {
              src: "/raid/ManicGodFavored_3_1.PNG",
              alt: "1回目は所謂頭割りギミック",
              caption: "1回目は所謂「頭割り」ギミック",
            },
            {
              src: "/raid/ManicGodFavored_3_2.PNG",
              alt: "2回目は純粋に攻撃を回避するギミック",
              caption: "2回目は純粋に攻撃を回避するギミック",
            },
          ]}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

2種類の攻撃は交互に繰り出してくるのでカウントごとにどの攻撃が来るか分かりやすく、どちらも攻撃範囲が表示されるので対処しやすい。
大技ということもあってダメージは多少痛いので集合/回避はしっかり行おう。<br />
なお、カウントは毎秒1進むだけでなく15秒ごとに大きく増加するタイミングがあるので大技は1分もしないうちに飛んでくる点には注意。
        </pre>

        <SectionTitle icon="🐾">ギミック④：群狼の号令</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ボーンクラッシャーは定期的に狼の群れを召喚してくる。<br />
この狼は特に強いわけでもなく、倒しても何も起きないので気にしなくて良い。
        </pre>

        <SectionTitle icon="shield">素のダメージ軽減が高い</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ボーンクラッシャーは攻撃を回避するモーションの後にやけに硬くなるなど討伐作戦のギミックと関係ない部分でダメージを軽減してくる。<br />
今回は幸いギミックだけでほとんどの体力を削れるので、時間こそかかるが最初からギミックと斬殺等で倒す前提で挑むのが気持ちは楽かもしれない。
        </pre>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

強攻2～4人、剛毅1人、恩恵3～5人の編成でOK。<br />
早く終わらせたいなら強攻を多めに、耐久重視で安定クリアを目指したいなら恩恵多めで挑もう。
        </pre>

        <SectionTitle icon="ondemand_video">解説動画</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

無し
        </pre>
      </div>
    </>
  );
}

ManicGodFavoredPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};