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

// 重要マーク付きタイトル
function ImportantTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-red-200/70 to-yellow-100 border-l-8 border-red-600 rounded px-4 py-2 my-5 shadow">
      <span className="material-symbols-outlined text-red-600 text-2xl">priority_high</span>
      <span className="text-2xl font-bold text-red-700">{children}</span>
    </div>
  );
}

export default function BeginningPage() {
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
        <title>幻塔ってどんなゲーム？ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の基礎知識。サーバー選び・復帰・起動トラブルなど初心者向け解説。" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">info</span>
          幻塔ってどんなゲーム？
        </h1>

        <SectionTitle icon="sports_esports">幻塔というゲームについて</SectionTitle>
        <div className="mb-4">
          幻塔はPC・モバイルで遊べるグローバル版が2022年8月11日、PlayStation4・5で遊べるPS版が2023年8月8日にサービスを開始したゲームです。<br />
          当初はグローバル版とPS版で運営が分かれていたが、2025年2月24日から運営が同じ会社（Perfect World Games）に変更されています。
        </div>
        <CaptionedImage
          src="/Newbie/beginning/beginning_PWG.PNG"
          alt="PWG運営"
          caption="現在の運営はPWG（Perfect World Games）"
          onClick={() => openModal("/Newbie/beginning/beginning_PWG.PNG", "PWG運営")}
        />
        <div className="mb-4">
          運営変更前の印象から「課金圧が強い」というイメージを持たれがちですが、現状はガチャ石の配布やお得セット等も増えてかなり遊びやすくなっています。<br />
          全部のキャラクターを引きたい！我慢できない！ガチャ回すぞぉぉぉ！みたいな状態にならず、計画的にガチャを引いていれば無・微課金でも戦えるようになります。<br />
          また、どちらかというと長くじっくり遊ぶタイプのゲーム性なので、課金でいきなり最強になって無双したい！みたいな人には向いていないかもしれません。
        </div>
        <CaptionedImage
          src="/Newbie/beginning/beginning_gacha.PNG"
          alt="ガチャの獣になってはいけない"
          caption="ガチャの獣になってはいけない"
          onClick={() => openModal("/Newbie/beginning/beginning_gacha.PNG", "ガチャの獣になってはいけない")}
        />
        <div className="mb-4">
          ゲーム内のコンテンツはソロプレイで遊べるものもあるが、メインのPVEコンテンツは4～8人のマルチプレイで遊ぶ前提の難易度になっています。<br />
          基本的には新規プレイヤーに対して皆が優しくしてくれるので、攻略したいコンテンツがあったらギルドやワールドチャットで募集を出せば協力してくれる優しい世界となっています。
        </div>

        {/* 重要！サーバーの選び方 */}
        <div className="w-full flex items-center gap-2 bg-gradient-to-r from-red-400/70 to-yellow-100 border-l-8 border-red-700 rounded px-4 py-3 my-5 shadow">
          <span className="material-symbols-outlined text-red-700 text-2xl">priority_high</span>
          <span className="text-2xl font-bold text-red-700">サーバーの選び方（重要！）</span>
        </div>
        <div className="mb-4">
          サーバーはリージョン（地域）で分かれていて、基本的には自分の住んでいる地域にキャラクターを作成するのが良いです。<br />
          同じリージョン内であればサーバーと機種(PC・モバイル・PS)に関係なくクロスプレイが可能です。<br />
          注意点として、グローバル版とPS版で分かれていた時の名残りでリージョンもグローバルとPSの2つ分存在しています。<br />
          もし友達と一緒に遊んだり配信者さんと遊びたくて始めた！という人は相手がどのリージョンで遊んでいるかをしっかり確認しましょう。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/beginning/beginning_global.PNG",
              alt: "グローバル版サーバー選択",
              caption: "グローバル版の人と遊ぶなら「Asia Pacific」内のサーバーを選ぼう"
            },
            {
              src: "/Newbie/beginning/beginning_EastAsia.PNG",
              alt: "PS版サーバー選択",
              caption: "PS版の人と遊ぶなら「PS-East Asia」内のサーバーを選ぼう"
            }
          ]}
          onClick={openModal}
        />
        <div className="mb-4">
          PC・スマホからPSのリージョンにキャラを作ったり、逆にPSからPC・スマホのリージョンにキャラを作ることもできますが、一度作ったキャラを別リージョンに引き継ぐことはできません。<br />
          そのため、元々グローバル版で遊んでいた人とPS版で遊んでいた人が交流するにはどちらかが相手のいるリージョンにキャラクターを作成して新規で遊び始める必要があります。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/beginning/beginning_Region.PNG",
              alt: "リージョンまたぎの説明",
              caption: "スペック的にスマホで遊べない人がPSで遊んだりもできる"
            },
            {
              src: "/Newbie/beginning/beginning_RegionMovement.PNG",
              alt: "リージョン間のキャラ移動不可",
              caption: "一度作ったキャラを別リージョンに引き継ぎは出来ない"
            }
          ]}
          onClick={openModal}
        />

        <div className="mb-4">
          ここから下は一部の該当者向けの内容なので、新規でゲームが起動しないなどの問題が無ければ
          <Link href="/newbie/tutorial" className="text-blue-600 underline ml-1">
            「ゲーム序盤の進め方」
          </Link>
          辺りの記事に進むのをおススメします。
        </div>

        <SectionTitle icon="person_search">運営変更前のアカウントについて（復帰者向け）</SectionTitle>
        <div className="mb-4">
          運営が変更されるにあたって、前運営で管理していたアカウントは移行申請を出していなかった場合は削除されています。<br />
          そのため、2024年12月27日～2025年4月25日の期間内で移行申請を出した覚えがない人は新規でキャラクターを作って遊ぶ必要があります。<br />
          さすがに個人情報などが入ったアカウントを勝手に他の運営に引き継ぐことはコンプライアンス上出来ないので、過去のアカウントの復旧については残念ながら諦めるしかありません。
        </div>
        <div className="mb-4">
          幸い、時期的に引き継ぎの話が出る以前に辞めた人が使っていた武器はほとんどが恒常のガチャから出るようになっており、自動探索機能や新規向けのキャンペーンで各種アイテムの配布などもあるので復帰前より強くなることも現実的な話となっています。
        </div>
        <CaptionedImage
          src="/Newbie/beginning/beginning_eventpage.PNG"
          alt="配布武器と防具"
          caption="配布の武器と防具が非常に優秀"
          onClick={() => openModal("/Newbie/beginning/beginning_eventpage.PNG", "配布武器と防具")}
        />

        <SectionTitle icon="smartphone">ゲームが起動しない場合（スマホ向け？）</SectionTitle>
        <div className="mb-4">
          一部の端末で幻塔を起動できない不具合があることが報告されています。<br />
          一度は修正完了の告知が入ったものの、たまに起動できない人がいるようなので当時の対処法をここに記載しておきます。
        </div>
        <div className="mb-4 px-4 py-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <ol className="list-decimal ml-6 text-base">
            <li>アプリをアンインストール</li>
            <li>設定で一般→言語と地域→優先する言語に英語を追加</li>
            <li>「英語を使用」を押す（再起動が入る）</li>
            <li>右上Editから日本語の🛑マークを押してDeleteを押す（再起動が入る）</li>
            <li>チェックマークを押す（再起動が入る）</li>
            <li>幻塔をインストール</li>
            <li>DL・ゲーム内DLが終わるのを待つ<br />※言語を日本語に戻さないこと！</li>
            <li>DLが完了したらメールアドレスでログイン</li>
            <li>ログイン完了してゲームを開始、設定を開けるようになったら言語を日本語に戻す</li>
          </ol>
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

BeginningPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};