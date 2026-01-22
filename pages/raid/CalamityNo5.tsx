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

// キャプション付き画像または動画（mp4）
function CaptionedMedia({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div className="w-full flex flex-col items-center my-3">
      <div className="rounded-lg shadow border-2 border-emerald-300 overflow-hidden">
        {isVideo ? (
          <video controls width={640} height={360} style={{ width: "100%", height: "auto", display: "block" }}>
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

export default function CalamityNo5Page() {
  return (
    <>
      <Head>
        <title>討伐作  「厄災5号」 | 幻塔攻略データベース</title>
        <meta name="description" content="討伐作戦「厄災5号」の攻略ページ" />
        {/* Google Fonts: Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-emerald-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">medical_services</span>
          討伐作戦「厄災5号」
        </h1>

        {/* トップ画像 */}
        <div className="rounded-lg shadow mb-4 mx-auto w-fit" style={{ maxWidth: "100%" }}>
          <Image
            src="/raid/CalamityNo5.PNG"
            alt="厄災5号 トップ"
            width={800}
            height={360}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <SectionTitle icon="bolt">攻めと守りの切り替えを意識しよう！</SectionTitle>
        <div>
          この討伐ではほぼ常時、強力な防御バフによって敵へのダメージが通りづらくなっている。
          特定のタイミングで防御バフが解除されるので普段はギミックによるダメージを防ぐことに集中しつつ、防御バフが解除されたら一気に火力を叩き込めるように意識しよう！
        </div>

        <SectionTitle icon="shield">ギミック①：バリア過負荷</SectionTitle>
        <div>
          ディザスターⅤは強力な防御バフを所持している。
          このバフはボスの頭上にカウントが表示されている間は常に有効で、この間はほとんどダメージを与えられない。（カウント中の防御バフの効果量は一定）
          カウントが最大の100に達するとボスのバリアが爆発して一定時間防御バフを解除できる。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_1.PNG"
          alt="ボスの頭上にカウントがある間は防御バフでダメージが通りづらい"
          caption="ボスの頭上にカウントがある間は防御バフでダメージが通りづらい"
        />

        <div>
          カウントは時間経過で進む他に、定期的にプレイヤーに対して発動してくるウイルス感染という範囲爆発のギミックダメージにボスを巻き込むことでカウントが3進む。
          このウイルス感染の爆発は他のプレイヤーにもダメージを与えるので、大勢で1か所に集まるのではなくボスを取り囲むように位置取って戦おう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_2.PNG"
          alt="ウイルス感染は赤い範囲円が足元に出るギミック"
          caption="ウイルス感染は赤い範囲円が足元に出るギミック"
        />

        <div>
          注意点として、ボスのバリアが爆発すると即死級のダメージを連続で受けるので、カウントが100になりそうなタイミングでボスから離れるかデスコントロールなどで凌ぐようにしよう。
          このカウントで飛んでくる即死ダメージは他のギミックと違って発生タイミングが一定ではないため、この討伐で特に事故が起きやすい要素となっている。
          他のギミック攻略と同時に常にボスの頭上に意識を向ける必要があるため、ある意味一番討伐の難易度を上げている要素と言えるかもしれない。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_3.mp4"
          alt="ボスのカウントが100になると付近に即死級のダメージ"
          caption="ボスのカウントが100になると付近に即死級のダメージ"
        />

        <SectionTitle icon="delete_forever">ギミック②：データ消去</SectionTitle>
        <div>
          ボスは定期的に当たると即死級の連続ダメージを受けるデータ消去を発動する。
          警告音が鳴った後にフィールド上に出ている赤いマーカーを中心にドーム状の衝撃波が広がる。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_4.PNG"
          alt="当たると即死するドーム状の衝撃波が発生"
          caption="当たると即死するドーム状の衝撃波が発生"
        />

        <div>
          この衝撃波はフィールドの四方に配置されている防御装置を起動して防御フィールドの中にいるとダメージを受けずに済む。
          防御装置の起動時間はそこまで長いわけではないので、衝撃波がある程度迫ってきたタイミングで起動するようにすると良い。
          防御装置は4つ存在するが、それぞれの装置は1度使用すると再使用可能までに3分20秒ほど時間を置く必要がある。
          そのため、不用意に散らばって複数の装置を起動するとそのうち装置が足りなくなってしまうので注意。
          なお防御装置はこのデータ消去のギミック以外のダメージは防げないので、防御装置の中に避難している時に「ギミック①：バリア過負荷」のカウント100によるダメージを受けると即死するので恩恵はゼロ連携やデスコントロールの準備をしておこう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_5.PNG"
          alt="防御装置の持続は6秒程度なので起動タイミングに注意"
          caption="防御装置の持続は6秒程度なので起動タイミングに注意"
        />

        <div>
          データ消去のギミックは8分30秒あたりで警告音が鳴ってから衝撃波が発生する。
          その後は1分ごとに同様のギミックが発動するのでそのたびに防御装置を起動して防ぐ必要がある。
          タイマーが〇分30秒になる前に防御装置に移動するようにしておこう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_6.PNG"
          alt="ギミックのタイミングはほぼ固定"
          caption="ギミックのタイミングはほぼ固定"
        />

        <div>
          なお、衝撃波は赤いマーカーが出現した位置に発生するが、この発生地点はランダムなので見てから移動していると位置によっては間に合わないことがある。
          時には防御装置の真横で衝撃波が発生することもあるため、使用する防御装置は事前に決めておいて何が起きても大丈夫なように備えておこう。
        </div>

        <SectionTitle icon="skull">ギミック③：磁性感染</SectionTitle>
        <div>
          ボスは定期的にプレイヤー2名にギミックに対処しないと全員が即死級のダメージを受ける磁性感染を発動する。
          選ばれた2名は頭上に数字が表示され、四方の防御装置がある箇所に特殊エリアが生成される。
          この特殊エリアに表示されている数字と2名の数字の合計が同じエリア内に入ることでダメージを防ぐことが可能。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_7.PNG"
          alt="2名の数字の合計と特殊エリアの数字が同じエリアに入ろう"
          caption="2名の数字の合計と特殊エリアの数字が同じエリアに入ろう"
        />

        <div>
          磁性感染のギミックは  速で戦闘に入れば8分20秒頃に頭上に数字が表示される。
          その後8分頃にギミックダメージが発生するので、それまでに正しいエリア内に入るようにしよう。
          その後は1分ごとに同様のギミックが発動するのでそのたびに正解のエリアに入る必要がある。
          タイマーが〇分20秒になったら数字が出るので約20秒で移動を済ませるようにしよう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_8.PNG"
          alt="このギミックもタイミングは決まっている"
          caption="このギミックもタイミングは決まっている"
        />

        <div>
          注意点として、このギミックは成功してもダメージを防げないことが多いので恩恵はゼロ連携とデスコンをダメージのタイミングに合わせて使えるように準備しておこう。
          ゼロ連携で防ぐ場合はダメージ前に専用のカウント音が鳴るので、4回目のカウント音が鳴る前辺りでゼロ連携を発動しよう。(ダメージが発生するのは5回目のカウント音の直後)
          ただし、戦闘中は攻撃音などでカウントが非常に聞き取りづらい上に、カウント音はボスから離れると小さくなるのでかなり集中力が必要なので時間を見てデスコントロールを使うのが無難。
          恩恵は2人以上でデスコントロールを持って行って、使う順番を決めればクールタイムを気にすることなくギミックを防げる。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_9.mp4"
          alt="戦闘中に音で判断するのは難しいかも"
          caption="戦闘中に音で判断するのは難しいかも"
        />

        <SectionTitle icon="sensors">その他のギミック</SectionTitle>
        <div>
          ウイルス感染の爆発でダメージ+操作反転を付与して来たり、ボスのHPが減ると防御装置付近の砲台を動かして攻撃してくる。
          どれも恩恵が回復していれば気にするほどではないが、一応バリア過負荷のギミックで説明した範囲爆発のギミックに砲台を巻き込むと砲台が一時的に機能停止するのは覚えておくと役に立つことがあるかも？
        </div>

        <SectionTitle icon="schedule">ギミック②と③のタイミングはほぼ固定だが・・・？</SectionTitle>
        <div>
          ギミックはデータ消去と磁性感染の順で発動し、どちらも最初の発動から1分後に再発動するのでタイミング自体は分かりやすい。
          ただし、バリア過負荷のカウントが100になるタイミングは一定ではないので、時間を気にしつつも常にボスの頭上のカウントを見ておく必要がある。
          防御装置の中や  殊エリアに入っていたのにボスのカウントに気が付かずに即死したり、ギミックの即死を防いだからと油断してボスに近づいたらカウントが100になって即死等とにかく事故が起きやすい。
        </div>

        <SectionTitle icon="bug_report">バグとバグっぽい不思議な挙動について</SectionTitle>
        <div>
          ギミック③：磁性感染についてはギミックをこなして正しいエリアに入っていても即死することがある。
          現状は原因が不明なので、基本的には安定を取って爆発のタイミングでゼロ連携とデスコントロールを合わせるようにしよう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_10.PNG"
          alt="デスコントロールで防ぐのが無難"
          caption="デスコントロールで防ぐのが無難"
        />

        <div>
          バグのような不思議な挙動として、ギミック①：バリア過負荷の防御バフが有効な時にイカロス恩恵/アストール剛毅の固定ダメージ、フィオナ/ラクシスの斬殺効果を発動しても全てダメージ軽減によって正しく機能しないようになっている。
          一見するとダメージを与えられていないように見えるが、実際には普通の攻撃と同様に滅茶苦茶軽減されたダメージが入っている。
          そのため、敵のHPが一定以下になるまではイカロス/アストールで何度でも固定ダメージを与えられ、敵のHPが一定以下になったらフィオナ/ラクシスの斬殺を何度でも発動できるという不思議な光景を見られる。
          特にフィオナ斬殺はフィオナの攻撃を当てるだけで発動するので、斬殺圏内になったらフィオナで攻撃を振るだけでどんどんDPSメーターが伸びていく。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_11.mp4"
          alt="何度も固定ダメージが入る様は少し面白いかも"
          caption="何度も固定ダメージが入る様は少し面白いかも"
        />

        <div>
          これらの現象は防御バフが無い状態では発生しないので、イカロス/アストールでダメージを与える際は量子ローブを使って攻撃を当てるようにしよう。
          当然ではあるが、他の味方が戦闘に入ると防御バフが起動してしまうので事前にダメージを与えるまで待ってもらうように意思疎通はしておこう。
        </div>

        <CaptionedMedia
          src="/raid/CalamityNo5_12.mp4"
          alt="量子ローブを忘れずに"
          caption="量子ローブを忘れずに"
        />

        <SectionTitle icon="emoji_objects">おススメ武器・アルケーについて</SectionTitle>
        <div>
          ギミック説明でも何度か触れた通り、恩恵はゼロの連携スキル  デスコントロールでギミックダメージを防げるようにしておきたい。
          フィオナ連携とクーラントでもギミックダメージは防げるが、どちらも単発のダメージ無効なのでギミックダメージの前にボスの攻撃に当たったりウイルス感染の爆発で解除されることが多い。
          移動が遅れて連携も撃てずどうしようもない時のためにクーラントを持っておくのもありだが、火力も大事なのでデスコントロール以外の1枠は時空の裂け目のような強攻の火力支援に繋がるアルケーを持っておきたい。
          なお、グレイフォックス5凸の免除特権による死亡回避はボスの通常攻撃やウイルス感染の爆発には有効だが、他の即死ギミックは全て連続ダメージで4層の免除特権を貫通してくるので注意しよう。
        </div>

        <SectionTitle icon="groups">チーム編成</SectionTitle>
        <div>
          強攻2～4人、恩恵4～6人の編成で挑もう。
          防御バフが無いタイミングでしっかり攻撃してれば火力要求はそこまで高くは無いので、とにかくギミックダメージを防ぐためにゼロとデスコンを持った恩恵を増やそう。
          可能であれば強攻1人に恩恵1人がゼロ連携とデスコンを構えてお供するのが事故を防ぎやすいが、デスコンのクールタイムもあるので磁性感染の時にどう動くかは事前に決めておきたい。
        </div>

        <SectionTitle icon="ondemand_video">解説動画</SectionTitle>
        <div className="w-full flex justify-center my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/GUV-lWKzFM4"
            title="厄災5号 解説動画"
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

CalamityNo5Page.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};