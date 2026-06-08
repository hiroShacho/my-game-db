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
        // console.warn("Unable to set video volume", e);
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
  // chunk into arrays of length 2
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

export default function EvolutionBeyondPage() {
  return (
    <>
      <Head>
        <title>超越進化 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「超越進化」の攻略ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">smart_toy</span>
          討伐作戦：超越進化
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/EvolutionBeyond.PNG"
            alt="EvolutionBeyond トップ"
            width={880}
            height={360}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="bolt">複数同時発動のギミックラッシュに対応しよう！</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この討伐ではギミックや敵の攻撃で溜まる<span className="font-bold text-orange-600">湮滅(いんめつ)スタック</span>が100%になることで即死級のダメージを受けるようになっている。<br />
湮滅スタックは全てのギミックで溜まる上に、ギミックは複数同時発動＆短時間で連発してくるので非常に厄介。
ギミックの発動する<span className="font-bold text-orange-600">タイミングと順番は固定</span>なので、発動順と対処の仕方を覚えて攻略しよう！<br />
        </pre>

        <SectionTitle icon="coronavirus">ギミック①：湮滅侵食＆深度侵食（戦闘開始から約30秒で発動、その後は常時発動）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この討伐では敵からの攻撃やギミックによって湮滅スタックというゲージが溜まっていく。<br />
この湮滅スタックが100%まで溜まると即死級のダメージを連続で受けることになる。（<span className="font-bold text-orange-600">毎秒最大HP90%のダメージ</span>）<br />
湮滅スタックには一応こちらへのメリットも存在し、スタックが80%以上だと敵に与えるダメージが+100%される。ただし、スタックがそこまで溜まった状態を維持しながら生存するのは難しいので、基本的にはあってないようなものと思って良い。
        </pre>

        {/* 画像（単体） */}
        <CaptionedMedia
          src="/raid/EvolutionBeyond_1_1.PNG"
          alt="湮滅スタックの溜まりに注意"
          caption="湮滅スタックの溜まりに注意"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">
また、ターゲットを取っているプレイヤーには継続的な<span className="font-bold text-orange-600">被ダメージ増加＆回復不可＆HPシールド消去</span>のデバフが付与される。
こればかりは強攻・恩恵が受けると耐えきれないので、剛毅がひたすらダメージ軽減などを使って耐えて味方を守るようにしよう。
        </pre>


        <SectionTitle icon="gps_fixed">ギミック②：湮滅追撃＆溢出幽魂（初回はギミック①から10秒後に発動、その後は1分ごとに発動）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

バッカスは<span className="font-bold text-orange-600">1分ごと</span>に3人のプレイヤーの足元に「<span className="font-bold text-orange-600">湮滅追撃</span>」という範囲円を発生させる。<br />
範囲円は出現してからすぐに爆発が発生して円上にいると湮滅スタックが溜まる。<br />
範囲円は合計10回、間を開けてプレイヤーの足元に発生する。

        </pre>

        {/* 埋め込み動画（mp4）は横並べしない — 単独  表示） */}
        <CaptionedMedia
          src="/raid/EvolutionBeyond_2_1.PNG"
          alt="円はプレイヤーを追うように発生するので逃げ続けよう"
          caption="円はプレイヤーを追うように発生するので逃げ続けよう"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この円だけならそこまで問題にならないのだが、同時に「<span className="font-bold text-orange-600">溢出幽魂</span>」というギミックが発動してフィールドに幽霊が出現する。この幽霊は2人のプレイヤーとリンクで繋がり、繋がれたプレイヤーは<span className="font-bold text-orange-600">減速効果</span>を受けるのと同時に<span className="font-bold text-orange-600">武器封印状態</span>になる。<br />
この幽霊は2人のプレイヤーの間に繋がったリンクを幽霊に当てることで消去できるので、リンクを幽霊の移動経路上に置いて待機するようにしよう。
幽霊は一定のルートをグルグルと回っているので、フィールドの模様を目印にして位置取りを決めよう。<br />
なお、幽霊にリンクを当てて消去するとバッカスに固定ダメージを与えられる。（最大HP5%程度のダメージ）

        </pre>

        <CaptionedMedia
          src="/raid/EvolutionBeyond_2_2.PNG"
          alt="幽霊は一定ルートを周回し、プレイヤー間のリンクを当てると消滅"
          caption="幽霊は一定ルートを周回し、プレイヤー間のリンクを当てると消滅"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

このギミックで一番厄介な点は後述のギミック3が発動するまでの間隔が<span className="font-bold text-orange-600">10秒</span>しかないことで、実質的に3～4つのギミックが同時に発動している状態になる。<br />
対処の仕方を知らなければ連続ギミックで一気に全滅してしまうので、後述の対処法も含めてしっかり把握しておこう。
        </pre>

        <SectionTitle icon="radio_button_unchecked">ギミック③：湮滅球＆溢出幽魂（毎回ギミック②から10秒後に発動）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

バッカスはギミック2から<span className="font-bold text-orange-600">10秒後</span>に再び「溢出幽魂」（幽霊ギミック）と同時に「<span className="font-bold text-orange-600">湮滅球</span>」を発動してくる。<br />
湮滅球はフィールド上に2つの球が出現し、これを放置していると全員の湮滅スタックが増加していく。湮滅球は触れると消去できるが、触れたプレイヤーの湮滅スタックがほぼ満タンになる。
        </pre>

        <CaptionedMedia
          src="/raid/EvolutionBeyond_3_1.PNG"
          alt="フィールド上に2つの湮滅球が出現"
          caption="フィールド上に2つの湮滅球が出現"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

また、湮滅球に触れると5秒後に触れたプレイヤーを中心に「電子空洞」という紫色の床が生成される。禍々しい見た目なので避けそうになってしまうが、この紫色の床の上では<span className="font-bold text-orange-600">湮滅スタックが減少</span>していくメリット効果しかないので積極的にこの床の上で戦うようにしよう。

        </pre>

        <CaptionedMedia
          src="/raid/EvolutionBeyond_3_2.PNG"
          alt="紫色の床の上で戦おう"
          caption="紫色の床の上で戦おう"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

幽霊ギミックと範囲円ギミックが同時に発動し続けているので、事前に動きを決めてギミックに対処する必要がある。
ギミック自体はこのギミック3発動でストップするので、強攻も攻撃の手を緩めてギミック対処に集中するようにしよう。
        </pre>

        <SectionTitle icon="check_circle">床の模様を目印に戦おう</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

湮滅球と幽霊ギミックの出現位置は大体決まっており、地面の円を目印にすると分かりやすい。湮滅球は中央から2つ目の円上、幽霊は中央から3つ目の円上をグルグルと周っているので、戦闘中は<span className="font-bold text-orange-600">2つ目と3つ目の円の間</span>辺りで戦うようにしよう。
        </pre>

        {/* 埋め込み動画（mp4）は横並べしない — 単独  表示） */}
        <CaptionedMedia
          src="/raid/EvolutionBeyond_4_1.PNG"
          alt="湮滅球と幽霊が通る2つの円の間で戦いたい"
          caption="湮滅球と幽霊が通る2つの円の間で戦いたい"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

湮滅球は早めに触れて紫床を生成して安全地帯を作っておきたい。<br />
フィールドの模様でルートは分かるので覚えておこう。
        </pre>

        <CaptionedMedia
          src="/raid/EvolutionBeyond_4_2.PNG"
          alt="地面の円を目印にしよう"
          caption="地面の円を目印にしよう"
          maxWidth={640}
        />



        <SectionTitle icon="lightbulb">出現直後の幽霊はプレイヤーに近づくように動く</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

逃げる幽霊を追いかけている記憶が強く残るのでどう追いつくかを考えそうになるが、幽霊は出現した直後はむしろ<span className="font-bold text-orange-600">リンクが繋がったプレイヤーに近づくように円上を動いている</span>。
そのため、幽霊が出現したらすぐに2人の間のリンクが円上に来る位置に動けばそれだけで勝手に幽霊ギミックはクリアできる。
        </pre>

        {/* 埋め込み動画（mp4）は横並べしない — 単独  表示） */}
        <CaptionedMedia
          src="/raid/EvolutionBeyond_5_1.PNG"
          alt="自分から突っ込んでくるポンコツ幽霊"
          caption="自分から突っ込んでくるポンコツ幽霊"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

もし移動が間に合わずに幽霊が逃げてしまった場合は逃げる幽霊を追うのではなく、円上を幽霊とは反対方向に動くことで幽霊の方からリンクに当たりに来てもらおう。
ただし、タイミングによっては幽霊が逆方向に動き出すので無理そうな時は割り切って武器を封印されていない恩恵の回復やデスコントロールに頼ろう。<br />
なるべく恩恵が全員武器封印を受けないように<span className="font-bold text-orange-600">4人以上は恩恵を編成</span>しておきたい。
        </pre>

        <SectionTitle icon="group">攻めのタイミングはギミック対応の後</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

この討伐では<span className="font-bold text-orange-600">1分ごと</span>に連続ギミックが飛んでくる。<br/ >
この連続ギミックさえ超えれば次のギミックが来るまでの間は落ち着いて攻撃できる時間になるので、ギミック発動時は攻撃の手を止めてしっかり<span className="font-bold text-orange-600">ギミック対応に集中</span>しよう。勿論、戦闘開始直後はギミックが発動するまで普通に攻撃していて大丈夫だが、画面の表示を見てギミックが発動しているかどうかはしっかり確認するようにしよう。（2回目以降は説明が表示されないことも多いので最初のギミックが来た時間も覚えよう）
        </pre>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

強攻2～3人、剛毅1人、恩恵4～5人の編成で挑もう。
幽霊ギミックに慣れているメンバーなら恩恵を減らしても大丈夫だが、安定を取るなら最低限3人は恩恵を編成しておきたい。

        </pre>

        <SectionTitle icon="ondemand_video">解説動画</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

・準備中

        </pre>
      </div>
    </>
  );
}

EvolutionBeyondPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};