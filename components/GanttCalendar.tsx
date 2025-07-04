import React, { useState, useEffect } from "react";

export type GanttEvent = {
  label: string; // ラベル
  color: string; // バー色
  labelColor: string; // ラベル背景色
  labelFontColor?: string; // ラベル文字色
  start: number; // 開始日（1-indexed）
  end: number;   // 終了日（1-indexed、含む）
};

function getWeekdayStr(ymd: Date) {
  return ["日", "月", "火", "水", "木", "金", "土"][ymd.getDay()];
}

type GanttCalendarProps = {
  events: GanttEvent[];
  images: (string | null)[];
  year: number;
  month: number;
  days: number;
};

export const GanttCalendar: React.FC<GanttCalendarProps> = ({
  events,
  images,
  year,
  month,
  days: daysInMonth,
}) => {
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 今日の日付をクライアントサイドで取得
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    if (now.getFullYear() === year && (now.getMonth() + 1) === month) {
      setToday(now.getDate());
    }
  }, [year, month]);

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
          <div className="text-white font-bold text-lg sm:text-xl text-center py-1">
            {month}月
          </div>
        </div>
        {/* 日付ヘッダー */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `140px repeat(${daysInMonth},1fr)`,
          }}
        >
          <div />
          {days.map((day) => (
            <div
              key={day}
              className={
                "text-xs sm:text-sm text-gray-700 text-center border-b border-gray-200 py-1" +
                (today === day
                  ? " bg-orange-400 font-bold ring-2 ring-orange-200"
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
            gridTemplateColumns: `140px repeat(${daysInMonth},1fr)`,
          }}
        >
          <div />
          {days.map((day) => {
            const date = new Date(year, month - 1, day);
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
                    ? " bg-orange-400 font-bold ring-1 ring-orange-200"
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
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="grid relative"
            style={{
              gridTemplateColumns: `140px repeat(${daysInMonth},1fr)`,
              minHeight: 74,
            }}
          >
            {/* 画像部分（ラベルセル） */}
            <div
              className="flex flex-col justify-center items-center border-r border-gray-200 bg-white"
              style={{
                background: ev.labelColor,
                borderTopLeftRadius: idx === 0 ? 8 : 0,
                borderBottomLeftRadius: idx === events.length - 1 ? 8 : 0,
                minWidth: 120,
                textAlign: "center",
                position: "relative",
                padding: 0,
                minHeight: 74,
                height: 74,
                overflow: "hidden",
              }}
            >
              {images[idx] && (
                <img
                  src={images[idx]!}
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
                    ? " bg-orange-200"
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