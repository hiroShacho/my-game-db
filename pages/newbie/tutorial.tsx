import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SidebarLayout from "@/components/layout/SidebarLayout";

// 拡大画像モーダル
function Modal({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg flex flex-col items-center justify-center max-w-[98vw] max-h-[98vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-[90vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] min-h-[200px] max-h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ background: "#fff" }}
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

// キャプション付き画像（クリックで拡大）
function CaptionedImage({
  src,
  alt,
  caption,
  w = 480,
  h = 270,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center my-4 w-full">
      <div
        className="relative rounded-lg shadow border-2 border-yellow-300 overflow-hidden bg-white cursor-pointer"
        style={{
          width: w,
          maxWidth: "98vw",
          aspectRatio: `${w} / ${h}`,
          background: "#fff",
        }}
        onClick={onClick}
        title="クリックで拡大"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="100vw"
        />
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
          クリックで拡大
        </span>
      </div>
      <div className="bg-yellow-50 px-4 py-1 text-xs text-yellow-800 border-t border-yellow-200 w-full text-center max-w-xl">
        {caption}
      </div>
    </div>
  );
}

// 画像を横並び（クリックで拡大）
function RowImages({
  images,
  w = 350,
  h = 200,
  onClick,
}: {
  images: { src: string; alt: string; caption: string }[];
  w?: number;
  h?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
      {images.map((img) => (
        <div key={img.src} className="flex flex-col items-center">
          <div
            className="relative rounded-lg shadow border-2 border-yellow-200 overflow-hidden bg-white cursor-pointer"
            style={{
              width: w,
              maxWidth: "96vw",
              aspectRatio: `${w} / ${h}`,
              background: "#fff",
            }}
            onClick={() => onClick && onClick(img.src, img.alt)}
            title="クリックで拡大"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
              クリックで拡大
            </span>
          </div>
          <div className="bg-yellow-50 px-2 py-1 text-xs text-yellow-800 border-t border-yellow-200 w-full text-center max-w-xs">
            {img.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

// セクションタイトル
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-yellow-300/60 to-yellow-50 border-l-8 border-yellow-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-yellow-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-yellow-900">{children}</span>
    </div>
  );
}

export default function TutorialPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <>
      <Head>
        <title>ゲーム序盤の進め方 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔を快適に進めるためのゲーム開始からイベント防具獲得までの流れを解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">school</span>
          ゲーム序盤の進め方
        </h1>
        <div className="mb-6 text-base text-gray-800">
          ここではゲームを快適に進めるためにゲーム開始 ～ イベントの「いざ！チュートリアルから冒険の旅へ！」で配布防具を獲得するまでの流れを解説。
        </div>

        <RowImages
          images={[
            {
              src: "/Newbie/tutorial/tutorial_eventicon.PNG",
              alt: "イベントアイコン",
              caption: "画面右上のアイコンからイベントページへ",
            },
            {
              src: "/Newbie/tutorial/tutorial_eventpage.PNG",
              alt: "イベントページ",
              caption: "イベントページの「いざ！チュートリアルから冒険の旅へ！」でミッションと報酬をチェック！",
            },
          ]}
          onClick={openModal}
        />

        {/* ①ストーリー進行 */}
        <SectionTitle icon="menu_book">①ストーリーを進めてデイリー懸賞を解放しよう！</SectionTitle>
        <div className="mb-4">
          フィールドの特定の敵を倒したりアイテムを納品する「デイリー懸賞」はメインストーリーをヴェラ編の「新たな一日」（鏡花堂の自室で休むところ）まで進める必要がある。<br />
          現在のメインストーリーはアーシャ編を進めていると途中でスキップされてヴェラ編に飛ばされるようになっている。<br />
          後からアーシャ編のストーリーに戻ることは可能なので、一旦そのままヴェラ編のストーリーを進めて鏡花堂のベッドで休むところまで進めてしまおう。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/tutorial/tutorial_story.PNG",
              alt: "鏡花堂のベッドで休む",
              caption: "鏡花堂のベッドで休んだらデイリー等が解放されるぞ！",
            },
            {
              src: "/Newbie/tutorial/tutorial_TOP.PNG",
              alt: "デイリー/連合作戦画面",
              caption: "デイリー懸賞・Mi-aのキッチン・連合作戦にはこの画面からアクセスできる",
            },
          ]}
          onClick={openModal}
        />

        {/* ②デイリー・連合作戦解放 */}
        <SectionTitle icon="event_note">②デイリー懸賞をクリア＆連合作戦を解放しよう！</SectionTitle>
        <div className="mb-4">
          デイリー懸賞を解放したら早速クエストを受けてみよう。<br />
          クエストを受ける時空（アーシャ、ヴェラ）を選択して、その時空のマップで目的を達成しよう！
        </div>
        <CaptionedImage
          src="/Newbie/tutorial/tutorial_mission.PNG"
          alt="デイリークエスト選択"
          caption="他の時空が解放されるまではヴェラを選択しよう"
          w={480}
          h={260}
          onClick={() => openModal("/Newbie/tutorial/tutorial_mission.PNG", "デイリークエスト選択")}
        />
        <div className="mb-4">
          連合作戦はレベルが20になると解放されるので、デイリー懸賞・Mi-aのキッチン・探索で一気にレベルを上げて解放しよう！<br />
          Mi-aのキッチンは試食を押したらすぐに前の画面に戻れば調理のアニメーションをスキップできる。<br />
          可愛いので毎回見ていたいところだが、どうしても時間がかかるので断腸の思いでスキップしよう。
        </div>
        <CaptionedImage
          src="/Newbie/tutorial/tutorial_Mi-a.PNG"
          alt="Mi-aのキッチン"
          caption="Mi-aのキッチンでは満腹値最大＆ダメージUP・被ダメージDOWNのバフを獲得できるぞ！"
          w={480}
          h={260}
          onClick={() => openModal("/Newbie/tutorial/tutorial_Mi-a.PNG", "Mi-aのキッチン")}
        />

        {/* ③連合作戦2回 */}
        <SectionTitle icon="group">③連合作戦に2回挑戦しよう！</SectionTitle>
        <div className="mb-4">
          連合作戦にマッチングで挑戦して2回活力を消費して報酬を受け取ろう。<br />
          連合作戦についての詳しい説明は
          <Link href="/jointoperation" className="text-blue-600 underline ml-1">
            こちらのページ
          </Link>
          に掲載しているのでチェックしておこう！
        </div>

        {/* ④防具受け取り */}
        <SectionTitle icon="check_circle">④防具を受け取ろう！</SectionTitle>
        <div className="mb-4">
          連合作戦で活力を180消費したらイベントページから達成済みのミッションの報酬を受け取り、必要クリア回数3の報酬を受け取ろう。<br />
          これでバッグの中に強化済みの防具が配布されているので、この防具を装備して冒険を始めよう！<br />
          防具は同じ属性攻撃を持った防具を全身に装備することでその属性の武器でより火力を出せるようになるぞ！
        </div>
        <CaptionedImage
          src="/Newbie/tutorial/tutorial_armor.PNG"
          alt="配布防具"
          caption="配布防具で一気にステータスを強化しよう！"
          w={480}
          h={260}
          onClick={() => openModal("/Newbie/tutorial/tutorial_armor.PNG", "配布防具")}
        />

        {/* ⑤レベル上げ */}
        <SectionTitle icon="trending_up">⑤レベルを上げて他のコンテンツにも触れていこう！</SectionTitle>
        <div className="mb-4">
          幻塔の戦闘コンテンツ・育成要素にはデイリー（デイリー懸賞・連合作戦・Mi-aのキッチン）等でレベルを上げることで解放されるモノの他に、ストーリーを進めることで解放されるモノも存在する。<br />
          まずはデイリーをこなしながらストーリーを進めてレベル100を目指そう！ついでにバージョンごとに開催されているイベントにも参加するようにしよう！
        </div>
        <CaptionedImage
          src="/Newbie/tutorial/tutorial_content.PNG"
          alt="戦闘コンテンツ解放"
          caption="戦闘コンテンツはレベルを上げることで解放されるぞ！"
          w={480}
          h={260}
          onClick={() => openModal("/Newbie/tutorial/tutorial_content.PNG", "戦闘コンテンツ解放")}
        />

        {/* 次にやるべきこと */}
        <SectionTitle icon="arrow_forward">ここまでゲームを進めたら次はどうすれば良い？</SectionTitle>
        <div className="mb-4">
          ⇒少しずつ育成要素に触れていくのがおススメ！<br />
          <Link href="/newbie/levelup" className="text-green-600 underline">
            育成要素のまとめ
          </Link>
          も参照してみよう。
        </div>

        <Modal
          open={modalOpen && modalImage !== null}
          onClose={closeModal}
          src={modalImage?.src || ""}
          alt={modalImage?.alt || ""}
        />
      </div>
    </>
  );
}

TutorialPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};