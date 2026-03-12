import { ReactElement } from "react";
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

/**
 * ページ本体
 *
 * 注意：
 * - 「項目名以外の本文部分」は原文どおり <本文>...</本文> を表示します（タグ文字列をそのまま出力）。
 * - 指示に従い、連続している画像群のみ RowMedia で横並び（最大2枚）にします。
 * - 埋め込みの動画（mp4）は単独表示（横並べしない）。
 * - 画像は public/raid 配下のファイルを使用しています（src は /raid/xxx）。
 */

export default function OperationCodenameAnchorLiftPage() {
  return (
    <>
      <Head>
        <title>作戦コード：「抜錨」 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「作戦コード：「抜錨」」の攻略ページ" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">anchor</span>
          討伐作戦【作戦コード：「抜錨」】
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit flex justify-center" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/OperationCodenameAnchorLift.PNG"
            alt="OperationCodenameAnchorLift トップ"
            width={880}
            height={360}
            style={{ maxWidth: "100%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <SectionTitle icon="schedule">実質的なタイムリミットあり＆純粋な火力でしか削れない高難易度討伐</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

討伐の制限時間自体はいつも通りだが、ギミックによって徐々にまともに戦えるエリアが狭くなっていく。<br />
<span className="font-bold text-orange-600">敵の体力を削れるギミックは無く</span>、純粋な火力でタイムリミットが来るまでに倒し切る必要があるのでクリアのハードルはかなり高い。

        </pre>

        <SectionTitle icon="explore">ギミック①：航路補正（1分ごとに発動・実質的なタイムリミット）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

フィールド上に存在する4本の柱オブジェクトは<span className="font-bold text-orange-600">1分経過する度</span>に1本ずつ周囲の床が燃え上がる。<br />
この燃えている床の上に立つとダメージを受け続けるので炎の上では戦わないようにしよう。<br />
柱は入り口から見て右手前にある柱が最初に燃え上がり、その後は反時計回りの順で他の柱周辺も炎上する。

        </pre>

        {/* 画像（単体） */}
        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_1_1.PNG"
          alt="1分ごとに柱周辺が炎上"
          caption="1分ごとに柱周辺が炎上"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

最終的に4本の柱全てが炎上して、フィールド中央の狭い範囲しかダメージを受けないエリアが残らない。<br />
こうなるとまともに戦えなくなるので<span className="font-bold text-orange-600">実質的なタイムリミットは4分</span>となっている。

        </pre>

        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_1_2.PNG"
          alt="普通に攻撃しているだけで炎の中に入ってしまうくらい狭くなる"
          caption="普通に攻撃しているだけで炎の中に入ってしまうくらい狭くなる"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

柱が燃える順は固定なので、<span className="font-bold text-orange-600"></span>剛毅は最後に炎上する柱の周辺で戦うようにしよう。（最初の画像の④の柱）

        </pre>

        <SectionTitle icon="notifications_active">ギミック②：サイレンスプロトコル（約40秒ごとに発動・味方へのダメージあり）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ナントは<span className="font-bold text-orange-600">約40秒ごと</span>に数人のプレイヤーの足元にダメージが発生する範囲円を発生させる。<br />
範囲円は出現してからすぐに爆発が発生して円上にいるとダメージを受ける。<br />
範囲円は合計6回、少し間を開けてプレイヤーの足元に発生する。

        </pre>

        {/* 埋め込み動画（mp4）は横並べしない — 単独  表示） */}
        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_2_1.mp4"
          alt="円はプレイヤーを追うように発生するので逃げ続けよう"
          caption="円はプレイヤーを追うように発生するので逃げ続けよう"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

一度でも円の爆発ダメージを受けるとそのプレイヤーを中心に白い波が発生する。
この波に他のプレイヤーが触れるとダメージを受けるので、波が見えたらジャンプで躱すようにしよう。

        </pre>

        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_2_2.PNG"
          alt="波はジャンプで躱そう"
          caption="波はジャンプで躱そう"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

円の爆発は空中にいてもくらうのと、白い波は最後の6つ目の円が出現した後にまとめて発生するので一気に壊滅することもある。<br />
波の判定は見た目通りなのでジャンプすれば基本躱せるが、プレイヤーの高さに合わせて波が発生するので空中にいるプレイヤーから出た波はジャンプだけでは躱し切れない。
全員で同じ方向に逃げ続ければ混乱しづらいのと、複数の波を一気に受けたりしなければ耐久可能なので落ち着いて対処しよう。

        </pre>

        <SectionTitle icon="link_off">ギミック③：軌道粛清（HP減少&CD経過で発動・敵から離れると大ダメージ）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ナントは<span className="font-bold text-orange-600">最初のHPバーが半分を切る</span>と数人のプレイヤーにリンクを付与してくる。<br />
このリンクはナントから距離が離れると色が白から赤っぽい色に変わり、リンクされているプレイヤーに持続ダメージを付与する。
この持続ダメージがかなり痛く、数秒ナントから離れているだけでやられてしまう。

        </pre>

        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_3_1.PNG"
          alt="ナントから離れるとリンクが赤くなって大ダメージ"
          caption="ナントから離れるとリンクが赤くなって大ダメージ"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

最初のリンク発動以降はギミックの<span className="font-bold text-orange-600">クールタイムである約50秒が経過</span>＆<span className="font-bold text-orange-600">HPが5%（1ゲージの4分の1）減少するたび</span>に同様のリンクギミックが発動する。<br />
厄介なことにこのギミックは基本HP依存で発動するので、時間経過で発動する他ギミックとタイミングが被ると一気に各ギミッククリアの難易度が上がる。
特に後述のギミック4と被ると最悪なので、このギミックのクールタイム中にギミック4が発動するように調整しよう。

        </pre>

        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_3_2.PNG"
          alt="他ギミック中にも発動してくる"
          caption="他ギミック中にも発動してくる"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

なお、剛毅アストールの固定ダメージ（最大HP10%）を与えると<span className="font-bold text-orange-600">いきなりこのギミックが発動</span>する。<br />
そのため、剛毅だけが先行して戦闘を開始すると<span className="font-bold text-orange-600">入り口で待機している味方が全滅する</span>ことになる。<br />
剛毅アストールを使う場合は戦闘開始のタイミングを予め決めておくようにしよう。

        </pre>

        <SectionTitle icon="flight_takeoff">ギミック④：ソフトランディング（HP減少&CD経過で発動・失敗すると1名が確定で脱落）</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

ナントのHPが<span className="font-bold text-orange-600">1ゲージ減少するたびに</span>プレイヤー1名を拘束し、同時に他のプレイヤーを対象にしたレーザーを放ってくる。<br />
拘束されたプレイヤーは一切行動できず、恩恵の行動不能解除などでも助けられない。<br />
<span className="font-bold text-orange-600">約10秒経過でギミック失敗</span>となり敵のナントにダメージアップ効果が付与され、拘束されたプレイヤーに即死級の持続ダメージが付与される。

        </pre>

        {/* 埋め込み動画（mp4）は横並べしない — 単独  表示） */}
        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_4_1.mp4"
          alt="問答無用で拘束され、時間経過で即死ダメージを受ける"
          caption="問答無用で拘束され、時間経過で即死ダメージを受ける"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

拘束を解除するためには他のプレイヤーを狙って撃ってくるレーザーを拘束されたプレイヤーに当てる必要がる。
生存している全員のレーザーを当てないと拘束は解除できないので、プレイヤー数が多いほど救出の難易度は上がる。<br />
拘束の解除に成功するとナントが所持している9スタックのダメージ軽減効果が1スタック減少する。<br />
レーザーは砲台となるドラゴンから地面に赤い予告線が出ているが、攻撃のエフェクトと被って非常に見づらい。

        </pre>

        <CaptionedMedia
          src="/raid/OperationCodenameAnchorLift_4_2.PNG"
          alt="レーザーの予告範囲はエフェクトが重なると非常に見づらい"
          caption="レーザーの予告範囲はエフェクトが重なると非常に見づらい"
          maxWidth={640}
        />

        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

レーザーは拘束されたプレイヤーに重なるように立っていれば勝手に当たってくれる。
ただし、レーザーを当てるまでの猶予が短いので、誰かが拘束されたら全員速攻でそのプレイヤーの元に駆け付けよう。<br />
また、このギミックも一度発動すると次回発動までに<span className="font-bold text-orange-600">約1分のクールタイム</span>がある。
そのため、1回ギミックが発動したらその後は一気にHPを削ることで発動回数を減らせる。

        </pre>

        <SectionTitle icon="shield">敵のダメージ軽減はそこまで強力ではない</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

スタート時点では敵に9スタックのダメージ軽減が付与されているが、そこまで効果は強くない。
そのため、基本的な強攻を剛毅・恩恵でバフする編成で挑めば多少ギミック4で人数が減っても時間をかけすぎなければクリアは可能。<br />
ただし、4分の実質的なタイムリミットがあるのとギミックごとのクールタイムをある程度は管理しないと厳しい戦いになるので注意しよう。

        </pre>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <pre className="whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded px-4 py-3 text-sm text-emerald-800">

強攻3～4人、剛毅1人、恩恵3～4人の編成で挑もう。
ギミック4で拘束される対象はランダムなので最悪1,2人欠けても大丈夫なように、恩恵は全員がある程度は回復を意識した編成にしておこう。

        </pre>

        <SectionTitle icon="ondemand_video">解説動画</SectionTitle>
        <div className="mb-6">
          ・準備中
        </div>
      </div>
    </>
  );
}

OperationCodenameAnchorLiftPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};