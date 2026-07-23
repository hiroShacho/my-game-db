import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load?: (element?: HTMLElement) => void;
      };
    };
  }
}

type XEmbedProps = {
  url: string;
};

export function XEmbed({ url }: XEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.twttr?.widgets?.load && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }
  }, [url]);

  return (
    <>
      <Script
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
      />
      <div ref={containerRef} className="flex justify-center w-full">
        <blockquote className="twitter-tweet">
          <a href={url}>Loading X post...</a>
        </blockquote>
      </div>
    </>
  );
}