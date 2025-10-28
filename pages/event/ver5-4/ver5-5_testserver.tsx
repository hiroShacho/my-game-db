import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";

export default function Ver535TestServer() {
  // 初期状態は折りたたみ（非表示）
  const [showDetail, setShowDetail] = useState(false);

  // 画像の横並び表示（2枚まで、それ以降は改行）
  function ImageRow({ images }: { images: { src: string; alt: string }[] }) {
    return (
      <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 max-w-[calc(50%-0.5rem)] sm:max-w-[320px]"
            style={{ width: "100%" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={320}
              height={200}
              className="rounded shadow object-contain w-full h-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>【幻塔攻略】Ver5.4先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer5.4先行テストサーバーの情報まとめページ。" />
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
                  公式DiscordサーバーにてVer5.4先行テストサーバーの募集がスタートしました！
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_2_1.PNG"
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
                    src="/ver_event/New_Event_2.PNG"
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
                    src="/ver_event/New_Event_2_2.PNG"
                    alt="Discord案内"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  応募期間は9日(木)の13時までなので、早めに応募しておきましょう！<br />
                  応募フォームに書いてある情報によると、テストの開始は15日(水)からとなっています。
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
          <h2 className="text-lg sm:text-xl font-semibold mb-2">ここから下にテストサーバーの情報を記載していきます。</h2>
        </section>

        {/* ▼▼▼ 追加情報 ▼▼▼ */}
        {true && (
        <section className="space-y-8">
          {/* ■新キャラクター・ナント！ */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-base sm:text-lg">■新キャラクター・ナント！</span>
              <Link href="/event/ver5-3-5/NewChara" className="text-blue-700 hover:underline font-semibold text-sm">
                詳細ページはこちら
              </Link>
            </div>
            <div className="w-full flex gap-2 mb-2 justify-center">
              <Link href="/event/ver5-3-5/NewChara" className="flex-shrink-0" style={{ maxWidth: 80 }}>
                <Image
                  src="/images/w_66_img.PNG"
                  alt="ナント武器画像"
                  width={80}
                  height={80}
                  className="rounded shadow object-contain w-full h-auto hover:opacity-75 transition"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Link>
              <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                <Image
                  src="/ver_event/New_Event_2_3.PNG"
                  alt="ナントイベント画像"
                  width={320}
                  height={200}
                  className="rounded shadow object-contain w-full h-auto"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* ■ヤノ恒常入り！ */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-base sm:text-lg">■ヤノ恒常入り！</span>
              <Link href="/weapons/Wicked" className="text-blue-700 hover:underline font-semibold text-sm">
                武器詳細ページ
              </Link>
            </div>
            <div className="w-full flex gap-2 mb-2 justify-center">
              <Link href="/weapons/Wicked" className="flex-shrink-0" style={{ maxWidth: 80 }}>
                <Image
                  src="/images/w_47_img.PNG"
                  alt="ヤノ武器画像"
                  width={80}
                  height={80}
                  className="rounded shadow object-contain w-full h-auto hover:opacity-75 transition"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Link>
              <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                <Image
                  src="/ver_event/New_Event_2_4.PNG"
                  alt="ヤノイベント画像"
                  width={320}
                  height={200}
                  className="rounded shadow object-contain w-full h-auto"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* ■各種コンテンツ追加（内容変更） */}
          <div>
            <div className="font-bold text-base sm:text-lg mb-2">■各種コンテンツ追加</div>
            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>新メインストーリー・新マップ「ブライトン区」・新ワールドボス「ヒョウ3-先鋒」追加</li>
              <li>先鋒クラッシュ・アスラーダ追加</li>
              <li>在りし日の幻・超域に75階追加</li>
              <li>幻影の序列・超域の4属性に25階（要塞級ヴォイド体）追加</li>
              <li>キルオのアバター宿舎に「プールパーティ」モードが追加</li>
            </ul>
            {/* 画像を2枚ずつ横並び、それ以降は改行 */}
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_5.PNG" alt="新メインストーリー・新マップ・新ワールドボス" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_6.PNG" alt="新メインストーリー・新マップ・新ワールドボス" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_7.PNG" alt="先鋒クラッシュ・アスラーダ追加" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_8.PNG" alt="在りし日の幻・超域75階追加" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_9.PNG" alt="幻影の序列・超域4属性25階追加" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
                <div className="flex-1 min-w-0" style={{ maxWidth: 320 }}>
                  <Image src="/ver_event/New_Event_2_10.PNG" alt="キルオ宿舎プールパーティ追加" width={320} height={200} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
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