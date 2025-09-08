import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（装飾強化・アイコン付き・帯色）
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-red-400/60 to-red-100 border-l-8 border-red-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-red-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-red-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-red-300 overflow-hidden">
        {isVideo ? (
          <video src={src} controls width={480} height={270} style={{ background: "#222" }}>
            {alt}
          </video>
        ) : (
          <Image src={src} alt={alt} width={480} height={270} />
        )}
        <div className="bg-red-50 px-4 py-1 text-xs text-red-800 border-t border-red-200 w-full text-center">{caption}</div>
      </div>
    </div>
  );
}

// 画像・動画横並び
function RowMedia({
  medias,
}: {
  medias: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center my-3">
      {medias.map((media) => (
        <CaptionedMedia key={media.src} {...media} />
      ))}
    </div>
  );
}

export default function PrisonofExecutionPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「刑辟牢獄」攻略 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「刑辟牢獄」攻略。ギミック・攻略ポイント・チーム編成を徹底解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-red-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-500">gavel</span>
          討伐作戦「刑辟牢獄」 攻略
        </h1>
        {/* トップ画像（任意で追加可） */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/PrisonofExecution.PNG"
            alt="刑辟牢獄 フィールド全景"
            width={640}
            height={320}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="psychology">シールドブレイクでギミックが発動！</SectionTitle>
        <div>
          この討伐のギミックのほとんどは刑天のシールドをブレイクすることで発動する。<br />
          そのため、火力が足りているならわざわざギミックを発動させずともクリアは可能となっている。
        </div>

        <SectionTitle icon="travel_explore">ギミック①：轟雷砲台</SectionTitle>
        <div>
          フィールドの左右には単発式の砲台が設置されている。<br />
          この砲台で刑天を攻撃することで割合ダメージを与えられる。<br />
          砲台は1発撃つとチャージ状態になり、時間経過で再使用可能になる。<br />
          敵が弱体化しているので火力としては若干物足りないが、恩恵でも火力貢献できるのでパーティの火力に不安がある場合は使用するのもあり。<br />
          使用する場合はチャージが終わるたびに2つの砲台を素早く使って次弾装填までの時間を早めよう。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_1.mp4",
              alt: "砲台のチャージ時間に注意！",
              caption: "砲台はボタンを押してから弾を発射するまでに少しチャージ時間があるので注意！",
            },
          ]}
        />

        <SectionTitle icon="visibility">ギミック②：原初の影</SectionTitle>
        <div>
          一定時間ごとに刑天の分身が召喚され、フィールドを直線的に横断する攻撃を仕掛けてくる。<br />
          分身は2体召喚され、ターゲットを取っているプレイヤーを中心に十字型の予告範囲が表示される。<br />
          予告範囲が出現して少しすると分身2体が突進してくるので、この範囲内に留まらないようにしよう。<br />
          ダメージは即死級とまではいかないが、下手に十字の交差する所で攻撃を受けると大ダメージは免れないので素直に避けるのが吉。<br />
          なお、砲台のある左右のエリア内には分身が出現しない。<br />
          もっとも、左右の砲台エリアは狭いので刑天の攻撃が基本直撃するので有効かと言われると微妙。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_2.PNG",
              alt: "分身の攻撃に注意！",
              caption: "分身の攻撃が交差する点には立たないように！",
            },
          ]}
        />

        <SectionTitle icon="construction">ギミック③：裁断の釘</SectionTitle>
        <div>
          刑天のシールドをブレイクすると4人のプレイヤーが指定され、足元に赤い範囲円が表示される。<br />
          一定時間後、指定されたプレイヤーのいる場所に釘が落下して大ダメージを受ける。<br />
          落下した釘の周囲に剛毅共鳴以外のプレイヤーがいると持続ダメージを受けるので釘落下後は釘から離れるようにしよう。<br />
          また、この釘は次に紹介する「ギミック④：鬼神演武」にも関係するギミックなのでそちらの説明も合わせて読んでもらいたい。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_3.PNG",
              alt: "釘が落下してくるギミック",
              caption: "指定のプレイヤーのいる場所に釘が落ちてくる",
            },
          ]}
        />

        <SectionTitle icon="sports_kabaddi">ギミック④：鬼神演武</SectionTitle>
        <div>
          刑天のシールドをブレイクすると刑天はチャージ状態に入る。<br />
          この時、フィールドの四隅から分身が出現し、黄色い紐で結びついたプレイヤーに目掛けて突進攻撃を仕掛けてくる。<br />
          この突進をフィールド中央の刑天本体に当てると大ダメージを与えられ、4体の突進を全て当てることで刑天のチャージを中断できる。<br />
          しかし、分身は突進の際にギミック③の釘に衝突するとそこで突進を止めてしまうため、ギミック③で指定されたプレイヤーは釘をフィールドの東西南北に捨ててくる必要がある。<br />
          さらにギミック③で指定された4人の釘とは別に分身と刑天の間に釘が1本設置されるので、剛毅はこの釘を破壊することに集中しよう。<br />
          釘は一定回数攻撃を当てると破壊できるので、グノノ等のヒット数が多く定点攻撃が得意な武器を持っておこう。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_4.PNG",
              alt: "紐付き分身ギミック",
              caption: "紐が付いたら自身と分身の間に刑天が挟まるような位置に移動しよう",
            },
            {
              src: "/raid/PrisonofExecution_5.PNG",
              alt: "釘をまとめるギミック",
              caption: "ギミック③の釘はフィールドの東西南北のどこかにまとめておこう！",
            },
          ]}
        />
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_7.PNG",
              alt: "釘の破壊が必要",
              caption: "必ず1本は釘を破壊する必要がある",
            },
          ]}
        />

        <SectionTitle icon="local_fire_department">ギミック⑤：灰燼の炎</SectionTitle>
        <div>
          時間経過で発動するギミックで、フィールド中央と左右の砲台エリアに青白い円が出現する。<br />
          全ての円の中に2人以上プレイヤーが入っていないとフィールド全体に即死級の大ダメージが発生する。<br />
          この青い円と共にシールドを貼ることがあるので、ギミックをこなす場合は中央に剛毅を含めた4人が集まるようにすると良い。<br />
          なお、ギミック④：鬼神演武発動中に灰燼の炎は発動せず、砲台エリアの円は砲台に乗っていると円の中にいるとカウントされないので注意しよう。
        </div>
        <RowMedia
          medias={[
            {
              src: "/raid/PrisonofExecution_6.PNG",
              alt: "青白い円ギミック",
              caption: "青白い円の中に入ろう！（ソロだと発動しない可能性大）",
            },
          ]}
        />

        <SectionTitle icon="error">ギミックは正常に動作しないことも</SectionTitle>
        <div>
          ギミック③：裁断の釘とギミック⑤：灰燼の炎は正常にギミックが発動しないこともある。<br />
          裁断の釘は釘が落下してこないと分身も出現せず刑天のチャージを止められないので中央の攻撃範囲から離れるようにしよう。<br />
          灰燼の炎は青白い円が表示されず、確定で大ダメージを受けるので恩恵がグレイフォックスの死亡回避やフィオナの単発ダメージ無効を付与してあげよう。
        </div>

        <SectionTitle icon="group">チーム編成</SectionTitle>
        <div>
          刑天は素の火力も高めなので剛毅を1人採用したい。<br />
          ただ、剛毅が攻撃を誘導しても範囲攻撃で周りの強攻はダメージを受けるので、恩恵は範囲攻撃に合わせて回復を準備しよう。<br />
          ギミック込みで攻略する場合は剛毅を2人にして速攻で釘を破壊できるようにしよう。<br />
          剛毅1～2・強攻3～4・恩恵4くらいのパーティが安定する。<br />
          火力さえ足りていればギミックを発動しない方が楽なので、剛毅はシールド中の攻撃を控えめにするのを推奨。
        </div>
      </div>
    </>
  );
}

PrisonofExecutionPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};