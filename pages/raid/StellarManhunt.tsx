import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-300/60 to-orange-50 border-l-8 border-orange-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-orange-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-orange-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-orange-300 overflow-hidden">
        {isVideo ? (
          <video src={src} controls width={480} height={270} style={{ background: "#222" }}>
            {alt}
          </video>
        ) : (
          <Image src={src} alt={alt} width={480} height={270} />
        )}
        <div className="bg-orange-50 px-4 py-1 text-xs text-orange-800 border-t border-orange-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像・動画横並び
function RowMedia({
  medias,
}: {
  medias: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {medias.map((media) => (
        <CaptionedMedia key={media.src} {...media} />
      ))}
    </div>
  );
}

export default function StellarManhuntPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「星間包囲」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「星間包囲」攻略。ギミック・攻略ポイント・チーム編成を徹底解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">

        <h1 className="text-3xl font-extrabold mb-4 text-orange-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">pets</span>
          討伐作戦「星間包囲」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/StellarManhunt.PNG"
            alt="星間包囲 フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="warning">ギミックをこなしてダメージを防ぐ＆事前の打ち合わせで動きを決めよう！</SectionTitle>
        <div>
          この討伐ではギミックの処理に失敗すると持続ダメージや即死級のダメージが発生する。<br />
          ヒット数の多い武器が欲しいのと、一部のギミックは事前に動きを相談するのが必須級となっている。
        </div>

        <SectionTitle icon="coronavirus">ギミック①：零度ペスト</SectionTitle>
        <div>
          ローレンズは一定時間ごとにランダムなプレイヤー3名に零度ペストを放ってくる。<br />
          これに感染すると持続ダメージを受ける上に、5秒経過で大ダメージと移動不可等のデバフが発生する。<br />
          零度ペストを受けたプレイヤーは頭上に赤いドクロのマークが表示される。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_1.PNG"
          alt="零度ペストを受けると頭上にドクロマークが出現"
          caption="零度ペストを受けると頭上にドクロマークが出現"
        />
        <div>
          零度ペストはフィールド上のシールドバリアを拾うことで感染を防げる。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_2.PNG"
          alt="シールドバリアは触れるだけで獲得できる（落ちてるバリアは獲得した物から消える）"
          caption="シールドバリアは触れるだけで獲得できる（落ちてるバリアは獲得した物から消える）"
        />
        <div>
          ただしシールドバリアはペストが放たれるたびに4つしか出現しない。<br />
          余分にバリアを取ったり感染していない人がバリアを取るとペストの感染を防げずに死亡してしまう。<br />
          さらに零度ペストは感染から5秒経過で周囲の味方にも感染を広げる状態になるので、一度感染が広がるとバリアの数が確実に不足して全滅を免れなくなる。<br />
          そのため、頭上にドクロマークが出るまではバリアを取るのは基本的には控えるようにした方が良い。
        </div>

        <SectionTitle icon="memory">ギミック②：幻影の罠</SectionTitle>
        <div>
          ローレンズは幻影を召喚してプレイヤーに対して突進および追跡をさせてくる。<br />
          プレイヤー1名に追跡幻影が2体、他のプレイヤーには突進幻影が1体ずつ召喚される。<br />
          突進してくる幻影に触れると零度ペストに感染し、追跡してくる幻影に追いつかれると幻影は爆発する。<br />
          突進は避けるか同時に出現するシールドバリアを取ればどうとでもなるが、追跡してくる幻影は一定回数攻撃をヒットさせて撃破する必要がある。<br />
          追跡幻影を全て撃破するとローレンズに最大HP6%程のダメージが入るので突進の回避も大事だがどちらかというと幻影撃破に集中したい。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_3.PNG"
          alt="突進は赤い予告線(地面に表示)、追跡は青白い線が対象のプレイヤーに付与される"
          caption="突進は赤い予告線(地面に表示)、追跡は青白い線が対象のプレイヤーに付与される"
        />
        <div>
          なお、追跡幻影はバリアを持った味方や後述のギミックで召喚されるオブジェクト（電池）等に触れると消滅するので注意しよう。<br />
          幻影が消滅したらギミックは失敗になってダメージを与えられないので位置取りには常に意識すること。
        </div>

        <SectionTitle icon="sensors">ギミック③：熱核ミサイル</SectionTitle>
        <div>
          ローレンズはフィールド中央に熱核ミサイルを投下してくる。<br />
          プレイヤー3人以上がシールドバリアを持った状態でフィールド中央の着弾地点に集まることでミサイルを防げる。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_4.PNG"
          alt="3人以上でバリアを持って集まろう"
          caption="3人以上でバリアを持って集まろう"
        />
        <div>
          バリアを持って中央に集まるだけなので難易度は低いが、ローレンズが動き回ると攻撃しながら中央ポジションを維持するのが難しくなる。<br />
          また、中央に集まるのは3名だけでいいので他のプレイヤーはローレンズに攻撃を続けていてOK。<br />
          ギミックに失敗するとフィールド全体に持続ダメージが発生するので簡単とはいえ油断せずにギミックに対処しよう。
        </div>

        <SectionTitle icon="bolt">ギミック④：熱線放射</SectionTitle>
        <div>
          ローレンズはフィールドに3つの熱エナジー電池を召喚して熱線掃射を放ってくる。<br />
          召喚された電池には01～03までの番号が上に表示されており、<br />
          この番号順に電池を破壊することでローレンズの攻撃を止めてダメージ(最大HP12%程度)を与えることが出来る。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_5.PNG"
          alt="電池を番号順に破壊しよう（01から順に破壊）"
          caption="電池を番号順に破壊しよう（01から順に破壊）"
        />
        <div>
          電池の出現位置は固定だが、電池を破壊する順番は毎回変わるので必ず番号を見てから破壊しに行こう。<br />
          なお、電池はグレイフォックス3凸やラクシスのコハルビ等の範囲ダメージで簡単に壊れてしまうので、下手に電池の近くで待機していると順番通りに破壊できずにギミック処理に失敗しやすい。<br />
          ギミックに失敗すると即死級の持続ダメージを受けるのでタイミング良くデスコントロールを使わない限りは全滅してしまう。
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_6.PNG"
          alt="電池の位置は覚えておこう"
          caption="電池の位置は覚えておこう"
        />

        <SectionTitle icon="tour">ギミック⑤：幻影チャレンジ</SectionTitle>
        <div>
          ローレンズが煙に身を潜めて幻影チャレンジを発動する。<br />
          フィールドに別エリアに通じるゲートが開くので、そこからエリア移動した先で巨大な幻影のローレンズと戦闘を行う。<br />
          シールドバリアを3人以上が収集して攻撃を防ぎながらローレンズの攻撃に多段ヒットの攻撃で対抗して撃破しよう。<br />
          幻影のローレンズの攻撃を3回はじき返すと大ダメージ(最大HP12%程)を与えられる。<br />
        </div>
        <CaptionedMedia
          src="/raid/StellarManhunt_7.PNG"
          alt="3人以上でバリアを持って集まろう"
          caption="3人以上でバリアを持って集まろう"
        />
        <div>
          注意点として、別エリア内のシールドバリアはローレンズの攻撃のたびに4つしか出現しないのであまり大人数で入ってもペストの感染が広がる原因になってしまう。<br />
          別エリアに入る人はフィオナを持った恩恵とペストを受けている人が合わせて4人程度になるようにしたい。
        </div>

        <SectionTitle icon="playlist_play">ギミックの順番は固定</SectionTitle>
        <div>
          ギミックは最初の零度ペストの後は<br />
          幻影の罠⇒熱核ミサイル⇒幻影の罠＆熱線掃射⇒幻影の罠⇒幻影チャレンジ<br />
          の順で発生する。<br />
          零度ペストは合間に定期的に飛んでくるので頭上のドクロマークには常に気を付けよう。<br />
          幻影の罠と熱線掃射が同時に来るタイミングでは熱線掃射クリア前に幻影の罠の追跡幻影を撃破すると<br />
          幻影の罠によるギミックダメージが入らないので注意しよう。
        </div>

        <SectionTitle icon="group_work">ギミック④：熱線掃射は事前の打ち合わせが必須</SectionTitle>
        <div>
          ギミック④の説明で触れたように電池はちょっとした範囲ダメージで簡単に壊れてしまう。<br />
          そのため、恩恵のグレイフォックスやラクシスで間違って壊さないように事前にギミックが来た時の動きを決めておこう。<br />
          電池を破壊する人はだれがどの位置でスタンバイするか、破壊しない人はどの位置に移動するかを決めよう。<br />
          何度か挑んで安定したのは電池を破壊する3人がそれぞれの電池のそばで待機し、それ以外の人はローレンズがいる側の壁際で待機するのが良かった。
        </div>

        <SectionTitle icon="bug_report">バグについて</SectionTitle>
        <div>
          以下のバグ（？）が発生しているのを確認している。原因は今のところ不明。<br />
          ・熱線掃射のギミックをクリアしてもローレンズにダメージが入らないことがある<br />
          ・幻影チャレンジで幻影の巨大ローレンズが消滅して進行不可になることがある
        </div>

        <SectionTitle icon="groups">チーム編成</SectionTitle>
        <div>
          基本的な剛毅1人、強攻1～3人、恩恵4～6人の編成で挑もう。<br />
          時間いっぱいギミックを成功させるだけでHPを削り切れるだけのダメージが稼げるので、強攻の重要度はそこまで高くない。<br />
          どちらかというとギミック中のダメージを防いだりフィオナでヒット数を稼ぐために恩恵を多めに編成した方が安定するだろう。<br />
          電池を破壊するギミック担当としてグレイフォックスとラクシスを編成に入れていない恩恵が数人欲しいところ。
        </div>

        <SectionTitle icon="movie">解説動画</SectionTitle>
        <div className="w-full flex justify-center my-4">
          <div className="relative w-full" style={{ maxWidth: 560 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/7h9oH5E--1A"
                title="討伐作戦「星間包囲」解説動画"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded shadow border border-orange-200"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* ▼追加：チャレンジソロ攻略項目 */}
        <SectionTitle icon="sports_martial_arts">チャレンジでもソロ攻略可能</SectionTitle>
        <div>
          <span className="font-bold text-emerald-700">チャレンジ</span>でもノーラ恩恵でソロ攻略も可能です。<br /><br />
          <span className="font-bold text-orange-700">ポイント</span><br />
          ■追跡幻影は安定を取って物理ノーラのドットダメージで倒す<br />
          ■熱核ミサイルが終わったら奥側（熱線掃射でローレンズがいる方向）で戦う<br />
          ■熱線掃射では追跡幻影にラクシス・ブレヴィ・物理ノーラの裏ダメージを当てて回復し続ける<br /><br />
          実際のソロクリア動画も参考にしてください。
        </div>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/v8HmIbKzkHM"
            title="チャレンジでソロ攻略動画"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded shadow border border-emerald-200"
            style={{ maxWidth: "100%", aspectRatio: "16/9" }}
          />
        </div>
      </div>
    </>
  );
}

StellarManhuntPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};