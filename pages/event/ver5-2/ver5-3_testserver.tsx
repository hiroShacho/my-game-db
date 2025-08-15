import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";

export default function Ver53TestServer() {
  // 初期状態は折りたたみ（非表示）
  const [showDetail, setShowDetail] = useState(false);

  // YouTube URLから埋め込みURLを作成
  const getEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.3先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer5.3先行テストサーバーの情報まとめページ。" />
      </Head>
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
                  公式DiscordサーバーにてVer5.3先行テストサーバーの募集がスタートしました！
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
                  応募期間は8日(金)の11時までなので、早めに応募しておきましょう！<br />
                  応募フォームに書いてある情報によると、テストの開始は15日(金)からとなっています。
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

        {/* ▼▼▼ 追加情報 ▼▼▼ */}
        <section className="space-y-8">
          {/* ラクシス性能解説動画 */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■ラクシス性能解説動画</h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow mb-2">
              <iframe
                src={getEmbedUrl("https://youtu.be/CWW446lx_UI")}
                title="ラクシス性能解説動画"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded"
              ></iframe>
            </div>
          </div>

          {/* ブレヴィ恒常入り */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■ブレヴィ恒常入り！</h3>
            <div className="mb-2">
              <Image
                src="/ver_event/New_Event_2_7.png"
                alt="ブレヴィ恒常入り"
                width={800}
                height={400}
                className="rounded shadow w-full h-auto"
              />
            </div>
          </div>

          {/* ラクシスのアバターストーリーと宿舎追加 */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■ラクシスのアバターストーリーと宿舎追加！</h3>
            <div className="mb-2">
              <Image
                src="/ver_event/New_Event_2_8.png"
                alt="ラクシスのアバターストーリー追加"
                width={800}
                height={400}
                className="rounded shadow w-full h-auto mb-2"
              />
              <Image
                src="/ver_event/New_Event_2_9.png"
                alt="ラクシス宿舎追加"
                width={800}
                height={400}
                className="rounded shadow w-full h-auto"
              />
            </div>
          </div>

          {/* 在りし日の幻・超域と幻影の序列・超域新階層追加 */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■在りし日の幻・超域と幻影の序列・超域に新階層追加！</h3>
            <p className="mb-2">4属性に24階、異能に16階が追加！</p>
            <Image
              src="/ver_event/New_Event_2_10.png"
              alt="新階層追加"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>

          {/* 先鋒クラッシュにハイエナメカが追加 */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■先鋒クラッシュにハイエナメカが追加！</h3>
            <Image
              src="/ver_event/New_Event_2_11.png"
              alt="ハイエナメカ追加"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>

          {/* 通行証アルケーが追加？ */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2">■通行証アルケーが追加？</h3>
            <p className="mb-2">詳細な効果は不明だが、新アルケーが一覧に追加されている</p>
            <Image
              src="/ver_event/New_Event_2_12.png"
              alt="通行証アルケー"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>
        </section>
      </div>
    </>
  );
}

Ver53TestServer.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};