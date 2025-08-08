import { useEffect } from "react";

export function AdSenseContentUnit() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        style={{
          width: 320,
          height: 100,
          background: "#ffe",
          color: "#aaa",
          border: "1px dashed #fc0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        AdSense広告枠（本番でのみ表示）
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9748053430759774"
      data-ad-slot="3426192736"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}