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

// キャプション付き画像・動画
function CaptionedMedia({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-yellow-300 overflow-hidden">
        {isVideo ? (
          <video src={src} controls width={480} height={270} style={{ background: "#222" }}>
            {alt}
          </video>
        ) : (
          <Image src={src} alt={alt} width={480} height={270} />
        )}
        <div className="bg-yellow-50 px-4 py-1 text-xs text-yellow-800 border-t border-yellow-200 w-full text-center">{caption}</div>
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

export default function MechaSimulationPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「機兵演習」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「機兵演習」攻略。ギミック・攻略ポイント・チーム編成を徹底解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-yellow-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">precision_manufacturing</span>
          討伐作戦「機兵演習」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/MechaSimulation.PNG"
            alt="機兵演習 フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="psychology">ギミックをこなして敵の攻撃と回復を防ごう！</SectionTitle>
        <div>
          この討伐ではギミックの処理に失敗すると即死級のダメージを受けたり敵の体力が回復する。<br />
          ヒット数の多い武器とシールドブレイク率の高い武器を用意して後述のギミックにしっかり対処しよう！
        </div>

        <SectionTitle icon="bolt">ギミック①：雷罰マーク&電流誘導</SectionTitle>
        <div>
          英招が雷を纏って槍を強化した後、プレイヤーの頭上に10スタックの「雷罰マーク」が表示される。<br />
          この「雷罰マーク」は「電流誘導」という一定時間ごとにプレイヤー2名に落雷攻撃が発動するギミックに追加ダメージを発生させる。<br />
          「雷罰マーク」は5秒ごとにスタック数が1つずつ減っていき、英招の攻撃を受けるとスタック数が増える。<br />
          「電流誘導」の落雷を避ければ追加ダメージは発生しないが、落雷の範囲はそれなりに広いので戦闘中に咄嗟に避けるのは少し難しい。<br />
          幸い恩恵が回復をしていればどうにかなる程度のダメージなので、恩恵は落雷のたびに回復できるように構えておこう。
        </div>
        <CaptionedMedia
          src="/raid/MechaSimulation_1.PNG"
          alt="英招が槍を強化すると雷劫の文字の後に「雷罰マーク」のスタック数が表示される"
          caption="英招が槍を強化すると雷劫の文字の後に「雷罰マーク」のスタック数が表示される"
        />

        <SectionTitle icon="highlight">ギミック②：妨害電槍</SectionTitle>
        <div>
          英招がフィールドに4本の槍を召喚し、一定時間経過でこの槍が広範囲に即死級のダメージを発生させる。<br />
          槍は一定回数攻撃をヒットさせることで破壊でき、槍を破壊するとギミック①の「雷罰マーク」のスタックが5つ減少する。<br />
          槍の周囲には衝撃波が発生しており、「雷罰マーク」を持っているプレイヤーは追加のダメージを受ける。<br />
          なお、槍は破壊できなかった数だけ即死級のダメージが発生するので必ず4本全てを破壊しよう。
        </div>
        <CaptionedMedia
          src="/raid/MechaSimulation_2.PNG"
          alt="槍はヒット数の多い武器で破壊しよう！"
          caption="槍はヒット数の多い武器で破壊しよう！"
        />

        <SectionTitle icon="share">ギミック③：雷電チェーン</SectionTitle>
        <div>
          英招がシールドを貼った後にチャージがMAXになる or シールドを破壊するとフィールド内に青と紫の槍が3本ずつ出現し、同時にランダムなプレイヤー6名が選ばれて3名に青のチェーン、残りの3名に紫のチェーンが繋がれる。<br />
          このチェーンでフィールド上のチェーンと同じ色の槍を全て囲むことで槍を破壊でき、青と紫の槍を両方とも破壊すると敵の大技を中断できる。<br />
          このギミックをこなすと敵の体力が大きく削れて隙もできるので、チェーンが繋がれたら焦らず他の人との位置を見てチェーンで作る三角が大きくなるように動こう。<br />
          なお、槍とチェーンが発生する前のシールドを破壊できないと敵の体力が大きく回復してしまうので、剛毅はシールドブレイク率の高い武器で必ずシールドを破壊するようにしよう。<br />
          ギミックに失敗しても大技のダメージは即死級とまではいかないので、失敗した時は落ち着いてフィールド端に逃げるか剛毅・恩恵が味方にHPシールドを付与してあげよう。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/MechaSimulation_3.mp4",
              alt: "シールドを破壊しないと敵が回復する",
              caption: "シールドを破壊しないと敵が回復する",
            },
            {
              src: "/raid/MechaSimulation_4.PNG",
              alt: "槍は同じ色のチェーンで作った三角で囲もう",
              caption: "槍は同じ色のチェーンで作った三角で囲もう",
            },
          ]}
        />

        <SectionTitle icon="shield">ギミックによるダメージと回復はアルケー等で無効化できる</SectionTitle>
        <div>
          ギミック②の即死級のダメージはクーラントのバリアが残っている時やフィオナの単発被ダメージ無効で防げる。<br />
          ただし、どちらも英招から攻撃を受けるとダメージを防げなくなるので事故らないためにデスコントロールを使うのが無難。<br />
          また、ギミック③のタイミングでシールドを破壊できなかった時も時空の裂け目の完凸効果で回復を防げる。<br />
          チャージがMAXになるとすぐに回復するので少し早めに発動する必要があるのと、英招は時折大きく移動したり中央にワープするので使用するタイミングは見極めよう。
        </div>

        <SectionTitle icon="groups">チーム編成</SectionTitle>
        <div>
          基本的な剛毅1人、強攻3～4人、恩恵3～4の編成で挑もう。<br />
          ギミック②の槍破壊は出来れば全員で処理して、シールドは剛毅が頑張って破壊するか時空の裂け目を使おう。<br />
          いざという時はデスコントロールで死亡回避が可能なので、1人でいいので恩恵にデスコン役を用意しておくと安定する。
        </div>

        <SectionTitle icon="person">ソロ討伐も可能</SectionTitle>
        <div>
          ギミックを無視してソロ討伐することも可能<br />
          異能ノーラや最新の強攻編成で火力は十分足りる
        </div>
        <div className="w-full flex flex-col gap-6 my-4">
          <div className="w-full flex justify-center">
            <div className="relative w-full" style={{ maxWidth: 560 }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/fX3oAe3uUxY"
                  title="機兵演習ソロ討伐動画1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded shadow border border-yellow-200"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="relative w-full" style={{ maxWidth: 560 }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/7kvuBTF9L54"
                  title="機兵演習ソロ討伐動画2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded shadow border border-yellow-200"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="relative w-full" style={{ maxWidth: 560 }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/mBtMnFj78g4"
                  title="機兵演習ソロ討伐動画3"
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
      </div>
    </>
  );
}

MechaSimulationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};