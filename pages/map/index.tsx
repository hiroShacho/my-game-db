import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// セクションタイトル（ベース部分は絶対変更禁止）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-cyan-400/60 to-cyan-100 border-l-8 border-cyan-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-cyan-600 text-2xl align-middle">{icon}</span>
      )}
      <span className="text-2xl font-bold text-cyan-900">{children}</span>
    </div>
  );
}

// 区切りのみ
const AreaDivider = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <div
    className="flex items-center gap-2 mb-2 mt-8 pl-4"
    style={{
      borderLeft: "10px solid #17e6a7",
      borderBottom: "3px solid #17e6a7",
      paddingBottom: 5,
      width: "fit-content",
      background: "linear-gradient(90deg, #e0f7fa 60%, #a7ffeb 100%)",
      borderRadius: "0 16px 16px 0"
    }}
  >
    <span className="text-3xl">{icon}</span>
    <h2 className="text-2xl sm:text-3xl font-bold mb-0 text-cyan-800">{children}</h2>
  </div>
);

// ■項目のみ New_ver_info.tsx SectionTitle風
const SectionDivider = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <div
    className="flex items-center gap-2 mb-2 mt-7 pl-3"
    style={{
      borderLeft: "8px solid #17e6a7",
      borderBottom: "2.5px solid #17e6a7",
      paddingBottom: 2,
      width: "fit-content",
      background: "#f0f9ff",
      borderRadius: "0 12px 12px 0"
    }}
  >
    <span className="text-2xl text-cyan-700">{icon}</span>
    <span className="text-lg sm:text-xl font-bold text-cyan-900">{children}</span>
  </div>
);

// 画像拡大モーダル（ベース厳守）
function ImageModal({
  src, alt, open, onClose, width = 320
}: { src: string; alt: string; open: boolean; onClose: () => void; width?: number }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow text-gray-700 text-lg z-10"
          aria-label="閉じる"
        >
          ×
        </button>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

// キャプション付き画像（ベース厳守）
function CaptionedImage({
  src, alt, caption, width = 320, height = 180, objectPosition = "center"
}: { src: string; alt: string; caption: string; width?: number; height?: number; objectPosition?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center my-2 w-full" style={{ maxWidth: "100%" }}>
        <div
          className="rounded-xl shadow border-2 border-cyan-300 overflow-hidden cursor-zoom-in transition hover:ring-2 hover:ring-cyan-500"
          onClick={() => setOpen(true)}
          title="クリックで拡大"
          style={{ width: "100%", maxWidth: width, height }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            objectFit="cover"
            objectPosition={objectPosition}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: objectPosition,
              maxWidth: "100%",
              display: "block"
            }}
          />
        </div>
        <div className="bg-cyan-50 px-2 py-1 text-xs text-cyan-900 border-t border-cyan-200 text-center w-full"
          style={{ maxWidth: width, width: "100%" }}>
          {caption}
        </div>
      </div>
      <ImageModal src={src} alt={alt} open={open} onClose={() => setOpen(false)} width={width} />
    </>
  );
}

// 画像横並び（ベース厳守）
function ImageRow({ images }: { images: { src: string; alt: string; caption: string; objectPosition?: string; width?: number; height?: number }[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center my-2 w-full" style={{ maxWidth: "100%" }}>
      {images.map((img, i) =>
        <div key={i} className="flex-1 min-w-[140px] max-w-[img.width||320px]" style={{ margin: "0 auto" }}>
          <CaptionedImage
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            width={img.width || 320}
            height={img.height || 180}
            objectPosition={img.objectPosition || "center"}
          />
        </div>
      )}
    </div>
  );
}

// キャプション付き動画（ベース厳守）
function CaptionedVideo({ src, caption, width = 320, height = 180 }: { src: string; caption: string; width?: number; height?: number }) {
  return (
    <div className="flex flex-col items-center my-3 w-full" style={{ maxWidth: "100%", margin: "0 auto" }}>
      <div className="rounded-lg shadow border-2 border-cyan-300 overflow-hidden w-full" style={{ maxWidth: width, width: "100%" }}>
        <video src={src} controls width={width} height={height} style={{ background: "#222", width: "100%", maxWidth: width, height: "auto" }}>
          {caption}
        </video>
        <div className="bg-cyan-50 px-2 py-1 text-xs text-cyan-900 border-t border-cyan-200 text-center w-full" style={{ maxWidth: width, width: "100%" }}>
          {caption}
        </div>
      </div>
    </div>
  );
}

function MapIndexPage() {
  return (
    <>
      <Head>
        <title>探索マップ | 幻塔攻略データベース</title>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="relative w-full h-40 sm:h-64 overflow-hidden rounded-lg shadow mb-6 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-400">
        <Image
          src="/map/map_top.PNG"
          alt="探索マップ"
          fill
          style={{ objectFit: "cover", opacity: 0.5 }}
          className="pointer-events-none select-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow mb-2">探索マップ</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6 w-full">
        {/* ↓この2項目は絶対に変更禁止 */}
        <SectionTitle icon="link">マップリンク（制作中）</SectionTitle>
        <ul className="list-disc ml-6 mb-6 text-lg">
          <li>
            <Link href="/map/kailo_OreZero_EXpoint" className="text-blue-700 hover:underline font-semibold">
              キルオ：ゼロ鉱山区
            </Link>
          </li>
        </ul>
        <SectionTitle icon="star">レッドコア探索まとめ（制作中）</SectionTitle>
        <div className="mb-3 text-lg text-gray-800">
          レッドコアが手に入る探索ポイントについて以下にまとめておく。<br />
          基本的にマップ上に補給庫のアイコンは表示されないので注意しよう。
        </div>

        {/* ＜人工島＞区切りのみNew_ver_info.tsx風 */}
        <AreaDivider icon={<span>🏝️</span>}>{`人工島　`}</AreaDivider>

        {/* トラック内その1：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">トラック内その①　</SectionDivider>
        <ImageRow
          images={[
            {
              src: "/map/ArtificialIsland_redcore1_1.PNG",
              alt: "トラックその1",
              caption: "トラックその1",
              objectPosition: "center bottom"
            }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          0号基地のトラック内にあるレッドコアその1<br />
          「鉱山拠点」北にある浮島の下のワープからトラック内に侵入できる
        </div>
        <ImageRow
          images={[
            { src: "/map/ArtificialIsland_redcore1_2.PNG", alt: "鉱山拠点北の浮島", caption: "「鉱山拠点」北にある浮島" },
            { src: "/map/ArtificialIsland_redcore1_3.PNG", alt: "浮島下のワープ", caption: "浮島の下にワープがある" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          浮島へは「転送ゲート：鉄さびキャンプ」付近のワープから「転送ゲート：イーグルの巣」のある上空の足場に登り、そこから浮島に向かって飛んでいこう
          <br />
          上空の足場に登った際に転送ゲートを開放するのも忘れずに
        </div>
        <ImageRow
          images={[
            { src: "/map/ArtificialIsland_redcore1_4.PNG", alt: "鉄さびキャンプ付近ワープ", caption: "「転送ゲート：鉄さびキャンプ」付近のワープ" },
            { src: "/map/ArtificialIsland_redcore1_5.PNG", alt: "上空ワープ", caption: "上空にワープがある" }
          ]}
        />
        <ImageRow
          images={[
            { src: "/map/ArtificialIsland_redcore1_6.PNG", alt: "イーグルの巣ワープ", caption: "「イーグルの巣」にワープできる" }
          ]}
        />

        {/* トラック内その2：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">トラック内その②　</SectionDivider>
        <ImageRow
          images={[
            { src: "/map/ArtificialIsland_redcore2_1.PNG", alt: "トラックその2", caption: "トラックその2" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          「0号基地」のトラック内にあるレッドコアその2<br />
          「0号基地」付近にある浮島の下のワープからトラック内に侵入できる<br />
          浮島にはその1と同じく「イーグルの巣」から飛んでいこう
        </div>
        <ImageRow
          images={[
            { src: "/map/ArtificialIsland_redcore2_2.PNG", alt: "0号基地付近浮島", caption: "「0号基地」付近にある浮島" },
            { src: "/map/ArtificialIsland_redcore2_3.PNG", alt: "浮島下のワープその2", caption: "浮島の下にワープがある" }
          ]}
        />

        {/* 日照り島：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">日照り島（バリアに覆われた島）　</SectionDivider>
        <div className="text-gray-600 text-base mb-4">
          非常に長い手順が必要なので画像を含めた解説を別ページで作成中
        </div>

        {/* ＜ヴェラ＞区切りのみNew_ver_info.tsx風 */}
        <AreaDivider icon={<span>🏜️</span>}>{`ヴェラ　`}</AreaDivider>

        {/* スレーター渓谷北部：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">「スレーター渓谷」北部　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">壁の裏にある補給庫</div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore1_1.PNG", alt: "壁裏に隠された補給庫", caption: "壁裏に隠された補給庫" },
            { src: "/map/Vera_redcore1_2.PNG", alt: "特にギミックは無い", caption: "特にギミックは無い" }
          ]}
        />

        {/* こだまの滝付近：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">瘴気の沼：「こだまの滝」付近　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">滝付近の崖の中腹にある補給庫</div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore2_1.PNG", alt: "滝近くの中腹にある補給庫", caption: "滝近くの中腹にある補給庫" },
            { src: "/map/Vera_redcore2_2.PNG", alt: "特にギミックは無い2", caption: "特にギミックは無い" }
          ]}
        />

        {/* 転送ゲート・こだまの滝付近：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">瘴気の沼：「転送ゲート・こだまの滝」付近　</SectionDivider>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore3_1.PNG", alt: "転送ゲートからすぐそこにある", caption: "転送ゲートからすぐそこにある" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          転送ゲートのすぐ近くにある補給庫<br />
          晴れの時限定で取れる補給庫<br />
          雨が降っていると水位が上がって取れない
        </div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore3_2.PNG", alt: "雨の時は水位が上がっている", caption: "雨の時は水位が上がっている" },
            { src: "/map/Vera_redcore3_3.PNG", alt: "晴れの時のみ取れる", caption: "晴れの時のみ取れる" }
          ]}
        />

        {/* 海底トンネル上空の樹周辺の足場：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">瘴気の沼：「海底トンネル」上空の樹周辺の足場　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          下から登るのではなく周囲の崖からジェットパックを使って渡ろう
        </div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore4_1.PNG", alt: "海底トンネル上空の足場", caption: "海底トンネル上空の足場" },
            { src: "/map/Vera_redcore4_2.PNG", alt: "特にギミックは無い3", caption: "特にギミックは無い" }
          ]}
        />

        {/* 廃棄された海底トンネル付近：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">瘴気の沼：「廃棄された海底トンネル」付近　</SectionDivider>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore5_1.PNG", alt: "転送ゲートから徒歩で行ける範囲", caption: "転送ゲートから徒歩で行ける範囲" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          晴れの時限定で取れる補給庫<br />
          雨が降っていると水位が上がって取れない
        </div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore5_2.PNG", alt: "雨の時は水位が上がっている2", caption: "雨の時は水位が上がっている" },
            { src: "/map/Vera_redcore5_3.PNG", alt: "晴れの時のみ取れる2", caption: "晴れの時のみ取れる" }
          ]}
        />

        {/* 第2基地付近の崖上：■項目のみNew_ver_info.tsx風 */}
        <SectionDivider icon="■">瘴気の沼：「第2基地」付近の崖上　</SectionDivider>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore6_1.PNG", alt: "ギミックは崖の上にある", caption: "ギミックは崖の上にある" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          崖の上にあるギミックを解くとレッドコアを獲得できる<br />
          ギミック周辺にはラフレシアが生えており、この周辺にいるとラフレシアの毒で持続ダメージを受ける<br />
          【啓示の種】があればモンスターの卵で【発芽した啓示の種】を入手してラフレシアを閉じることが可能だが戦闘が必要なので一旦ここではごり押しする方法だけ解説<br />
          崖下の浄水装置で毒を一定時間防げるので、浄水装置を起動したら近くのジャンプ台でギミックを解きに行こう
        </div>
        <ImageRow
          images={[
            { src: "/map/Vera_redcore6_2.PNG", alt: "ラフレシアの毒でダメージ", caption: "ラフレシアの毒でダメージ" },
            { src: "/map/Vera_redcore6_3.PNG", alt: "浄水装置で毒を中和", caption: "浄水装置で毒を中和（時間制限あり）" }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          ギミックは決まった順番で床を踏むだけなので、落ち着いて順番通りに踏めば特別な手順は必要ない。
        </div>
        {/* Vera_redcore6_4.PNG のサイズを大きく */}
        <ImageRow
          images={[
            { src: "/map/Vera_redcore6_4.PNG", alt: "ラフレシアの位置を目印にして踏んでいこう", caption: "ラフレシアの位置を目印にして踏んでいこう", width: 640, height: 360 }
          ]}
        />
        <div className="mb-2 text-lg text-gray-800">
          床は順番通りに踏んでいれば多少時間を開けても大丈夫なので、何回かに分けて踏むとダメージを受けずに攻略できるぞ！
        </div>
        {/* Vera_redcore6_5.mp4 のサイズを大きく */}
        <CaptionedVideo src="/map/Vera_redcore6_5.mp4" caption="何回かに分けて挑戦すればラフレシアを閉じなくても攻略可能" width={640} height={360} />
      </div>

        {/* ＜ミラポリス＞区切りのみNew_ver_info.tsx風 */}
        <AreaDivider icon={<span>🏙️</span>}>{`ミラポリス　`}</AreaDivider>

        {/* ■「アミューズランド」北の上空 */}
        <SectionDivider icon="■">「アミューズランド」北の上空　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「アミューズランド」北のビルの上にある<br />
          ジェットパックで届く高さにある
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore1_1.PNG", alt: "アミューズランド北ビル屋上", caption: "「アミューズランド」の北側にあるビル屋上" },
            { src: "/map/Mirroria_redcore1_2.PNG", alt: "ジェットパックで届く", caption: "地上からジェットパック使用で届くぞ！" }
          ]}
        />

        {/* ■「クールランド」の観覧車の頂上 */}
        <SectionDivider icon="■">「クールランド」の観覧車の頂上　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          観覧車に乗って頂上まで待っているとレッドコアが見える<br />
          観覧車の中で待つより観覧車の上で待った方が取りやすい
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore2_1.PNG", alt: "観覧車頂上", caption: "「クールランド」にある観覧車の頂上付近" },
            { src: "/map/Mirroria_redcore2_2.PNG", alt: "観覧車の中からだと少し上に飛ぶ必要", caption: "観覧車の中からだと少し上に飛ぶ必要がある" }
          ]}
        />

        {/* ■「星の海アパート」南の上空 */}
        <SectionDivider icon="■">「星の海アパート」南の上空　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「星の海アパート」南の上空にあるレッドコア<br />
          かなり高い位置にあるので、近くの一番高いビルの屋上から飛んで近づこう！<br />
          飛ぶ前にマップにピンを打っておくと位置が調整しやすいかも？（探索ポイント自体は近づけば表示される）
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore3_1.PNG", alt: "星の海アパート南の上空", caption: "「星の海アパート」南の上空" },
            { src: "/map/Mirroria_redcore3_2.PNG", alt: "近くのビルから飛ぶ", caption: "かなり高い位置にあるので近くのビルから飛んでいこう" }
          ]}
        />
        <div className="flex justify-center my-3">
          <CaptionedVideo src="/map/Mirroria_redcore3_3.mp4" caption="高いビルの屋上から飛んでいこう！" width={640} height={360} />
        </div>

        {/* ■「環状ビル・西サーキット」屋上の上空 */}
        <SectionDivider icon="■">「環状ビル・西サーキット」屋上の上空　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「環状ビル・西サーキット」屋上の上空にあるレッドコア<br />
          ジェットパックで飛んでからジェットパックを使用したまま1回ジャンプすれば届く高さにある<br />
          オムニアム砲の柱を立ててそこから飛ぶのもあり
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore4_1.PNG", alt: "西サーキット屋上の上空その1", caption: "「環状ビル・西サーキット」屋上の上空" },
            { src: "/map/Mirroria_redcore4_1.PNG", alt: "見た目は少し高いがジャンプで届く", caption: "見た目は少し高いがジェットパック+ジャンプで十分届く" }
          ]}
        />

        {/* ■「ミラリア通り」の巨大壁画 */}
        <SectionDivider icon="■">「ミラリア通り」の巨大壁画　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「ミラリア通り」の巨大壁画にあるレッドコア<br />
          近くの建物の屋根から壁画に飛ぶと近くに見える
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore5_1.PNG", alt: "巨大壁画", caption: "「ミラリア通り」の巨大壁画" },
            { src: "/map/Mirroria_redcore5_2.PNG", alt: "壁画前に浮いている", caption: "壁画の前に浮いている" }
          ]}
        />

        {/* ■「ミラリア通り」の橋の上空その① */}
        <SectionDivider icon="■">「ミラリア通り」の橋の上空その①　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「ミラリア通り」の橋の上空にあるレッドコア<br />
          少し高い位置にあり、ジェットパックで飛んでからジェットパック使用中に1回ジャンプして、ジェットパックを解除したら再びジャンプすれば届く<br />
          操作が分からない場合はオムニアム砲で柱を立てよう
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore6_1.PNG", alt: "橋の上空その1", caption: "「ミラリア通り」の橋の上空" },
            { src: "/map/Mirroria_redcore6_2.PNG", alt: "オムニアム砲で柱を立てる", caption: "少し高いのでオムニアム砲で柱を立てるのが楽" }
          ]}
        />

        {/* ■「ミラリア通り」の橋の上空その② */}
        <SectionDivider icon="■">「ミラリア通り」の橋の上空その②　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「ミラリア通り」の橋の上空にあるレッドコア<br />
          かなり高い位置にあるので橋左の建物の屋上から飛んでいこう
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore7_1.PNG", alt: "橋の上空その2", caption: "「ミラリア通り」の橋の上空" },
            { src: "/map/Mirroria_redcore7_2.PNG", alt: "橋の左の建物屋上から飛ぶ", caption: "橋の左にある建物の屋上から飛ぼう（右の建物からもオムニアム砲があればいけるかも）" }
          ]}
        />

        {/* ■「のびのび広場」南にある上空のレールの真下 */}
        <SectionDivider icon="■">「のびのび広場」南にある上空のレールの真下　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「のびのび広場」南にある上空のレールの真下にあるレッドコア<br />
          近くの建物を登ってレールまで飛んで、レールの上からジェットパックで取りに行こう
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore8_1.PNG", alt: "南のレール", caption: "「のびのび広場」南にある上空のレール" },
            { src: "/map/Mirroria_redcore8_2.PNG", alt: "レールは2つあるので下のレールへ", caption: "レールは2つあるので下のレールに飛び移ろう" }
          ]}
        />

        {/* ■「水鏡台」の月のオブジェクト頂上 */}
        <SectionDivider icon="■">「水鏡台」の月のオブジェクト頂上　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「水鏡台」の月のオブジェクト頂上にあるレッドコア<br />
          登りさえすれば簡単に取れる
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore9_1.PNG", alt: "月のオブジェクト頂上", caption: "「水鏡台」の月のオブジェクト頂上" },
            { src: "/map/Mirroria_redcore9_2.PNG", alt: "月の頂上", caption: "月の頂上" },
            { src: "/map/Mirroria_redcore9_3.PNG", alt: "登れば簡単", caption: "登れさえすれば簡単に取れる" }
          ]}
        />

        {/* ■「危険物質実験室」の上空 */}
        <SectionDivider icon="■">「危険物質実験室」の上空　</SectionDivider>
        <div className="mb-2 text-lg text-gray-800">
          「危険物質実験室」屋上の上空にあるレッドコア<br />
          かなり高い位置にあり、ビル屋上にオムニアム砲で柱を立ててジェットパックを使っても届かない<br />
          そのため昔はヴェラオベリスクからここまで飛んで来るというのが一般的なやり方だったが、ビル屋上の「M-sec」の看板にオムニアム砲で柱を立てたら行けてしまったのでそちらの方法を推奨する<br />
          なお、「M-sec」の看板は表側からじゃないとしがみついたりオムニアム砲で柱を立てられないので注意
        </div>
        <ImageRow
          images={[
            { src: "/map/Mirroria_redcore10_1.PNG", alt: "危険物質実験室屋上の上空", caption: "「危険物質実験室」屋上の上空" },
            { src: "/map/Mirroria_redcore10_2.PNG", alt: "普通では届かない高さ", caption: "普通では届かない高さにある" },
            { src: "/map/Mirroria_redcore10_3.PNG", alt: "M-secの看板表側から柱", caption: "「M-sec」の看板の表側にオムニアム砲で柱を立ててそこから飛ぼう！" }
          ]}
        />
    </>
  );
}

MapIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default MapIndexPage;