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
        <title>イベント「月影の秘城」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「永生の潮」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「月影の秘城」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="月影の秘城 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="📦">飽くなき野望（アイテム提出）【6/30～8/4】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="飽くなき野望"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          アイテム提出系のイベント。<br />
          提出アイテムは採取で簡単に集まる物ばかりなのでそこまで苦戦はしないはず。<br />
          提出は一気にできるがイベントポイント受け取りには毎日の上限があるので注意しよう。<br />
        </div>

        <SectionTitle icon="🏁">スターロードレース（競馬、8人マッチ）【7/7～8/4】</SectionTitle>
        <div>
          8人マッチの競馬ゲーム。<br />
          マッチした内の4人が走る役としてレースに参加して、残りの4人は誰が勝つかを予想する。<br />
          参加には銅華が必要かも？<br />
        </div>

        <SectionTitle icon="🎮">プロゲーマー（群衆擬態かくれんぼ、4人マッチ）【7/14～8/4】</SectionTitle>
        <div>
          4人マッチの群衆に紛れるかくれんぼ。<br />
          周りのNPCと同じ動きをして隠れつつ、他の参加者の擬態を見破って撃破しよう。<br />
          ポイントのことだけを考えると4人で戦わずに落ちてくる貝殻を拾い続けるのが一番だったりする。<br />
        </div>

        <SectionTitle icon="🐺">狩獣の法則（戦闘、2人マッチ）【7/21～8/4】</SectionTitle>
        <div>
          2人マッチの脱出ゲーム。<br />
          周囲から襲い来るモンスターを倒しながらボーンクラッシャーの脱出を手助けしよう。<br />
          過去に開催された複数のドアから出現するモンスターを倒すミニゲームがロックハート風のフィールドにアレンジされている。<br />
        </div>


      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};