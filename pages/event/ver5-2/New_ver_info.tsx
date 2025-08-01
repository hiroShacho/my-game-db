import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";

type FionaCardProps = {
  title: string;
  description: string;
  idx: number;
};

const fionaCards: FionaCardProps[] = [
  {
    title: "1凸",
    description: "フィオナの連携スキルの倍率が4000%まで上がる。さらに、在りし日の幻、起源の戦域、討伐作戦においては、8000%まで上がる。",
    idx: 1,
  },
  {
    title: "2凸",
    description: "全属性ダメージ+3%。(この効果はセットしていなくても有効)",
    idx: 2,
  },
  {
    title: "3凸",
    description: "フィオナの武器「月星の環」の連携スキル効果: 強攻/均衡効果の持続時間、剛毅共鳴の耐性アップ時間、恩恵共鳴の回復時間がそれぞれ延長される。",
    idx: 3,
  },
  {
    title: "4凸",
    description: "フィオナの連携スキルを発動すると、追加で元素結晶を1個獲得する。さらに、追加で自身の最終ダメージ+5%。60秒持続。",
    idx: 4,
  },
  {
    title: "5凸",
    description: "全属性ダメージ+3%。(この効果はセットしていなくても有効)",
    idx: 5,
  },
  {
    title: "6凸",
    description: "元素結晶の上限+1。",
    idx: 6,
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

const costumeImages = [
  {
    src: "/ver_event/Outfit_Cosmic Coast.PNG",
    alt: "【水着】新コスチューム：海塩スターコーデ",
    label: "【水着】新コスチューム：海塩スターコーデ",
    date: "07/29(火)メンテナンス後 - 08/28(木) 06:00（JST）"
  },
  {
    src: "/ver_event/Outfit_Summer Special.PNG",
    alt: "【水着】復刻コスチューム：オリジナル・サマー",
    label: "【水着】復刻コスチューム：オリジナル・サマー",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）"
  },
  {
    src: "/ver_event/Outfit_Innarsian Fashion.PNG",
    alt: "復刻コスチューム：きらめきインニス",
    label: "復刻コスチューム：きらめきインニス",
    date: "08/12(火) 13:00 - 08/28(木) 06:00（JST）"
  }
];

const gachaDates = [
  {
    label: "【水着】新コスチューム：海塩スターコーデ",
    date: "07/29(火)メンテナンス後 - 08/28(木) 06:00（JST）",
  },
  {
    label: "【水着】復刻コスチューム：オリジナル・サマー",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）",
  },
  {
    label: "復刻コスチューム：きらめきインニス",
    date: "08/12(火) 13:00 - 08/28(木) 06:00（JST）",
  },
  {
    label: "【水着】新プレミアムアバター：シードル「しなやかな夏」",
    date: "07/29(火)メンテナンス後 - 08/28(木) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：榴火「清廉潔墨」",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：篁(ミミ)「晴空幽篁」",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）",
  },
  {
    label: "【水着】復刻プレミアムアバター：凌寒「夏咲き霜花」",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）",
  },
  {
    label: "復刻プレミアムアバター：フィオナ「星空の誓い」",
    date: "07/29(火)メンテナンス後 - 08/12(火) 06:00（JST）",
  },
  {
    label: "【水着】復刻プレミアムアバター：ノーラ「海岸の風」",
    date: "08/12(火) 13:00 - 08/28(木) 06:00（JST）",
  },
  {
    label: "【水着】復刻プレミアムアバター：凛夜「夏影の舞」",
    date: "08/12(火) 13:00 - 08/28(木) 06:00（JST）",
  },
];

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
          alt="Ver5.2バージョンカレンダー拡大"
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
        <title>ver5.2アップデート情報まとめ | 幻塔攻略データベース</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="幻塔 ver5.2 新アップデート内容まとめページ" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-sky-700 drop-shadow flex items-center gap-2">
          🆕 ver5.2アップデート情報まとめ
        </h1>

        {/* ①新キャラクター・シードル実装！ */}
        <section>
          <SectionTitle icon={<><span title="ロボット">🤖</span><span title="フェンシング">🤺</span></>}>
            新キャラクター・シードル実装！
          </SectionTitle>
          <div className="relative w-full h-40 sm:h-56 rounded-lg overflow-hidden shadow mb-4">
            <Image
              src="/ver_event/New_Character.png"
              alt="新キャラクター・シードル"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/AF-010Servion"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-pink-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_63_img.PNG" alt="シードル武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-pink-600">武器：シードル</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
            <Link
              href="/matrices/m_59"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-pink-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/m_59_img.PNG" alt="シードルボリション" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-600">ボリション：シードル</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* ②全属性復刻ガチャ */}
        <section>
          <SectionTitle icon={<span title="ガチャ">🎲</span>}>
            全属性復刻ガチャ
          </SectionTitle>
          <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow mb-2">
            <Image
              src="/ver_event/Rerun.png"
              alt="全属性復刻ガチャ"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 25%" }}
            />
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 text-gray-700 text-sm rounded mb-4">
            次のキャラが恩恵になりそうなので、次で恒常入りしないグレイフォックスは復刻から外れた模様。
            <br />
            ブレヴィは順当に行けば次のver5.3で恒常入りするので、無凸の素体確保ができる最後のチャンスになるだろう。
            <br />
            ヤノがいないのは謎。
          </div>
        </section>

        {/* ▼▼▼ 追加：全属性復刻ガチャの下に追記（ガチャ日程のみ） ▼▼▼ */}
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
        {/* ▲▲▲ 追加ここまで ▲▲▲ */}

        {/* ▼▼▼ バージョンカレンダーは分離・背景も変更 ▼▼▼ */}
        <section>
          <SectionTitle icon={<span title="バージョンカレンダー">📅</span>}>
            Ver5.2_バージョンカレンダー
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
                alt="Ver5.2_バージョンカレンダー"
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
        {/* ▲▲▲ バージョンカレンダー分離ここまで ▲▲▲ */}

        {/* 連合2倍作戦 */}
        <section>
          <SectionTitle icon={<span title="作戦">⚔️</span>}>
            連合2倍作戦
          </SectionTitle>
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-l-4 border-green-400 p-4 rounded mb-4 flex flex-col items-center">
            <div className="relative w-full max-w-2xl aspect-[5/2] rounded-lg overflow-hidden shadow mb-2 bg-white border">
              <Image
                src="/ver_event/Event_jo.png"
                alt="連合2倍作戦"
                fill
                className="object-contain"
                sizes="(max-width: 900px) 100vw, 800px"
                priority
              />
            </div>
            <div className="text-sm text-gray-700 text-center">
              連合作戦の報酬が2倍になるイベントが開催！
            </div>
          </div>
        </section>

        {/* ③フィオナ共感覚実装！ */}
        <section>
          <SectionTitle icon={<span title="ドラゴン">🐉</span>}>
            フィオナ共感覚実装！
          </SectionTitle>
          <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow mb-4">
            <Image
              src="/ver_event/Fiona.png"
              alt="フィオナ共感覚実装"
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
              style={{ objectPosition: "center 25%" }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fionaCards.map(card => (
              <div key={card.idx} className="bg-white rounded shadow border-l-4 border-pink-400 p-4 flex flex-col gap-2">
                <div className="font-bold text-pink-700">{card.title}</div>
                <div className="text-gray-700 text-sm whitespace-pre-line">{card.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ④煙渺恒常入り */}
        <section>
          <SectionTitle icon={<span title="タバコ">🚬</span>}>
            煙渺恒常入り
          </SectionTitle>
          <div className="flex gap-4 flex-wrap mb-4">
            <Link
              href="/weapons/Equilibrium"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/w_44_img.PNG" alt="煙渺武器" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-sky-700">武器：煙渺</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
            <Link
              href="/matrices/m_40"
              className="block bg-white rounded shadow hover:shadow-lg hover:ring-2 hover:ring-sky-400 transition-all px-4 py-3 w-64 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/m_40_img.PNG" alt="煙渺ボリション" width={48} height={48} className="rounded border" />
                <span className="font-semibold text-indigo-700">ボリション：煙渺</span>
                <div className="text-xs mt-1 text-gray-600">詳細ページへ</div>
              </div>
            </Link>
          </div>
        </section>

        {/* ⑤新エリア・新ワールドボス・新ストーリー実装！ */}
        <section>
          <SectionTitle icon={<span title="マップ">🗺️</span>}>
            新エリア・新ワールドボス・新ストーリー実装！
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow">
              <Image
                src="/ver_event/New_Map.png"
                alt="新エリア"
                fill
                className="object-cover w-full h-full"
                sizes="100vw"
                priority
              />
            </div>
            <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow">
              <Image
                src="/ver_event/New_WorldBoss.png"
                alt="新ワールドボス"
                fill
                className="object-cover w-full h-full"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* ⑥その他追加 */}
        <section>
          <SectionTitle icon={<span title="お知らせ">📝</span>}>
            その他様々な追加あり
          </SectionTitle>
          <div className="bg-gray-50 border-l-4 border-sky-400 p-4 rounded mb-2">
            詳しくは公式のお知らせをチェック！
          </div>
          <a
            href="https://tof.perfectworld.com/jp/news/notice/20250725/257578.shtml"
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