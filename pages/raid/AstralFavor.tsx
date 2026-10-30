import { ReactElement } from "react";
import { useEffect, useRef } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

/**
 * 共通コンポーネント（FortuneGallop / ScorchingNightmare と同様の実装）
 */

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-emerald-400/60 to-emerald-100 border-l-8 border-emerald-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-emerald-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-emerald-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画（拡張：.mp4 を動画と判定）
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 640,
}: {
  src: string;
  alt?: string;
  caption?: string;
  maxWidth?: number;
}) {
  const isVideo = src.endsWith(".mp4");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // クライアント側マウント時に動画の初期音量を設定（30%）
    if (isVideo && videoRef.current) {
      try {
        videoRef.current.volume = 0.3; // 0.0 - 1.0
      } catch (e) {
        // セキュリティやブラウザポリシーで設定できない場合もあるので安全に無視
      }
    }
  }, [isVideo, src]);

  return (
    <div className="flex flex-col items-center my-3 mx-auto" style={{ width: "100%", maxWidth }}>
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden bg-black mx-auto" style={{ width: "100%" }}>
        {isVideo ? (
          <video controls width={maxWidth} height={270} style={{ width: "100%", height: "auto", display: "block" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt ?? ""}
            width={maxWidth}
            height={320}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        )}
        <div className="bg-emerald-50 px-4 py-1 text-xs text-emerald-800 border-t border-emerald-200 w-full text-center">
          {caption}
        </div>
      </div>
    </div>
  );
}

// 画像を最大2枚横並び（連続する画像群を受け取るときに使えるユーティリティ）
function RowMedia({ items }: { items: { src: string; alt?: string; caption?: string }[] }) {
  const chunks: { src: string; alt?: string; caption?: string }[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    chunks.push(items.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map((item) => (
            <div key={item.src} style={{ width: "100%", maxWidth: 640 }}>
              <CaptionedMedia {...item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AstralFavorPage() {
  return (
    <>
      <Head>
        <title>神恩天象 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「神恩天象」の攻略ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">🌙</span>
          討伐作戦：神恩天象
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/AstralFavor.PNG"
            alt="AstralFavor トップ"
            width={880}
            height={360}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="groups">チームの人数で難易度が変わるギミックあり</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この討伐ではチームメンバーの人数によって難易度が変わるギミックが存在する。<br />
チームが多くても少なくても何かしらのデメリットがあるので、タイムアタックでもない限りは4～5人くらいの人数で挑むのをおススメする。（ギミックをこなせるなら何人でもOK）<br />
また、全滅の危険性があるギミックはクリア時のリターンこそ大きいが発動させずにクリアすることも可能なので、チームの戦力によってはある程度ギミックを無視してしまっても良い。（ただし火力の要求値はかなり上がる）<br /><br />
※ギミック解説はプレイ説明にある順番ではなく発動順に合わせて解説しています
        </pre>

        <SectionTitle icon="☄️">ギミック①：ルベル・アステル（隕石）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

全てのプレイヤーを対象に発動するギミック。<br />
各プレイヤーは赤か青のサークルを付与され、プレイヤーのいる地点に3回の隕石攻撃が発動する。<br />
この隕石に当たるとダメージを受けるだけでなくボスのHPが回復してしまうので必ず避けよう。<br />
隕石落下後はその地点にダメージ床が生成され、プレイヤーがこのダメージ床にいるとダメージを受けるのと共にボスのHPが回復する。
        </pre>

        <RowMedia
          items={[
            {
              src: "/raid/AstralFavor_1_1.PNG",
              alt: "赤または青のサークルが付与されて隕石が降ってくる",
              caption: "赤または青のサークルが付与されて隕石が降ってくる",
            },
            {
              src: "/raid/AstralFavor_1_2.PNG",
              alt: "隕石の落下地点にはダメージ床が生成される",
              caption: "隕石の落下地点にはダメージ床が生成される",
            },
          ]}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

このギミックで生成されるダメージ床が後述のギミック２にも関わってくる。<br />
ギミック２はダメージ床が密集している程クリアしやすくなるので、出来る限りプレイヤー同士は近くに隕石を落とすようにしよう。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_1_3.PNG"
          alt="ダメージ床はなるべく同じところに集めよう"
          caption="ダメージ床はなるべく同じところに集めよう"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

なお、説明では色違いのサークルが付いたプレイヤーからは離れるように警告が表示されるが、現状は近くにいても特に致命的な何かが起こるわけでもないので無視して良い。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_1_4.PNG"
          alt="説明では色に関して警告しているが特に何かが起こるわけではない"
          caption="説明では色に関して警告しているが特に何かが起こるわけではない"
          maxWidth={640}
        />

        <SectionTitle icon="⭕">ギミック②：レタリス・マクラ（大円）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ギミック１が2回発動した後に発動するギミック。<br />
プレイヤー1名に対して大円が付与される。（対象はターゲットを取っている人が優先される模様）<br />
この大円は付与されてから数秒後に活性化し、大円の範囲内にいる他プレイヤーに大ダメージを与える。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_2_1.PNG"
          alt="大円内に他プレイヤーがいるとダメージを受ける"
          caption="大円内に他プレイヤーがいるとダメージを受ける"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この大円は活性化してから5秒程で消失するが、この5秒間に大円をギミック１で生成されたダメージ床に当てるとダメージ床を削除できる。<br />
ダメージ床を削除するとボスに固定ダメージ（1個につき最大HP0.25%程)が入り、ボスの頭上にカウントが出現して1個削除するごとにカウントが1増えていく。<br />
このカウントが20に達するとギミック３が発動するので、基本的にはギミック発動のために毎回20個のダメージ床を削除できるように隕石を密集して落としておきたい。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_2_2.PNG"
          alt="ダメージ床を削除するとカウントアップ、20個削除でギミック③へ"
          caption="ダメージ床を削除するとカウントアップ、20個削除でギミック③へ"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

なお、ギミック１の隕石は1回につき人数×3個落ちてくる。そのため、2回のギミック後に大円が来ても人数が3人以下だとダメージ床が足りなくてギミック成功までたどり着けない。<br />
カウントは20になるまでずっと表示されているのでギミック2巡目で成功することは可能だが、その分ダメージを与えるチャンスは減るので注意。
        </pre>

        <SectionTitle icon="👥">ギミック③：失寵の守衛（分身）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ギミック２で20個のダメージ床を削除すると発動するギミック。<br />
ボスがフィールド中央に移動した後、プレイヤー数と同じ数だけ分身を周囲に召喚する。<br />
この分身は召喚から一定時間後にボスに対して順番に突進を仕掛けてくるので、これを全てプレイヤーが受け止めることでギミック成功になる。<br />
この突進が1つでもボスに当たるとギミック失敗になって全滅するので必ず突進を受け止めるようにしよう。
        </pre>

        <RowMedia
          items={[
            {
              src: "/raid/AstralFavor_3_1.PNG",
              alt: "分身がボスを囲うように出現して突進してくる",
              caption: "分身がボスを囲うように出現して突進してくる",
            },
            {
              src: "/raid/AstralFavor_3_2.PNG",
              alt: "失敗すると全滅する凶悪ギミック",
              caption: "失敗すると全滅する凶悪ギミック",
            },
          ]}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

分身の突進は1回のギミック中で1人1回しか受け止められないという制限があり、2回突進を受け止めるとそのプレイヤーは即死する。<br />
そのため、分身の突進を受け止めたら他の分身に当たらないように少し距離を取るようにしよう。<br />
分身の突進を受け止めると黄色いオーラのようなものが付くので、これが付いたら後は味方の成功を祈ろう。<br />
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_3_3.PNG"
          alt="分身を受け止めると黄色いオーラが付く"
          caption="分身を受け止めると黄色いオーラが付く"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

このギミックに成功するとボスの最大HP20%のダメージ（ゲージ1本分）が入り、さらにボスがダウン状態になって耐性が下がる。<br />
このダウン状態中が一番攻撃の通りが良いので、各種デバフアルケーや強攻の大技はここに合わせて撃てるように準備しよう。<br />
ダウンしている時間は10秒程度と短いので、強攻のスキル回しはDPSが大きい部分を合わせるようにしよう。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_3_4.PNG"
          alt="ギミック成功で大ダメージ&攻撃チャンス"
          caption="ギミック成功で大ダメージ&攻撃チャンス"
          maxWidth={640}
        />

        <SectionTitle icon="🌑">ギミック④：ルナ・サルタティオ（月食）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ギミック1巡目のギミック２の失敗後またはギミック３の後に発動するギミック。<br />
フィールド全体が満月の光に覆われ、プレイヤーはランダムに「満月」または「新月」の陣営を割り振られる。<br />
陣営は頭上に表示される月で判別でき、白色の月が満月、黒色の月が新月を表す。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_4_1.PNG"
          alt="フィールド全体が満月になった後に陣営を割り振られる"
          caption="フィールド全体が満月になった後に陣営を割り振られる"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

陣営割り振り後にフィールドの端から影が出てきてフィールド上を移動する。<br />
満月陣営のプレイヤーはこの影を避け、新月陣営のプレイヤーは影の中に入るように移動しよう。<br />
満月陣営が影に入ったり新月陣営が影の外にいるとダメージを受けるのと共にボスのHPが回復していく。<br />
そのため、自分の陣営を確認したら後は影の動きを見て陣営ごとに移動しよう。<br />
なお、たまに頭上に何も出ない時があるのでその時は満月側でダメージを受けるかどうかで判断しよう。
        </pre>

        <CaptionedMedia
          src="/raid/AstralFavor_4_2.PNG"
          alt="頭上が白い月なら月光の中、黒い月なら影の中へ"
          caption="頭上が白い月なら月光の中、黒い月なら影の中へ"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

影は常に西から東に向かってフィールドを横断するように移動しているので、基本的には全員西側に移動して満月陣営なら影から逃げるように移動しよう。<br />
ただし、影はとても大きくてただ西から東に逃げているだけだといずれ逃げ場が無くなる。<br />
よく見ると影は移動する際に北側あるいは南側に隙間が出来るように動いているので、毎回どちら側に隙間があるかを逃げながら確認して移動経路を決めるようにしよう。<br />
なお、このギミック終了時にボスに最大HP5%程のダメージが入る。
        </pre>

        <RowMedia
          items={[
            {
              src: "/raid/AstralFavor_4_3.PNG",
              alt: "影が北側を通る時は南へ",
              caption: "影が北側を通る時は南へ",
            },
            {
              src: "/raid/AstralFavor_4_4.PNG",
              alt: "影が南側を通る時は北へ",
              caption: "影が南側を通る時は北へ",
            },
          ]}
        />

        <SectionTitle icon="place">隕石を捨てる位置はある程度固定しよう</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ギミック２で大円を持ったプレイヤーは武器が封印されて回避も出来なくなる。<br />
そのためダッシュで地道にダメージ床を消しに行かないといけないので、あまり距離が離れていると20個削除する前に時間切れになりやすい。<br />
隕石とダメージ床は当たらなければ特に何も起きないので、事前に捨てる位置を決めて逃げ先がぶつからないようにだけ気を付けよう。
        </pre>

        <SectionTitle icon="bolt">火力があるなら分身ギミックは無視でも良い</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

隕石はダメージ床がシンプルに邪魔なので捨てる位置は決めた方が良いが、<br />
大円でダメージ床を削除しなくても火力があれば十分にクリアは可能になっている。<br />
剛毅・恩恵でバフ・デバフを可能な限り用意して強攻火力で削れるなら即死のリスクを追うよりはギミックを無視した方が楽かもしれない。<br />
何故かはわからないが分身の突進がすり抜けることが度々発生したので、どうしても安定しない時は人数を減らすか分身ギミックが発動しないように立ち回ろう。
        </pre>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

4～5人チームなら強攻1～2人、剛毅1人、恩恵2人の編成でOK。<br />
攻撃はそこまで痛くないので剛毅と恩恵はバフ・デバフ重視で編成を組もう。
        </pre>

        <SectionTitle icon="ondemand_video">解説動画</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

準備中
        </pre>
      </div>
    </>
  );
}

AstralFavorPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};