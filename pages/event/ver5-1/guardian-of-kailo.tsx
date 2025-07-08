import React from "react";
import Image from "next/image";
import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";

export default function GuardianOfKailoEventPage() {
  return (
   <>
    <Head>
      <title>【幻塔攻略】イベント一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）のイベントを紹介。" />
    </Head>

    <div className="p-4 sm:p-8 space-y-8">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Ver5.1イベント 「キルオの守護者」 GUARDIAN OF KAILO
        </h1>
        <p className="text-base text-gray-700 mb-2">
          Ver5.1のイベント「キルオの守護者」について、イベント内容ごとにまとめています。
        </p>
      </section>
      {/* イベント紹介 1（紫背景） */}
      <section className="bg-purple-100 rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">宇宙船ピクシー</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Image
            src="/ver_event/New_Event_1_1.png"
            alt="イベント1画像"
            width={400}
            height={150}
            className="rounded w-full sm:w-72 h-auto object-cover"
          />
          <div>
            <p className="text-gray-700">
              2714:宇宙漫遊、第N種接近遭遇、異形Xの3つのクエスト・ミッションをこなそう。
            </p>
            <p className="text-gray-500 text-sm mt-2">
              開催日：6月24日アプデ後～7月29日6:00(JST)
            </p>
          </div>
        </div>
        {/* ▼ イベントクエスト・ミッション3種の説明 */}
        <div className="mt-6 space-y-4">
          {/* クエスト1 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-yellow-50 rounded p-3">
            <Image
              src="/ver_event/New_Event_1_1_1.png"
              alt="宇宙漫遊"
              width={220}
              height={120}
              className="rounded w-full sm:w-56 h-auto object-cover"
            />
            <div>
              <h3 className="font-semibold text-base mb-1">2714:宇宙漫遊</h3>
              <p className="text-gray-700">
                画像をクリックすると追跡できるクエストをこなしていこう！<br />
                第1幕は7つのクエストがあり、画像は下にスクロールできるので注意。<br />
                第2幕は7月1日に開放。<br />
              </p>
            </div>
          </div>
          {/* クエスト2 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-green-50 rounded p-3">
            <Image
              src="/ver_event/New_Event_1_1_2.png"
              alt="第N種接近遭遇"
              width={220}
              height={120}
              className="rounded w-full sm:w-56 h-auto object-cover"
            />
            <div>
              <h3 className="font-semibold text-base mb-1">第N種接近遭遇</h3>
              <p className="text-gray-700">
                毎週4つのクエストが開放され(月曜更新)、画像をクリックすると追跡できる。
                クエストは下にスクロールできるので注意<br />
                クエストクリア後にクエストに正しいラベルを貼ることで追加で商店の通貨が貰える。<br />
                ラベルはクエスト画像の右側のスペースにある0～3の数字のことで、0は遠距離から観察、1は近距離で観察・撮影、2は異常物体の影響を観察・撮影、3は異常物体と直接接触することを表すらしい。<br />
                ラベルを間違えても一切ペナルティは無いので、適当に総当たりでつけてもOK。
                例として、第1週は墜落現場が2、品心調査は3、流転の惑星が1、乱気流チェイスが3。<br />
              </p>
            </div>
          </div>
          {/* クエスト3 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-purple-50 rounded p-3">
            <Image
              src="/ver_event/New_Event_1_1_3.png"
              alt="異形X"
              width={220}
              height={120}
              className="rounded w-full sm:w-56 h-auto object-cover"
            />
            <div>
              <h3 className="font-semibold text-base mb-1">異形X</h3>
              <p className="text-gray-700">
                特定のモンスターを倒すクエスト。<br />
                クエストは全部で8つで、毎週2つ開放される。 <br />
                イベントページに撮影の進捗と書かれているが、倒すだけでOK。<br />
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* イベント紹介 2（水色） */}
      <section className="bg-cyan-100 rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">スターダストの試練</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="/ver_event/New_Event_1_2.png"
              alt="イベント2画像"
              width={400}
              height={150}
              className="rounded w-full sm:w-72 h-auto object-cover"
            />
            <div>
              <p className="text-gray-700">
                Ver4.8のニンジンバスケットとほぼ同じ内容。対応表を基に今欲しいマスを目指し突き進もう！<br />
                戦闘では物理の最適編成を使えるので、初心者でも問題なくクリアできるぞ！<br />
              </p>
              <p className="text-gray-500 text-sm mt-2">
                開催日：6月25日13:00～7月10日6:00(JST)
              </p>
            </div>
          </div>
          {/* 下に追加画像 */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/ver_event/New_Event_1_2_1.png"
              alt="早見表"
              width={500}
              height={200}
              className="rounded w-full sm:w-[500px] h-auto object-cover"
            />
            {/* 新たに画像追加＋キャプション */}
            <div className="flex flex-col items-center">
              <Image
                src="/ver_event/New_Event_1_2_2.png"
                alt="ステッカー宝箱"
                width={300}
                height={120}
                className="rounded w-full sm:w-[300px] h-auto object-cover"
              />
              <span className="text-xs sm:text-sm text-gray-700 mt-1">
                ステッカー宝箱（欠片20個で1箱）
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* イベント紹介 3（ピンク） */}
      <section className="bg-pink-100 rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">星々闘技場</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="/ver_event/New_Event_1_3.png"
              alt="星々闘技場"
              width={400}
              height={150}
              className="rounded w-full sm:w-72 h-auto object-cover"
            />
            <div>
              <p className="text-gray-700">
                内容は以前の爆撃アリーナそのまま<br />
                大きい爆弾は体で受け止めることも可能なので、着弾前に当たりに行くのも有効だぞ！<br />
                また、大きい爆弾の周りのマスを消して爆弾を孤立させることで爆弾を使用不可にできるぞ！<br />
                孤立した爆弾の上に乗れればこの戦法を対策できるが、乗れないとそのまま落ちかねないので注意
              </p>
              <p className="text-gray-500 text-sm mt-2">
                開催日：7月8日13:00～7月29日6:00(JST)
              </p>
            </div>
          </div>
          {/* 下に追加画像 */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/ver_event/New_Event_1_3_1.png"
              alt="早見表"
              width={500}
              height={200}
              className="rounded w-full sm:w-[500px] h-auto object-cover"
            />
          </div>
        </div>
      </section>
      {/* イベント紹介 4（未開催、画像なし） */}
      <section className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">果てなき星域（未開催）</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-72 h-28 bg-gray-200 flex items-center justify-center rounded text-gray-400">
            画像準備中
          </div>
          <div>
            <p className="text-gray-700">
              いわゆるフォールガ〇ズ。一部アルケーの移動速度・ジャンプ力UPなどが有効。
            </p>
            <p className="text-gray-500 text-sm mt-2">
              開催日：7月15日13:00～7月29日6:00(JST)
            </p>
          </div>
        </div>
      </section>
    </div>
   </>
  );
}

GuardianOfKailoEventPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};