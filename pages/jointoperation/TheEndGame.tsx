import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-emerald-400/60 to-emerald-100 border-l-8 border-emerald-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-emerald-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-emerald-900">{children}</span>
    </div>
  );
}

// キャプション付き画像
function CaptionedImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden">
        <Image src={src} alt={alt} width={480} height={270} />
        {caption && (
          <div className="bg-emerald-50 px-4 py-1 text-xs text-emerald-800 border-t border-emerald-200">{caption}</div>
        )}
      </div>
    </div>
  );
}

// 注意バナー
function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 px-3 py-2 my-3 rounded text-red-700 flex items-center gap-2">
      <span className="material-symbols-outlined text-red-400">warning</span>
      <span>{children}</span>
    </div>
  );
}

export default function TheEndGamePage() {
  return (
    <>
      <Head>
        <title>連合作戦「最終公演」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="連合作戦「最終公演」のダンジョン構成・ボスギミック・注意点などを解説！" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">stadium</span>
          連合作戦「最終公演」 攻略
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/JointOperation/jo_TheEndGame.PNG"
            alt="最終公演 ダンジョン全景"
            width={560}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="account_tree">ダンジョン構成</SectionTitle>
        <div>
          1階受付、2階ロビーの敵を倒すとエレベーターへの道が解放され、エレベーター前の敵を倒すことでエレベーターに乗れる。<br />
          エレベーターに乗ると次のエリアにワープでき、出てすぐのホール入り口前の敵を全て倒すことでシンガーのいるホールに入れる。
          最後に舞台上にいるシンガーを倒すことでダンジョンクリアとなる。<br />
          2階ロビーへの階段とエレベーター前までの道にバリアが貼ってあり、直前の敵を倒すと少し間を置いてバリアが解除される。
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
          <CaptionedImage
            src="/JointOperation/jo_TheEndGame_wall1.PNG"
            alt="2階ロビーへのバリア"
            caption="2階ロビーへのバリア"
          />
          <CaptionedImage
            src="/JointOperation/jo_TheEndGame_wall2.PNG"
            alt="エレベーター前のバリア"
            caption="エレベーターエリア前のバリア"
          />
        </div>

        <SectionTitle icon="theater_comedy">ボス戦：シンガー傀儡</SectionTitle>
        <div>
          戦闘開始時は敵が攻撃を始めるまでダメージが大幅に軽減される。<br />
          時間経過で無敵状態になり分身を2体召喚するので、これを撃破してシンガーの攻撃を止めよう！
        </div>
        <CaptionedImage
          src="/JointOperation/jo_TheEndGame_boss.PNG"
          alt="シンガー傀儡戦"
          caption="シンガーが無敵になるので分身を倒そう！"
        />

        <SectionTitle icon="info">注意点</SectionTitle>
        <Warning>
          エレベーターでワープすることを知らないと進めないので、道順はしっかり把握しておこう。
        </Warning>
        <div>
          幸いそこまでステージは入り組んでいないので、多少迷ってもゴールにはたどり着けるはず。
        </div>
        <CaptionedImage
          src="/JointOperation/jo_TheEndGame_elevator.PNG"
          alt="エレベーター"
          caption="エレベーターで次のエリアへ"
        />
      </div>
    </>
  );
}

TheEndGamePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};