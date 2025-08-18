import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit";

// セクションタイトル
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

export default function GluttonousFeastPage() {
  return (
    <>
      <Head>
        <title>暴食の饗宴 討伐作戦 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「暴食の饗宴」の攻略ポイント、ギミック解説、チーム編成例などを紹介。" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">restaurant</span>
          暴食の饗宴 討伐作戦 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/GluttonousFeast.PNG"
            alt="暴食の饗宴フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <PointBanner>
          ボスの回復を防ぎながらギミックと強攻火力で削り切ろう！
        </PointBanner>
        <div className="mb-6">
          饕餮はギミック処理に失敗すると体力をどんどん回復していく。<br />
          キノコ拾いのギミックさえ処理できれば異能ノーラや最適編成の強攻火力でダメージは十分足りているので、しっかりキノコ拾いをしよう！
        </div>

        <SectionTitle icon="nature">ギミック①：貪食のキノコ（キノコ拾い）</SectionTitle>
        <div>
          戦闘中、フィールドのランダムな位置に赤色のキノコが生えてくる。<br />
          このキノコに触れるとキノコを採取して自身のHPと灰蝕値を回復できる。<br />
          キノコは放置していると回復効果が上昇していくが、一定時間経過で青白く発光したキノコに変化する。<br />
          このキノコを放置していると饕餮はキノコを吸収して自身のHPを回復してしまう。<br />
          そのため、フィールドのキノコを定期的に採取して饕餮が回復しないようにする必要がある。
        </div>
        <CaptionedImage
          src="/raid/GluttonousFeast_1.PNG"
          alt="キノコギミック"
          caption="赤いキノコが時間経過で青白く発光する"
        />
        <div className="mb-4">
          余談だが赤いキノコに饕餮が触れるとキノコは消滅するが、饕餮のHPは回復しないので気にする必要はない。
        </div>

        <SectionTitle icon="link">ギミック②：虚鎖</SectionTitle>
        <div>
          饕餮は定期的にプレイヤー2名にリンクを付与してくる。<br />
          このリンクは一定時間経過で饕餮のHPを回復する効果がある。<br />
          リンクはプレイヤーと饕餮の距離が離れることで切ることが可能で、リンクを切った際には饕餮にダメージが入る。
        </div>
        <CaptionedImage
          src="/raid/GluttonousFeast_2.PNG"
          alt="虚鎖ギミック"
          caption="リンクが付いたプレイヤーは可能ならリンクを切るようにしよう"
        />

        <SectionTitle icon="warning">ギミック③：吞噬</SectionTitle>
        <div>
          饕餮はランダムなプレイヤー1名を指名し、指名されたプレイヤーの足元には予告の範囲円が現れる。<br />
          一定時間経過でこの範囲円上に攻撃が発生し、この攻撃に当たったプレイヤーの数だけ饕餮はHPを回復する。<br />
          固まって饕餮を攻撃している中で全員がこの攻撃に当たると一気に饕餮のHPが回復してしまうので、指名されたプレイヤーは攻撃が発生するまで誰もいないところでキノコ拾いをしていよう。
        </div>
        <CaptionedImage
          src="/raid/GluttonousFeast_3.PNG"
          alt="吞噬ギミック"
          caption="指名されると足元に範囲円が表示される"
        />

        <SectionTitle icon="celebration">ギミック④：暴食と盛宴</SectionTitle>
        <div>
          饕餮のシールドをブレイクすると、プレイヤー4名の頭上に青色のキノコマークが出現し、残りのプレイヤーの頭上に赤色のキノコマークが出現する。<br />
          同時に饕餮は自身の前方に扇形の範囲を表示し、一定時間後に範囲内にいるプレイヤーのキノコマークを捕食する。<br />
          この時、青色のキノコマークを捕食すると饕餮は自身のHPを回復し、赤色のキノコマークを捕食すると饕餮がダメージを受ける。<br />
          そのため、赤いキノコマークが出た人は饕餮の前に、青いキノコマークが出た人は饕餮の後ろに移動するようにしよう！
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-2">
          <CaptionedImage
            src="/raid/GluttonousFeast_4_1.PNG"
            alt="扇型の範囲"
            caption="饕餮の前に捕食の範囲が表示される"
          />
          <CaptionedImage
            src="/raid/GluttonousFeast_4_2.PNG"
            alt="青キノコマーク"
            caption="赤なら饕餮の前、青なら背後に移動しよう"
          />
        </div>
        <div>
          捕食後、青いキノコマークを持っている人にバフが入り、赤いキノコマークを持っている人にはダメージが入る。<br />
          赤いキノコマークを全て饕餮が捕食すると被ダメージUPのデバフを付与できるぞ！
        </div>

        <SectionTitle icon="shield">シールド時の引き寄せに注意！</SectionTitle>
        <div>
          饕餮はシールドを貼っている間、周囲のプレイヤーを引き寄せようとしてくる。<br />
          この間は回避以外の移動方法ではほとんど外側に逃げることは出来ないので、大人しく饕餮のシールドブレイクに専念しよう。<br />
          同時にリンクを付与されることがあるが、下手にリンクを切るために逃げるよりシールドブレイクに貢献した方が討伐速度は早くなる。<br />
          また、シールド中は周囲から半透明なドーム状の壁が迫ってきて、この壁に触れると大ダメージを受ける。<br />
          1回壁を通過しても再度壁に触れると再び大ダメージを受けるので、引き寄せ効果で連続して壁に触れないように逃げずに饕餮のシールドを割ろう！
        </div>

        <SectionTitle icon="healing">饕餮は回復阻害を受けない</SectionTitle>
        <div>
          饕餮には討伐の効果で時空の裂け目やアスラーダ連携等の回復阻害無効が付与されている。<br />
          そのため回復を防ぐにはギミックをこなす必要があるので注意しよう。
        </div>
        <CaptionedImage
          src="/raid/GluttonousFeast_5.PNG"
          alt="回復阻害無効"
          caption="回復阻害は無効になっている"
        />

        {/* 広告挿入 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", width: 320, minWidth: 200, maxWidth: '100%' }}>
            <AdSenseContentUnit />
          </div>
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          特に特定のロールがいないとこなせないギミックは無いので、強攻4人恩恵4人などのパーティで問題ない。<br />
          過去の討伐ということもあって敵のHPは比較的低めなので、最新の最適編成が揃った強攻なら余裕をもって削り切ることが可能だろう。<br />
          キノコによる回復は防ぐに越したことは無いので、恩恵の人は回復・バフを撒いたら一旦キノコ拾いに走り回ると討伐時間の短縮につながる。<br />
          なお、異能ノーラへの耐性が無いタイプの討伐なので、強攻の火力に困った時は異能ノーラで殴ればOK。(チャレンジでも異能ノーラで十分削り切れる)
        </div>

        <SectionTitle icon="person">ソロ攻略も可能</SectionTitle>
        <div className="mb-2">
          異能ノーラが登場したことでソロ攻略も可能になった。
        </div>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/VWJxC9XCBvo"
            title="暴食の饗宴 ソロ攻略動画"
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

GluttonousFeastPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};