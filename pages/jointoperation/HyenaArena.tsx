import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-yellow-300/60 to-yellow-50 border-l-8 border-yellow-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-yellow-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-yellow-900">{children}</span>
    </div>
  );
}

// キャプション付き画像
function CaptionedImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-yellow-300 overflow-hidden">
        <Image src={src} alt={alt} width={480} height={270} />
        <div className="bg-yellow-50 px-4 py-1 text-xs text-yellow-800 border-t border-yellow-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像2枚横並び
function RowImages({
  images,
}: {
  images: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {images.map((img) => (
        <CaptionedImage key={img.src} {...img} />
      ))}
    </div>
  );
}

export default function HyenaArenaPage() {
  return (
    <>
      <Head>
        <title>連合作戦「ハイエナアリーナ」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「ハイエナアリーナ」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">sports_martial_arts</span>
          連合作戦「ハイエナアリーナ」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_HyenaArena.PNG"
            alt="ハイエナアリーナ ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から道なりに進んで広場の敵を倒したらシャッターが爆発して道が開ける。<br />
          道なりに進んだ先でピエロガール隊を倒し、その先の門番を倒すことでボスへの道が開ける。<br />
          ボスは最初にスウィーティーと戦い、これを倒すと降りてくるパラスを倒すとクリア。<br />
          広場の敵とピエロガール隊・門番以外の敵は倒さなくても良い。
        </div>
        <CaptionedImage
          src="/JointOperation/jo_HyenaArena_fase1to2.PNG"
          alt="道中の敵はスルーしてOK"
          caption="道中の敵はスルーしてOK"
        />

        <div>
          最初の広場の敵は正面にいる敵だけでなく、広場に入って右の方にいるハイエナの精鋭たちも倒さないと道が開けないので注意しよう。
        </div>
        <RowImages
          images={[
            {
              src: "/JointOperation/jo_HyenaArena_fase1_1.PNG",
              alt: "正面の敵",
              caption: "正面の敵",
            },
            {
              src: "/JointOperation/jo_HyenaArena_fase1_2.PNG",
              alt: "広場に入ってすぐ右にいる敵を忘れずに",
              caption: "広場に入ってすぐ右にいる敵を忘れずに",
            },
          ]}
        />
        <RowImages
          images={[
            {
              src: "/JointOperation/jo_HyenaArena_fase2_1.PNG",
              alt: "ピエロガール隊をスルーしないように",
              caption: "ピエロガール隊をスルーしないように",
            },
            {
              src: "/JointOperation/jo_HyenaArena_fase2_2.PNG",
              alt: "門番は少しだけ硬い",
              caption: "門番は少しだけ硬い",
            },
          ]}
        />

        <SectionTitle icon="theater_comedy">ボス戦：スウィーティー & パラス</SectionTitle>
        <div>
          スウィーティーは特にギミック等が無い普通の敵。<br />
          パラスは戦闘開始直後は無敵なのでこのタイミングでサポーターのバフを付与して一気に火力を出せるように準備しよう。<br />
          時間経過でパラスが爆弾をまき散らしながら中央の台から飛び上がって強力な攻撃をしてくるので、空中に浮いている大きな爆弾を台に当てて攻撃を阻止しよう！
        </div>
        <RowImages
          images={[
            {
              src: "/JointOperation/jo_HyenaArena_boss1.PNG",
              alt: "愛しのスウィート",
              caption: "愛しのスウィート",
            },
            {
              src: "/JointOperation/jo_HyenaArena_boss2.PNG",
              alt: "仇を取ってやる！",
              caption: "仇を取ってやる！",
            },
          ]}
        />

        <SectionTitle icon="flight_takeoff">ボス直行も可能</SectionTitle>
        <div>
          アントリア等飛行能力の高い武器があれば道中を飛ばしてボスに直接飛ぶこともできる。<br />
          ソロでやる分にはいいが、野良マッチングでやると他の人が置いてけぼりになるので普通にやるようにしよう。
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/7WDI1xi38_g"
                title="ハイエナアリーナ ボス直行ルート"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-yellow-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HyenaArenaPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};