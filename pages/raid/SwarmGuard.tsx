import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-lime-400/60 to-lime-100 border-l-8 border-lime-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-lime-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-lime-900">{children}</span>
    </div>
  );
}

// 画像拡大モーダル
function ImageModal({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow text-gray-700 text-lg z-10"
          aria-label="閉じる"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            background: "#fff"
          }}
        />
      </div>
    </div>
  );
}

// キャプション付き画像（拡大可能かどうかを選択可能）
function CaptionedImage({
  src,
  alt,
  caption,
  expandable = false,
}: {
  src: string;
  alt: string;
  caption: string;
  expandable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full flex flex-col items-center my-3">
        <div
          className={
            "rounded-lg shadow border-2 border-lime-300 overflow-hidden " +
            (expandable
              ? "cursor-zoom-in transition hover:ring-2 hover:ring-lime-500"
              : "")
          }
          onClick={expandable ? () => setOpen(true) : undefined}
          title={expandable ? "クリックで拡大" : undefined}
          style={{ width: "100%", maxWidth: 640 }}
        >
          <Image src={src} alt={alt} width={640} height={360} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="bg-lime-50 px-4 py-1 text-xs text-lime-800 border-t border-lime-200 w-full text-center">{caption}</div>
      </div>
      {expandable && (
        <ImageModal src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default function SwarmGuardPage() {
  // 動画は拡大不要のため通常埋め込み
  function CaptionedVideo({ src, caption }: { src: string, caption: string }) {
    return (
      <div className="w-full flex flex-col items-center my-3">
        <video controls width={480} height={270} className="rounded shadow border-2 border-lime-300 bg-black">
          <source src={src} type="video/mp4" />
          お使いのブラウザでは動画タグがサポートされていません。
        </video>
        <div className="bg-lime-50 px-4 py-1 text-xs text-lime-800 border-t border-lime-200 w-full text-center">{caption}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>ガードバグ陣 討伐作戦 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「ガードバグ陣」の攻略ポイント、ギミック解説、チーム編成例などを紹介。" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-lime-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-lime-500">bug_report</span>
          ガードバグ陣 討伐作戦 攻略
        </h1>

        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/SwarmGuard.PNG"
            alt="ガードバグ陣フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="psychology_alt">ギミックダメージを逃さず、強攻火力で削り切ろう</SectionTitle>
        <div>
          今回の討伐は一部武器の固定ダメージとギミックによるダメージを全て与えた上で26～30%のHPを削る必要がある。<br />
          女王虫は強力なダメージ軽減効果を持っているため、火力UPにつながるギミックを把握して<strong>強攻</strong>をできる限り強化しよう！
        </div>

        <SectionTitle icon="shield">ボスの無敵状態に注意！</SectionTitle>
        <div>
          女王虫はHPが一定以下になるとギミック④：カマグモ召喚を行う。<br />
          この際、HPが70%、40%のタイミングで無敵状態になって攻撃をしてくる。<br />
          この無敵状態の間に召喚されたカマグモを倒すとギミックによるダメージが入らない。<br />
          そのため、HP70%、40%のタイミングではカマグモを倒さずに回避に専念しよう。<br />
          <span className="font-bold text-red-700">
            特に、強攻の各種裏ダメージや恩恵のグレイフォックス3凸効果はカマグモを倒しがちなので、女王虫のHPに常に気を配りつつ、召喚&無敵のタイミングでフィールドの端っこへ避難するようにしよう。
          </span>
          <CaptionedImage
            src="/raid/SwarmGuard_1.PNG"
            alt="無敵状態解説"
            caption="4ゲージ目の半分と2ゲージ目に入ったタイミングで無敵に"
          />
        </div>

        <SectionTitle icon="psychology_alt">ギミック①：混乱フェロモン</SectionTitle>
        <div>
          一定間隔でプレイヤーが指定され、その足元に範囲円が表示される。数秒するとそのプレイヤーを中心にダメージエリアが生成される。<br />
          このダメージエリア内にいると毎秒ダメージを受け、一定時間このダメージエリア内にいると混乱状態になり、操作反転と継続ダメージのデバフを付与される。<br />
          このデバフは3つ目のギミック「虫卵爆発」の卵を踏むことで解除できる。<br />
          指定されたプレイヤーの足元には赤い範囲円が表示されるが、フィールドの色も相まって非常に見づらいため注意しよう。
          <CaptionedImage
            src="/raid/SwarmGuard_2.PNG"
            alt="混乱フェロモン解説"
            caption="戦闘中は意識して見ないと気づけないレベルでフィールドと同化しているぞ！"
            expandable={true}
          />
        </div>

        <SectionTitle icon="sports_mma">ギミック②：大打撃止まらず</SectionTitle>
        <div>
          女王虫からの攻撃を受けると被ダメージが増加するデバフを受ける。<br />
          このデバフは蓄積する上に、攻撃を受けるたびに効果時間がリセットされるので、女王の攻撃は剛毅が受けるようにしよう！<br />
          このデバフは召喚されるカマグモを倒すと1スタック、ギミック③で出現する卵を踏むことで全スタック解除できる。<br />
          カマグモの撃破と卵を踏むのは<strong>強攻</strong>の役割になるので、剛毅と恩恵はとにかくHPシールドと回復を切らさないようにしよう！
          <CaptionedImage
            src="/raid/SwarmGuard_3.PNG"
            alt="大打撃止まらず解説"
            caption="デバフを受けるとプレイヤーにモヤがつく（バフ欄にデバフは表示されないので注意！）"
          />
        </div>

        <SectionTitle icon="egg_alt">ギミック③：虫卵爆発</SectionTitle>
        <div>
          女王虫はHPが70%、40%以下になるとフィールドに卵を生成する。<br />
          この卵を踏むとギミック①とギミック②で受けたデバフをすべて解除できる。<br />
          加えて卵の周囲の味方にダメージUPのバフが付与されるが、同時に女王虫が狂暴化する。<br />
          卵によるダメージUPはある程度広範囲の味方に付与されるが、基本的には<strong>強攻</strong>が踏むようにしたい。<br />
          なお、卵生成のタイミングでフィールドに卵が残っていると卵の周囲に大ダメージが発生する。<br />
          そのため、強攻は卵更新の前に全ての卵を潰すようにしよう.
          <CaptionedVideo
            src="/raid/SwarmGuard_4.mp4"
            caption="卵は触れるだけで潰れるので、剛毅・恩恵は強攻が近くにいない時に踏まないよう気を付けよう！"
          />
        </div>

        <SectionTitle icon="crisis_alert">ギミック④：カマグモ召喚</SectionTitle>
        <div>
          女王虫はHPが一定まで減少するとカマグモと異種カマグモを召喚する。<br />
          カマグモが6体、異種カマグモが4体召喚され、召喚されたカマグモたちを倒すと女王虫にダメージが入りHPの10%を削れる。<br />
          異種カマグモを全て倒すと女王虫がその場で膝をつき、弱体状態になるのでこのタイミングでダメージを与えよう。<br />
          カマグモを召喚するタイミングは戦闘開始時と女王虫の残りHPが85%、70%、55%、40%になった時。<br />
          1回のギミックで10%削れるので、完璧にこなせばギミックだけで50%は削れる。<br />
          アストール剛毅かイカロス恩恵とフィオナ斬殺を合わせれば70～74%を固定ダメージで削れることになる。<br />
          なお、異種カマグモは女王虫の周囲に4体、カマグモは外周に6体湧く。<br />
          普通のカマグモは卵と被る位置に湧き、こちらの攻撃が当たるまで基本動かないため、強攻はまず外周のカマグモを倒しに行こう。
          <CaptionedVideo
            src="/raid/SwarmGuard_5.mp4"
            caption="膝をついている状態が弱体状態。時間は短いので強攻は火力を出せるタイミングで異種カマグモを倒そう。"
          />
          {/* ここから追加 */}
          <div className="mt-2">
            <strong>【追記】</strong><br />カマグモたちに与えられるダメージは100で固定になっているため、実質的にヒット数で倒すギミックとなっている。<br />
            アスラーダ討伐の分身のような時空の裂け目でダメージが与えられないバグはないが、カマグモを倒した時に貰えるバフが<strong>強攻</strong>ではなくヒット数の多いフィオナを持った恩恵に持ってかれる可能性が高いのは注意。
          </div>
          <CaptionedImage
            src="/raid/SwarmGuard_5.PNG"
            alt="カマグモへのダメージは100固定"
            caption="電磁ブレードでも最新武器でもダメージは100で固定"
          />
        </div>

        <SectionTitle icon="warning">HP85%の召喚スキップに注意！</SectionTitle>
        <div>
          女王虫が弱体状態になるのと同時にHPが召喚ラインまで減少するとカマグモが召喚されないことがある。<br />
          特にアストール剛毅/イカロス恩恵でHPが大きく削れる最初のタイミングでは異種カマグモ撃破と同時に85%のラインを超えやすい。<br />
          召喚タイミングと被ると強攻の火力で削らないといけないHPが10%増えることになるため、<br />
          極力最初のカマグモは外周にいる普通のカマグモを倒すようにしよう。<br />
          なお、弱体状態になった後にHPが一定以下になったり、女王虫が無敵状態になるタイミングでの召喚はスキップされない模様。
          <CaptionedVideo
            src="/raid/SwarmGuard_6.mp4"
            caption="弱体状態になる瞬間とカマグモ召喚が被ると召喚がスキップされることがある"
          />
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          基本的な強攻1～3人、剛毅1人、その他は恩恵の組合せを推奨。<br />
          出来る限り固定ダメージで削りたいので、剛毅は完凸アストール、恩恵は共感覚完凸フィオナを持っているのが理想。<br />
          特に剛毅のアストールは敵の数が影響するバフを最大限活かせるので完凸なら積極的に採用したい。<br />
          強攻は序盤の内はカマグモを倒しつつ周囲の卵を踏んでバフを獲得しよう。<br />
          剛毅は女王虫の攻撃が痛いので、極力攻撃が味方に向かないように引き付けよう。<br />
          女王虫は定期的に中央にワープするので、時空の裂け目などが空ぶらないようになるべくフィールド中央に固定したい。<br />
          恩恵は基本は回復とバフに専念すれば良いが、卵を踏んだりカマグモを倒さないように注意。<br />
          特にグレイフォックスの3凸効果やフィオナ共感覚1凸の火力でカマグモを倒してしまうことが多いので、バフ・回復・連携エナジー獲得以外の不要な動きはしないようにしよう。
        </div>

        <SectionTitle icon="sync_alt">理想(?)の流れ</SectionTitle>
        <div>
          <ol className="list-decimal ml-6 space-y-2">
            <li>アストール剛毅またはイカロス恩恵が割合ダメージを与える。</li>
            <li>普通のカマグモを倒してギミックダメージで女王のHPを85%まで削る。（異種カマグモを全て倒さないこと！）</li>
            <li>カマグモが召喚されるので、卵を潰しつつ普通のカマグモを倒した後、異種カマグモを倒して弱体状態になった女王のHPを70%まで削る。</li>
            <li>女王が卵リセット＆カマグモ召喚と同時に無敵状態になるので全員フィールドの端っこで逃げ回る。</li>
            <li>女王の無敵時間が終わったらカマグモを全て倒して弱体状態の女王のHPを55%まで削る。（女王の無敵～弱体状態になるまでの間に卵を潰してダメージUPのバフを受けておこう）</li>
            <li>女王がカマグモを召喚するのでカマグモを倒して弱体状態になった女王のHPを40%まで削る。</li>
            <li>女王が卵リセット＆カマグモ召喚と同時に無敵状態になるので全員フィールドの端っこで逃げ回る。</li>
            <li>女王の無敵時間が終わったら卵を潰しつつカマグモを全て倒して弱体状態の女王のHPを削り、その後も攻撃を続けてフィオナの斬殺ラインまでHPを削る。</li>
            <li>フィオナ斬殺でクリア！（共感覚有りなら14%、共感覚無しなら12%）</li>
          </ol>
        </div>

        <SectionTitle icon="movie">解説動画</SectionTitle>
        <div>
          準備中
        </div>
      </div>
    </>
  );
}

SwarmGuardPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};