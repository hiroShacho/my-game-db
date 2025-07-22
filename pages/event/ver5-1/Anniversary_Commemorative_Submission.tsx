import React, { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export default function AnniversaryCommemorativeSubmission() {
  // 画像拡大制御
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>幻塔アニバーサリー記念投稿イベント | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔公式アニバーサリー記念投稿イベント『Meant to Be』二次創作企画の紹介ページ" />
      </Head>
      {/* 画像拡大用モーダル */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            alt="拡大画像"
            className="max-w-[98vw] max-h-[98vh] rounded shadow-2xl border-2 border-white"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-8 space-y-6">
        {/* イベントバナー */}
        <div className="w-full mb-4 flex justify-center">
          <Image
            src="/ver_event/New_Event_3.png"
            alt="アニバーサリー記念投稿イベント"
            width={800}
            height={320}
            className="rounded shadow w-full h-auto max-w-full"
            sizes="100vw"
            style={{ maxWidth: "100%" }}
            priority
          />
        </div>

        {/* イベント概要 */}
        <section>
          <h1 className="text-lg sm:text-2xl font-bold mb-2 text-pink-700">公式Discordにてアニバーサリー記念の投稿イベントが開催！</h1>
          <p className="text-base sm:text-lg mb-2">
            <b>■ 幻塔アニバーサリー記念投稿イベント | 楽曲「Meant to Be」二次創作企画</b>
          </p>
          <ul className="list-disc pl-6 mb-3 text-base">
            <li>「Meant to Be」をBGMに使用した動画</li>
            <li>「Meant to Be」のカバー動画</li>
          </ul>
          <p className="mb-2">
            の2部門があり、共同創作もOKとのことです！（報酬の称号だけは投稿者のみ獲得可能なので注意）
          </p>

          {/* Discord参加方法部分 非表示・アナウンス文のみ表示 */}
          <div className="mb-3">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-3 text-base sm:text-lg">
              本イベントは公式クリエイター限定の催しです。どうしても参加したいという人は公式クリエイターに共同制作者として動画制作に携われるか聞いてみよう。（個人の都合があるので断られても文句を言うのはやめよう！）
            </div>
          </div>

          {/* 公式Discordの画像（拡大クリック対応） */}
          <div className="flex flex-col gap-2 mb-4">
            {["/ver_event/New_Event_3_1.png", "/ver_event/New_Event_3_2.png", "/ver_event/New_Event_3_3.png"].map((src, i) => (
              <button
                key={src}
                type="button"
                className="focus:outline-none"
                onClick={() => setZoomImg(src)}
                style={{ background: "none", padding: 0 }}
                aria-label={`Discord画像${i + 1}を拡大`}
              >
                <Image
                  src={src}
                  alt={`イベント告知${i + 1}`}
                  width={800}
                  height={320}
                  className="rounded shadow w-full h-auto max-w-full hover:scale-105 transition-transform"
                  sizes="100vw"
                  style={{ maxWidth: "100%", cursor: "zoom-in" }}
                />
              </button>
            ))}
          </div>

          {/* 公式動画リンク */}
          <div className="mb-4">
            <p className="font-semibold mb-1">公式「Meant to Be Japanese ver.」の動画はこちら：</p>
            <a
              href="https://youtu.be/N3cplw5i6jc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded text-pink-800 font-bold shadow"
            >
              YouTubeで動画を見る
            </a>
          </div>
        </section>

        {/* 歌詞（カード形式・縦並び・幅広） */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">歌詞（Lyrics）</h2>
          <div className="flex flex-col gap-6 items-center">
            {/* 日本語版 */}
            <div className="bg-white rounded shadow p-6 flex flex-col w-full max-w-2xl mx-auto">
              <h3 className="text-md font-bold text-pink-700 mb-2">＜日本語版＞<br />(作詞：Quyang 日本語訳詞：霜月はるか)</h3>
              <div className="text-base leading-relaxed break-words">
                瞼を閉じれば<br />
                浮かぶ君と過ごした軌跡<br />
                これからもずっと　そう信じてた<br />
                私が星を失っても　世界は回り続けるでしょう<br />
                けれど想いは空に残るから<br />
                恐れることなどない<br />
                時の果てで　手を繋ぎ合おう<br />
                永遠に消えない約束<br />
                悲しまないで　何も変わらない<br />
                そう　決まっていたこと<br /><br />

                幾多乗り越え<br />
                引き寄せ合う絆の糸が<br />
                紡ぎだす物語(ストーリー)　その結末は？<br />
                誰かを想い流す涙<br />
                本当の笑顔をくれた人<br />
                たとえ世界の全てが阻んでも　君の元へ向かう<br />
                空の果てで　また巡り逢おう<br />
                永遠に消えない約束<br />
                悲しまないで　何も変わらない<br />
                そう　決まっていたこと<br /><br />

                この絆ごと　Ha--<br />
              </div>
            </div>
            {/* 英語版 */}
            <div className="bg-white rounded shadow p-6 flex flex-col w-full max-w-2xl mx-auto">
              <h3 className="text-md font-bold text-blue-700 mb-2">＜英語版＞<br />(Lyricist:雷十一)</h3>
              <div className="text-base leading-relaxed break-words">
                Above the sky, beneath the sea<br />
                Hiding in the space or lost in our destiny<br />
                Believe in me and be with me<br />
                But everything's meant to be<br />
                I've seen people come and go with hand a broken dream<br />
                When the stars are gone, the night is cold, being so lonely<br />
                But if it's my only chance<br />
                To catch you in this tiny life<br />
                The world on fire and I will hold you tight<br />
                Till the end of the time, None of us will say goodbye<br />
                And my love won't die<br />
                For and ever is you and I<br />
                Don't you leave a tear for me<br />
                Don't you sleep with a broken dream<br />
                When everything's meant to be<br /><br />

                Through the fire and through the time<br />
                Through the thing i called it love and brought you by my side<br />
                Believe in you and hold your hand<br />
                Any stories can never end?<br />
                I've seen people laugh and cry with someone stick in mind<br />
                Someone got the reason but never really find the rhyme<br />
                But I've met you in this life<br />
                I'll be brace and try my very best<br />
                The world is mad but I will hold you tight<br />
                Till the end of the time,<br />
                None of us will say goodbye<br />
                And my love won’t die<br />
                For and ever is you and I<br />
                Don't you leave a tear for me<br />
                Don't you sleep with a broken dream<br />
                When everything's meant to be<br /><br />

                Like you and I are meant to be<br />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

AnniversaryCommemorativeSubmission.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};