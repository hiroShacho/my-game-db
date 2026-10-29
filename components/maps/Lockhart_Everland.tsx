import { SectionTitle } from "./Lockhart_shared";
import { XEmbed } from "@/components/XEmbed";

function YouTubeEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative w-full my-3" style={{ paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg shadow"
      />
    </div>
  );
}

export default function LockhartEverland({
  openModal,
}: {
  openModal: (src: string, alt: string) => void;
}) {
  return (
    <>
      <SectionTitle icon="map">アエテルナ島</SectionTitle>
      <div>
        探索値と探索値報酬は無いが、ミニゲームを遊ぶことでレッドコアを直接獲得したりショップ交換が可能だぞ！
        <br />
        一応補給庫が何個か設置されているが、中身はゴールドコアなどの恒常ガチャ用のリソースになっている。
        <br />
      </div>
      <XEmbed url="https://x.com/hiro28298793/status/2079826865225859298?a=aitlMy8c4DqnXNnAhOk&s=20" />

      <SectionTitle icon="sports_esports">ミニゲーム</SectionTitle>
      <div>
        <div className="font-bold my-2">■ブレない相棒</div>
        <XEmbed url="https://x.com/hiro28298793/status/2079826868887515374?a=Yh28c4Q9e8ViUeRZdiI&s=20" />

        <div className="font-bold mt-4 mb-2">■一発入魂</div>
        <XEmbed url="https://x.com/hiro28298793/status/2079826871962021933?a=x3zggulmcidho4OzHgI&s=20" />

        <div className="font-bold mt-4 mb-2">■トップハンター</div>
        <XEmbed url="https://x.com/hiro28298793/status/2079826875007000693?a=FOqt59G_-gudXQHUPm0&s=20" />

        <div className="font-bold mt-4 mb-2">■荒野漂流</div>
        <YouTubeEmbed src="https://www.youtube.com/embed/dBXt39-a3xk" title="荒野漂流" />

        <div className="font-bold mt-4 mb-2">■アエテルナ劇場</div>
        <XEmbed url="https://x.com/hiro28298793/status/2079839699833893374?a=z2KapLRe51xVz7nNlWc&s=20" />
      </div>
    </>
  );
}