import React, { useState } from "react";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";

// セクションタイトル
const SectionTitle = ({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="flex items-center gap-2 mb-2 pl-3"
    style={{
      borderLeft: "8px solid #17e6a7",
      borderBottom: "2.5px solid #17e6a7",
      paddingBottom: 2,
      width: "fit-content",
    }}
  >
    {icon && <span className="text-2xl">{icon}</span>}
    <h2 className="text-lg sm:text-xl font-semibold mb-0">{children}</h2>
  </div>
);

// キャプション付き画像
const CaptionedImage = ({
  src,
  alt,
  caption,
  w = 500,
  h = 280,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}) => (
  <div className="flex flex-col items-center my-2" style={{ width: "100%" }}>
    <div
      className="relative rounded-lg shadow border-2 border-blue-200 overflow-hidden bg-white cursor-pointer"
      style={{
        width: w,
        maxWidth: "98vw",
        aspectRatio: `${w} / ${h}`,
        background: "#fff",
      }}
      onClick={onClick}
      title={caption ? "クリックで拡大" : undefined}
    >
      <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
      {caption && (
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
          クリックで拡大
        </span>
      )}
    </div>
    {caption && (
      <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 text-center w-full max-w-lg">
        {caption}
      </div>
    )}
  </div>
);

// 画像横並び
const ImageRow = ({
  images,
  w = 350,
  h = 200,
  onClick,
}: {
  images: { src: string; alt: string; caption?: string }[];
  w?: number;
  h?: number;
  onClick?: (src: string, alt: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
    {images.map((img, i) => (
      <CaptionedImage
        key={img.src}
        src={img.src}
        alt={img.alt}
        caption={img.caption}
        w={w}
        h={h}
        onClick={onClick ? () => onClick(img.src, img.alt) : undefined}
      />
    ))}
  </div>
);

// 拡大画像モーダル
const Modal = ({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
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
        <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ background: "#fff" }}
            sizes="90vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

export default function GalacticBounty() {
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
        <title>イベント「星間指名手配」 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔 討伐作戦「星間指名手配」のイベント解説・攻略情報" />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">

        {/* トップバナー */}
        <div className="relative w-full h-48 sm:h-72 rounded-lg overflow-hidden shadow mb-4">
          <Image
            src="/ver_event/New_Event_1.PNG"
            alt="星間指名手配"
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg bg-black/60 px-6 py-3 rounded-lg border border-pink-300">
              星間指名手配
            </span>
          </div>
        </div>

        {/* 異化の危機 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#f7fbf9]">
          <SectionTitle icon="🦠">異化の危機</SectionTitle>
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-xl h-44 sm:h-60 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_1.PNG"
                alt="異化の危機"
                fill
                className="object-contain w-full h-full"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            16人マッチの増やし鬼ゲーム。<br />
            16人の中からランダムな2人が鬼になり、残りの14人は逃げながら銃を使って鬼を攻撃できる。<br />
            逃げ側の人数が3人になるとメリル・アムドに変身し、攻撃手段が銃からメリル・アムドの武器「破滅の刃」に変化する。<br />
            このイベントで貰えるポイントは逃げる側は「鬼に与えたダメージ」と「鬼を倒した数」で、鬼側は「感染させて鬼にした数」と「メリル・アムドを倒した数」で決まる。<br />
            正直ポイントを稼ぐだけなら序盤で鬼側になってどんどん感染させていった方が効率は良い。<br />
            アナベラの銃（クローバークロス）を使えば1発当てるだけで800点近くポイントを稼げるが、パロッティの銃と違って攻撃範囲が狭いのでエイム力が必要になる。<br />
            一番の問題はマッチングに16人必要なことで、放置やポイント目当てのサブアカ等も多いのでまともに遊ぶのはゴールデンタイムでも難しいかもしれない。
          </div>
        </section>

        {/* 脱獄作戦 */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#f7f8fc]">
          <SectionTitle icon="🗝️">脱獄作戦</SectionTitle>
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-xl h-44 sm:h-60 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_2.PNG"
                alt="脱獄作戦"
                fill
                className="object-contain w-full h-full"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            2人マッチの戦闘PVE。<br />
            周囲のゲートから定期的に敵が湧くのでこれを中央のヘレンネがいるエリアに近づけないように迎撃しよう。<br />
            敵を一定数倒すと脱出支援のためのキーを獲得できる。<br />
            このキーを使ってミニゲームをクリアすると脱出進捗を早めることができる。
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_2_1.PNG",
                alt: "脱出支援ミニゲーム",
                caption: "一定数敵を倒したら脱出支援のミニゲームをこなそう",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            脱出進捗が一定まで進むとゲートを封鎖する権限を獲得できるので、権限を獲得したらゲートを閉じて敵の出現を抑えるようにしよう。<br />
            脱出進捗は時間経過か脱出支援でのみ溜まるので、基本的にゲートはどんどん封鎖して敵の侵入経路を減らした方が良い。
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_2_2.PNG",
                alt: "ゲート封鎖",
                caption: "ゲートは封鎖しよう",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
        </section>

        {/* 変身ミラージュ */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#f0faff]">
          <SectionTitle icon="🪑">変身ミラージュ</SectionTitle>
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-xl h-44 sm:h-60 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_3.PNG"
                alt="変身ミラージュ"
                fill
                className="object-contain w-full h-full"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            8人マッチの隠れん坊ゲーム。<br />
            最初に逃亡役か警察役に投票して役割を決定し、2人が警察役になって他の6人を捕まえる。
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_3_1.PNG",
                alt: "変身ミラージュ投票",
                caption: "全員が逃亡役を選ぶとランダムで警察役が決まる",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            逃亡役は物に変身する「擬装術」と透明化する「隠遁術」を駆使して逃げ切ろう。<br />
            警察役は「捜索検査」で周囲に逃亡役がいないかを検査でき、近くに逃亡役がいると自身の頭上にアラートが表示＆逃亡役の偽装・隠遁術を解除できる。<br />
            逃亡役を見つけたら近づいて捕獲フィールドを当てることで逃亡役を逮捕できる。<br />
            捕まった逃亡役は警察の援護をできる賞金ハンターか逃亡役を援護できるスパイ海賊を選択できる。<br />
            賞金ハンターは警察と同様に捜索検査で逃亡役を発見できるが逮捕はできず、代わりに減速フィールド（時空の裂け目と同じエフェクト）で範囲内の逃亡役の移動速度を半減させつつ発動音とエフェクトで警察に位置を知らせることが出来る。<br />
            スパイ海賊は周囲の逃亡役の速度をアップできる加速フィールドと警察を足止めできる遮断フィールドを使用できる。
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_3_2.PNG",
                alt: "変身ミラージュスキル説明",
                caption: "イベント説明にスキルなどの説明は載っているぞ！",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            逃亡役の「隠遁術」は再使用までのクールダウンが45秒と少し長いのはネックだが、警察の捜索検査を受けてもすぐに再使用することでかなり見つかりづらくなる。<br />
            警察役の捜索検査はクールダウンが15秒なので隠遁術を再使用されてもその場で監視を続けていれば捜索検査を再使用することで逃亡役が透明化で逃げ切るのを防ぐことが出来る。<br />
            逃亡役は如何に隠遁術を活かしながら警察の死角に隠れるかが重要であり、警察役は如何に無駄なく捜索検査を回して逃亡役を追い詰めるかが重要となってくる。<br />
            今回のフィールドは上下に分かれた空間やコンテナの上などの死角が生まれやすい構造になっているため警察側が不利になりやすい。<br />
            なお、物に変身する擬装術は警察が触れるとすり抜けるので即バレする上にフィールド上の物の配置は固定なのである程度遊んでいる相手には一瞬でバレてしまう。<br />
            そのため、基本は透明化と位置取りで捜索をかく乱する立ち回りをしよう！
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_3_3.PNG",
                alt: "変身ミラージュ透明化死角",
                caption: "死角を利用した透明化がとにかく強い",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            ジャンプだけだと登れない背の高いコンテナはジャンプで高さを稼いだ後にコンテナに向かって回避でぶつかることで上に登れる。<br />
            この登り方を使わないといけない箇所もあるのでこれだけは確実に出来るようになっておこう。<br />
            また、スタート地点の上に見えるドクロのオブジェは上手くジャンプと回避を駆使すればオブジェの中に入れる。<br />
            入るのに失敗するとピンチになるのでリスキーだが、警察役にもアクションの練度を求められるので分かっていても捕まえられないなんてことも。<br />
            なお、ドクロのオブジェクトから更に上に登ると天井付近の足場や布？の上にも登れるので見える所は全て行けると思っていい。
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <video
              src="/ver_event/New_Event_1_3_4.mp4"
              controls
              style={{
                width: "400px",
                maxWidth: "98vw",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
                background: "#222",
              }}
            />
          </div>
          <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 text-center w-full max-w-lg mx-auto mb-4">
            ミニゲーム内で出来る動きだけでドクロの中に入れる（動画はワールドマップで練習している図）
          </div>
        </section>

        {/* 城塞バトル */}
        <section className="rounded-xl px-2 sm:px-6 py-4 mb-2 shadow bg-[#fff9ef]">
          <SectionTitle icon="🛡️">城塞バトル</SectionTitle>
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-xl h-44 sm:h-60 rounded-lg overflow-hidden shadow bg-white">
              <Image
                src="/ver_event/New_Event_1_4.PNG"
                alt="城塞バトル"
                fill
                className="object-contain w-full h-full"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border-l-4 border-green-400 p-4 mb-2 text-sm text-gray-800">
            2人マッチングのタワーディフェンス。<br />
            モンスターを召喚して自分のタワーを守り、相手のタワーを破壊することを目指す。<br />
            モンスターは人型、獣、灰域種の3種が存在し、種族ごと・属性ごとの能力によって有利な状況を作って戦う必要がある。<br />
            コストが高いボスモンスターは強力だが、種族ごとの有利不利や属性共鳴を最大まで高めた布陣が一度できてしまうと中々太刀打ちできない。<br />
            そのため、如何に早く自分の種族・属性に特化した布陣を作って相手の布陣を崩せるかが鍵になる。
          </div>
          <ImageRow
            images={[
              {
                src: "/ver_event/New_Event_1_4_1.PNG",
                alt: "城塞バトル戦況",
                caption: "一度戦況が傾くと立て直しは難しくなる",
              },
            ]}
            w={400}
            h={220}
            onClick={openModal}
          />
        </section>

        {/* 拡大モーダル */}
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

GalacticBounty.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};