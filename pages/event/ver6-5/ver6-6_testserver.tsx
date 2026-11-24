import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";
import { XEmbed } from "@/components/XEmbed";

function CaptionedMedia({
  src,
  alt,
  maxWidth = 1200,
}: {
  src: string;
  alt: string;
  maxWidth?: number;
}) {
  const isVideo = src.toLowerCase().endsWith(".mp4");

  return (
    <div className="w-full flex justify-center mb-3">
      <div className="w-full" style={{ maxWidth }}>
        {isVideo ? (
          <div className="rounded shadow overflow-hidden bg-black">
            <video
              controls
              preload="metadata"
              className="w-full h-auto block rounded"
            >
              <source src={src} type="video/mp4" />
              お使いのブラウザでは動画タグがサポートされていません。
            </video>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={600}
            className="rounded shadow w-full h-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}

function MediaRow({
  items,
}: {
  items: { src: string; alt: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
      {items.map((item, i) => {
        const isVideo = item.src.toLowerCase().endsWith(".mp4");

        return (
          <div
            key={i}
            className="w-full sm:flex-1 sm:min-w-0 sm:max-w-[640px]"
          >
            {isVideo ? (
              <div className="rounded shadow overflow-hidden bg-black">
                <video
                  controls
                  preload="metadata"
                  className="w-full h-auto block rounded"
                >
                  <source src={item.src} type="video/mp4" />
                  お使いのブラウザでは動画タグがサポートされていません。
                </video>
              </div>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={480}
                height={300}
                className="rounded shadow object-contain w-full h-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Ver535TestServer() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver6.5先行テストサーバー | 幻塔攻略データベース</title>
        <meta
          name="description"
          content="幻塔（Tower of Fantasy）のVer6.5先行テストサーバーの情報まとめページ。"
        />
      </Head>

      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-8 space-y-6">
        <section>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setShowDetail((v) => !v)}
              className="font-semibold text-base sm:text-lg px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded transition"
              aria-expanded={showDetail}
            >
              {showDetail
                ? "▲ 公式Discordサーバー募集案内（クリックで折りたたむ）"
                : "▼ 公式Discordサーバー募集案内（クリックで展開）"}
            </button>

            {showDetail && (
              <div className="mt-3">
                <p className="text-base sm:text-lg mb-3">
                  公式DiscordサーバーにてVer6.5先行テストサーバーの募集がスタートしました！
                </p>

                <CaptionedMedia
                  src="/ver_event/New_Event_6_1.PNG"
                  alt="応募フォーム"
                />

                <p className="mb-3">
                  応募フォームに情報を入力してテスト抽選に参加しましょう！
                </p>

                <CaptionedMedia
                  src="/ver_event/New_Event_6.PNG"
                  alt="イベント画像"
                />

                <p className="mb-3">
                  公式Discordには公式ホームページから参加可能です！
                  <br />
                  公式ホームページは本サイトの幻塔公式リンクから飛べます。
                  <br />
                  PC表示なら右のサイドバー、スマホならサイドバーメニューの中にあります。（画像は過去の公式ホームページです）
                </p>

                <CaptionedMedia
                  src="/ver_event/New_Event_6_2.PNG"
                  alt="Discord案内"
                />

                <p className="mb-3">
                  応募期間は9日(月)11時までなので、早めに応募しておきましょう！
                  <br />
                  応募フォームに書いてある情報によると、テストの開始は11月11日(水)からとなっています。
                </p>

                <div className="mb-4 text-red-800 font-bold">
                  ※注意
                  <br />
                  過去のテストと同じなら参加できるのはPCのみとなっています。
                  <br />
                  スマホでは参加できないので、情報は配信者のテストサーバー配信を追うなどして手に入れましょう。
                  <br />
                  （本サイトでも情報は掲載予定です）
                </div>
              </div>
            )}
          </div>

          <hr className="my-6" />

          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            ここから下にテストサーバーの情報を記載していきます。
          </h2>
        </section>

        {true && (
          <section className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-base sm:text-lg">
                  ■新キャラクター・ヘイリーペインター！
                </span>
                <Link
                  href="/event/ver6-4/NewChara"
                  className="text-blue-700 hover:underline font-semibold text-sm"
                >
                  キャラ詳細ページはこちら
                </Link>
              </div>

              <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                <Link
                  href="/event/ver6-4/NewChara"
                  className="flex-shrink-0 block"
                >
                  <Image
                    src="/ver_event/New_Event_6_3.PNG"
                    alt="ペインターイベント画像"
                    width={640}
                    height={360}
                    className="rounded shadow object-contain w-full h-auto"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Link>
              </div>
            </div>

            <div>
              <div className="w-full max-w-[640px] mx-auto mb-3">
                <span className="font-bold text-base sm:text-lg">
                  ■各種モーション
                </span>
                <div className="aspect-video overflow-hidden rounded shadow">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/IA2UVMEdB_U"
                    title="YouTube動画"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold text-base sm:text-lg mb-2">
                ■各種コンテンツ追加
              </div>

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>ストーリー34章追加</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_4.PNG", alt: "ストーリー34章" },
                ]}
              />

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>アントリア恒常入り（キャロットは次バージョンになりそう）</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_5.PNG", alt: "アントリア" },
                ]}
              />

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>先鋒クラッシュ：ナント追加</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_6.PNG", alt: "ナント" },
                ]}
              />

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>在りし日の幻・超域：86階追加</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_7.PNG", alt: "在りし日" },
                ]}
              />

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>幻影の序列・四属性37階：ナクア追加</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_8.PNG", alt: "ナクア" },
                ]}
              />

              <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
                <li>ワールドボス復活が5分に短縮</li>
              </ul>
              <MediaRow
                items={[
                  { src: "/ver_event/New_Event_6_9.mp4", alt: "ワルボ5分" },
                ]}
              />



            </div>
          </section>
        )}
      </div>
    </>
  );
}

Ver535TestServer.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};