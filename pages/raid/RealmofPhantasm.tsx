import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-sky-400/60 to-sky-100 border-l-8 border-sky-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-sky-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-sky-900">{children}</span>
    </div>
  );
}

// キャプション付き画像
function CaptionedImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-sky-300 overflow-hidden">
        <Image src={src} alt={alt} width={480} height={270} />
        <div className="bg-sky-50 px-4 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像2枚並列
function RowImages({
  images,
}: {
  images: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {images.map((img) => (
        <CaptionedImage key={img.src} {...img} />
      ))}
    </div>
  );
}

export default function RealmofPhantasmPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「イリュージョンシフト」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「イリュージョンシフト」のギミック・攻略ポイントを徹底解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-sky-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500">auto_awesome</span>
          討伐作戦「イリュージョンシフト」 攻略
        </h1>
        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/RealmofPhantasm.PNG"
            alt="イリュージョンシフト フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="psychology_alt">幻境のギミックを攻略してボスを弱体化させよう！</SectionTitle>
        <div>
          この討伐では定期的にプレイヤー4人が<span className="font-bold">幻境</span>というエリアに飛ばされる。<br />
          幻境は1人または2人でギミックをこなさないと出れない空間で、ギミックをクリアするとボスにダメージを与えてボスの持つダメージ軽減効果を1つ解除できる。<br />
          逆にギミックをクリア出来ないとボスはHPを回復してしまうので必ず幻境のギミックを把握しておこう！
        </div>

        <SectionTitle icon="flare">ギミック①：光陰の廃墟</SectionTitle>
        <div>
          プレイヤー1人が霧で包まれたエリアに飛ばされる。<br />
          プレイヤーがフィールド上にある光の球に触れることで次に触れる光の球への道筋が指し示される。<br />
          この道筋に沿って数回光の球に触れると最後に出口への道筋が指し示される。<br />
          出口を通って戦闘エリアに戻ってこれればギミック成功となる。<br />
          注意点として、フィールドが霧で包まれているので自分では道筋通り真っすぐ進んでいるつもりでも、実は道筋からそれて進んでいたなんてことがよく起こる。<br />
          時間制限があるので多少感覚で突き進んでも良いが、基本は道筋の線と平行になるように調整してから前進するようにしよう。
        </div>
        <RowImages
          images={[
            {
              src: "/raid/RealmofPhantasm_1.PNG",
              alt: "光の球に触れると道筋が指し示される",
              caption: "光の球に触れると道筋が指し示される",
            },
            {
              src: "/raid/RealmofPhantasm_2.PNG",
              alt: "出口に触れればクリア！",
              caption: "出口に触れればクリア！",
            },
          ]}
        />

        <SectionTitle icon="local_florist">ギミック②：幻影の境</SectionTitle>
        <div>
          プレイヤー1人が幻影の花が咲くエリアに飛ばされる。<br />
          花を攻撃して破壊すればクリアになるが、本物の花は数本あるうちの1本だけ。<br />
          偽物の花を破壊すると大ダメージを受けてしまうので体力に気を付けよう。
        </div>
        <CaptionedImage
          src="/raid/RealmofPhantasm_3.PNG"
          alt="どれが偽物かは見た目では分からない"
          caption="どれが偽物かは見た目では分からない"
        />
        <div>
          このギミック発動中は戦闘エリアにも花が出現する。<br />
          戦闘エリアの花は攻撃を数回当てると破壊でき、破壊すると幻境側の偽物の花も破壊される。<br />
          そのため、戦闘エリアのプレイヤーはフィールドに生えている花を破壊してギミック攻略をサポートしてあげよう！
        </div>
        <CaptionedImage
          src="/raid/RealmofPhantasm_4.PNG"
          alt="戦闘エリアの花を破壊すると幻境の偽物の花も破壊されるぞ！"
          caption="戦闘エリアの花を破壊すると幻境の偽物の花も破壊されるぞ！"
        />

        <SectionTitle icon="bolt">ギミック③：迅雷の地</SectionTitle>
        <div>
          プレイヤー2人が3体の敵がいるエリアに飛ばされる。<br />
          ここでは敵のシールドを割ると落雷が発生し、これをくらうと大ダメージを受ける。<br />
          この落雷は降ってくるタイミングに攻撃を合わせることで敵に対して雷を飛ばしてダメージを与えられ、全ての敵を倒したらクリアとなる。
        </div>
        <CaptionedImage
          src="/raid/RealmofPhantasm_5.PNG"
          alt="3体の敵を落雷と攻撃で倒そう"
          caption="3体の敵を落雷と攻撃で倒そう"
        />
        <div>
          また、プレイヤー2人にはそれぞれ<span className="font-bold">「急雷審判」</span>と<span className="font-bold">「鳴り響く雷鳴」</span>が付与される。<br />
          <span className="font-bold">「急雷審判」</span>が付与されたプレイヤーは落雷を撃ち返すと周りに雷嵐が生成され、近くにいる敵にダメージを与えられる。<br />
          <span className="font-bold">「鳴り響く雷鳴」</span>が付与されたプレイヤーは落雷を撃ち返すと雷嵐の効果を強化できる。<br />
          最も昨今の火力インフレもあってプレイヤーの攻撃だけで敵を倒せるようになっているのであまり気にする必要はない。
        </div>
        <RowImages
          images={[
            {
              src: "/raid/RealmofPhantasm_6.PNG",
              alt: "急雷審判",
              caption: "急雷審判",
            },
            {
              src: "/raid/RealmofPhantasm_7.PNG",
              alt: "鳴り響く雷鳴",
              caption: "鳴り響く雷鳴",
            },
          ]}
        />

        <SectionTitle icon="healing">花のギミックが痛いので回復できる武器を持って行こう！</SectionTitle>
        <div>
          ギミック②で出現する偽物の花を破壊した際のダメージが非常に痛く、連続して花を破壊すると即死してしまう。<br />
          花を破壊するたびにHPを回復するか、アルケーの枠に余裕があるならデスコントロールなどを使って安全に処理するようにしよう！
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          ボスの攻撃自体はさほど痛くないので、強攻と恩恵だけのチームで攻略可能。<br />
          チーム人数が4人以下になるとギミックを発動してこなくなるが、火力が足りているならギミック無しでも削り切れるのであえて4人以下で挑戦するのもあり。<br />
          敵の攻撃も痛くないのでソロ攻略は簡単な部類。
        </div>
      </div>
    </>
  );
}

RealmofPhantasmPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};