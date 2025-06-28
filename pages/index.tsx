import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

// カレンダーイベント設定
const EVENT_COLORS = [
  "#ff0000", "#81c9f9", "#b6ea81", "#ffb347", "#e699e2", "#ffe65c", "#ba55d3",
  "#99e4d2", "#ffd1a4", "#f6b3f6", "#ff69b4", "#0000ff", "#00bfff"
];
type EventPeriod = {
  name: string;
  color: string;
  fontColor?: string;
  start: Date;
  end: Date;
};
const events: EventPeriod[] = [
  { name: "新コスチューム・田園フェアリー", color: EVENT_COLORS[2], fontColor: "#200", start: new Date(2025, 5, 24), end: new Date(2025, 6, 29) },
  { name: "復刻プレアバ・アンカー", color: EVENT_COLORS[10], fontColor: "#fff", start: new Date(2025, 5, 24), end: new Date(2025, 6, 8) },
  { name: "復刻プレアバ・パロッティ", color: EVENT_COLORS[3], fontColor: "#200", start: new Date(2025, 6, 4), end: new Date(2025, 6, 18) },
  { name: "復刻プレアバ・アスラーダ", color: EVENT_COLORS[0], fontColor: "#fff", start: new Date(2025, 6, 15), end: new Date(2025, 6, 29) },
  { name: "復刻コスチューム・海辺の休日", color: EVENT_COLORS[11], fontColor: "#fff", start: new Date(2025, 6, 4), end: new Date(2025, 6, 18) },
  { name: "復刻コスチューム・海風のささやき", color: EVENT_COLORS[12], fontColor: "#200", start: new Date(2025, 5, 24), end: new Date(2025, 6, 8) }
];
const DAYS = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_COLORS = ["text-red-500", "", "", "", "", "", "text-blue-500"];

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

// カレンダー生成ユーティリティ
function getMonthCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const cells: (Date|null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
function getEventSegmentsForWeek(week: (Date | null)[], event: EventPeriod) {
  let startCol = -1;
  let endCol = -1;
  for (let i = 0; i < week.length; i++) {
    const date = week[i];
    if (date && date >= event.start && date <= event.end) {
      if (startCol === -1) startCol = i;
      endCol = i;
    }
  }
  if (startCol === -1 || endCol === -1) return null;
  return {
    startCol,
    endCol,
    showLeftRound: startCol === 0 || (week[startCol] && week[startCol]?.getTime() === event.start.getTime()),
    showRightRound: endCol === 6 || (week[endCol] && week[endCol]?.getTime() === event.end.getTime()),
  };
}
function getWeekEventLayers(weeks: (Date | null)[][], events: EventPeriod[]) {
  return weeks.map(week => {
    const layers = events.map((event, idx) => {
      const seg = getEventSegmentsForWeek(week, event);
      if (!seg) return null;
      return { ...seg, event, z: idx };
    }).filter(Boolean) as ({event: EventPeriod, startCol: number, endCol: number, showLeftRound: boolean, showRightRound: boolean, z: number}[]);
    return layers;
  });
}

// カレンダー
const CalendarMonthGrid: React.FC<{ year: number; month: number; events: EventPeriod[] }> = ({
  year, month, events
}) => {
  const cells = getMonthCells(year, month);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const weekEventLayers = getWeekEventLayers(weeks, events);

  const weekRowHeights = weekEventLayers.map(layers => 44 + layers.length * 20);

  return (
    <div className="mx-auto max-w-md w-full px-2">
      <div className="bg-white rounded shadow w-full">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7">
          {DAYS.map((d, i) => (
            <div
              key={d}
              className={`py-1 text-xs sm:text-base font-semibold text-center border-b border-gray-200 ${DAY_COLORS[i]}`}
              style={{ fontSize: "clamp(11px, 3vw, 16px)" }}
            >
              {d}
            </div>
          ))}
        </div>
        {/* 各週 */}
        {weeks.map((week, rowIdx) => (
          <div
            key={rowIdx}
            className="relative grid grid-cols-7 border-b last:border-b-0 w-full"
            style={{
              minHeight: `${weekRowHeights[rowIdx]}px`,
            }}
          >
            {/* 日付セル（上段） */}
            {week.map((date, colIdx) => (
              <div
                key={colIdx}
                className={`
                  border-r border-gray-200 last:border-r-0 text-center flex flex-col items-center pt-1
                  ${colIdx === 0 ? "text-red-500" : ""}
                  ${colIdx === 6 ? "text-blue-500" : ""}
                  ${!date ? "bg-gray-50" : ""}
                `}
                style={{
                  fontSize: "clamp(11px, 3vw, 16px)",
                  minHeight: 32,
                  height: 44,
                }}
              >
                {date ? date.getDate() : ""}
              </div>
            ))}
            {/* イベントバー */}
            {weekEventLayers[rowIdx].map((seg, idx) => {
              const leftPct = (seg.startCol / 7) * 100;
              const widthPct = ((seg.endCol - seg.startCol + 1) / 7) * 100;
              const weekArr = week;
              const isStartWeek = weekArr.some(
                d => d?.getTime() === seg.event.start.getTime()
              );
              const isStartCol = weekArr[seg.startCol]?.getTime() === seg.event.start.getTime();
              let showName = false;
              if (isStartWeek && isStartCol) {
                showName = true;
              } else {
                const cellDate = weekArr[seg.startCol];
                if (
                  cellDate &&
                  cellDate.getDate() === 1 &&
                  cellDate.getMonth() === month &&
                  (seg.event.start.getFullYear() < cellDate.getFullYear() ||
                    (seg.event.start.getFullYear() === cellDate.getFullYear() &&
                      seg.event.start.getMonth() < month))
                ) {
                  showName = true;
                }
              }
              return (
                <div
                  key={seg.event.name + rowIdx + idx}
                  className="absolute flex items-center"
                  style={{
                    top: 44 + idx * 20,
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: 18,
                    background: seg.event.color,
                    color: seg.event.fontColor ?? "#fff",
                    fontWeight: "bold",
                    fontSize: "clamp(10px, 2.5vw, 13px)",
                    borderRadius: 4,
                    boxShadow: "0 1px 2px #0001",
                    padding: "0 4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    pointerEvents: "none",
                  }}
                  title={seg.event.name}
                >
                  {showName && seg.event.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

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
            <h3 className="text-md sm:text-lg font-semibold mb-2">2025年6月 衣装・プレアバ ガチャカレンダー</h3>
            <CalendarMonthGrid year={2025} month={5} events={events} />
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-2">2025年7月 衣装・プレアバ ガチャカレンダー</h3>
            <CalendarMonthGrid year={2025} month={6} events={events} />
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};