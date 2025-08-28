import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
// import weapons data
import weaponsData from "@/data/weapons.json";

// 武器IDリスト（炎・物理属性復刻ガチャ対象）
const rerunWeaponIds = [
  "w_46", "w_50", "w_55", "w_60"
];
// 対象武器データ取得
const rerunWeapons = weaponsData.filter(w => rerunWeaponIds.includes(w.id));

const costumeImages = [
  {
    src: "/ver_event/Simulacrum_Lechesis.PNG",
    alt: "【水着】新プレミアムアバター：ラクシス「トキメキウェーブ」",
    label: "【水着】新プレミアムアバター：ラクシス「トキメキウェーブ」",
    date: "08/28(木)メンテナンス後 - 09/23(火) 06:00（JST）",
  },
  {
    src: "/ver_event/Outfit_Vehicle Mystery Box.PNG",
    alt: "ライドガチャ：「暇な一時」、「最速ストーム」、「ワイルドビート」、「光のささやき」",
    label: "ライドガチャ：「暇な一時」、「最速ストーム」、「ワイルドビート」、「光のささやき」",
    date: "08/28(木)メンテナンス後 - 09/10(水) 06:00（JST）",
  },
  {
    src: "/ver_event/Outfit_Elite Grandeur.PNG",
    alt: "復刻コスチューム：威風堂々",
    label: "復刻コスチューム：威風堂々",
    date: "09/10(水) 06:00 - 09/23(火) 06:00（JST）",
  }
];

// ガチャ日程（内容はそのまま編集可）
const gachaDates = [
  {
    label: "ライドガチャ：「暇な一時」、「最速ストーム」、「ワイルドビート」、「光のささやき」",
    date: "08/28(木)メンテナンス後 - 09/10(水)06:00（JST）",
  },
  {
    label: "復刻コスチューム：威風堂々",
    date: "09/10(水)06:00 - 09/23(火) 06:00（JST）",
  },
  {
    label: "【水着】新プレミアムアバター：ラクシス「トキメキウェーブ」",
    date: "08/28(木)メンテナンス後 - 09/23(火) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：ブレヴィ「スイートドリーミング」",
    date: "08/28(木)メンテナンス後 - 09/10(水) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：パロッティ「シャドウ・インベーダー」",
    date: "08/28(木)メンテナンス後 - 09/10(水) 06:00（JST）",
  },
  {
    label: "【水着】復刻プレミアムアバター：姫玉「白糸綿々」",
    date: "09/10(水)06:00 - 09/23(火) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：アスラーダ「夜更ファントム」",
    date: "09/10(水)06:00 - 09/23(火) 06:00（JST）",
  },
];

// 緑線付き見出し（アイコンも内側）
const SectionTitle = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="flex items-center gap-2 mb-2 pl-3"
    style={{
      borderLeft: "8px solid #17e6a7",
      borderBottom: "2.5px solid #17e6a7",
      paddingBottom: 2,
      width: "fit-content"
    }}
  >
    <span className="text-2xl">{icon}</span>
    <h2 className="text-lg sm:text-xl font-semibold mb-0">{children}</h2>
  </div>
);

// 画像2枚横並び用コンポーネント
const RowImages = ({
  images,
  height = 192,
  objectPositionArray,
}: {
  images: { src: string; alt: string }[];
  height?: number;
  objectPositionArray?: (string | undefined)[];
}) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center my-3">
    {images.map((img, i) => (
      <div key={i} className="relative w-full sm:w-80" style={{ height }}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover rounded shadow border"
          sizes="320px"
          style={{
            objectPosition: objectPositionArray && objectPositionArray[i] ? objectPositionArray[i] : undefined,
          }}
        />
      </div>
    ))}
  </div>
);

// カレンダー画像拡大表示用モーダル
const CalendarModal = ({
  isOpen,
  onClose,
  imgSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "95vw", maxHeight: "95vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow text-gray-700 text-lg z-10"
          aria-label="閉じる"
        >
          ×
        </button>
        <img
          src={imgSrc}
          alt="Ver5.3バージョンカレンダー拡大"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
          }}
        />
      </div>
    </div>
  );
};

export default function NewVerInfo() {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ver5.3アップデート情報まとめ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔 ver5.3 新アップデート内容まとめページ" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-sky-700 drop-shadow flex items-center gap-2">
          🆕 ver5.3アップデート情報まとめ
        </h1>

        {/* 新キャラクター・ラクシス実装！ */}
        <section>
          <SectionTitle icon={<><span title="波">🌊</span><span title="ラクシス">🧜‍♀️</span></>}>
            新キャラクター・ラクシス実装！
          </SectionTitle>
          <div className="relative w-full h-40 sm:h-56 rounded-lg overflow-hidden shadow mb-4">
            <Image
              src="/ver_event/New_Character.png"
              alt="新キャラクター・ラクシス"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/EternalSalvation"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-pink-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_64_img.PNG" alt="ラクシス武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-pink-600">武器：ラクシス</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
            <Link
              href="/matrices/m_60"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-pink-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/m_60_img.PNG" alt="ラクシスボリション" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-600">ボリション：ラクシス</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* 炎・物理属性復刻ガチャ */}
        <section>
          <SectionTitle icon={<span title="ガチャ">🎲</span>}>
            炎・物理属性復刻ガチャ
          </SectionTitle>
          <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow mb-2">
            <Image
              src="/ver_event/Rerun.png"
              alt="炎・物理属性復刻ガチャ"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 25%" }}
            />
          </div>
          {/* 復刻武器一覧（詳細ページリンク＋評価） */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {rerunWeapons.map(w => (
              <Link
                key={w.id}
                href={`/weapons/${w.slug}`}
                className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-pink-400 transition-all p-3 text-center"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={`/images/${w.id}_img.PNG`}
                    alt={w.name}
                    width={64}
                    height={64}
                    className="rounded border mb-2"
                  />
                  <span className="font-semibold text-gray-800 mb-1">{w.name}</span>
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-sm rounded font-bold">
                    {typeof w.ratingScore === "number" ? `評価: ${w.ratingScore}` : "評価なし"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 各種ガチャ日程 */}
        <section>
          <SectionTitle icon={<span title="カレンダー">🗓️</span>}>
            各種ガチャ日程
          </SectionTitle>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-l-4 border-blue-400 p-4 rounded mb-4">
            <ul className="list-disc ml-6 text-gray-800 text-base sm:text-lg mb-4">
              {gachaDates.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <div className="font-semibold">{item.label}</div>
                  <div className="ml-4 text-lg sm:text-2xl font-bold text-blue-700">{item.date}</div>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              {costumeImages.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center bg-white rounded shadow p-2">
                  <div className="relative w-44 h-44 mb-2 rounded overflow-hidden border">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="176px"
                      style={{ objectPosition: "center" }}
                    />
                  </div>
                  <div className="text-base font-semibold text-gray-700 text-center">{img.label}</div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-700 text-center">{img.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* バージョンカレンダー */}
        <section>
          <SectionTitle icon={<span title="バージョンカレンダー">📅</span>}>
            Ver5.3_バージョンカレンダー
          </SectionTitle>
          <div className="bg-gradient-to-br from-pink-50 to-amber-50 border-l-4 border-pink-400 p-4 rounded mb-4 flex flex-col items-center">
            <div
              className="relative w-full max-w-3xl h-80 sm:h-[36rem] rounded-lg overflow-hidden shadow cursor-pointer transition hover:shadow-2xl"
              title="クリックで拡大"
              onClick={() => setCalendarOpen(true)}
              style={{ border: "2px solid #a0e3ef" }}
            >
              <Image
                src="/official-calendar.png"
                alt="Ver5.3_バージョンカレンダー"
                fill
                className="object-contain w-full h-full"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">(画像をクリックで拡大表示できます)</div>
          </div>
          <CalendarModal
            isOpen={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            imgSrc="/official-calendar.png"
          />
        </section>

        {/* ブレヴィ恒常入り */}
        <section>
          <SectionTitle icon={<span title="恒常">🔁</span>}>
            ブレヴィ恒常入り
          </SectionTitle>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/Pactcrest☆Metz"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_45_img.PNG" alt="ブレヴィ武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-700">武器：ブレヴィ</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* 超速演算レベル15解放！ */}
        <section>
          <SectionTitle icon={<span title="超速演算">🖥️</span>}>
            超速演算レベル15解放！
          </SectionTitle>
          {/* ここに画像2枚を並べる（今は仮の画像名） */}
          <RowImages
            images={[
              { src: "/ver_event/SuperCompute_1.PNG", alt: "エンジン・リアクター" },
              { src: "/ver_event/SuperCompute_2.PNG", alt: "外骨格・グラス" },
            ]}
            height={192}
          />
        </section>

        {/* 新アバターストーリー・宿舎実装！ */}
        <section>
          <SectionTitle icon={<span title="宿舎">🏠</span>}>
            新アバターストーリー・宿舎実装！
          </SectionTitle>
          <RowImages
            images={[
              { src: "/ver_event/New_SimulacrumStory.png", alt: "新アバターストーリー" },
              { src: "/ver_event/New_SimulacrumDorm.png", alt: "新宿舎" },
            ]}
            height={192}
          />
        </section>

        {/* ギルドベース追加 */}
        <section>
          <SectionTitle icon={<span title="ギルド">🏰</span>}>
            ギルドベース追加
          </SectionTitle>
          {/* 1枚目だけ objectPosition を下にする */}
          <RowImages
            images={[
              { src: "/ver_event/GuildBase_1.PNG", alt: "ギルドベース入り口" },
              { src: "/ver_event/GuildBase_2.PNG", alt: "6つの部屋から選択" },
            ]}
            height={192}
            objectPositionArray={["center 80%", "center"]}
          />
        </section>

        {/* その他追加・公式のお知らせ */}
        <section>
          <SectionTitle icon={<span title="お知らせ">📝</span>}>
            その他様々な追加あり
          </SectionTitle>
          <div className="bg-gray-50 border-l-4 border-sky-400 p-4 rounded mb-2">
            詳しくは公式のお知らせをチェック！
          </div>
          <a
            href="https://tof.perfectworld.com/jp/news/notice/20250825/258057.shtml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sky-700 underline font-bold"
          >
            公式のお知らせはこちら
          </a>
        </section>
      </div>
    </>
  );
}

NewVerInfo.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};