import React, { useEffect, useRef } from "react";

export const AdSenseContentUnit2: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // AdSenseスクリプトを動的に読み込む
    if (window) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // 無視
      }
    }
  }, []);

  return (
    <div ref={adRef} style={{ width: 320, minWidth: 200, maxWidth: "100%" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9748053430759774"
        data-ad-slot="9376372426"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};