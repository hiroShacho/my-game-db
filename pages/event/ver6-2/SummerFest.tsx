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
        <title>イベント「夏夢遊園」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「夏夢遊園」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「夏夢遊園」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="夏夢遊園 トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="🔫">バブル合戦（バブルガンPVP、8人マッチ）【8/4～9/15】</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="バブル合戦"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          8人マッチのバブルガンイベント。<br />
          Mi-aになって4人チームで協力して相手チームを全員脱落させたら勝ち。<br />
          やられた味方は時間経過で脱落する前に救出できるので、基本的にはチームで一緒に行動するのがベスト。<br />
          Mi-aは見た目によって異なるスキルを所持しているが、その中でもバリアスキルは使用すると完全無敵かつ効果時間中に味方の救出を完了できてしまうのであまりにも強力。<br />
          どのMi-aになるかはランダムなので、もし相手にバリア持ちが複数いたら厳しい戦いになることを覚悟しよう。<br />
          バブルガンについてはそこら辺に色んな種類のモノが落ちているので自分にあったバブルガンを見つけよう。<br />
        </div>

        <SectionTitle icon="💧">爽快インパクト（水弾PVP、8人マッチ）【8/13～9/15】</SectionTitle>
        <div>
          8人マッチの水弾PVP。<br />
          Mi-aになって水弾とスキルを駆使して他プレイヤーを全員撃破しよう。<br />
          ジャンプしながらの射撃で相手をかく乱しながら戦おう。<br />
        </div>

        <SectionTitle icon="🍍">生存同名（フルーツ争奪戦、8人マッチ）【8/22～9/15】</SectionTitle>
        <div>
          8人マッチのフルーツ争奪戦。<br />
          2人で協力してフィールド上のフルーツを拾い集めながら他のプレイヤーを倒して1位を目指そう。<br />
          他プレイヤーに味方との間に繋がったリンクを当てることで相手を撃破して持っていたフルーツを奪えるぞ！<br />
          味方と距離が離れすぎると強制的にやられてしまうのである程度は歩調を合わせないといけない。<br />
        </div>

        <SectionTitle icon="🤯">水爆の歌（鬼ごっこ、8人マッチ）【9/1～9/15】</SectionTitle>
        <div>
          8人マッチの鬼ごっこ。<br />
          ランダムに選ばれた2名の頭上に水球マークが出現して鬼役になる。<br />
          この水球は時間経過で爆発して鬼が脱落し、次の鬼がランダムに選ばれるという流れを繰り返す。<br />
          他プレイヤーに触れると擦り付けて相手を鬼に出来るので、水球が時間経過で爆発する前に誰かを捕まえるようにしよう。<br />
        </div>


      </div>
    </>
  );
}

BrightonsSalvationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};