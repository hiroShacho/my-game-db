import { useEffect } from "react";

export const AdSenseBanner = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        width: "100%",
        minHeight: 0, // ← ここを0に
        margin: 0,
        padding: 0,
        height: "auto", // ← 必要なら追加
      }}
      data-ad-client="pub-9748053430759774"
      data-ad-slot="4091968809"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};