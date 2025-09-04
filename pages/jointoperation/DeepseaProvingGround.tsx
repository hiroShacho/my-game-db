import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-sky-300/60 to-sky-50 border-l-8 border-sky-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-sky-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-sky-900">{children}</span>
    </div>
  );
}

// キャプション付き画像
function CaptionedImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-sky-300 overflow-hidden">
        <Image src={src} alt={alt} width={480} height={270} style={{objectFit: "contain"}} />
        <div className="bg-sky-50 px-4 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像・動画 横並び
function RowMedia({
  media,
}: {
  media: { src: string; alt: string; caption: string; isVideo?: boolean }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {media.map((m) =>
        m.isVideo ? (
          <div key={m.src} className="flex flex-col items-center my-3 w-full sm:w-auto">
            <div className="rounded-lg shadow border-2 border-sky-300 overflow-hidden w-[480px] max-w-full">
              <video controls width={480} height={270} style={{display: "block", width: "100%", height: "auto"}}>
                <source src={m.src} type="video/mp4" />
                {m.alt}
              </video>
              <div className="bg-sky-50 px-4 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center">{m.caption}</div>
            </div>
          </div>
        ) : (
          <CaptionedImage key={m.src} src={m.src} alt={m.alt} caption={m.caption} />
        )
      )}
    </div>
  );
}

export default function DeepseaProvingGroundPage() {
  return (
    <>
      <Head>
        <title>連合作戦「深海訓練所」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「深海訓練所」のダンジョン構成・ボスギミック・攻略ポイントを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-sky-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500">waves</span>
          連合作戦「深海訓練所」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_DeepseaProvingGround.PNG"
            alt="深海訓練所 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          スタート地点から進むとワープ地点があるので上層を選ぼう。<br />
          上層でヴァルカンを倒すと道が開けて、その先でオムニアム衛兵8体を倒そう。<br />
          衛兵を倒したら道が開けるのでそのまま道なりに進もう。<br />
          途中で何体か敵がいるがこれは無視して構わない。<br />
          奥まで進むと屋上アリーナへのワープがあるのでそこからワープしてボスのいる部屋へ飛ぼう。
        </div>
        <RowMedia
          media={[
            {
              src: "/JointOperation/jo_DeepseaProvingGround_1.PNG",
              alt: "最初のワープは「基地-上層」を選択しよう",
              caption: "最初のワープは「基地-上層」を選択しよう",
            },
            {
              src: "/JointOperation/jo_DeepseaProvingGround_2.PNG",
              alt: "最奥のワープでボスのいる「屋上アリーナ」へ",
              caption: "最奥のワープでボスのいる「屋上アリーナ」へ",
            },
          ]}
        />

        <SectionTitle icon="sports_kabaddi">ボス戦：いて座ケイロン</SectionTitle>
        <div>
          ケイロンはフィールドを走り回り、壁際上部に見える金色のエナジーを吸収して大技を繰り出そうとする。<br />
          このエナジーに攻撃を当てるとエナジーが赤色に変化し、ケイロンがこれを吸収すると走り回るのを中断できる。<br />
          エナジーには遠距離武器やアルケーを当てるか接近して近接攻撃を当てれば良い。<br />
          走り回ってる時も普通に攻撃は当たるので大技が来る前に倒し切ってしまうのも一つの手。
        </div>
        <RowMedia
          media={[
            {
              src: "/JointOperation/jo_DeepseaProvingGround_3.mp4",
              alt: "エナジーに攻撃を当てて動きを止めよう！",
              caption: "エナジーに攻撃を当てて動きを止めよう！",
              isVideo: true,
            },
          ]}
        />

        <SectionTitle icon="lock_open">道中の隠し部屋へのワープは気にしなくてOK</SectionTitle>
        <div>
          最初のワープとオムニアム衛兵を倒した後の通路にあるワープから隠し部屋にワープできる。<br />
          隠し部屋には箱があるが中身はそこら辺で手に入るアイテムしか入ってないのでスルーしてしまって良い。
        </div>
        <RowMedia
          media={[
            {
              src: "/JointOperation/jo_DeepseaProvingGround_4.PNG",
              alt: "衛兵を倒した後の通路にも隠し部屋へのワープがある",
              caption: "衛兵を倒した後の通路にも隠し部屋へのワープがある",
            },
            {
              src: "/JointOperation/jo_DeepseaProvingGround_5.PNG",
              alt: "箱があるが中身はショボい",
              caption: "箱があるが中身はショボい",
            },
          ]}
        />

        <SectionTitle icon="flight_takeoff">飛行武器でショートカットが可能</SectionTitle>
        <div>
          アントリアなどの飛行が可能な武器があれば道中をスキップできる。<br />
          野良マッチングだと他のプレイヤーが置いてきぼりになる上に途中でムービーが挟まると落下死する可能性もあるのでソロか身内で使う程度に留めよう。
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/yxv_dJa65Ro"
                title="深海訓練所 ショートカット動画"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-sky-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DeepseaProvingGroundPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};