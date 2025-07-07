import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement } from "react";

export default function Ver52TestServer() {
  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.2先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer5.2先行テストサーバーの情報まとめページ。" />
      </Head>
      <div className="p-4 sm:p-8 space-y-8">
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Ver5.2先行テストサーバー</h1>
          <p className="text-base sm:text-lg mb-4">
            公式DiscordサーバーにてVer5.2先行テストサーバーの募集がスタートしました！
          </p>
          <div className="mb-4">
            <Image
              src="/ver_event/New_Event_2_1.png"
              alt="応募フォーム"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>
          <p className="mb-4">
            応募フォームに情報を入力してテスト抽選に参加しましょう！
          </p>
          <div className="mb-4">
            <Image
              src="/ver_event/New_Event_2.png"
              alt="イベント画像"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>
          <p className="mb-4">
            公式Discordには公式ホームページから参加可能です！<br />
            公式ホームページは本サイトの幻塔公式リンクから飛べます。<br />
            PC表示なら右のサイドバー、スマホならサイドバーメニューの中にあります。
          </p>
          <div className="mb-4">
            <Image
              src="/ver_event/New_Event_2_2.png"
              alt="Discord案内"
              width={800}
              height={400}
              className="rounded shadow w-full h-auto"
            />
          </div>
          <p className="mb-4">
            応募期間は9日(水)の13時までなので、早めに応募しておきましょう！<br />
            応募フォームに書いてある情報によると、テストの開始は16日(水)からとなっています。
          </p>
          <div className="mb-6 text-red-800 font-bold">
            ※注意<br />
            過去のテストと同じなら参加できるのはPCのみとなっています。<br />
            スマホでは参加できないので、情報は配信者のテストサーバー配信を追うなどして手に入れましょう。<br />
            （本サイトでも情報は掲載予定です）
          </div>
          <hr className="my-8" />
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ここから下はテストサーバーの情報を記載していきます。</h2>
          <div className="text-gray-500">
            ＜テスト前なので内容は一旦ここで終了＞
          </div>
        </section>
      </div>
    </>
  );
}

Ver52TestServer.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};