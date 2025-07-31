import React from "react";
import Head from "next/head";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function SkebScriptSample() {
  return (
    <>
      <Head>
        <title>Skebスクリプト制作 見本 | 幻塔攻略データベース</title>
        <meta
          name="description"
          content="Skebで依頼できるゲーム解説スクリプト制作のサンプル・納品例"
        />
      </Head>
      <div className="w-full max-w-full min-h-screen space-y-8 px-2 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-sky-700 drop-shadow flex items-center gap-2">
          Skebスクリプト制作 見本
        </h1>

        <section>
          <p className="text-base sm:text-lg text-gray-700">
            こちらはSkebでお受けしている「ゲーム解説スクリプト制作」の見本です。<br />
            YouTube動画用の実例を元に、実際の納品形式・文量感・構成の雰囲気をご確認いただけます。
          </p>
        </section>

        <hr className="my-4 border-green-300" />

        <section>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-2 border-l-4 border-green-400 pl-2">
            <span>📌</span>対応ジャンル
          </h2>
          <ul className="list-disc ml-6 text-gray-800 text-base sm:text-lg mb-2">
            <li>ゲームキャラ解説</li>
            <li>新キャラ速報・性能分析</li>
            <li>メタ読み・環境変化の紹介 など</li>
          </ul>
          <p className="text-sm text-gray-600">
            ゲーム関係以外でもご希望に応じて構成を柔軟に調整できます。
          </p>
        </section>

        <hr className="my-4 border-green-300" />

        <section>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-2 border-l-4 border-green-400 pl-2">
            <span>💡</span>文字数カウントについて
          </h2>
          <blockquote className="border-l-4 border-sky-400 pl-4 text-gray-700 bg-blue-50 py-3 rounded">
            本文中には構成を分かりやすくするためにパート毎の注釈（例：■始めの挨拶）が入っていますが、<b>Skebでの文字数カウントは実際に読み上げる本文部分のみ</b>となります。<br />
            注釈や補足説明は成果物の理解補助のために含めています。
          </blockquote>
        </section>

        <hr className="my-4 border-green-300" />

        <section>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-2 border-l-4 border-green-400 pl-2">
            <span>📝</span>見本スクリプト（全文）
          </h2>
          <div className="mb-2 text-gray-700">
            <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2">文字数：1669</span>
            <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">動画URL：<a href="https://youtu.be/JS2dgVir0Y4" className="text-blue-600 underline" target="_blank" rel="noopener">https://youtu.be/JS2dgVir0Y4</a></span>
          </div>
          <div className="text-sm sm:text-base bg-gray-50 border-l-4 border-gray-300 p-4 whitespace-pre-line rounded leading-relaxed">
{`■始めの挨拶
皆さんこんにちはこんばんは！ヒロシャチョーです！
今回はver5.2で実装されたシードルのガチャについて解説をしていきます！
メリルアムド以来の雷アタッカーがついに登場！
先陣を切るアッシャー号元艦長の実力や如何に！？
それでは行ってみましょう！

■基本性能（簡易紹介）
まずは基本性能から。
シードルの性能についてはテストサーバーから大きな変更点は無い為、
詳しい解説はテストサーバーの動画をご覧ください。
ここでは簡単な解説だけしていきます。
シードルは表で殴ることだけを考えた性能を持った純粋なメインアタッカーです。
スキルや凸効果に裏ダメージは無く、自身のスキル倍率を伸ばす内容が多くみられます。
スキル回しはスキル使用で通常攻撃を強化したら、
回避派生攻撃のクロスロンドが時間経過で発動可能になるまで通常攻撃を連打し、
クロスロンドが解放されたら回避攻撃、クロスロンド、通常5段目の
ループを繰り返した後に第2スキルの瞬歩連撃で締めるという流れになっています。

■テストサーバーからの変更点（変更無しの場合と有りの場合の2パターン撮っておく）
続いて、テストサーバーからの変更点について。
パターン①：テストサーバーから性能の変更はありませんでした。
パターン②：テストサーバーからの変更点は画面の通りとなっています。

■サボテン結果とおススメの凸数
続いてサボテン結果とおススメの凸数について。
テストサーバーでのサボテン結果は画面の通りとなっています。
特に武器1凸と完凸の伸び幅が大きく、
完凸した旧編成からの更新には最低限武器完凸とボリ無凸4セットが必要になります。
コスパを重視するなら武器1凸とボリ無凸4セット、
そこから更に火力を伸ばしたいなら武器の凸を進めることを優先しましょう。
雷属性はレイの復刻が無い関係でサポーターとして使えるキャラが限定を含めても少ない問題があるため、
アタッカー性能に特化したシードルか、
アントリアのような使いまわしが利くサポーターの凸を進めるかはよーく検討しましょう！

■引くべき？
続いてシードルを引くべきかどうかについて。
シードルは単体で完結したゴリゴリのメインアタッカーです。
武器の凸・ボリション効果などを合わせれば、
バフ量としてはサポーターのアントリアにも引けを取らない性能をしていますが、
裏ダメージが一切ないことから将来サポーターとして採用されることはなさそうです。
そのため、手持ちの雷属性のメインアタッカーを更新したい！
という人がシードルを引くか検討することになります。
これまでメインアタッカーとしてレイ、ヴォイド、アントリアを使っていた人は
それらをサポーターに回すことで火力アップを望めますが、
ブレヴィ、ノーラ、メリルアムドを元々メインアタッカーにしていた人は
それらをサポーターとして使いまわすことが難しいため、
大幅な火力アップとはいかない可能性が高いです。
ノーラについては武器完凸とボリション4セットが揃っていればサポーター運用も可能ですが、
異能キャラを高凸で持っているならここでリソースを使わずに、
そのまま次の異能ガチャまで温存し続けるのを個人的にはおススメします。

■まとめ
それではここまでの内容をまとめていきます。
シードルはメリルアムド以来の純粋なメインアタッカーで、
単体で完結した性能からサポーターを選ばず活躍が見込めます。
武器1凸と完凸の伸び幅が大きいため、最初は武器1凸とボリ無凸4セットを狙い、
サポーターが充実しているなら武器の凸を優先して進めることをおススメします。
ただし、既に異能サンドで編成を組んでいる場合は引くとしても武器1凸、ボリ無凸4セットあたりで止めて、
次の異能のために温存するのが無難です。

■締めの挨拶
それではここまでご視聴いただきありがとうございました！
今回はシードルのガチャについて解説をしていきましたがいかがだったでしょうか？
裏性能が皆無な点に少し物足りなさを感じてしまいますが、
メインアタッカーとしては十分な性能をお出しされているので、
雷一筋の人はしっかりリソースを注ぎ込みましょう！
今回の動画が役に立ったと思っていただけたら、
チャンネル登録・高評価・コメントでの応援をよろしくお願いいたします！
それでは次回の動画でまたお会いしましょう！お相手はヒロシャチョーでした！バイバイ！
`}
          </div>
        </section>

        <hr className="my-4 border-green-300" />

        <section>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-2 border-l-4 border-green-400 pl-2">
            <span>🔗</span>Skeb依頼はこちらから
          </h2>
          <a
            href="https://skeb.jp/@hiro_Shacho"
            className="inline-block text-sky-700 underline font-bold text-base sm:text-lg"
            target="_blank"
            rel="noopener"
          >
            Skebページへ
          </a>
        </section>
      </div>
    </>
  );
}

SkebScriptSample.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};