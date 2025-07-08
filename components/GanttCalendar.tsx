import React, { useState, useEffect } from "react";

// 型定義などは共通
export type GanttEvent = {
  label: string;
  color: string;
  labelColor: string;
  labelFontColor?: string;
  start: number;
  end: number;
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

export const GanttCalendar: React.FC<GanttCalendarProps> = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- スマホ表示部（あなたがOK出した修正版そのまま） ---
  const MobileCalendar = () => {
    const { events, images, year, month, days: daysInMonth } = props;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const [today, setToday] = useState<number | null>(null);
    useEffect(() => {
      const now = new Date();
      if (now.getFullYear() === year && (now.getMonth() + 1) === month) {
        setToday(now.getDate());
      }
    }, [year, month]);
    const todayCol = today ? days.indexOf(today) : -1;
    const gridTemplate = `minmax(40px, 80px) repeat(${daysInMonth}, minmax(16px, 1fr))`;
    const todayBgColor = "#fb923c";

    return (
      <div
        style={{
          maxWidth: 320,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            minWidth: 0,
            width: "fit-content",
            margin: "0 auto",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 6px #0002",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* 月タイトル */}
          <div
            style={{
              background: "linear-gradient(90deg,#17a3d6,#4ac1e2)",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              width: "100%",
            }}
          >
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14, textAlign: "center", padding: "2px 0" }}>
              {month}月
            </div>
          </div>
          {/* 日付ヘッダー */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
            }}
          >
            <div />
            {days.map((day) => (
              <div
                key={day}
                style={{
                  fontSize: 10,
                  color: "#374151",
                  textAlign: "center",
                  borderBottom: "1px solid #e5e7eb",
                  padding: "1px 0",
                  background: today === day ? todayBgColor : undefined,
                  fontWeight: today === day ? "bold" : undefined,
                  borderRadius: today === day ? 4 : undefined,
                  transition: "background 0.2s",
                }}
              >
                {day}
              </div>
            ))}
          </div>
          {/* 曜日ヘッダー */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
            }}
          >
            <div />
            {days.map((day) => {
              const date = new Date(year, month - 1, day);
              const wd = getWeekdayStr(date);
              let baseColor = "#374151";
              if (wd === "日") baseColor = "#ef4444";
              if (wd === "土") baseColor = "#3b82f6";
              return (
                <div
                  key={day}
                  style={{
                    fontSize: 8,
                    textAlign: "center",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: 1,
                    color: baseColor,
                    background: today === day ? todayBgColor : undefined,
                    fontWeight: today === day ? "bold" : undefined,
                    borderRadius: today === day ? 4 : undefined,
                    transition: "background 0.2s",
                  }}
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
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                minHeight: 36,
                position: "relative",
              }}
            >
              {/* ラベルセル */}
              <div
                style={{
                  background: ev.labelColor,
                  borderTopLeftRadius: idx === 0 ? 8 : 0,
                  borderBottomLeftRadius: idx === events.length - 1 ? 8 : 0,
                  minWidth: 0,
                  textAlign: "center",
                  padding: 0,
                  minHeight: 36,
                  height: 36,
                  overflow: "hidden",
                  borderRight: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {images[idx] && (
                  <img
                    src={images[idx]!}
                    alt={ev.label.replace(/\n.*/, "")}
                    style={{
                      width: "100%",
                      maxWidth: 30,
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: 4,
                      boxShadow: "0 1px 3px #0002",
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
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    borderRight:
                      colIdx === daysInMonth - 1 ? undefined : "1px solid #e5e7eb",
                    minHeight: 36,
                    background: colIdx === todayCol ? "#ffe5cb" : undefined,
                    transition: "background 0.2s",
                  }}
                />
              ))}
              {/* イベントラベル */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                  gridColumn: `${ev.start + 1} / ${ev.end + 2}`,
                  gridRow: "1",
                  top: 2,
                  zIndex: 3,
                  justifyContent: "flex-start",
                }}
              >
                <span
                  style={{
                    color: ev.labelFontColor ?? "#333",
                    background: "rgba(255,255,255,0.9)",
                    fontWeight: 600,
                    fontSize: 10,
                    borderRadius: 4,
                    padding: "0 3px",
                    marginLeft: 0,
                    boxShadow: "0 1px 2px #0001",
                  }}
                >
                  {ev.label}
                </span>
              </div>
              {/* イベントバー */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: 8,
                  gridColumn: `${ev.start + 1} / ${ev.end + 2}`,
                  gridRow: "1",
                  top: 18,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 8,
                    background: ev.color,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 3,
                    borderBottomLeftRadius: 3,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `calc(100% - 8px)`,
                      height: "100%",
                      background: ev.color,
                      borderTopLeftRadius: 3,
                      borderBottomLeftRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: `8px solid ${ev.color}`,
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

  // --- PC表示部（スマホ対応前・添付コードそのまま） ---
  const PCCalendar = () => {
    const { events, images, year, month, days: daysInMonth } = props;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
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

  // スマホとPCで切り替えてレンダリング
  return isMobile ? <MobileCalendar /> : <PCCalendar />;
};