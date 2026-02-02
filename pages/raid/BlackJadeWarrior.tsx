import { ReactElement } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import Image from "next/image";

// セクションタイトル（TrafficControl のスタイルに合わせる）
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

// キャプション付き画像または動画（mp4/webm/ogg）
function CaptionedMedia({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  const isVideo = !!src.match(/\.(mp4|webm|ogg)$/);
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden" style={{ width: "100%", maxWidth: 640 }}>
        {isVideo ? (
          <video controls width={640} height={360} style={{ width: "100%", height: "auto", display: "block", background: "#000" }}>
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image src={src} alt={alt || ""} width={640} height={360} style={{ width: "100%", height: "auto", display: "block" }} />
        )}
        <div className="bg-emerald-50 px-4 py-1 text-xs text-emerald-800 border-t border-emerald-200 text-center">
          {caption}
        </div>
      </div>
    </div>
  );
}

// 画像・動画を最大2枚ずつ横並び（以降は改行）
function RowMedia({
  items,
}: {
  items: { src: string; alt?: string; caption?: string }[];
}) {
  const chunks: { src: string; alt?: string; caption?: string }[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    chunks.push(items.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map(item => (
            <div key={item.src} className="flex-1" style={{ maxWidth: 640 }}>
              <CaptionedMedia {...item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BlackJadeWarriorPage() {
  return (
    <>
      <Head>
        <title>討伐作戦「玄玉凶兵」 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「玄玉凶兵」の攻略ページ" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">military_tech</span>
          討伐作戦「玄玉凶兵」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/BlackJadeWarrior.PNG"
            alt="玄玉凶兵 トップ"
            width={800}
            height={360}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="bolt">シールドブレイクと集合ギミックをこなして安全に</SectionTitle>
        <div>
          この登場時期が時期なだけにごり押しも可能だが、シールドブレイクと集合ギミックにいっぱいするとかなりの痛手を負うことになる。<br />
          集合ギミックは発動前に倒せたりもするが、シールドブレイクはほぼ確実に必要なので多少は意識しよう。（8人フルで揃っているなら普通に攻撃しているだけで割れはする）<br />
        </div>

        <SectionTitle icon="whatshot">ギミック①：怒気（小円ギミック）</SectionTitle>
        <div>
          プレイヤーが朱厭にダメージを与えるたびに怒気を1スタック獲得する。<br />
          この怒気が15スタックに達するとプレイヤーを中心にした小円が表示され、20スタックに達すると短時間で小円が爆発する。<br />
          この爆発は小円の中心にいる本人にはダメージが無いが、周囲の味方にはHPシールドを無視したダメージを与えてくる。<br />
          爆発に吹っ飛ばし効果もあるのでなるべく小円の範囲内に味方が入らないように注意してあげよう。<br />
        </div>

        <RowMedia
          items={[
            {
              src: "/raid/BlackJadeWarrior_1.PNG",
              alt: "15スタックで小円出現、20スタックで短時間後に爆発",
              caption: "15スタックで小円出現、20スタックで短時間後に爆発",
            },
          ]}
        />

        <SectionTitle icon="shield">ギミック②：決闘（シールドブレイク）</SectionTitle>
        <div>
          朱厭は定期的にプレイヤー1名を指定して決闘を挑んでくる。<br />
          決闘は朱厭のシールドをブレイクできれば成功になり、敵が受けるダメージが増加して剛毅がシールドを割れば敵のHPに割合ダメージを与えられる。<br />
          シールドブレイクに失敗すると朱厭の必殺技が発動し、近くにいると大ダメージを受ける。（無防備な状態だと剛毅でも死亡する）<br />
          決闘に指定されるプレイヤーは剛毅が優先され、決闘中は敵の攻撃が強くなる。<br />
          シールドをブレイクする際は朱厭の前方から攻撃をすると普段よりシールドを削りやすい状態になっているので、必ず正面から挑むようにしよう。<br />
          この正面にいるとシールドブレイクが強化されるバフ自体は指定されたプレイヤー以外にも有効なので、強攻が全員で正面から殴るだけでもシールドブレイクは可能だったりする。<br />
        </div>

        <RowMedia
          items={[
            {
              src: "/raid/BlackJadeWarrior_2.PNG",
              alt: "シールドを貼ったら正面からブレイクしよう！",
              caption: "シールドを貼ったら正面からブレイクしよう！",
            },
          ]}
        />

        <SectionTitle icon="dangerous">ギミック③：憤怒の炎（大円ギミック）</SectionTitle>
        <div>
          朱厭は定期的にプレイヤー1名を指定して憤怒の炎（大円ギミック）を発動してくる。<br />
          指定されたプレイヤーを中心に赤い大円が表示され、一定時間後に大円内に7人以上のプレイヤーがいないと大ダメージ＆回復阻害を受ける。<br />
          円の中に7人以上いればダメージが軽減されて回復阻害も防げるので、必ず全員で円の中に入ろう。<br />
          指定されるプレイヤーは剛毅優先で、剛毅は1人で2人分にカウントされる。<br />
          そのため、剛毅が1人のチームなら最低6人生き残っていればギミックをこなせるようになっている。<br />
          よくある失敗として朱厭の攻撃や小円ギミックによって吹っ飛ばされて大円から外れてしまうというパターンが多い。<br />
          特に大円の中心に選ばれたプレイヤーが朱厭の攻撃で吹っ飛ばされると高確率で失敗するので不屈の更新は忘れずに。<br />
        </div>

        <RowMedia
          items={[
            {
              src: "/raid/BlackJadeWarrior_3.PNG",
              alt: "大円が出たら全員集合！",
              caption: "大円が出たら全員集合！",
            },
          ]}
        />

        <SectionTitle icon="local_fire_department">ギミック④：熔火鋳兵（炎の剣）</SectionTitle>
        <div>
          朱厭が炎の剣を使った攻撃をした後にフィールドに剣が突き刺さって残ることがある。<br />
          この剣は攻撃を当てると前方に破片が飛んでいき、この破片が朱厭に当たると割合ダメージを与えられる。<br />
          剣はその場で突き立てるパターンと遠くに投げるパターンがあり、投げるパターンだとフィールド外に剣が飛んでいった場合は剣が残らない。<br />
          そのため、戦闘中はなるべくフィールドの端で戦って剣が着弾するスペースを確保しよう。注意点として、剣は数回殴ると壊れるので範囲攻撃に巻き込むと速攻で消えてしまう。<br />
          ちゃんと前方に朱厭がいる位置取りで破片を飛ばさないとダメージを与えられないので、剣を殴る時は自動範囲攻撃が無い状態で朱厭を正面に捉えて殴るようにしよう。<br />
        </div>

        <RowMedia
          items={[
            {
              src: "/raid/BlackJadeWarrior_4.PNG",
              alt: "剣を攻撃して破片を飛ばそう！",
              caption: "剣を攻撃して破片を飛ばそう！",
            },
          ]}
        />

        <SectionTitle icon="psychology">ギミックダメージを防ぐテクニック</SectionTitle>
        <div>
          ギミックによるダメージはアルケーのクーラントやゼロ・フィオナ連携の被ダメージ無効などで防ぐことが可能。<br />
          デスコントロールだとダメージ自体は受けてしまうので、回復阻害と合わせて耐えるのが難しいので注意しよう。<br />
        </div>

        <SectionTitle icon="military_tech">ソロクリアも可能</SectionTitle>
        <div>
          かなり昔の討伐ということもあって基本のHPが低い。<br />
          シールドブレイクは必殺技が来たら逃げれば良く、大円のダメージもアルケーで防げてしまう。<br />
          そのうえ異能ノーラの「討伐作戦で異様にダメージが出る」仕様に対して耐性が無いのでソロでの火力要求のハードルもかなり低い。<br />
          ノーラは回避攻撃等のバイクを使った攻撃のシールドブレイクが異様に強いので、ギミック対策さえ積めば誰でもソロ討伐できるぞ！<br />
        </div>

        <SectionTitle icon="groups">チーム編成</SectionTitle>
        <div>
          強攻4～6人、剛毅1人、恩恵1～3人の編成で挑もう。<br />
          シールドブレイクと大円ギミック以外に大した脅威は無いので、剛毅がシールドを割ったら大円ギミックが来る前に速攻で終わらせてしまおう。<br />
        </div>

        <SectionTitle icon="ondemand_video">ソロ討伐動画</SectionTitle>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/krNz2JlHn5M?rel=0&modestbranding=1"
            title="玄玉凶兵 ソロ討伐動画"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded shadow border border-emerald-200"
            style={{ maxWidth: "100%", aspectRatio: "16/9" }}
          />
        </div>
      </div>
    </>
  );
}

BlackJadeWarriorPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};