import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";

export default function Ver535TestServer() {
  // 初期状態は折りたたみ（表示）
  const [showDetail, setShowDetail] = useState(true);

  // YouTube URLから埋め込みURLを作成（今回は使われていませんが残します）
  const getEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.35先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer5.35先行テストサーバーの情報まとめページ。" />
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
                  公式DiscordサーバーにてVer5.35先行テストサーバーの募集がスタートしました！
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
                  応募期間は10日(水)の11時までなので、早めに応募しておきましょう！<br />
                  応募フォームに書いてある情報によると、テストの開始は10日(水)からとなっています。
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
          {/* 追加情報は現状空 */}
        </section>
      </div>
    </>
  );
}

Ver535TestServer.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};