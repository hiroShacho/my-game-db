import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-lime-300/60 to-lime-50 border-l-8 border-lime-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-lime-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-lime-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 500,
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
        className="rounded-lg shadow border-2 border-lime-300 overflow-hidden bg-black mx-auto"
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
        <div className="bg-lime-50 px-2 py-1 text-xs text-lime-800 border-t border-lime-200 w-full text-center">
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
        <CaptionedMedia key={item.src} {...item} maxWidth={500} />
      ))}
    </div>
  );
}

export default function PursuitofFatePage() {
  return (
    <>
      <Head>
        <title>連合作戦「運命の追撃」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「運命の追撃」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-lime-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-lime-500">sports_motorsports</span>
          連合作戦「運命の追撃」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_PursuitofFate.PNG"
            alt="運命の追撃 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* ダンジョン構成 */}
        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から広場に進むと数体の敵がいるのでこれを全て倒そう。<br />
          敵撃破後はレーシングカーに乗って道を進むことになる。<br />
          過去の連合の名残でエナジーを30個集めるミッションが表示されるが、スルーしてひたすら進んでしまって良い。<br />
          レーシングカーでの道のりが終わるとボス部屋の前に着く。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_PursuitofFate_1.PNG"
          alt="レーシングカーを起動しよう"
          caption="レーシングカーを起動しよう"
        />

        {/* ボス戦 */}
        <SectionTitle icon="theater_comedy">ボス戦：混乱メカ</SectionTitle>
        <div>
          混乱メカはHPが削れるとフィールド中央に戻ってから全速力で外周をダッシュしながらミサイル攻撃を仕掛けてくる。<br />
          この時、中央にバリアで守られたレバーが表れるのでバリアを破壊してレバーを引こう。<br />
          レバーを引くと外周に壁が出現し、混乱メカが激突してダッシュが止まる。<br />
          敵の体力はそこまで多くないので戦闘を速攻で終わらせるようにしよう！
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_PursuitofFate_2.mp4"
          alt="バリアを破壊してレバーを起動、混乱メカの動きを止めよう！"
          caption="バリアを破壊してレバーを起動、混乱メカの動きを止めよう！"
        />

        {/* 2種類のショートカット */}
        <SectionTitle icon="flight_takeoff">2種類のショートカットが可能</SectionTitle>
        <div>
          道中は誰でも使えるレーシングカーの道のりをスキップするショートカットと、飛行能力のある武器を使う道中を全てスキップするショートカットがある。<br />
          レーシングカーのスキップは車に乗ってからある程度進んだところで設定からフリーズ回避をすることでボス部屋前にスキップが可能。<br />
          レーシングカーの道のりは長いだけでスキップしても一切問題ないのでこちらは野良マッチングでもスキップ推奨。
        </div>
        <CaptionedMedia
          src="/JointOperation/jo_PursuitofFate_3.mp4"
          alt="フリーズ回避の目安は左側にあるフライドチキンの看板を過ぎたあたり"
          caption="フリーズ回避の目安は左側にあるフライドチキンの看板を過ぎたあたり"
        />
        <div className="mt-4">
          飛行能力のある武器でのスキップはスタート地点から真上に飛ぶことで見えない壁などに阻まれることなくステージの外を移動する裏技。<br />
          スタート地点から少し進んだ位置で飛ぶと天井にぶつかるので、スタート地点後ろの壁に引っ付くくらい下がってから飛ぶと成功しやすい。<br />
          こちらのショートカットは一部の武器を所持していないと使えないので、野良マッチングだと特に初心者を置いてきぼりにしてしまうのでソロか身内と了解の上で使うようにしよう。
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/F6veIm1iVUc"
                title="運命の追撃 ショートカット解説"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-lime-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PursuitofFatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};