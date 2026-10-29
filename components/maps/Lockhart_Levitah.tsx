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

export default function LockhartLevitah({
  openModal,
}: {
  openModal: (src: string, alt: string) => void;
}) {
  return (
    <>
      <SectionTitle icon="map">リヴィタ</SectionTitle>
      <div>
        探索値ありの新マップ。解説動画で各探索ギミックを解説している。
        <br />
      </div>
      <YouTubeEmbed src="https://www.youtube.com/embed/18s7uwhhIKY" title="リヴィタ 探索ギミック解説" />

      <SectionTitle icon="sports_esports">ミニゲーム</SectionTitle>
      <div>
        <div className="font-bold my-2">■トップハンター</div>
        リヴィタにもトップハンターがある。
        <br />
        こちらはアエテルナ島とは別物扱いなので、報酬の専用レッドコアを取るために挑戦しよう。
        <br />
        <XEmbed url="https://x.com/hiro28298793/status/2108428461350305932?a=FGtuBgrTz2AvbW4IR7w&s=20" />
      </div>

      <SectionTitle icon="swords">ワールドボス</SectionTitle>
      <div>
        <div className="font-bold my-2">・ヴィリルド-γ</div>
        リヴィタのワールドボスは落雷攻撃時に一定回数攻撃を当てることでギミックダメージが発生する。
        <br />
        時間はかかるがやろうと思えばソロ・恒常武器だけでも狩れるようになっている。
        <br />
      </div>
      <YouTubeEmbed src="https://www.youtube.com/embed/AaoX8K5G1oE" title="ヴィリスト-γ" />
    </>
  );
}