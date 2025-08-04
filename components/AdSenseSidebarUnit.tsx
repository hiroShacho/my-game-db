import { useEffect, useRef } from "react";

export function AdSenseSidebarUnit() {
  const adRef = useRef<HTMLDivElement>(null);

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
      data-ad-slot="4091968809"
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
}