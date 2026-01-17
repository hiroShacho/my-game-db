import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import fceBossData from "@/data/fce.json";

// アイコン表示用: Material Symbols のみ対応
function MaterialSymbolIcon({ icon, className = "" }: { icon: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{icon}</span>
  );
}

// セクションタイトル（Material Symbols アイコンのみ・propsに直接アイコン名を渡す）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-cyan-400/60 to-cyan-100 border-l-8 border-cyan-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <MaterialSymbolIcon icon={icon} className="text-cyan-600 text-2xl align-middle" />
      )}
      <span className="text-2xl font-bold text-cyan-900">{children}</span>
    </div>
  );
}

// 画像拡大モーダル
function ImageModal({
  src, alt, open, onClose, width = 320
}: { src: string; alt: string; open: boolean; onClose: () => void; width?: number }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
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
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

// 拡大対応画像（中央寄せ・大きめ）
function CenteredImage({ src, alt, caption, width = 640, height = 360 }: { src: string; alt: string; caption: string; width?: number; height?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center my-3">
      <div className="rounded-xl shadow border-2 border-cyan-300 overflow-hidden cursor-zoom-in" style={{ maxWidth: width }} onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          objectFit="cover"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "16px",
            display: "block"
          }}
        />
      </div>
      <div className="bg-cyan-50 px-2 py-1 text-xs text-cyan-900 border-t border-cyan-200 text-center w-full" style={{ maxWidth: width, width: "100%" }}>
        {caption}
      </div>
      <ImageModal src={src} alt={alt} open={open} onClose={() => setOpen(false)} width={width} />
    </div>
  );
}

// 画像横並び（拡大対応）
function ImageRow({ images }: { images: { src: string; alt: string; caption: string; width?: number; height?: number }[] }) {
  const [modalState, setModalState] = useState<{ open: boolean, src: string, alt: string } | null>(null);
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center my-2 w-full" style={{ maxWidth: "100%" }}>
      {images.map((img, i) =>
        <div key={i} className="flex-1 min-w-[140px] max-w-[img.width||320px]" style={{ margin: "0 auto" }}>
          <div className="rounded-xl shadow border-2 border-cyan-300 overflow-hidden cursor-zoom-in" onClick={() => setModalState({ open: true, src: img.src, alt: img.alt })}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width || 320}
              height={img.height || 180}
              objectFit="cover"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxWidth: "100%",
                display: "block"
              }}
            />
          </div>
          <div className="bg-cyan-50 px-2 py-1 text-xs text-cyan-900 border-t border-cyan-200 text-center w-full"
            style={{ maxWidth: img.width || 320, width: "100%" }}>
            {img.caption}
          </div>
        </div>
      )}
      <ImageModal
        src={modalState?.src || ""}
        alt={modalState?.alt || ""}
        open={!!modalState?.open}
        onClose={() => setModalState(null)}
      />
    </div>
  );
}

// ボスギミックテーブル（見本PNG準拠・画像・名前/レベル上段・ギミック下枠）
function BossTable({ boss }: { boss: any }) {
  const [imgOpen, setImgOpen] = useState(false);
  return (
    <div className="w-full mb-8 rounded-lg overflow-hidden border border-black bg-white">
      <div className="flex" style={{ minHeight: "120px" }}>
        {/* 左: ボス画像（クリックで拡大） */}
        <div className="flex-shrink-0 w-40 h-40 bg-black flex items-center justify-center border-r border-black cursor-zoom-in" style={{ minHeight: "120px" }} onClick={() => setImgOpen(true)}>
          <Image
            src={`/fce/${boss.bossSlug}.PNG`}
            alt={boss.bossName}
            width={128}
            height={128}
            style={{ objectFit: "contain", borderRadius: "8px" }}
          />
        </div>
        {/* 右: ボス名・レベル（縦幅揃え・背景色） */}
        <div className="flex flex-col justify-center bg-cyan-100 px-6 flex-1" style={{ minHeight: "120px" }}>
          <div className="text-2xl font-bold text-cyan-900">{boss.bossName} <span className="text-lg text-gray-700">(Lv.{boss.bossLevel})</span></div>
        </div>
      </div>
      <ImageModal
        src={`/fce/${boss.bossSlug}.PNG`}
        alt={boss.bossName}
        open={imgOpen}
        onClose={() => setImgOpen(false)}
        width={320}
      />
      {/* ギミック枠（下にまとめて枠で区切る） */}
      {boss.steps.map((step: any) => (
        <div key={step.step} className="flex items-center px-4 py-3 border-t border-black bg-white">
          <span className="font-semibold text-cyan-700 mr-2" style={{ minWidth: 85, display: "inline-block" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.08em" }}>ステップ{step.step}</span>
            <span style={{ color: "#888", marginLeft: 2 }}>：</span>
          </span>
          <span className="flex-1">{step.gimmick}</span>
          {step.danger === true && (
            <span className="ml-2 px-2 py-1 rounded bg-red-400 text-white font-bold text-xs" style={{ minWidth: "60px" }}>注意！</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FceIndexPage() {
  return (
    <>
      <Head>
        <title>進化辺境 | 幻塔攻略データベース</title>
        {/* Material Symbols Outlined を必ず読み込み */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6 w-full">
        {/* トップ画像＋タイトル＋サブタイトル */}
        <div className="relative w-full h-40 sm:h-64 overflow-hidden rounded-lg shadow mb-6 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-400">
          <Image
            src="/fce/fce_top.PNG"
            alt="進化辺境トップ"
            fill
            style={{ objectFit: "cover", opacity: 0.5 }}
            className="pointer-events-none select-none"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow mb-2">進化辺境</h1>
            <p className="text-white text-sm sm:text-base font-semibold bg-cyan-700/60 px-4 py-1 rounded">
              進化辺境の解説とボス一覧
            </p>
          </div>
        </div>

        <SectionTitle icon="stadium">選んだ敵に最大4人で挑むPVEコンテンツ</SectionTitle>
        <div className="mb-4 text-lg text-gray-800">
          戦闘は全部で5ステップあり、最初のステップは弱点もギミックもない普通の戦闘になる。<br />
          ステップ2からはひとつ前のステップで与ダメージが低かった属性2つが敵の弱点属性になる。<br />
          また、敵はステップ2から固有のギミックを発動するようになり、それぞれのステップでギミックに対応しながら戦う必要がある。<br />
          ギミックはそのステップ内でのみ有効。ステップ2のギミックが以降のステップ3～5で発動したりはしない。
        </div>
        <CenteredImage src="/fce/fce_weakandmech.PNG" alt="ステップごとに弱点属性とギミックが変化する" caption="ステップごとに弱点属性とギミックが変化する" width={640} height={360} />

        <div className="mb-4 text-lg text-gray-800">
          制限時間は10分あり、1ステップ終わるごとに2分削れていく。<br />
          2分以内に1ステップが終わった場合は制限時間が2分削れる。<br />
          1ステップの戦闘時間が2分を超えると超えた分も制限時間が削れたままになる。<br />
          そのため、1ステップを2分以内に終わらせるようにして、最後のステップ5に2分の制限時間を残すようにするのが良い。
        </div>
        <CenteredImage src="/fce/fce_time.PNG" alt="2分以内にクリアした場合も2分は必ず時間を引かれる" caption="2分以内にクリアした場合も2分は必ず時間を引かれる" width={640} height={360} />

        <div className="mb-4 text-lg text-gray-800">
          ボスをクリアするとそのボスでは武器の凸数とレベルが最大になり、ボリションも凸数が1つ上がる。<br />
          この凸数アップはしっかり凸効果を発動してくれるので無凸武器でも完凸の運用が可能になる。<br />
          また、同じギルドのメンバーがいると1人につきダメージUP+5%が発動し、このバフは最大で+15%まで上昇する。
        </div>
        <CenteredImage src="/fce/fce_stars.PNG" alt="武器完凸が体験できるぞ！" caption="武器完凸が体験できるぞ！" width={640} height={360} />

        <div className="mb-4 text-lg text-gray-800">
          毎バージョン、クリア報酬として最新キャラの専用レッドコアとスペシャルクーポンが獲得できる。<br />
          任意のモンスターを倒すと獲得できる報酬と特定のモンスターを倒すことで獲得できる報酬がある。<br />
          基本的にはLV.92のヴァルキリが倒しやすいので、新キャラクターのレッドコアとクーポンが欲しい時はヴァルキリをステップ3まで倒すようにしよう！
        </div>
        <ImageRow
          images={[
            { src: "/fce/fce_rewards1.PNG", alt: "新キャラのガチャ石が貰える", caption: "新キャラのガチャ石が貰える" },
            { src: "/fce/fce_rewards2.PNG", alt: "その他の素材が貰える", caption: "その他の素材が貰える" }
          ]}
        />

        <SectionTitle icon="format_list_bulleted">各ボスのギミック一覧</SectionTitle>
        <div className="mb-4 text-base text-gray-700">
          下記は全ボス分、ステップ2～5のギミックと危険なギミックの一覧です。
        </div>
        <div className="space-y-8">
          {fceBossData.map((boss: any) => (
            <BossTable key={boss.bossSlug} boss={boss} />
          ))}
        </div>
      </div>
    </>
  );
}

FceIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
}

export default FceIndexPage;