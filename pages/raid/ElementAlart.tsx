import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-400/60 to-blue-100 border-l-8 border-blue-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-blue-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-blue-900">{children}</span>
    </div>
  );
}

// キャプション付き画像（拡大なし）
function CaptionedImage({
  src,
  alt,
  caption
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div
        className="rounded-lg shadow border-2 border-blue-300 overflow-hidden"
        style={{ width: "100%", maxWidth: 640 }}
      >
        <Image src={src} alt={alt} width={640} height={360} style={{ width: "100%", height: "auto" }} />
      </div>
      <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center">{caption}</div>
    </div>
  );
}

// 動画埋め込み
function CaptionedVideo({ src, caption }: { src: string, caption?: string }) {
  // 埋め込みURL変換(Youtube)
  const getEmbedUrl = (url: string): string => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="relative pb-[56.25%] w-full max-w-2xl h-0 overflow-hidden rounded">
        <iframe
          src={getEmbedUrl(src)}
          title="元素警戒攻略動画"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded"
        ></iframe>
      </div>
      {caption && (
        <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center">{caption}</div>
      )}
    </div>
  );
}

export default function ElementAlartPage() {
  return (
    <>
      <Head>
        <title>元素警戒 討伐作戦 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「元素警戒」の攻略ポイント、ギミック解説、チーム編成例などを詳しく紹介。" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">warning</span>
          元素警戒 討伐作戦 攻略
        </h1>

        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/ElementAlart.PNG"
            alt="元素警戒フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="auto_awesome">
          各属性に対応したギミックをチームでこなそう！
        </SectionTitle>
        <div>
          この討伐では4属性を順番に使ったギミックを攻略することでボスにダメージを与えられる。<br />
          敵が発動するギミックに合わせてこちらは<strong>雷</strong>、<strong>氷</strong>、<strong>物理</strong>、<strong>炎</strong>の順に属性を切り替えてギミックをこなす必要がある。<br />
          一人で全属性をこなすのは少し難しいので、複数人でギミックを分担しよう！
        </div>

        <SectionTitle icon="bolt">ギミック①：制裁の柱</SectionTitle>
        <div>
          飛廉がフィールド中央に移動した後、フィールド上に4本の柱が出現する。<br />
          この柱は1本につき1人がロックオンされ、時間経過で飛廉が範囲攻撃を行うのと同時にロックオンされたプレイヤーは即死級の継続ダメージを受ける。<br />
          ダメージを防ぐためには出現した柱に対して<strong>雷属性</strong>の攻撃を複数回hitさせる必要があり、4本の柱それぞれに30hitほど雷属性の攻撃を当てなければいけない。<br />
          柱はブレヴィの通常長押しなどで集中攻撃できないため、<strong>セミールの通常長押し</strong>で破壊するのがおススメ。
          <CaptionedImage
            src="/raid/ElementAlart_1.PNG"
            alt="制裁の柱"
            caption="いわゆるセミチュンが効果的"
          />
        </div>

        <SectionTitle icon="local_fire_department">ギミック②：灼熱呪怨</SectionTitle>
        <div>
          ギミック①の後に飛廉は弱点属性を<strong>氷属性</strong>に変更し、フィールド中央に炎属性の分身を召喚する。<br />
          この分身はダメージ軽減効果を持っており、本体に対して<strong>氷属性</strong>の攻撃を120hitさせることでダメージ軽減を解除できる。<br />
          氷属性のhit数が多い武器として<strong>SRのエンダー（ヒルダ）</strong>がおススメ。<br />
          注意点として、ダメージ軽減を解除するための弱点属性での攻撃は必ず<strong>本体</strong>を狙おう！
          <CaptionedImage
            src="/raid/ElementAlart_2.PNG"
            alt="灼熱呪怨"
            caption="ヒット数が多くて強力な耐性DOWNを持つエンダーが適任"
          />
        </div>

        <SectionTitle icon="bolt">ギミック③：雷轟呪怨</SectionTitle>
        <div>
          ギミック②の後に飛廉は弱点属性を<strong>物理属性</strong>に変更し、フィールド中央に雷属性の分身を召喚する。<br />
          本体に対して<strong>物理属性</strong>の攻撃を120hitさせることで分身のダメージ軽減を解除できる。<br />
          物理属性のhit数が多い武器として<strong>海の戦輪（シロ）</strong>、<strong>夕べの祈り（エスター）</strong>、<strong>プチハリケーン（グノノ）</strong>辺りがおススメ。<br />
          注意点として、雷の分身と本体からの攻撃は特に痛いので速攻でギミックを終わらせるか、回復役の恩恵を多めにチームに採用しよう。
          <CaptionedImage
            src="/raid/ElementAlart_3.PNG"
            alt="雷轟呪怨"
            caption="エスターなら回復しつつダメージ軽減を解除できるので良いかも"
          />
        </div>

        <SectionTitle icon="whatshot">ギミック④：徹骨呪怨</SectionTitle>
        <div>
          ギミック③の後に飛廉は弱点属性を<strong>炎属性</strong>に変更し、フィールド中央に氷属性の分身を召喚する。<br />
          本体に対して<strong>炎属性</strong>の攻撃を120hitさせることで分身のダメージ軽減を解除できる。<br />
          炎属性のhit数が多い武器として<strong>ビンタ（キャロット）</strong>を使用するか、<strong>アルケーのV型メカ</strong>を使用するのがおススメ。<br />
          このギミック終了後は再び弱点属性が雷になってギミック①～④を繰り返す。<br />
          注意点として、氷の分身召喚後はこちらの行動速度が遅くなるのでもたついていると分身を倒す前にギミックが終わってしまう。
          <CaptionedImage
            src="/raid/ElementAlart_4.PNG"
            alt="徹骨呪怨"
            caption="V型メカでちゃっちゃとギミックを処理しよう"
          />
        </div>

        <SectionTitle icon="psychology">分身は異能ノーラでも倒せる</SectionTitle>
        <div>
          分身が持つダメージ軽減は<strong>異能ノーラ</strong>であれば無視できる。<br />
          分身を倒せばギミックはクリアになるので、特にこだわりが無いのであれば異能ノーラで分身を処理してしまった方が圧倒的に楽。<br />
          ただし柱のギミックは異能ノーラでは対処できないので、そこは大人しくセミールを使おう。
          <CaptionedImage
            src="/raid/ElementAlart_5.PNG"
            alt="分身は異能ノーラでOK"
            caption="分身は異能ノーラでOK"
          />
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          基本的な<strong>強攻1～3人、剛毅1人、残りは恩恵</strong>の編成でOK。<br />
          グレイフォックスを持った恩恵がいればそうそう即死はしないので、ギミック担当を用意しつつ削り切ろう。<br />
          討伐自体が少し古めなので、強攻がインフレした今では分身ギミックを無視しても攻略可能だが、最初の柱のギミックは飛廉が無敵になるのでギミックのダメージが来る前にゴリ押すというのは難しい。<br />
          無理に最速クリアを目指すよりギミックを意識したチームで挑んだ方が安定してクリアできるのでしっかり役割分担するようにしよう。
        </div>

        {/* 広告挿入 */}
        <div style={{ width: 320, minWidth: 200, maxWidth: '100%' }}>
          <AdSenseContentUnit />
        </div>

        <SectionTitle icon="person">ソロ攻略も可能</SectionTitle>
        <div>
          異能ノーラを使えばソロ攻略も可能。<br />
          ただし最初の柱はデスコンとロールでごり押ししているので、チームで挑む場合には他の人に柱をお願いするか、回復を恩恵さんにお願いして自分は柱と分身処理に回るようにしよう。
        </div>

        <SectionTitle icon="movie">攻略動画</SectionTitle>
        <CaptionedVideo
          src="https://youtu.be/XCsAJLoZhfg"
        />
      </div>
    </>
  );
}

ElementAlartPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};