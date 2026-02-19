import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SidebarLayout from "@/components/layout/SidebarLayout";

// 拡大画像モーダル
function Modal({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg flex flex-col items-center justify-center max-w-[98vw] max-h-[98vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-[90vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] min-h-[200px] max-h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ background: "#fff" }}
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

// キャプション付き画像（クリックで拡大）
function CaptionedImage({
  src,
  alt,
  caption,
  w = 480,
  h = 270,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center my-4 w-full">
      <div
        className="relative rounded-lg shadow border-2 border-green-300 overflow-hidden bg-white cursor-pointer"
        style={{
          width: w,
          maxWidth: "98vw",
          aspectRatio: `${w} / ${h}`,
          background: "#fff",
        }}
        onClick={onClick}
        title="クリックで拡大"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="100vw"
        />
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
          クリックで拡大
        </span>
      </div>
      <div className="bg-green-50 px-4 py-1 text-xs text-green-800 border-t border-green-200 w-full text-center max-w-xl">
        {caption}
      </div>
    </div>
  );
}

// 画像を横並び（クリックで拡大）
function RowImages({
  images,
  w = 350,
  h = 200,
  onClick,
}: {
  images: { src: string; alt: string; caption: string }[];
  w?: number;
  h?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
      {images.map((img) => (
        <div key={img.src} className="flex flex-col items-center">
          <div
            className="relative rounded-lg shadow border-2 border-green-200 overflow-hidden bg-white cursor-pointer"
            style={{
              width: w,
              maxWidth: "96vw",
              aspectRatio: `${w} / ${h}`,
              background: "#fff",
            }}
            onClick={() => onClick && onClick(img.src, img.alt)}
            title="クリックで拡大"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
              クリックで拡大
            </span>
          </div>
          <div className="bg-green-50 px-2 py-1 text-xs text-green-800 border-t border-green-200 w-full text-center max-w-xs">
            {img.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

// セクションタイトル
function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-green-300/60 to-green-50 border-l-8 border-green-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-green-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-green-900">{children}</span>
    </div>
  );
}

export default function LevelUpPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <>
      <Head>
        <title>育成要素のまとめ | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の育成要素のまとめ。防具厳選・レベル上げ・強化・注射剤・サプレッサーなどの要素を詳しく解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-green-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-green-500">yard</span>
          育成要素のまとめ
        </h1>

        <SectionTitle icon="info">始めに</SectionTitle>
        <div className="mb-6 text-base text-gray-800">
          このゲームには様々な育成要素が存在し、時間をかけてそれらを育て上げることから「盆栽ゲー」とも呼ばれている。（盆栽のようにじっくり時間とリソースをやりくりして育成するゲームのこと）<br />
          課金をすればいくらかの育成時間を短縮可能だが、課金だけで誰でもいきなり最強！みたいなことは出来ない。<br />
          特に後述の防具厳選についてはサービス開始時から存在する要素だが、3年経った今でも全ての厳選をほぼ理想と言える状態まで終えたプレイヤーは限りなく0に近い。（というか恐らく存在しない）
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_CarefullySelected.PNG"
          alt="3年続けても終わらない防具厳選の沼は深い..."
          caption="3年続けても終わらない防具厳選の沼は深い..."
          onClick={() => openModal("/Newbie/levelup/levelup_CarefullySelected.PNG", "3年続けても終わらない防具厳選の沼は深い...")}
        />

        <div className="mb-6 text-base text-gray-800">
          勿論どの育成要素にも終わりはあるので時間をかければいずれ最前線のプレイヤーに追いつくことは理論上可能だが、新要素追加までのスパンがそこまで長くない &amp; 育成後半で要求されるレア度の高いリソースの配布量はあまり多くない。<br />
          そのため、最前線に追いつきたい！という人は相応の課金と時間が必要なことは認識しておこう。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_ArmorLevel.PNG"
          alt="全防具を最大レベルにするだけでも数か月かかる"
          caption="全防具を最大レベルにするだけでも数か月かかる（レベル上限もいずれ上がる）"
          onClick={() => openModal("/Newbie/levelup/levelup_ArmorLevel.PNG", "全防具を最大レベルにするだけでも数か月かかる")}
        />

        <div className="mb-6 text-base text-gray-800">
          成長要素がある程度進むまでは武器やボリションのガチャに課金してもSNSで見かけるようなぶっ飛んだ火力が出ることは無いので、一部のずっと役に立つ武器以外は課金してまで引かなくて良いという意味ではお財布に優しいかもしれない。<br /><br />
          なお、SNS等で見かける「新武器で火力が○○G出た！」、「新コンテンツを最速クリア！」、「マルチコンテンツをソロで攻略！」みたいなのは長年遊んできた人間の道楽でしかないのであれを基準にしてはいけない。
        </div>

        {/* ①防具厳選 */}
        <SectionTitle icon="checkroom">①防具を厳選しよう！</SectionTitle>
        <div className="mb-4">
          連合作戦が解放されるレベル20から始められる育成要素。<br />
          一番最初に紹介をしておいて何だが、これが一番時間がかかる育成要素なので他の育成と並行して進めることを推奨する。
          理想のステータスや数値などはある程度解明されているが、実際にその理想値を出そうとするととにかくランダム要素の壁が多い。<br /><br />
          新規プレイヤーはイベントの「いざ！チュートリアルから冒険の旅へ！」で獲得できる防具を装備すればある程度の厳選をスキップしてゲームを始められるので、必ずミッションをこなして防具を受け取るようにしよう！<br />
          最初の内は配布の防具を使い、ある程度防具が集まったら厳選を進めていこう。<br />
          （具体的な厳選の方法や目標設定については
          <Link href="/newbie/distribution" className="text-green-700 underline">
            防具厳選について
          </Link>
          の記事で解説）
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_DistributionArmor.PNG"
          alt="最初は配布防具を装備しよう"
          caption="最初は配布防具を装備しよう"
          onClick={() => openModal("/Newbie/levelup/levelup_DistributionArmor.PNG", "最初は配布防具を装備しよう")}
        />

        {/* ②防具レベルアップ */}
        <SectionTitle icon="star">②防具のレベルを上げよう！</SectionTitle>
        <div className="mb-4">
          防具は★ランクを上げる他にも強化モジュールとコインを使用してレベルを上げることができる。<br />
          このレベルは同じ部位の別防具に変更する際に引き継げるので今装備している防具のレベルだけ上げていけば問題ない。
          「いざ！チュートリアルから冒険の旅へ！」である程度は強化モジュール等のアイテムが貰えるのでそれらを使ってガンガンレベルを上げよう！<br /><br />
          なお、ある程度までレベルを上げると希少な強化モジュールⅢを要求されるようになる。<br />
          このアイテムは無・微課金だと毎週の討伐作戦やバージョンごとのイベント商店でしか手に入れる手段が無いので使い方には注意しよう。<br />
          基本的には全体を均等に上げてボーナス効果の発動を目指すのが良いが、ガントレットは基本のステータスに攻撃と会心が付いているので最優先に強化しよう。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_bonus.PNG"
          alt="基本の部位のレベルを一定まで上げると強化ボーナス！"
          caption="基本の部位のレベルを一定まで上げると強化ボーナス！"
          onClick={() => openModal("/Newbie/levelup/levelup_bonus.PNG", "基本の部位のレベルを一定まで上げると強化ボーナス！")}
        />

        {/* ③武器・ボリションレベル */}
        <SectionTitle icon="military_tech">③武器とボリションのレベルを上げよう！</SectionTitle>
        <div className="mb-4">
          武器とボリションはそれぞれレベルを上げて基礎ステータスを強化できる。<br />
          武器は最大でレベル200、ボリションはレベル100まで強化できる。<br />
          装備している武器3つと各ボリションを最大まで強化すればそれだけでステータスを大きく伸ばせるので必ずレベル上げをしておこう。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_weapons.PNG"
          alt="武器・ボリションのレベルを上げるとステータスが大きく伸びる"
          caption="武器・ボリションのレベルを上げるとステータスが大きく伸びる（凸数によってステータスの伸びも上がる）"
          onClick={() => openModal("/Newbie/levelup/levelup_weapons.PNG", "武器・ボリションのレベルを上げるとステータスが大きく伸びる")}
        />

        {/* ④防具を突破・タイタン化しよう！ */}
        <SectionTitle icon="auto_awesome">④防具を突破・タイタン化しよう！</SectionTitle>
        <div className="mb-4">
          プレイヤーのレベルが90に到達すると解放される。<br />
          防具を最大までランクアップした後に突破を選択すると専用の画面が表示される。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/levelup/levelup_augment.PNG",
              alt: "防具メニューの突破を押す",
              caption: "防具メニューの突破を押す",
            },
            {
              src: "/Newbie/levelup/levelup_titan.PNG",
              alt: "突破の画面が表示される",
              caption: "突破の画面が表示される",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />
        <div className="mb-4">
          この画面で突破に必要なアイテムを消費することで防具突破が可能。<br />
          突破するたびにステータスがランダムに上下し、突破を重ねるごとに最大値に近づいていく。<br />
          防具を一度突破すると見た目が変化し、突破を続けることで防具が「タイタン」と名の付く防具に変化する。<br />
          防具がタイタン化するまでに最大で80回の突破が必要になり、タイタン化することでレアステータスというランダムに変化する特殊なステータスが付与される。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/levelup/levelup_titangears.PNG",
              alt: "突破1回目とタイタン化で防具の見た目が変化する",
              caption: "突破1回目とタイタン化で防具の見た目が変化する",
            },
            {
              src: "/Newbie/levelup/levelup_titanrarestate.PNG",
              alt: "タイタン化でステータス突破にレアステータスが付く",
              caption: "タイタン化でステータス突破にレアステータスが付く",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />
        <div className="mb-4">
          防具の突破には突破因子とそれぞれの防具に対応したモジュールが必要になる。<br />
          どちらも毎週のドリームハウスでの交換やイベント商店で入手可能で、モジュールに関してはワールドボスの箱を強制解読すればワールドボス一覧の地馳までのボスで10個、地馳より後のボスで10個が毎週獲得できる。<br />
          そのため毎週必ず地馳までのボスを合計10回、地馳より後のボスを合計10回倒すようにしよう！
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/levelup/levelup_titanFactor.PNG",
              alt: "突破素材：突破因子",
              caption: "突破素材：突破因子",
            },
            {
              src: "/Newbie/levelup/levelup_titanModule.PNG",
              alt: "突破素材：モジュール",
              caption: "突破素材：モジュール",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />
        <div className="mb-4">
          注意点として、防具の突破状況を他の防具に引き継ぐには煙水晶を消費する。<br />
          そのため防具の突破はある程度厳選が進んでからするのを推奨する。<br />
          また、防具突破に関する詳細は別の記事で解説予定なので、今から突破を進める場合は一先ず防具全部位のタイタン化を目指そう！
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_titanHandover.PNG"
          alt="突破状況の引継ぎには煙水晶が必要なので注意！"
          caption="突破状況の引継ぎには煙水晶が必要なので注意！"
          onClick={() => openModal("/Newbie/levelup/levelup_titanHandover.PNG", "突破状況の引継ぎには煙水晶が必要なので注意！")}
        />

        {/* ⑤超速演算 */}
        <SectionTitle icon="memory">⑤超速演算を進めよう！</SectionTitle>
        <div className="mb-4">
          レベル80で開放される育成要素。<br />
          データソースを使用して演算レベルを上げることでステータスUPが可能。<br />
          データソースは探索・ゴゾトス以降のボス箱で鍵を使用・先鋒クラッシュ・終焉試練・煙水晶での購入で手に入るが、供給量に対して消費量が圧倒的に多い上に定期的に入手できる手段がボス箱か煙水晶での購入くらいしかない。<br />
          効果は大きいがその分リソース要求も多いので無料分を集めつつ余裕があるなら煙水晶での購入もしてみよう。（煙水晶での購入も毎週40個までに制限されている）
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_Supercomputing.PNG"
          alt="リソース要求量は多いが効果も大きい"
          caption="リソース要求量は多いが効果も大きい"
          onClick={() => openModal("/Newbie/levelup/levelup_Supercomputing.PNG", "リソース要求量は多いが効果も大きい")}
        />

        {/* ⑥宇宙支援システム */}
        <SectionTitle icon="satellite_alt">⑥宇宙支援システムを進めよう！</SectionTitle>
        <div className="mb-4">
          ストーリーをキルオ編のメカが解放される所まで進めると宇宙支援システムを解放できる。<br />
          ゼロコアを消費してモジュールレベルを上げることで各属性攻撃力・ダメージ、各コンテンツでのダメージをUPするバフを獲得できる。<br />
          超速演算と比べるとアイテムの配布量は要求量に対して多い方ではあるが、それでも時間がかかる育成要素ではある。<br />
          ゼロコアは異空間狩猟場への挑戦で獲得できる通貨での交換で40個、煙水晶での交換で50個手に入る。<br />
          ゼロコアの要求量はレベルを上げ得るごとに5個ずつ増え、1か所をレベル5に上げるのに175個必要になる。<br />
          そのため、1か所をレベル5まで上げるのに煙水晶での購入無しだと5週間、購入ありだと2週間で上げ切ることが可能となっている。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/levelup/levelup_MultiverseHunt.PNG",
              alt: "異空間狩猟場はレベル70で解放されるぞ！",
              caption: "異空間狩猟場はレベル70で解放されるぞ！",
            },
            {
              src: "/Newbie/levelup/levelup_SpaceSupportSystem.PNG",
              alt: "1か所で175個消費、全てをレベル5に上げるとレベル10が解放される模様",
              caption: "1か所で175個消費、全てをレベル5に上げるとレベル10が解放される模様",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />

        {/* ⑦源泉・強能注射剤 */}
        <SectionTitle icon="syringe">⑦源泉・強能注射剤を使おう！</SectionTitle>
        <div className="mb-4">
          探索や幻影の序列の報酬で手に入る注射剤は使用するとステータスを永続で強化できる。<br />
          1つ1つの効果量はそこまで大きいわけではないが、塵も積もれば山となる。注射剤だけで基礎攻撃力に2000以上の差がついていた何てことにも。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_Shots.PNG"
          alt="効果は永続なので手に入れ次第使おう！"
          caption="効果は永続なので手に入れ次第使おう！"
          onClick={() => openModal("/Newbie/levelup/levelup_Shots.PNG", "効果は永続なので手に入れ次第使おう！")}
        />

        {/* ⑧昇格ドライブ */}
        <SectionTitle icon="battery_charging_full">⑧昇格ドライブを使おう！</SectionTitle>
        <div className="mb-4">
          連合作戦やイベント商店で手に入る昇格ドライブはアバターの友好度を上げることで使用可能になり、使用するとHPや攻撃力を永続的に強化してくれる。<br />
          アバター1人分の強化値はそこまで高いわけではないが、全てのアバターのドライブを解放すれば2000以上の基礎攻撃力を獲得できるので可能な限り解放するようにしよう！
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_Drive.PNG"
          alt="地道に解放していこう！"
          caption="地道に解放していこう！"
          onClick={() => openModal("/Newbie/levelup/levelup_Drive.PNG", "地道に解放していこう！")}
        />

        {/* ⑨アルケー4凸 */}
        <SectionTitle icon="auto_fix_high">⑨アルケーの4凸効果を解放しよう！</SectionTitle>
        <div className="mb-4">
          全てのアルケーには凸数を4凸まで上げると常時発動のステータスアップ効果が用意されている。<br />
          この効果はアルケーを使用していなくても効果が発動（アルケーセットに入れなくても発動）するのでレア度に関わらず凸数を上げるようにしたい。<br />
          特に自分の使っている属性の属性ダメージUP効果を持つアルケーは優先して凸数を上げておきたい。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_Relics.PNG"
          alt="4凸効果でダメージUP!"
          caption="4凸効果でダメージUP!"
          onClick={() => openModal("/Newbie/levelup/levelup_Relics.PNG", "4凸効果でダメージUP!")}
        />

        {/* ⑩サプレッサー */}
        <SectionTitle icon="security">⑩サプレッサーのレベルを上げよう！</SectionTitle>
        <div className="mb-4">
          物語の序盤から登場するサプレッサーはレベルを上げることでステータスの強化に繋がる。<br />
          といっても1回ごとの強化幅はそこまで大きくないのと、強化に必要な素材の入手機会が限られているのであまり気にする必要はない。<br />
          気にする必要はないが素材の「強力オムニアム結晶Ⅱ」はドリームハウスでの毎週交換でしか定期的に入手できないので忘れずに交換するようにしよう。
        </div>
        <CaptionedImage
          src="/Newbie/levelup/levelup_Suppressors.PNG"
          alt="強力オムニアム結晶Ⅱは絶対に足りなくなるので毎週の交換を忘れずに！"
          caption="強力オムニアム結晶Ⅱは絶対に足りなくなるので毎週の交換を忘れずに！"
          onClick={() => openModal("/Newbie/levelup/levelup_Suppressors.PNG", "強力オムニアム結晶Ⅱは絶対に足りなくなるので毎週の交換を忘れずに！")}
        />

        <Modal
          open={modalOpen && modalImage !== null}
          onClose={closeModal}
          src={modalImage?.src || ""}
          alt={modalImage?.alt || ""}
        />
      </div>
    </>
  );
}

LevelUpPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};