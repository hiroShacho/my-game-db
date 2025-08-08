import { useEffect } from "react";

export function AdSenseContentUnit() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

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