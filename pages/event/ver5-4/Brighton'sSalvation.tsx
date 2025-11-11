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
        <title>イベント「ブライトンの救済」＆「ゴーストツアー」 | 幻塔攻略データベース</title>
        <meta name="description" content="イベント「ブライトンの救済」＆「ゴーストツアー」の紹介ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-pink-500">celebration</span>
          イベント「ブライトンの救済」＆「ゴーストツアー」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/ver_event/New_Event_TOP.PNG"
            alt="ブライトンの救済＆ゴーストツアー トップ"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>
        <div>
          今回のイベントは「ブライトンの救済」と「ゴーストツアー」で商店が別の内容になっているので注意。<br />
          開催期間もゴーストツアーの方が短くなっているのでなるべく毎日上限までやっておくことをおススメする。<br />
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_shop.PNG",
              alt: "ショップは別（通貨が違う）ので注意",
              caption: "ショップは別（通貨が違う）ので注意",
            },
          ]}
        />

        <SectionTitle icon="account_tree">脳端末対抗（8人マッチ）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="脳端末対抗 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          8人マッチのサバイバル形式のミニゲーム。<br />
          ガチャを回して武器を揃えて戦闘を有利に進めよう。<br />
          ガチャで出る武器は上部に表示されているガチャレベルを上げることでより良いものになる。<br />
          最大7回の戦闘を最速で勝ち抜くことで勝者となる。<br />
          基本的には最速でガチャレベルを上げてVer5.0以降の武器を取れば1位になれる。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_1_1.PNG",
              alt: "ガチャで武器を集める",
              caption: "ガチャで武器を集める",
            },
            {
              src: "/ver_event/New_Event_1_2.PNG",
              alt: "ガチャレベルを上げることでより良い武器が出てくる",
              caption: "ガチャレベルを上げることでより良い武器が出てくる",
            },
            {
              src: "/ver_event/New_Event_1_3.PNG",
              alt: "最後の戦闘に最速で勝利すれば1位",
              caption: "最後の戦闘に最速で勝利すれば1位",
            },
          ]}
        />

        <SectionTitle icon="directions_run">ネオントルネード（最大300人）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_2.PNG"
            alt="ネオントルネード トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          最大300人でマッチングするレースゲーム。<br />
          ブライトン区内にある10カ所のチェックポイントを通ることでゴールになる。<br />
          上下の移動が多いので移動性能がある武器を持っていると有利になれるぞ！<br />
          報酬で貰える欠片を集めて手に入る箱からは猫マフラーのアクセ等が貰える。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_2_1.PNG",
              alt: "チェックポイントは全10カ所",
              caption: "チェックポイントは全10カ所",
            },
            {
              src: "/ver_event/New_Event_2_2.PNG",
              alt: "アントリアやアストールがあると有利",
              caption: "アントリアやアストールがあると有利",
            },
            {
              src: "/ver_event/New_Event_2_3.PNG",
              alt: "報酬の欠片を集めると可愛いアクセが貰えるぞ！",
              caption: "報酬の欠片を集めると可愛いアクセが貰えるぞ！",
            },
          ]}
        />

        <SectionTitle icon="groups">生存同名（8人マッチ）</SectionTitle>
          <Image
            src="/ver_event/New_Event_3.png"
            alt="生存同名 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        <div>
          Mi-aになって2人ペアでフルーツを集めるミニゲーム。<br />
          2人はレーザーで繋がれており、他のプレイヤーをこのレーザーに当てるとそのペアを倒して持っていたフルーツの一部をドロップできる。<br />
          回避の加速を上手く使って敵をレーザーで倒して差をつけよう！
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_3_1.PNG",
              alt: "2人1組で他3ペアと競う",
              caption: "2人1組で他3ペアと競う",
            },
            {
              src: "/ver_event/New_Event_3_2.PNG",
              alt: "報酬はポイントのみ",
              caption: "報酬はポイントのみ",
            },
          ]}
        />

        <SectionTitle icon="help">霧に満ちた身分（4人マッチ）</SectionTitle>
          <Image
            src="/ver_event/New_Event_4.png"
            alt="霧に満ちた身分 トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        <div>
          30体のドロイドの中に紛れて他のプレイヤーの擬態を見破るミニゲーム。<br />
          26体のドロイドはランダムに行動しているのでその行動を真似することで他のプレイヤーにバレにくくなる。<br />
          報酬は商店のポイントだけだが、あえてお互い相手を倒さないことで長時間生き残ることで一度に3000点以上稼ぐのも狙えるぞ！
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_4_1.PNG",
              alt: "矢印が当たってるドロイドが自分",
              caption: "矢印が当たってるドロイドが自分",
            },
            {
              src: "/ver_event/New_Event_4_2.PNG",
              alt: "落ちてくる貝を拾うとポイントが増える",
              caption: "落ちてくる貝を拾うとポイントが増える",
            },
            {
              src: "/ver_event/New_Event_4_3.PNG",
              alt: "長く生き残る＆貝を拾うほど高得点",
              caption: "長く生き残る＆貝を拾うほど高得点",
            },
          ]}
        />

        <SectionTitle icon="tour">ゴーストツアー（8人マッチ）</SectionTitle>
        <div className="rounded-lg shadow my-3 mx-auto w-full" style={{ maxWidth: 640 }}>
          <Image
            src="/ver_event/New_Event_5.PNG"
            alt="ゴーストツアー トップ"
            width={640}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          8人マッチのミニゲーム。<br />
          1人がオバケ役になって他の7人がそれを追いかける。<br />
          オバケが通ったマスを通るとポイントを獲得でき、それ以外のマスを踏むとポイントが減る。<br />
          時間経過で出現するカボチャを拾うと他のプレイヤーに凍結・減速効果を付与できる。<br />
          一度通ったマスは再びオバケが踏むまでマイナスマスになるが、オバケが通ったマスは踏むまでずっとプラスマスのままなので凍結などで距離を離されても大体の場合はオバケに向かって最短ルートを進んでしまって良い。<br />
          オバケ役はかなり不利（というか勝てるように作られていない）ので出来る限り凍結などを使って距離を取るようにしよう。
        </div>
        <RowMedia
          items={[
            {
              src: "/ver_event/New_Event_5_1.PNG",
              alt: "オバケと戯れるMi-aが非常にキュート",
              caption: "オバケと戯れるMi-aが非常にキュート",
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