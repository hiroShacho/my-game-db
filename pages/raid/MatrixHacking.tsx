import { ReactElement, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit";

// セクションタイトル
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-sky-400/60 to-cyan-100 border-l-8 border-sky-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-sky-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-sky-900">{children}</span>
    </div>
  );
}

// ギミック項目名 強調用
function GimmickLabel({
  children,
  color = "sky",
}: {
  children: React.ReactNode;
  color?: "sky" | "cyan";
}) {
  const colorClass =
    color === "cyan"
      ? "bg-cyan-100 border-cyan-400 text-cyan-800"
      : "bg-sky-100 border-sky-400 text-sky-800";
  return (
    <div
      className={`inline-block ${colorClass} rounded px-3 py-1 mb-2 font-bold text-lg border-2 shadow-sm`}
      style={{ letterSpacing: "0.02em" }}
    >
      {children}
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
            "rounded-lg shadow border-2 border-sky-300 overflow-hidden " +
            (expandable
              ? "cursor-zoom-in transition hover:ring-2 hover:ring-sky-500"
              : "")
          }
          onClick={expandable ? () => setOpen(true) : undefined}
          title={expandable ? "クリックで拡大" : undefined}
          style={{ width: "100%", maxWidth: 640 }}
        >
          <Image src={src} alt={alt} width={640} height={360} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="bg-sky-50 px-4 py-1 text-xs text-sky-800 border-t border-sky-200 w-full text-center">{caption}</div>
      </div>
      {expandable && (
        <ImageModal src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default function MatrixHackingPage() {
  return (
    <>
      <Head>
        <title>マトリックスハッキング 討伐作戦 攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の討伐作戦「マトリックスハッキング」の攻略ポイント、ギミック解説、チーム編成例などを紹介。" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-sky-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500">memory</span>
          マトリックスハッキング 討伐作戦 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/MatrixHacking.PNG"
            alt="マトリックスハッキング フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="warning">各形態の攻撃とギミックによる大ダメージに気を付けよう！</SectionTitle>
        <div>
          スフィアには武装を展開し両手の武器で戦う<strong>人形態</strong>と、武装を収納して丸まり強力な回転攻撃で戦う<strong>球形態</strong>の2形態が存在する。<br />
          スフィアの形態は特定のギミック後に変更され、<span className="font-bold text-sky-600">人形態</span>の攻撃はそこまで強くないが、<span className="font-bold text-cyan-600">球形態</span>の攻撃は剛毅であっても即死しかねないダメージを与えてくる。<br />
          恐ろしいことに球形態の攻撃はグレイフォックスの免除特権を貫通してくることがあるので、恩恵がいるからと慢心せず回避に専念しよう！<br />
          <span className="font-bold">形態ごとにギミックも分かれているのでしっかり把握しておこう。</span>
        </div>

        <SectionTitle icon="bolt">共通ギミック：電流調整</SectionTitle>
        <div>
          戦闘エリアに入るとプレイヤーに<strong>プラス</strong>か<strong>マイナス</strong>の電荷が付与される。<br />
          電荷はプレイヤーだけでなく、スフィアの頭上にも表示されている。プレイヤーの電荷は固定だがスフィアの電荷は一定時間ごとに変化し、一部の攻撃はスフィアと反対の電荷を持つプレイヤーに大ダメージを与えてくる。<br />
          恩恵の回復能力が高ければほとんどのギミックを無視可能だが、ギミックをクリアすることで敵にダメージを与えて弱体化可能なので全てこなしていくのが一番。
        </div>
        <CaptionedImage
          src="/raid/MatrixHacking_1.PNG"
          alt="電荷ギミック"
          caption="プレイヤーの胴体部分とボスの頭上にそれぞれの電荷が表示されている"
          expandable={true}
        />

        {/* 人形態セクション */}
        <SectionTitle icon="person">人形態時のギミック</SectionTitle>

        {/* ギミック① */}
        <div className="border-l-4 border-sky-400 pl-4 mb-6">
          <GimmickLabel>ギミック①：エナジーチェーン</GimmickLabel>
          <div>
            スフィアはランダムなプレイヤー2名を選択し、その足元には赤色の円とカウントダウンが表示される。<br />
            カウントが0になると選ばれたプレイヤーと反対の電荷を持つ周囲のプレイヤーは大メージを受ける。<br />
            赤い円が出たプレイヤーは他のプレイヤーから離れるか、カウントが0になる前に無敵やダメージ無効を周囲に配ろう。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_2.PNG"
            alt="エナジーチェーン前半"
            caption="赤い円が表示されたら他のプレイヤーから離れよう！"
          />
          <div className="mt-2">
            赤い円のギミックの後、再びランダムなプレイヤーが2名選ばれ、その2人を繋ぐ紫色のチェーンが出現する。<br />
            このチェーンがボスに触れるとダメージを与えられるので、積極的にボスにチェーンを当てに行こう！
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_3.PNG"
            alt="エナジーチェーン後半"
            caption="紫の線をボスに当てるとダメージが入るぞ！"
          />
        </div>

        {/* ギミック② */}
        <div className="border-l-4 border-sky-400 pl-4 mb-6">
          <GimmickLabel>ギミック②：パリティチェック</GimmickLabel>
          <div>
            スフィアは定期的にチャージ攻撃を発動し、スフィアと反対の電荷を持つプレイヤーに大ダメージを与えてくる。<br />
            この攻撃はダメージの前にチャージする動作があり、その間に周囲の金色のブロックを破壊することでブロックの周囲のプレイヤーは攻撃を防ぐバリアを獲得できる。<br />
            なお、チャージ中は赤い円のギミック以外は攻撃が飛んでこないので、恩恵フィオナの連携で単発ダメージ無効を貼っておけばノーダメージで切り抜けられる。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_4.PNG"
            alt="パリティチェック"
            caption="金色のブロックを破壊してバリアを獲得しよう！"
          />
        </div>

        {/* ギミック③ */}
        <div className="border-l-4 border-sky-400 pl-4 mb-6">
          <GimmickLabel>ギミック③：プロトタイプアタック</GimmickLabel>
          <div>
            ある程度ギミックをこなしながら戦闘を続けていると、スフィアは中央にワープしてシールドを貼り分身を3体召喚する。<br />
            この分身は召喚されてから少しするとランダムに選択されたプレイヤー目掛けて突進を仕掛けてくる。<br />
            この突進が中央の本体に命中するとシールドを1つ破壊でき、3体全ての突進を当てることでボスは虚弱状態になり攻撃チャンスが生まれる。<br />
            突進は分身からプレイヤーに向かって伸びる赤いライン上を転がってくるため、本体の後ろに隠れるように移動しよう。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_5.PNG"
            alt="プロトタイプアタック"
            caption="分身はプレイヤー1名に目掛けて突進してくる"
          />
          <div className="mt-2">
            注意点として、3体の分身の前には壁が設置されており、この壁に一定回数攻撃を当てて破壊しないと分身を本体にぶつけられない。<br />
            そのため、分身が召喚され壁が見えたらヒット数の多い攻撃で破壊して、分身の突進を誘導しよう！
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_6.PNG"
            alt="分身壁"
            caption="ヒット数が多い攻撃で壁の耐久を削り切って破壊しよう"
          />
        </div>

        {/* 球形態セクション */}
        <SectionTitle icon="sports_baseball">球形態時のギミック</SectionTitle>

        {/* ギミック④ */}
        <div className="border-l-4 border-cyan-400 pl-4 mb-6">
          <GimmickLabel color="cyan">ギミック④：データ訂正</GimmickLabel>
          <div>
            球形態に移行後、再び反対の電荷を持つプレイヤーの間に紫色のチェーンが出現。<br />
            このチェーンをボスに当てるとボスにダメージを与えると同時にフィールドに青色のブロックが出現する。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_7.PNG"
            alt="データ訂正"
            caption="丸いブロックを破壊しよう"
          />
          <div className="mt-2">
            この青色のブロックを数回攻撃して破壊すると周囲に小型の青ブロックが出現し、この小型のブロックにボスの攻撃を当てるとボスは虚弱状態になり攻撃チャンスが生まれる。<br />
            球形態時はこのチェーンを当てて出たブロックを破壊して、小型ブロックにボスの攻撃を当てることを繰り返していくことになる。<br />
            ボスの攻撃がとにかく痛いので攻撃を誘導する剛毅だけでなく、強攻と恩恵もボスが虚弱状態になるまでは回避に専念しよう。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_8.PNG"
            alt="小型青ブロック"
            caption="小型ブロックにボスの攻撃が当たると虚弱状態になって行動が停止するぞ！"
          />
        </div>

        {/* ギミック⑤ */}
        <div className="border-l-4 border-cyan-400 pl-4 mb-6">
          <GimmickLabel color="cyan">ギミック⑤：ルーター過負荷</GimmickLabel>
          <div>
            一定時間経過後、ボスは中央にワープして周囲に強力な衝撃波を連発してくる。<br />
            こうなったらボスの四方を取り囲む装置に対して装置と反対の電荷を持つプレイヤーが触れることで、ボスに対してシールドを破壊する攻撃が放たれ、ダメージとともにボスのシールドが1つ破壊される。<br />
            ボスは全ての装置を起動してシールドを失うと虚弱状態になり攻撃のチャンスが生まれる。<br />
            この虚弱状態から復帰後は再び人形態に戻り、同じ流れでギミックを繰り返すことになる。
          </div>
          <CaptionedImage
            src="/raid/MatrixHacking_9.PNG"
            alt="ルーター過負荷"
            caption="自分と反対の電荷を持つ装置に触れよう！"
          />
        </div>

        {/* チーム編成 */}
        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          基本的な強攻1～3人、剛毅1人、残りは恩恵のパーティで挑もう。<br />
          特に球形態時のボスの攻撃が痛いのと青いブロックにボスの攻撃を誘導したいので、ギミックを理解している剛毅が1人は欲しい。<br />
          恩恵グレイフォックスの死亡回避も貫通されやすいので、恩恵は定期的にフィオナ連携の被ダメージ無効で守ってあげるようにしよう！
        </div>

        {/* 広告挿入 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", width: 320, minWidth: 200, maxWidth: '100%' }}>
            <AdSenseContentUnit />
          </div>
        </div>

        {/* 解説動画 */}
        <SectionTitle icon="movie">解説動画</SectionTitle>
        {/* 必要ならYouTube埋め込み等をここに追加 */}
      </div>
    </>
  );
}

MatrixHackingPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};