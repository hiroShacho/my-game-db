import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

// --- Gantt Chart Calendar Data ---
type GanttEvent = {
  label: string; // ラベル
  color: string; // バー色
  labelColor: string; // ラベル背景色
  labelFontColor?: string; // ラベル文字色
  start: number; // 開始日（1-indexed）
  end: number;   // 終了日（1-indexed、含む）
};

const GANTT_EVENTS: GanttEvent[] = [
  {
    label: "新コスチューム・田園フェアリー",
    color: "#83e28f",
    labelColor: "#83e28f",
    labelFontColor: "#200",
    start: 1,
    end: 29,
  },
  {
    label: "復刻プレアバ・アンカー",
    color: "#ff4141",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 1,
    end: 8,
  },
  {
    label: "復刻プレアバ・パロッティ",
    color: "#e3a3f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 4,
    end: 18,
  },
  {
    label: "復刻プレアバ・アスラーダ",
    color: "#8e80f8",
    labelColor: "#e3a3f8",
    labelFontColor: "#200",
    start: 15,
    end: 29,
  },
  {
    label: "復刻コスチューム・海辺の休日",
    color: "#9cccf5",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 4,
    end: 18,
  },
  {
    label: "復刻コスチューム・海風のささやき",
    color: "#396eb5",
    labelColor: "#8ee2f8",
    labelFontColor: "#200",
    start: 15,
    end: 29,
  },
];

const GANTT_MONTH = 7;
const GANTT_YEAR = 2025;
const GANTT_DAYS = 29; // 1日〜29日まで

function getWeekdayStr(ymd: Date) {
  return ["日","月","火","水","木","金","土"][ymd.getDay()];
}

export const GanttCalendar: React.FC = () => {
  const eventImages: (string | null)[] = [
    "/ver_event/Outfit_Meadow Whimsy.PNG",       // 田園フェアリー
    "/ver_event/Simulacrum_Anka.PNG",            // アンカー
    "/ver_event/Simulacrum_Plotti.PNG",          // パロッティ
    "/ver_event/Simulacrum_Asurada.PNG",         // アスラーダ
    "/ver_event/Outfit_Seabreeze Whispers.PNG",  // 海風のささやき
    "/ver_event/Outfit_Seaside Vacation.PNG",    // 海辺の休日
  ];
  const days = Array.from({ length: GANTT_DAYS }, (_, i) => i + 1);

  // 今日の日付を取得
  const todayObj = new Date();
  const isThisMonth = todayObj.getFullYear() === GANTT_YEAR && (todayObj.getMonth() + 1) === GANTT_MONTH;
  const today = isThisMonth ? todayObj.getDate() : null;

  // 今日の日付のカラムインデックス
  const todayCol = today ? days.indexOf(today) : -1;

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[560px] max-w-full mx-auto bg-white rounded shadow border">
        {/* 月タイトル */}
        <div
          className="w-full"
          style={{
            background: "linear-gradient(90deg,#17a3d6,#4ac1e2)",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <div className="text-white font-bold text-lg sm:text-xl text-center py-1">7月</div>
        </div>
        {/* 日付ヘッダー */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `140px repeat(${GANTT_DAYS},1fr)`,
          }}
        >
          <div />
          {days.map((day) => (
            <div
              key={day}
              className={
                "text-xs sm:text-sm text-gray-700 text-center border-b border-gray-200 py-1" +
                (today === day
                  ? " bg-orange-400 font-bold ring-2 ring-yellow-300"
                  : "")
              }
              style={{ transition: "background 0.2s" }}
            >
              {day}
            </div>
          ))}
        </div>
        {/* 曜日ヘッダー */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `140px repeat(${GANTT_DAYS},1fr)`,
          }}
        >
          <div />
          {days.map((day) => {
            const date = new Date(GANTT_YEAR, GANTT_MONTH - 1, day);
            const wd = getWeekdayStr(date);
            return (
              <div
                key={day}
                className={
                  "text-[10px] sm:text-xs text-center border-b border-gray-200 pb-1 " +
                  (wd === "日"
                    ? "text-red-500"
                    : wd === "土"
                    ? "text-blue-500"
                    : "") +
                  (today === day
                    ? " bg-orange-400 font-bold ring-1 ring-yellow-200"
                    : "")
                }
                style={{ transition: "background 0.2s" }}
              >
                {wd}
              </div>
            );
          })}
        </div>
        {/* イベント行 */}
        {GANTT_EVENTS.map((ev, idx) => (
          <div
            key={idx}
            className="grid relative"
            style={{
              gridTemplateColumns: `140px repeat(${GANTT_DAYS},1fr)`,
              minHeight: 74,
            }}
          >
            {/* 画像部分（ラベルセル） */}
            <div
              className="flex flex-col justify-center items-center border-r border-gray-200 bg-white"
              style={{
                background: ev.labelColor,
                borderTopLeftRadius: idx === 0 ? 8 : 0,
                borderBottomLeftRadius: idx === GANTT_EVENTS.length - 1 ? 8 : 0,
                minWidth: 120,
                textAlign: "center",
                position: "relative",
                padding: 0,
                minHeight: 74,
                height: 74,
                overflow: "hidden",
              }}
            >
              {eventImages[idx] && (
                <img
                  src={eventImages[idx]!}
                  alt={ev.label.replace(/\n.*/, "")}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    borderRadius: 8,
                    boxShadow: "0 1px 3px #0002"
                  }}
                  decoding="async"
                  loading="lazy"
                />
              )}
            </div>
            {/* 各日付セル */}
            {days.map((day, colIdx) => (
              <div
                key={day}
                className={
                  "border-b border-gray-200 border-r last:border-r-0" +
                  (colIdx === todayCol
                    ? " bg-orange-200" // 今日の列を強調
                    : "")
                }
                style={{ minHeight: 74, transition: "background 0.2s" }}
              />
            ))}
            {/* ガチャ名（イベントバーの上に表示） */}
            <div
              className="absolute left-0 w-full flex items-center pointer-events-none"
              style={{
                gridColumn: `${ev.start + 1} / ${ev.end + 2}`,
                gridRow: "1",
                top: 4,
                zIndex: 3,
                justifyContent: "flex-start",
              }}
            >
              <span
                style={{
                  color: ev.labelFontColor ?? "#333",
                  background: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 4,
                  padding: "0 6px",
                  marginLeft: 0,
                  boxShadow: "0 1px 2px #0001"
                }}
              >
                {ev.label}
              </span>
            </div>
            {/* イベントバー */}
            <div
              className="flex items-center absolute left-0 w-full"
              style={{
                gridColumn: `${ev.start + 1} / ${ev.end + 2}`,
                gridRow: "1",
                top: 34,
                zIndex: 2,
                pointerEvents: "none",
                position: "absolute",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: 18,
                  background: ev.color,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  position: "relative",
                }}
              >
                {/* 矢印本体 */}
                <div
                  style={{
                    width: `calc(100% - 18px)`,
                    height: "100%",
                    background: ev.color,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                />
                {/* 矢印先端 */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    borderLeft: `18px solid ${ev.color}`,
                    marginLeft: -1,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ギフトコード一覧
const GIFT_CODES = [
  {
    code: "TOF500601",
    desc: "Discord配布コード",
    expire: "2025/12/30",
  },
  {
    code: "624star",
    desc: "ver5.1バージョン引き換えコード",
    expire: "2025/07/29",
  }
];



// ギフトコード欄（PCでは幅を広げ、descは折り返しせず横並びで見やすくする！）
const GiftCodeList: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch (e) {}
  };

  return (
    <div className="w-full bg-white rounded shadow p-4">
      <h3 className="text-md sm:text-lg font-semibold mb-3 text-gray-800">ギフトコード一覧</h3>
      <div className="space-y-3">
        {GIFT_CODES.length === 0 && (
          <div className="text-gray-500 text-sm">現在利用可能なギフトコードはありません。</div>
        )}
        {GIFT_CODES.map((g, i) => (
          <div
            key={g.code}
            className="
              flex flex-col sm:flex-row sm:items-center
              border-b pb-2 last:border-b-0 last:pb-0
              sm:space-x-4
            "
          >
            {/* 左側：コード＋説明（descは横並びで折り返しなし） */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-800 text-sm sm:text-base select-all">
                {g.code}
              </span>
              <span
                className="ml-0 sm:ml-2 text-xs sm:text-sm text-gray-600"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  display: "inline-block"
                }}
              >
                {g.desc}
              </span>
            </div>
            {/* 右側：期限＋コピー */}
            <div className="flex items-center mt-1 sm:mt-0 space-x-2 shrink-0">
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">期限: {g.expire}</span>
              <button
                className="px-2 py-1 text-xs sm:text-sm rounded border bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 active:bg-blue-300 transition whitespace-nowrap"
                onClick={() => handleCopy(g.code, i)}
                tabIndex={0}
                type="button"
              >
                {copiedIndex === i ? "コピー済" : "コピー"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        ※ コードはゲーム内の特典⇒引き換えから入力してください。期限切れにご注意ください。
      </div>
    </div>
  );
};

// ---- ここから既存ページ内容 ----

export default function Home() {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* サイト紹介 */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">幻塔攻略データベース</h1>
        <p className="text-sm sm:text-base text-gray-600">
          本サイトは、幻塔の最新コンテンツ・各種武器等を確認できる非公式データベースです。
          各種コンテンツの情報は徐々に更新していきます。お待ちくだセい。現在はテストバージョン㌥。
        </p>
      </section>

      {/* NEWS（ゲーム更新情報） */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">NEWS</h2>
        <ul className="space-y-1 text-sm sm:text-base text-gray-700">
          <li>・2025/06/28 復刻中のキャラの武器等の情報を追加 & 一部アイコンを修正。</li>
          <li>・2025/06/27 トップページのコンテンツを一部追加・修正（ギフトコード一覧追加、ガチャカレンダー修正）。</li>
          <li>･･･</li>
          <li>・2025/06/20 試験的にサイトを公開しました。（まだテストバージョン㌥）</li>
        </ul>
      </section>

      {/* 最新バージョンの注目コンテンツ */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">ver5.1の注目コンテンツ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 新キャラカード */}
          <Link href="/weapons/w_62" className="block">
            <div
              className="relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group"
              style={{
                backgroundImage: "url('/ver_event/New_Character.png')",
                backgroundSize: "cover",
                backgroundPosition: "left",
              }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                  アストール
                </h3>
                <p className="text-sm sm:text-base text-white drop-shadow">
                  アストールの武器詳細をチェック
                </p>
              </div>
            </div>
          </Link>

          {/* 新イベントカード */}
          <Link href="/event/ver5-1/guardian-of-kailo" className="block">
            <div
              className="relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group"
              style={{
                backgroundImage: "url('/ver_event/New_Event_1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                  新イベント「キルオの守護者」
                </h3>
                <p className="text-sm sm:text-base text-white drop-shadow">
                  「キルオの守護者」の詳細はこちら
                </p>
              </div>
            </div>
          </Link>

          {/* ギフトコード一覧 */}
          <div className="sm:col-span-2">
            <GiftCodeList />
          </div>
        </div>

        {/* カレンダー */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-2">公式イベントカレンダー</h3>
            <Image
              src="/official-calendar.png"
              alt="公式カレンダー"
              width={900}
              height={400}
              className="w-full h-auto rounded shadow"
            />
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-2">2025年7月 衣装・プレアバ ガチャスケジュール</h3>
            <GanttCalendar />
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};