import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit";

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

// 強調バナー
function PointBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 px-3 py-2 my-4 rounded font-semibold text-orange-800 shadow-sm flex items-center gap-2">
      <span className="material-symbols-outlined text-orange-400">star</span>
      <span>{children}</span>
    </div>
  );
}

// 注意
function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 px-3 py-2 my-3 rounded text-red-700 flex items-center gap-2">
      <span className="material-symbols-outlined text-red-400">warning</span>
      <span>{children}</span>
    </div>
  );
}

// ステップ番号
function Step({ num, children }: { num: number, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 my-2">
      <div className="flex-shrink-0 w-7 h-7 bg-emerald-400 text-white rounded-full flex items-center justify-center font-bold">{num}</div>
      <div>{children}</div>
    </div>
  );
}

// キャプション付き画像
function CaptionedImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden">
        <Image src={src} alt={alt} width={480} height={270} />
        <div className="bg-emerald-50 px-4 py-1 text-xs text-emerald-800 border-t border-emerald-200">{caption}</div>
      </div>
    </div>
  );
}

export default function ScorchingNightmarePage() {
  return (
    <>
      <Head>
        <title>交通管制 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「交通管制」の攻略ポイント、ギミック解説、チーム編成例などを紹介。" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        {/* タイトル＋アイコン変更 */}
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">directions_car</span>
          交通管制 討伐作戦 攻略
        </h1>
        {/* 画像だけ表示（枠・キャプションなし） */}
        <Image
          src="/raid/TrafficControl.PNG"
          alt="交通管制フィールド全景"
          width={480}
          height={270}
          style={{ display: "block", margin: "0 auto" }} // 中央寄せしたい場合
        />

        <PointBanner>
          ギミックによる割合ダメージと強力な攻撃を受けきるための回復が重要！
        </PointBanner>

        <SectionTitle icon="psychology_alt">ギミックの理解と回復が重要</SectionTitle>
        <div>
          チャレンジモードではギミックをクリアすることで与えられる割合ダメージと恩恵の回復が重要になる。<br />
          ボスには
          <span className="text-red-700 font-bold">強力なダメージ軽減効果</span>
          が付与されており、ギミックをクリアしないとダメージをほとんど与えられない。<br />
          3つのギミックを理解して、クリアを目指そう！
        </div>

        <SectionTitle icon="error">キーワード「弱点攻撃」について</SectionTitle>
        <div>
          ギミックの説明では「弱点攻撃」というワードが出てくるが、これは
          <span className="font-bold text-emerald-700">敵が攻撃した後に出現する扇状の範囲内から攻撃を当てること</span>
          を指している。決して地馳の弱点属性で攻撃するという意味ではないので注意しよう！<br />
          <CaptionedImage
            src="/raid/TrafficControl_1.PNG"
            alt="弱点攻撃ギミック"
            caption="「弱点攻撃」の攻撃範囲"
          />
          弱点攻撃成功時には敵に割合ダメージを与えられるので、必ず成功させるようにしよう！<br />
          なお、弱点攻撃とギミックによる割合ダメージだけで地馳を倒すのは難しいので、強攻の火力とアストール剛毅・イカロス恩恵やフィオナの斬殺も込みで削り切ろう。<br /><br />
          また、弱点攻撃の範囲は尻尾を使った攻撃の場合は地馳の後ろに出現、それ以外は地馳の前方に出現する。<br />
          敵の攻撃をよく見て弱点が出現する位置を予測して動こう！
        </div>

        {/* ギミック①：アイコン変更 */}
        <SectionTitle icon="speed">ギミック①：超速運転</SectionTitle>
        <div>
          地馳のトランスミッションギアが最大になると広範囲の大ダメージが発生する。<br />
          <CaptionedImage
            src="/raid/TrafficControl_2.PNG"
            alt="超速運転：大ダメージ"
            caption="速斬旋風によるダメージは致命傷に！"
          />
          トランスミッションギアは地馳の攻撃がヒットする度に増加する。<br />
          弱点攻撃を成功させることでギアをリセットできるが、意識して攻撃を避けないと弱点攻撃の前にギアが最大になるので注意しよう！
          <CaptionedImage
            src="/raid/TrafficControl_3.PNG"
            alt="超速運転：トランスミッションギア"
            caption="トランスミッションギアは敵の攻撃がヒットする度に増加するぞ！"
          />
        </div>

        {/* ギミック②：アイコン変更 */}
        <SectionTitle icon="engineering">ギミック②：違法改造バトル</SectionTitle>
        <div>
          地馳は3つの改造スタックを有している。<br />
          弱点攻撃を成功させることでこのスタックが1つ減少し、スタックが失われるたびに地馳にデバフが付与される。
        </div>
        <CaptionedImage
          src="/raid/TrafficControl_4.PNG"
          alt="違法改造バトル：改造スタック"
          caption="改造スタックは3つ"
        />
        <div>
          地馳に付与されるデバフはスタックごとに決まっており、<br />
          1つ目のスタック減少で地馳に対して減速効果・幻想タイムが有効になる。<br />
          2つ目のスタック減少で地馳に対して与える最終ダメージが増加。<br />
          3つ目のスタック減少で修復状態の持続時間が短くなる。<br /><br />
          2つ目の最終ダメージ増加が無いと強攻は殆どダメージを与えられないので、弱点攻撃は欠かさず成功させよう！
        </div>
        <PointBanner>
          地馳の行動を妨害するとギミックによるダメージチャンスが減少するので、減速効果・幻想タイムは極力避けるようにしよう！
        </PointBanner>

        {/* ギミック③：アイコン変更 */}
        <SectionTitle icon="build_circle">ギミック③：臨時メンテ</SectionTitle>
        <div>
          改造スタックの残りが1つまたは0になった時、地馳はフィールド中央でスタックを修復しようとする。<br />
          この時、フィールド端から地馳の分身が出現し、中央の本体に向かって進んでくる。<br />
          この分身が本体に到達すると地馳は改造スタックとHPを回復してしまう。<br />
          <CaptionedImage
            src="/raid/TrafficControl_5.PNG"
            alt="臨時メンテ：分身"
            caption="分身は本体を回復するために進行する"
          />
          分身は攻撃を当てることで進行を妨害でき、一定時間経過で臨時メンテのギミック終了と共に分身も消滅する。<br />
          さらに、改造スタックが0の状態で臨時メンテによる修復を防ぐと地馳は自身のHPを消費してスタックを回復する。<br />
          基本的にはこのギミックによるHP消費と弱点攻撃によって地馳のHPを削っていくことになる。
          <CaptionedImage
            src="/raid/TrafficControl_6.PNG"
            alt="臨時メンテ：スタック回復"
            caption="スタック0で修復を防ぐとHP減少！"
          />
        </div>

        <SectionTitle icon="local_fire_department">大事なのは敵の行動を妨害しないこと！</SectionTitle>
        <div>
          地馳にダメージを与えるには弱点攻撃を成功させる必要があるが、地馳の行動を減速効果・幻想タイムで妨害すると弱点攻撃のチャンスが減少してしまう。
          そのため、敵の行動は絶対に妨害しないようにしよう！
          また、地馳は定期的にフィールド中央に戻ろうとするが、プレイヤーが目の前にいるだけで地馳は中央に戻れなくなってしまう。<br />
          地馳が動けなくなるとその分だけ弱点攻撃のチャンスが減ってしまうので注意しよう！
          <blockquote className="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">見た目に対してフィジカルが弱すぎる<a href="https://twitter.com/hashtag/%E5%B9%BB%E5%A1%94?src=hash&amp;ref_src=twsrc%5Etfw">#幻塔</a> <a href="https://twitter.com/hashtag/ToF?src=hash&amp;ref_src=twsrc%5Etfw">#ToF</a> <a href="https://t.co/LvCW4csG4m">pic.twitter.com/LvCW4csG4m</a></p>&mdash; hiro_Shacho (@hiro28298793) <a href="https://twitter.com/hiro28298793/status/1923418329542283470?ref_src=twsrc%5Etfw">May 16, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
        <PointBanner>
          フィオナのボルテックスのような引き寄せ効果を当てると中央に戻ろうとする行動をキャンセルできるぞ！
        </PointBanner>

        <SectionTitle icon="bug_report">弱点攻撃はダメージが発生しないことも？（おそらくバグ）</SectionTitle>
        <div>
          弱点攻撃をする際、一部の攻撃ではダメージが入らないことがある。<br />
          強攻でHPを削れるチームでも弱点攻撃のダメージは大事なので、出来る限りバグの発生しない攻撃を選んで弱点攻撃を成功させよう。<br />
          通常攻撃・パッシブ発動のダメージ以外はバグりやすいので使用を控えよう。
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          基本は火力役の強攻が1,2人、剛毅が1人、残りは全員恩恵にするのが良い。<br />
          弱点攻撃を必ず成功させることが重要なので、敵の弱点が出る位置とタイミングを覚えることと、敵の動きを妨害しないことを意識しよう！<br />
          敵の攻撃は火力が高めなので、恩恵は攻撃の度に回復ができるよう準備しておこう。<br />
        </div>

        {/* 広告挿入 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", width: 320, minWidth: 200, maxWidth: '100%' }}>
            <AdSenseContentUnit />
          </div>
        </div>

        <SectionTitle icon="movie">解説動画</SectionTitle>
        <div>
            ※動画内では弱点攻撃のパターンを4つだけと言っていますが、実際には6パターンあるので注意<br />
            動画の攻撃に加えて、前方への炎攻撃と前方へのV字攻撃がある。炎攻撃は威力が高く、V字攻撃は弱点の範囲が他と異なるので注意が必要。
        </div>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/wJj-6d6EpQE"
            title="交通管制 攻略解説動画"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded shadow border border-emerald-200"
            style={{ maxWidth: "100%", aspectRatio: "16/9" }}
          />
        </div>

        {/* ▼追加：チャレンジソロ攻略項目 */}
        <SectionTitle icon="sports_martial_arts">チャレンジでもソロ攻略可能</SectionTitle>
        <div>
          <span className="font-bold text-emerald-700">チャレンジ</span>でもイカロス恩恵または異能ノーラを使えばソロ攻略も可能です。<br /><br />
          <span className="font-bold text-orange-700">ポイント</span><br />
          ■弱点攻撃の6パターンを覚える<br />
          ■敵が中央に戻ろうとする動きはフィオナのボルテックスでキャンセルする<br />
          ■減速効果・幻想タイムは使わない<br /><br />
          実際のソロクリア動画も参考にしてください。
        </div>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/hKKuzr7g2VM"
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

ScorchingNightmarePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};