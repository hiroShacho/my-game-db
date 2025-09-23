import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
// import weapons data
import weaponsData from "@/data/weapons.json";

// 武器IDリスト（氷・雷属性復刻ガチャ対象）
const rerunWeaponIds = [
  "w_47", "w_51", "w_54", "w_56", "w_61"
];
// 対象武器データ取得
const rerunWeapons = weaponsData.filter(w => rerunWeaponIds.includes(w.id));

const costumeImages = [
  {
    src: "/ver_event/Simulacrum_Helene.PNG",
    alt: "【水着】新プレミアムアバター：ヘレンネ「不気味な人形」",
    label: "【水着】新プレミアムアバター：ヘレンネ「不気味な人形」",
    date: "09/23(火)メンテナンス後 - 10/28(火) 06:00（JST）",
  },
  {
    src: "/ver_event/Outfit_AuspiciousWish.PNG",
    alt: "ガチャマシン：「良辰祈願」",
    label: "ガチャマシン：「良辰祈願」",
    date: "09/23(火)メンテナンス後 - 10/28(火) 06:00（JST）",
  }
];

// ガチャ日程（内容はそのまま編集可）
const gachaDates = [
  {
    label: "ガチャマシン：「良辰祈願」",
    date: "09/23(火)メンテナンス後 - 10/28(火) 06:00（JST）",
  },
  {
    label: "【水着】新プレミアムアバター：ヘレンネ「不気味な人形」",
    date: "09/23(火)メンテナンス後 - 10/28(火) 06:00（JST）",
  },
  {
    label: "【水着】復刻プレミアムアバター：メリル・アムド「悠々夏日」",
    date: "09/23(火)メンテナンス後 - 10/10(金) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：グレイフォックス「もう1人の自分」",
    date: "09/23(火)メンテナンス後 - 10/10(金) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：ロズリン「出勤タイム」",
    date: "10/10(金) 13:00（JST） - 10/28(火) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：リンゼイ「寂しき宇宙に花を求めて」",
    date: "10/10(金) 13:00（JST） - 10/28(火) 06:00（JST）",
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
        <title>ver5.35アップデート情報まとめ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔 ver5.35 新アップデート内容まとめページ" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-sky-700 drop-shadow flex items-center gap-2">
          🆕 ver5.35アップデート情報まとめ
        </h1>

        {/* 新キャラクター・ヘレンネ実装！ */}
        <section>
          <SectionTitle icon={<><span title="氷">❄️</span><span title="ヘレンネ">🧸</span></>}>
            新キャラクター・ヘレンネ実装！
          </SectionTitle>
          <div className="relative w-full h-40 sm:h-56 rounded-lg overflow-hidden shadow mb-4">
            <Image
              src="/ver_event/New_Character.png"
              alt="新キャラクター・ヘレンネ"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/Pollux"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_65_img.PNG" alt="ヘレンネ武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-600">武器：ヘレンネ</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
            <Link
              href="/matrices/m_61"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/m_61_img.PNG" alt="ヘレンネボリション" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-600">ボリション：ヘレンネ</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* 氷・雷属性復刻ガチャ */}
        <section>
          <SectionTitle icon={<span title="ガチャ">🎲</span>}>
            氷・雷属性復刻ガチャ
          </SectionTitle>
          <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow mb-2">
            <Image
              src="/ver_event/Rerun.png"
              alt="氷・雷属性復刻ガチャ"
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
                className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all p-3 text-center"
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
            Ver5.35_バージョンカレンダー
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
                alt="Ver5.35_バージョンカレンダー"
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

        {/* パロッティ恒常入り */}
        <section>
          <SectionTitle icon={<span title="恒常">🔁</span>}>
            パロッティ恒常入り
          </SectionTitle>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/EP-7000Skyfire"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_46_img.PNG" alt="パロッティ武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-700">武器：パロッティ</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* 新宿舎実装！ */}
        <section>
          <SectionTitle icon={<span title="宿舎">🏠</span>}>
            新宿舎実装！
          </SectionTitle>
          <RowImages
            images={[
              { src: "/ver_event/New_SimulacrumDorm.png", alt: "新宿舎" },
            ]}
            height={192}
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
            href="https://tof.perfectworld.com/jp/news/notice/20250918/258517.shtml"
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