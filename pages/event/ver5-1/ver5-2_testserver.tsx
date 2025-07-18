import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";

export default function Ver52TestServer() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.2先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer5.2先行テストサーバーの情報まとめページ。" />
      </Head>
      {/* ↓ max-w-2xl & space-y-6で統一 */}
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-8 space-y-6">
        <section>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setShowDetail(v => !v)}
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
                  公式DiscordサーバーにてVer5.2先行テストサーバーの募集がスタートしました！
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_2_1.png"
                    alt="応募フォーム"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  応募フォームに情報を入力してテスト抽選に参加しましょう！
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_2.png"
                    alt="イベント画像"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  公式Discordには公式ホームページから参加可能です！<br />
                  公式ホームページは本サイトの幻塔公式リンクから飛べます。<br />
                  PC表示なら右のサイドバー、スマホならサイドバーメニューの中にあります。
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_2_2.png"
                    alt="Discord案内"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  応募期間は9日(水)の13時までなので、早めに応募しておきましょう！<br />
                  応募フォームに書いてある情報によると、テストの開始は16日(水)からとなっています。
                </p>
                <div className="mb-4 text-red-800 font-bold">
                  ※注意<br />
                  過去のテストと同じなら参加できるのはPCのみとなっています。<br />
                  スマホでは参加できないので、情報は配信者のテストサーバー配信を追うなどして手に入れましょう。<br />
                  （本サイトでも情報は掲載予定です）
                </div>
              </div>
            )}
          </div>
          <hr className="my-6" />
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ここから下はテストサーバーの情報を記載していきます。</h2>
        </section>

        {/* ▼▼▼ 追加情報ここから ▼▼▼ */}
        <section>
          <h2 className="text-xl font-bold mb-4">＜Ver5.2先行テスト情報まとめ＞</h2>

          {/* シードル解説動画 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ■シードル解説
              <span role="img" aria-label="レイピア" className="text-xl">🗡️</span>
              <span role="img" aria-label="ロボット" className="text-xl">🤖</span>
            </h3>
            <div className="w-full aspect-video max-w-xl mx-auto mb-2 min-h-[160px] sm:min-h-[200px]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/wQ5bAocmWEI"
                title="シードル解説"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded shadow w-full h-full min-h-[160px] sm:min-h-[200px]"
                style={{ minHeight: 160 }}
              ></iframe>
            </div>
            {/* ▼ ここから武器詳細リンク（カード風・横並び4カラム） */}
            <div className="flex justify-center mt-4 mb-3">
              <Link
                href="/weapons/AF-010Servion"
                className="flex w-full max-w-lg justify-between items-center border rounded shadow px-6 py-4 bg-white hover:bg-gray-50 transition"
                style={{ minWidth: 340 }}
              >
                {/* レア度 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/images/SSR.png"
                    alt="SSR"
                    width={60}
                    height={60}
                  />
                </div>
                {/* 武器画像＋名前（リンク色） */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/images/w_63_img.PNG"
                    alt="サーバントAF-010"
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <span className="text-sm text-blue-700 mt-1 hover:underline text-center">
                    サーバントAF-010
                  </span>
                </div>
                {/* 共鳴 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/images/強攻.png"
                    alt="強攻"
                    width={44}
                    height={44}
                  />
                  <span className="text-xs mt-1">強攻</span>
                </div>
                {/* 特質 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/images/雷・氷.png"
                    alt="雷・氷"
                    width={44}
                    height={44}
                  />
                  <span className="text-xs mt-1">雷・氷</span>
                </div>
              </Link>
            </div>
            {/* ▲ ここまで武器詳細リンク */}
          </div>

          {/* 以下は既存のまま */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ■煙渺恒常入り
              <span role="img" aria-label="猫" className="text-xl">🐱</span>
            </h3>
            <Image
              src="/ver_event/New_Event_2_3.png"
              alt="煙渺恒常入り"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
              sizes="100vw"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ■フィオナ共感覚
              <span role="img" aria-label="びっくり目" className="text-2xl align-middle">👀</span>
            </h3>
            <Image
              src="/ver_event/New_Event_2_4.png"
              alt="フィオナ共感覚"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
              sizes="100vw"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ■新マップ、新ワールドボス、新ストーリー追加
              <span role="img" aria-label="きらきら星" className="text-2xl align-middle">✨</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <Image
                src="/ver_event/New_Event_2_5.png"
                alt="新マップ"
                width={400}
                height={225}
                className="rounded shadow w-full sm:w-1/2 h-auto"
                sizes="50vw"
              />
              <Image
                src="/ver_event/New_Event_2_6.png"
                alt="新ワールドボス/新ストーリー"
                width={400}
                height={225}
                className="rounded shadow w-full sm:w-1/2 h-auto"
                sizes="50vw"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">■新メカ武器追加</h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <div className="w-full sm:w-1/2 aspect-video min-h-[120px] sm:min-h-[160px]">
                <Image
                  src="/ver_event/New_Event_2_7.png"
                  alt="新メカ武器1"
                  width={400}
                  height={225}
                  className="rounded shadow w-full h-full object-cover"
                  sizes="50vw"
                  style={{ minHeight: 120 }}
                />
              </div>
              <div className="w-full sm:w-1/2 aspect-video min-h-[120px] sm:min-h-[160px]">
                <video
                  src="/ver_event/New_Event_2_8.mp4"
                  controls
                  width={400}
                  height={225}
                  className="rounded shadow w-full h-full object-cover"
                  style={{ minHeight: 120 }}
                >
                  お使いのブラウザでは動画タグをサポートしていません。
                </video>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">■先鋒クラッシュにヨルムンガンド追加</h3>
            <Image
              src="/ver_event/New_Event_2_9.png"
              alt="先鋒クラッシュ ヨルムンガンド追加"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
              sizes="100vw"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">■在りし日の幻・超域に72階追加</h3>
            <Image
              src="/ver_event/New_Event_2_10.png"
              alt="在りし日の幻・超域 72階追加"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
              sizes="100vw"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">■幻影の序列・超域の4属性に23階、異能15階追加</h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <Image
                src="/ver_event/New_Event_2_11.png"
                alt="幻影の序列・超域 4属性 23階"
                width={400}
                height={225}
                className="rounded shadow w-full sm:w-1/2 h-auto"
                sizes="50vw"
              />
              <Image
                src="/ver_event/New_Event_2_12.png"
                alt="幻影の序列・超域 異能 15階"
                width={400}
                height={225}
                className="rounded shadow w-full sm:w-1/2 h-auto"
                sizes="50vw"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Ver52TestServer.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};