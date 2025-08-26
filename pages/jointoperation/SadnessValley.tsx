import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-300/60 to-blue-50 border-l-8 border-blue-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-blue-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-blue-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 320,
}: {
  src: string;
  alt: string;
  caption: string;
  maxWidth?: number;
}) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div className="mx-auto w-full flex flex-col items-center my-3" style={{maxWidth: 560}}>
      <div
        className="rounded-lg shadow border-2 border-blue-300 overflow-hidden bg-black"
        style={{ width: "100%" }}
      >
        {isVideo ? (
          <video controls width={maxWidth} height={180} style={{ width: "100%", height: "auto" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image src={src} alt={alt} width={maxWidth} height={180} style={{ width: "100%", height: "auto" }} />
        )}
        <div className="bg-blue-50 px-2 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center">
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
  // 320*2+gap=660くらいまでOK
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3 w-full">
      {items.map((item) => (
        <CaptionedMedia key={item.src} {...item} maxWidth={320} />
      ))}
    </div>
  );
}

export default function SadnessValleyPage() {
  return (
    <>
      <Head>
        <title>連合作戦「ロストバレー」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「ロストバレー」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">terrain</span>
          連合作戦「ロストバレー」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_SadnessValley.PNG"
            alt="ロストバレー ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から階段を上がると灰域種の群れがいる。<br />
          卵の中の敵まで全て倒すと近くのジャンプ台が解放され、次の足場へ飛ぶための足がかりになる。<br />
          同じように飛んだ先の敵を全て倒してジャンプ台を開放していき、最奥のウィーバーがいる島を目指そう。<br />
          なお、卵の中の敵は卵に接近するまで出てこないので先に全ての卵を割ってから攻撃するようにしよう。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_SadnessValley_1.mp4",
              alt: "卵の中の敵も忘れずに倒そう",
              caption: "卵の中の敵も忘れずに倒そう",
            },
            {
              src: "/JointOperation/jo_SadnessValley_2.mp4",
              alt: "ジャンプ台はでアルケーのジェットパックを使って飛ぼう",
              caption: "ジャンプ台はでアルケーのジェットパックを使って飛ぼう",
            },
          ]}
        />

        <div>
          道中やステージの影にある星は取るとステージ内限定のバフを獲得できる。<br />
          ユニークな効果のモノもあるので一度どんなものがあるか見てみるとクスっと笑えるかも。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_SadnessValley_4.mp4"
          alt="バフの中には変な効果もあるらしい...？"
          caption="バフの中には変な効果もあるらしい...？"
          maxWidth={560}
        />

        <SectionTitle icon="theater_comedy">ボス戦：ウィーバー</SectionTitle>
        <div>
          開幕はプレイヤーのいる方向を向きながらレーザーを撃ってくることが多い。<br />
          エネルギーを溜めているときは周囲の球を破壊することでウィーバーの動きが止まるので攻撃チャンスになる。<br />
          ある程度HPが減ると異空間を展開して分身したり無敵状態に移行するようになる。<br />
          こうなると討伐までに時間がかかってしまうので、なるべく戦闘前にアルケー等のバフを発動しておいて一瞬でHPを削れるようにしたい。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_SadnessValley_3.mp4"
          alt="スピードが命！"
          caption="スピードが命！"
          maxWidth={480}
        />

        <SectionTitle icon="info">味方が先に進んだら下に落ちよう</SectionTitle>
        <div>
          味方が先の島に到着すると落下後のリスポーン地点が先の島に変更される。<br />
          味方が先に最奥までたどり着いたら落下してボスまでワープしよう。
        </div>
        <RowMedia
          items={[
            {
              src: "/JointOperation/jo_SadnessValley_5.mp4",
              alt: "落下すればワープ可能",
              caption: "落下すればワープ可能",
            },
            {
              src: "/JointOperation/jo_SadnessValley_6.PNG",
              alt: "最奥のチェックポイントは赤丸の足場",
              caption: "最奥のチェックポイントは赤丸内の足場",
            },
          ]}
        />
        <div>
          注意点として、チェックポイントとなる場所を踏んでいないとワープ先が変更されないので特に最奥のチェックポイントは忘れずに踏むようにしよう！
        </div>

        <SectionTitle icon="flight_takeoff">道中の敵は完全無視できる</SectionTitle>
        <div>
          実は道中に一切壁などが無いので、敵を無視して最奥のウィーバーまで飛んでいくことも可能になっている。<br />
          今ではもっぱらボス直行が主流になっているが、初心者は知らないことが多いのでチェックポイントを踏んでから落下すれば良いことを教えてあげよう。
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/_-61wEHowB0"
                title="ロストバレー ボス直行ルート"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-blue-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SadnessValleyPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};