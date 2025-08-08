import { useEffect, useRef } from "react";

export function AdSenseContentUnit() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 必ずクライアントサイドで呼ばれるように
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  // 本番環境以外ではダミー枠を表示
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
      ref={adRef}
    />
  );
}