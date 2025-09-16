import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-300/60 to-orange-50 border-l-8 border-orange-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-orange-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-orange-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-orange-300 overflow-hidden">
        {isVideo ? (
          <video src={src} controls width={480} height={270} style={{ background: "#222" }}>
            {alt}
          </video>
        ) : (
          <Image src={src} alt={alt} width={480} height={270} />
        )}
        <div className="bg-orange-50 px-4 py-1 text-xs text-orange-800 border-t border-orange-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像・動画横並び
function RowMedia({
  medias,
}: {
  medias: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {medias.map((media) => (
        <CaptionedMedia key={media.src} {...media} />
      ))}
    </div>
  );
}

export default function PittingPredatorsPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「駆虎呑狼の計」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「駆虎呑狼の計」攻略。ギミック・攻略ポイント・チーム編成を徹底解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-orange-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">pets</span>
          討伐作戦「駆虎呑狼の計」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/PittingPredators.PNG"
            alt="駆虎呑狼の計 フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="psychology">同士討ちを活用して敵の耐性を削ろう！</SectionTitle>
        <div>
          この討伐では白と赤の2体のディフェンダーを相手取ることになり、ディフェンダーたちは2種類のダメージ耐性を持っている。<br />
          1つは50%の最終被ダメージ軽減効果でこの効果は解除できない。<br />
          もう1つはHPの下にあるスタックが溜まっているほど強力になる耐性となっており、この耐性は2体のディフェンダーの同士討ちで削ることが出来る。（後述のギミック②）<br />
          そのため、この討伐では2体の攻撃を上手く誘導して有利になるように立ち回ろう！
        </div>

        <SectionTitle icon="sync_problem">ギミック①：一蓮托生</SectionTitle>
        <div>
          2体のディフェンダーは体力が0になる際に死亡回避効果を発動する。<br />
          この効果が発動した後に15秒経過するとディフェンダーは体力を回復して復活する。<br />
          この効果はもう片方のディフェンダーが同様の体力0の状態にならないかぎり防げないので、2体の体力を均等に削ってほぼ同時に倒すようにしよう！
        </div>
        <CaptionedMedia
          src="/raid/PittingPredators_1.PNG"
          alt="体力が0になると死亡回避が発動する"
          caption="体力が0になると死亡回避が発動する"
        />

        <SectionTitle icon="local_fire_department">ギミック②：薄氷の歩み＆烈火焚身</SectionTitle>
        <div>
          2体のディフェンダーは5スタックの属性エナジーを保有している。<br />
          白いディフェンダーは最初から5スタック所持しており、赤いディフェンダーは0スタックからスタートだがどちらのディフェンダーも攻撃のたびにスタックが溜まっていく。<br />
          このスタックが溜まっているほど敵の攻撃と耐性が強力になり、スタックが削れるとディフェンダーはダメージを受ける。<br />
          白いディフェンダーは1スタックごとに攻撃力+20%、被ダメージ軽減+8%を獲得し、赤いディフェンダーは1スタックごとに攻撃力+80%、被ダメージ軽減+8%を獲得する。<br />
          スタックは同士討ちで削れていくので、この討伐ではとにかく同士討ちを狙うことが重要になる。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PittingPredators_2.PNG",
              alt: "スタックはHPの下に表示されている",
              caption: "スタックはHPの下に表示されている",
            },
            {
              src: "/raid/PittingPredators_3.PNG",
              alt: "スタックを同士討ちで削ろう！",
              caption: "スタックを同士討ちで削ろう！",
            },
          ]}
        />

        <SectionTitle icon="directions_run">スタックが減ったディフェンダーは行動が変わる</SectionTitle>
        <div>
          白いディフェンダーはスタックがある間はこちらに接近してくるが、スタックが無くなると距離を取ってくるようになる。<br />
          対して赤いディフェンダーはスタックの有無に関わらず常にこちらに接近してくる。<br />
          そのため、基本的には白いディフェンダーを追うように動いていれば両方のディフェンダーと近くで戦うことが可能となっている。
        </div>

        <SectionTitle icon="groups">チーム編成</SectionTitle>
        <div>
          基本的な剛毅1人、強攻3～4人、恩恵3～4の編成で挑もう。<br />
          敵の攻撃は剛毅が誘導して同士討ちを狙いながら戦おう！<br />
          なお、白いディフェンダーの体力を13%ほど削るまでは赤いディフェンダーは出現しないのでそれまでは純粋な火力だけで削る必要がある。<br />
          もっとも週討伐に入ってからは敵も弱体化しているのでギミックが少ない分、火力でのごり押しも他の討伐よりは簡単だろう。
        </div>

        <SectionTitle icon="movie">解説動画</SectionTitle>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/vLogp6L2NHs"
                title="討伐作戦「駆虎呑狼の計」解説動画"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-orange-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PittingPredatorsPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};