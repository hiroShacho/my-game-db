import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import { AdSenseSidebarUnit } from "@/components/AdSenseContentUnit";

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
        <title>燃え上がるナイトメア討伐作戦 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「燃え上がるナイトメア」の攻略ポイント、ギミック解説、チーム編成例などを紹介。" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">local_fire_department</span>
          燃え上がるナイトメア 討伐作戦 攻略
        </h1>

        {/* 画像だけ表示（枠・キャプションなし、中央寄せ） */}
        <Image
          src="/raid/ScorchingNightmare.PNG"
          alt="燃え上がるナイトメアフィールド全景"
          width={480}
          height={270}
          style={{ display: "block", margin: "0 auto" }}
        />

        <PointBanner>
          ギミックを理解して正しく対処しないとダメージが入らない！回復役も重要！
        </PointBanner>

        <SectionTitle icon="psychology_alt">ギミックの理解と回復が重要</SectionTitle>
        <div>
          チャレンジモードではギミックをクリアすることで与えられるダメージと恩恵の回復が重要になる。<br />
          また、アスラーダには
          <span className="text-red-700 font-bold">9スタックのダメージ軽減効果（1つにつき10%軽減）</span>
          が付与されており、ギミックをクリアしないとダメージをほとんど与えられない。<br />
          4つのギミックを理解して、クリアを目指そう！
        </div>

        <SectionTitle icon="error">ギミックの共通点</SectionTitle>
        <div>
          ギミックによって受けるダメージは、<br />
          <span className="font-bold text-emerald-700">■HPシールドを無視してHPを減らす（HPシールドがあっても死亡する）<br />
          ■死亡回避があっても死亡する<br />
          ■ギミックごとのダメージが重複する（複数のギミックでダメージを受けると一瞬でHPが消滅する）<br /></span>
          という超極悪性能になっている。<br /><br />
          アスラーダ本体からの攻撃にはHPシールドと死亡回避が有効なので完全に無駄という訳では無いが、エスター等のHPシールドを貼る恩恵よりは味方の回復に特化した恩恵を採用したい。
        </div>

        <SectionTitle icon="whatshot">ギミック①：追命の火</SectionTitle>
        <Step num={1}>プレイヤーの頭上に刀が出現</Step>
        <Step num={2}>一定時間後に刀が落下し、地面に刺さって炎範囲が発生</Step>
        <Step num={3}>炎範囲にいると毎秒最大HP×15%のダメージ＋燃焼スタックが付与</Step>
        <CaptionedImage
          src="/raid/ScorchingNightmare_1.PNG"
          alt="追命の火ギミック"
          caption="「燃焼」スタック"
        />
        <div>
          この「燃焼」スタックが10スタックに達するとそのプレイヤーを中心に炎の波が発生し、この波に触れると20秒間、毎秒最大HP×15%のダメージと30%の減速効果を受ける。（スタックが溜まったプレイヤーは確定でダメージと減速を受ける）<br />
          炎の波はジャンプすることで回避できるが、刀の周囲の炎範囲は空中にいてもダメージを受けるので範囲上にとどまらないようにしよう。
        </div>
        <Warning>
          刀の炎範囲は時々表示されないことがある。この場合もダメージ判定はあるので、常に周囲に刀が刺さっていないか注意深く見るように！
        </Warning>

        <SectionTitle icon="person_play">ギミック②：分身</SectionTitle>
        <div>
          アスラーダは分身を6体召喚して、一部のプレイヤーの頭上に炎マークを付与する。<br />
          この炎マークが付与されたプレイヤーは分身に一定回数攻撃を当てることで分身を倒せる。（分身は炎マークがついてないプレイヤーからの攻撃は一切受けない）
        </div>
        <CaptionedImage
          src="/raid/ScorchingNightmare_2.PNG"
          alt="分身ギミック"
          caption="頭上に炎マーク"
        />
        <div>
          全ての分身を倒すとアスラーダに最大HP×5%のダメージを与え、ダメージ軽減効果を1つ解除できる。<br />
          一定時間内に分身を撃破できないとアスラーダはHPを回復し、分身の居た位置に刀が刺さって「ギミック①：追命の火」と同じ炎の範囲が出現する。
        </div>
        {/* ▼ここに強調バナー（PointBanner）を追加 */}
        <PointBanner>
          8分40秒ごろに最初の分身ギミックが発動し、それ以降1分ごとにギミックが発動する。
        </PointBanner>

        <SectionTitle icon="waves">ギミック③：刀陣の振動</SectionTitle>
        <div>
          フィールドのランダムな位置に刀が出現、刀の周囲には大きな範囲の炎が出現する。<br />
          この炎は「ギミック①：追命の火」の炎と同じ性質のダメージ範囲なので必ず避けよう。<br />
          このギミックだけは完全に出現位置がランダムなのでこちらで一切コントロールできない。<br />
          分身の居る位置に出現したり、この炎の中でアスラーダが留まったりと非常に厄介。
        </div>

        <SectionTitle icon="local_fire_department">ギミック④：たき火の栗拾い</SectionTitle>
        <div>
          アスラーダのHPが一定まで減少すると1人のプレイヤーの頭上に2本のクロスした刀が表示される。
        </div>
        <CaptionedImage
          src="/raid/ScorchingNightmare_3.PNG"
          alt="たき火の栗拾いギミック"
          caption="クロスした刀が出た人がギミック担当！"
        />
        <div>
          この刀が表示されたプレイヤーは「燃焼」のスタックを10スタック貯めてからアスラーダに触れる必要がある。<br />
          「燃焼」スタックは「ギミック①：追命の火」などの炎の範囲に入ってダメージを受けながら溜めなければならず、
          10スタック溜まると炎の波が出て継続的にHPが減少するため全力で回復する必要がある。<br />
          炎の波出現後もアスラーダに触れなければギミック解除にならず、一定時間が経過すると大ダメージを受けて即死するので敵の位置に注意しよう。<br />
          ギミックをこなしてアスラーダに触れると大ダメージを与えられるので、必ずギミックをこなそう。<br />
          注意点としてギミックが終わるまでアスラーダは無敵なので、ブレヴィのようなダメージを与えることで回復できるキャラの回復効果は受けられない。
        </div>

        <SectionTitle icon="bug_report">特殊な挙動について（バグかも？）</SectionTitle>
        <div>
          「ギミック②：分身」において、完凸したアルケーの「時空の裂け目」を使うと、裂け目の中にいる分身にダメージを与えられなくなる。<br />
          さらに、分身を倒した後でアスラーダに入る割合ダメージも裂け目の中だと無効化されてしまう。<br />
          恐らく、分身へのダメージを回復判定にすることで一定回数のヒットで体力を減らせるようにしているのだと思われる。<br />
          アスラーダへのダメージも回復判定になっているっぽいのは謎だが、他のギミックで与えるダメージは裂け目で無効化されないので、分身へのダメージを回復判定にしたついでにそうなったのだと思われる。
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          基本は火力役の強攻が1,2人、剛毅が1人（攻撃自体はそこまで苛烈ではないので強攻が受けても大丈夫）、残りは全員恩恵にするのが良い。<br />
          最初の内は強攻でもダメージをあまり与えられないので、ギミックで敵の体力と耐性を削りつつ耐えることに専念しよう。<br />
          炎の波が発生するとチーム全員が倒れる危険性が高まるので、不用意に炎の範囲には近づかず常に周囲の状況に注意しよう。<br />
          また、恩恵はHPシールドを貼るより回復能力が高いキャラを採用しよう！
        </div>

        {/* 広告挿入 */}
        {process.env.NODE_ENV === "production" && (
          <div className="flex justify-center my-4">
            <AdSenseContentUnit />
          </div>
        )}

        <SectionTitle icon="movie">解説動画</SectionTitle>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/7bvcLmT_NWM"
            title="燃え上がるナイトメア 攻略解説動画"
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
          <span className="font-bold text-emerald-700">チャレンジ</span>でも恩恵共鳴で異能ノーラを使えばソロ攻略も可能です。<br /><br />
          <span className="font-bold text-orange-700">ポイント</span><br />
          ■ギミックの正確な処理と回復タイミングの把握が重要<br />
          ■たき火の栗拾いギミックでは回復手段を惜しみなく使おう<br />
          ■炎範囲のダメージやスタックに気をつけ、無理せずギミックごとに立ち回る<br /><br />
          実際のソロクリア動画も参考にしてください。
        </div>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-xfHQO-Jd7k"
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