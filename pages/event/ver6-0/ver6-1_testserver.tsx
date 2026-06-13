import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import Link from "next/link";

export default function Ver535TestServer() {
  // 募集案内の初期状態は true/false で変更可能
  const [showDetail, setShowDetail] = useState(true);

  // 画像の横並び表示（2枚まで、それ以降は改行）
  function ImageRow({ images }: { images: { src: string; alt: string }[] }) {
    return (
      <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 max-w-[calc(50%-0.5rem)] sm:max-w-[480px]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={480}
              height={300}
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
        <title>【幻塔攻略】Ver6.1先行テストサーバー | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔（Tower of Fantasy）のVer6.1先行テストサーバーの情報まとめページ。" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-8 space-y-6">
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
                  公式DiscordサーバーにてVer6.1先行テストサーバーの募集がスタートしました！
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_6_1.PNG"
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
                    src="/ver_event/New_Event_6.PNG"
                    alt="イベント画像"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  公式Discordには公式ホームページから参加可能です！<br />
                  公式ホームページは本サイトの幻塔公式リンクから飛べます。<br />
                  PC表示なら右のサイドバー、スマホならサイドバーメニューの中にあります。（画像は過去の公式ホームページです）
                </p>
                <div className="mb-3">
                  <Image
                    src="/ver_event/New_Event_6_2.PNG"
                    alt="Discord案内"
                    width={800}
                    height={400}
                    className="rounded shadow w-full h-auto"
                  />
                </div>
                <p className="mb-3">
                  応募期間は12日(金)19時までなので、早めに応募しておきましょう！<br />
                  応募フォームに書いてある情報によると、テストの開始は6月17日(水)からとなっています。
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
        {/* 以下の追加情報セクションは非表示にしています。再表示するには false を true に戻してください。 */}
        {false && (
        <section className="space-y-8">
          {/* ■新キャラクター・ハルモフェウス！ */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-base sm:text-lg">■新キャラクター・ハルモフェウス！</span>
              <Link href="/event/ver5-8/NewChara" className="text-blue-700 hover:underline font-semibold text-sm">
                キャラ詳細ページはこちら
              </Link>
            </div>
              <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
              <Link href="/event/ver5-8/NewChara" className="flex-shrink-0" style={{ maxWidth: 80 }}>
                <Image
                  src="/ver_event/New_Event_6_3.PNG"
                  alt="ハルモフェウスイベント画像"
                  width={640}
                  height={360}
                  className="rounded shadow object-contain w-full h-auto"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Link>
            </div>
          </div>


          {/* ■各種コンテンツ追加（内容変更） */}
          <div>
            <div className="font-bold text-base sm:text-lg mb-2">■各種コンテンツ追加</div>
            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>新時空「ロックハート」追加！</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_4.PNG" alt="ロックハート" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>メインストーリー30章追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_5.PNG" alt="メインストーリー" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>アンカー恒常入り（メリル・アムドは次バージョンになりそう）</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_6.PNG" alt="アンカー" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>新ワールドボス「グラティア・ガーディアン」追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_7.PNG" alt="ワールドボス" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>先鋒クラッシュ・変異フランケン追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_8.PNG" alt="変異フランケン" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>在りし日の幻・超域に81階追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_9.PNG" alt="超域81階" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>幻影の序列・超域の4属性に32階（ディザスターⅤ）追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_10.PNG" alt="ディザスターⅤ" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>新アルケー「脱出専門家」追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_11.PNG" alt="脱出専門家" width={640} height={360} className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              </div>
            </div>

            <ul className="list-disc list-inside mb-3 text-sm sm:text-base">
              <li>キルオのアバター漫遊追加</li>
            </ul>
            <div className="space-y-2">
              <div className="w-full flex gap-2 justify-center">
                <div className="flex-1 min-w-0" style={{ maxWidth: 640 }}>
                  <Image src="/ver_event/New_Event_6_12.PNG" alt="キルオ漫遊" width={640} height={360}className="rounded shadow object-contain w-full h-auto" style={{ maxWidth: "100%", height: "auto" }} />
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