import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
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
        className="relative rounded-lg shadow border-2 border-orange-300 overflow-hidden bg-white cursor-pointer"
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
      <div className="bg-orange-50 px-4 py-1 text-xs text-orange-800 border-t border-orange-200 w-full text-center max-w-xl">
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
      {images.slice(0, 2).map((img) => ( // 最大2枚並列
        <div key={img.src} className="flex flex-col items-center">
          <div
            className="relative rounded-lg shadow border-2 border-orange-200 overflow-hidden bg-white cursor-pointer"
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
          <div className="bg-orange-50 px-2 py-1 text-xs text-orange-800 border-t border-orange-200 w-full text-center max-w-xs">
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
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-300/60 to-orange-50 border-l-8 border-orange-500 rounded px-4 py-2 my-5 shadow">
      {icon && (
        <span className="material-symbols-outlined text-orange-600 text-2xl">{icon}</span>
      )}
      <span className="text-2xl font-bold text-orange-900">{children}</span>
    </div>
  );
}

export default function DistributionPage() {
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
        <title>防具厳選について | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の火力を最大限引き出すための防具厳選方法・理想の基準・ヴェラ防具について詳しく解説！" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-orange-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">shield</span>
          防具厳選について
        </h1>

        <SectionTitle icon="info">始めに</SectionTitle>
        <div className="mb-4 text-base text-gray-800">
          幻塔における防具厳選は戦闘で火力を出すために最も重要な要素となっている。<br />
          どれだけ武器やボリションに課金しても、防具の厳選が進んでいなければ最前線のプレイヤーが出す火力には一生追いつくことはできない。<br />
          また、防具厳選は課金で多少は楽を出来るようになっているが、それだけで運要素の壁を超えるのは正直難しい。<br />
          時間をかけて正しい知識の元に厳選を続けることが理想の防具を作るための唯一の近道となっている。<br /><br />
          では、具体的にどのような状態を目指して厳選をすれば良いのかをこのページで解説していくぞ！
        </div>

        <SectionTitle icon="school">前提知識</SectionTitle>
        <div className="mb-4">
          厳選について解説する前に防具についての基本的な知識を解説しておく。<br />
          防具は全部で12か所の部位があり、防具厳選ではこれら全てを最良のモノに仕上げることを目的としている。<br />
          12か所の内、タクティカルグラス、戦闘エンジン、外骨格、超小型リアクターの4か所はVer2.0のヴェラ実装以降に登場した部位となっている。<br />
          そのためこれら4か所はヴェラ防具、ヴェラ部位というヴェラのくくりで呼ばれることが多い。<br />
          また、ヴェラ防具は初期から存在する基本の8カ所（以降は基本防具、基本部位などと呼ぶ）と比べると入手手段が限られているため、厳選は基本防具を優先してヴェラ防具については防具獲得用の素材を集める程度にしておくのが無難。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_verra.PNG"
          alt="画像の4か所をヴェラ防具と呼ぶ"
          caption="画像の4か所をヴェラ防具と呼ぶ"
          onClick={() => openModal("/Newbie/distribution/distribution_verra.PNG", "画像の4か所をヴェラ防具と呼ぶ")}
        />
        <div className="mb-4">
          まずはこのページの前半の基本防具の厳選についての知識を付けてから後半のヴェラ防具についての解説を読んでみよう！
        </div>

        <SectionTitle icon="trending_up">どのステータスを育てるべき？</SectionTitle>
        <div className="mb-4">
          厳選において見るべきは防具のランダムステータスの部分。<br />
          このランダムステータスに火力UPに繋がるステータスが付いているかどうかを厳選するのが最初の段階。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_random.PNG"
          alt="厳選で見るのはランダムステータス"
          caption="厳選で見るのはランダムステータス"
          onClick={() => openModal("/Newbie/distribution/distribution_random.PNG", "厳選で見るのはランダムステータス")}
        />
        <div className="mb-4">
          では実際にどのようなステータスが付いていれば良いのか？<br />
          これを見分けるのは簡単で、火力につながる「会心」、「攻撃」、「属性攻撃」の3つに注目すればよい。<br />
          「会心」は基本防具の内ガントレットとサバトンにのみ付いているステータスで、この値が大きいほどプレイヤーの会心率が上昇する。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_crit.PNG"
          alt="会心のランダムステータスが付くのはガントレットとサバトンだけ！"
          caption="会心のランダムステータスが付くのはガントレットとサバトンだけ！"
          onClick={() => openModal("/Newbie/distribution/distribution_crit.PNG", "会心のランダムステータスが付くのはガントレットとサバトンだけ！")}
        />
        <div className="mb-4">
          「攻撃」と「属性攻撃」は全ての防具に付くステータスで、「攻撃」は全ての属性の攻撃力が上がるが、「属性攻撃」は対応した属性の攻撃力しか上昇しない。<br />
          「攻撃」は1つしか付かないが、「属性攻撃」は違う属性であれば複数付くこともある。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_randomattack.PNG"
          alt="どのステータスが付くかは基本ランダム"
          caption="どのステータスが付くかは基本ランダム"
          onClick={() => openModal("/Newbie/distribution/distribution_randomattack.PNG", "どのステータスが付くかは基本ランダム")}
        />
        <div className="mb-4">
          では全ての属性の攻撃力が上がる「攻撃」さえ強化していればよいのか？<br />
          答えはNO。<br />
          防具をランクアップした際のステータス上昇値はステータスごとに最低値と最大値が決まっており、「攻撃」よりも「属性攻撃」の方が最低・最大値ともに高い数値が設定されている。<br />
          そのため、理想は「会心」が付かない防具なら「攻撃」と自分の武器に合った「属性攻撃」をランダムステータスに持っており、5回のランクアップ全てで「属性攻撃」の最大値を引くこと。<br />
          「会心」が付く防具なら「会心」「攻撃」「属性攻撃」をランダムステータスに持っており、5回のランクアップ全てで「会心」の最大値を引くこととなっている。
        </div>
        <RowImages
          images={[
            {
              src: "/Newbie/distribution/distribution_perfectcrit.PNG",
              alt: "会心を最優先",
              caption: "会心を最優先",
            },
            {
              src: "/Newbie/distribution/distribution_perfectattack.PNG",
              alt: "属性攻撃を最優先",
              caption: "属性攻撃を最優先",
            },
          ]}
          w={350}
          h={200}
          onClick={openModal}
        />

        <SectionTitle icon="calculate">ステータスの理想の数値は？</SectionTitle>
        <div className="mb-4">
          3つのステータスが付いていて、「会心」と「属性攻撃」が伸びれば良いのはここまで説明してきたが、実際にどれだけステータスが伸びれば良いのか？<br />
          当然ながら理想は5回連続で最大値を引くことなので、先ほど触れていたそれぞれのステータスの最低値と最大値を見てみよう。<br />
          まず「会心」の最低値は679、最大値は1169となっており、「攻撃」と「属性攻撃」はそれぞれ「攻撃」が最低値135、最大値234で、「属性攻撃」最低値182、最大値312となっている。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_mostbig.PNG"
          alt="上昇幅の最低値と最大値"
          caption="上昇幅の最低値と最大値"
          onClick={() => openModal("/Newbie/distribution/distribution_mostbig.PNG", "上昇幅の最低値と最大値")}
        />
        <div className="mb-4">
          そのため「会心」の初期値は258で固定なので5回すべてで最大値を引いた場合のステータスは6103、「属性攻撃」は初期値が69なので5回すべてで最大値を引いた場合のステータスは1629となっている。<br />
          では実際の厳選もこの数値を目標にすれば良いのか？<br />
          答えは半分YES、半分NO。<br />
          ゴールが最大値5跳ね（○回同じステータスが強化されることを「○跳ね」と言う）なのは合っているが、これを実現しようとすると天文学的な確率を引き当てなければならない。<br />
          そのため、実際の厳選では妥協・最前線・神の3つの基準で目標を立てることになる。（管理人主観の大雑把な分類です）<br /><br />
          3つの基準は「会心」付きの防具なら「会心」の値が3500～4000で妥協、4000～5000が最前線、5000以上で神防具となる。<br />
          「会心」が付かない防具なら「攻撃」と「属性攻撃」の合計が1200～1300で妥協、1300～1400で最前線、1400以上で神防具となる。<br />
          ここで紹介しているのは大雑把な基準なので必ずしもこの通りの目標にしようとは言わないが、数値は大きいに越したことは無い。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_line.PNG"
          alt="それぞれの妥協・最前線・神防具の基準（諸説あり）"
          caption="それぞれの妥協・最前線・神防具の基準（諸説あり）"
          onClick={() => openModal("/Newbie/distribution/distribution_line.PNG", "それぞれの妥協・最前線・神防具の基準（諸説あり）")}
        />
        <div className="mb-4">
          さらっと言っているが、「攻撃」と「属性攻撃」については2つの合計値を基準にするのが基本。<br />
          理想は勿論「属性攻撃」5跳ねだが、「攻撃」2跳ね+「属性攻撃」3跳ねや「攻撃」1跳ね+「属性攻撃」4跳ねでも十分妥協～最前線ラインは目指せる。<br />
          また、防具をタイタン化すると当然数値も大きくなるためパッと見だと自分が今どのラインにいるか分からないかもしれないが、突破の引継ぎの画面で引継ぎ後のステータスを計算すれば今の防具のステータスが分かるぞ！
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_check.PNG"
          alt="タイタン防具は引継ぎのプレビューでステータスをチェックしよう！（誤操作で引き継がないよう注意！）"
          caption="タイタン防具は引継ぎのプレビューでステータスをチェックしよう！（誤操作で引き継がないよう注意！）"
          onClick={() => openModal("/Newbie/distribution/distribution_check.PNG", "タイタン防具は引継ぎのプレビューでステータスをチェックしよう！（誤操作で引き継がないよう注意！）")}
        />

        <SectionTitle icon="science">ヴェラ防具のステータスは？</SectionTitle>
        <div className="mb-4">
          ここまで基本防具について見てきたが、ヴェラ防具にはこれまで無かったステータスが見受けられる。<br />
          「属性攻撃」の表記だが数値を見ると○○%という表記のモノ。「属性ダメージ」が上昇するモノ。「会心」ではなく「会心率」が上昇するモノ。<br />
          これらを見るとどれをどう厳選すれば良いのか分からなくなってしまいそうだが、これらのヴェラ防具についても厳選の基準はある程度決まっている。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_randomverra.PNG"
          alt="%表記や「会心率」などの新しいステータスが出てきてチンプンカンプン"
          caption="%表記や「会心率」などの新しいステータスが出てきてチンプンカンプン"
          onClick={() => openModal("/Newbie/distribution/distribution_randomverra.PNG", "%表記や「会心率」などの新しいステータスが出てきてチンプンカンプン")}
        />
        <div className="mb-4">
          まずはそれぞれのステータスについて簡単に解説をしていく。<br />
          「属性攻撃」の%表記はステータスの詳細を見た際の右側の数値に関わってくる。<br />
          ステータスの左側は基礎攻撃力と呼ばれ、「攻撃」や「属性攻撃」の実数表記を加算していった結果が表示されている。<br />
          それに対して右側の数値はボリションのセット効果などに付いている攻撃力○%UP系の効果で上昇した数値が表示されている。<br />
          そのため、%表記の「属性攻撃」が上昇するとステータス詳細の右側の数値が上昇していく。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_state.PNG"
          alt="ステータスをクリックした際の右側の数値に関係する"
          caption="ステータスをクリックした際の右側の数値に関係する"
          onClick={() => openModal("/Newbie/distribution/distribution_state.PNG", "ステータスをクリックした際の右側の数値に関係する")}
        />
        <div className="mb-4">
          「属性ダメージ」はステータスの数値には影響しないが、実際の戦闘でダメージを与える際のダメージ計算に影響してくる。<br />
          こちらはイメージとしては武器やボリションについている属性ダメージUP系の効果と同じなので、パッと見のステータスに出ない分影響が分かりづらい。<br />
          「会心率」はその名の通り会心率が数値分上昇するステータスで、「会心」との違いはあくまでステータスの種類が違うだけ。<br />
          「会心」の数値が大きいほど会心率が上昇し、「会心率」は「会心」の数値によって決まった会心率にさらに数値を上乗せしてくれる。<br />
          下の画像なら会心率の合計は93.770% + 4.620% = 98.390%となる。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_critrate.PNG"
          alt="「会心」をクリックすると現在の基礎となる会心率が表示される"
          caption="「会心」をクリックすると現在の基礎となる会心率が表示される"
          onClick={() => openModal("/Newbie/distribution/distribution_critrate.PNG", "「会心」をクリックすると現在の基礎となる会心率が表示される")}
        />
        <div className="mb-4">
          これらのステータスの内、「会心率」だけはタクティカルグラスにしか付かないようになっている。<br />
          また、「会心率」と「属性ダメージ」のステータスは同時に付かないようになっているので目標を設定する際には注意。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_crit&elementdmg.PNG"
          alt="「会心率」はグラスにだけ付き、「会心率」と「属性ダメージ」がグラスに同時に付くことは無い"
          caption="「会心率」はグラスにだけ付き、「会心率」と「属性ダメージ」がグラスに同時に付くことは無い"
          onClick={() => openModal("/Newbie/distribution/distribution_crit&elementdmg.PNG", "「会心率」はグラスにだけ付き、「会心率」と「属性ダメージ」がグラスに同時に付くことは無い")}
        />
        <div className="mb-4">
          厳選の際には火力に繋がる「会心率」・「攻撃」・「属性攻撃(実数)」・「属性攻撃(%)」・「属性ダメージ」が付いた防具をランクアップすることになるのだが、<br />
          どのステータスが伸びるのが一番良いかは割と環境によって変化してくる。<br />
          ここで言う環境というのは現行のコンテンツで要求されるステータスのことで、最近で言えばグレイフォックス恩恵の効果で会心率を20%盛ることが可能なので会心率は多少低くても良いという時期もあれば、<br />
          高難易度のコンテンツでは敵に会心耐性があるので会心率は盛れれば盛れるほど良いというように割とその時の状況で大きく変わってくる。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_gf.PNG"
          alt="グレイフォックスで会心率は盛れるが...？"
          caption="グレイフォックスで会心率は盛れるが...？"
          onClick={() => openModal("/Newbie/distribution/distribution_gf.PNG", "グレイフォックスで会心率は盛れるが...？")}
        />
        <div className="mb-4">
          現状はとりあえず「属性攻撃(%)」が5跳ねしていて他にどれだけ火力に関わるランダムステータスが付いているかが重要と考えればよい。<br />
          なお、この目的のランダムステータスがいくつ付いているかをOP（オプション）と表現し、例えば「属性攻撃(実数)」と「属性攻撃(%)」が付いた防具は2OPと呼ばれる。<br />
          理想は全てのランダムステータスが火力に繋がる4OPの状態だが、ただでさえ供給量の少ないヴェラ防具で4OPの厳選をしていると何年経っても厳選が終わらない。<br />
          そのため、現実的には2OP、3OPで「属性攻撃(%)」が5跳ねした防具を目指すのが良い。<br />
          そこから更なる火力を求めるのであれば地獄の4OP5跳ね厳選が始まる。ｺﾜｲ㌥
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_ptw.PNG"
          alt="凄く有難い存在だけどこれだけで厳選が終わるほど現実は甘くない"
          caption="凄く有難い存在だけどこれだけで厳選が終わるほど現実は甘くない"
          onClick={() => openModal("/Newbie/distribution/distribution_ptw.PNG", "凄く有難い存在だけどこれだけで厳選が終わるほど現実は甘くない")}
        />
        <div className="mb-4">
          これらのことからヴェラ防具の厳選を終えることは実質的に不可能とまで言える。<br />
          とは言ったものの強くなるにはこれらの厳選も必須なので、無理の無い範囲でコツコツと進めていくようにしよう。<br /><br />
          ちなみに先ほど紹介した課金の選択箱は特にヴェラ防具が入った調諧装備選択箱の値段が高く1つで1万2千円の課金が必要となる。<br />
          ガチ勢はこれを購入上限まで買ったうえでもっとくれと言っているらしい。ｺﾜｲﾈ
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_whale.PNG"
          alt="おひとつ1万2千円！（廃課金を基準にしてはいけない理由の一つ）"
          caption="おひとつ1万2千円！（廃課金を基準にしてはいけない理由の一つ）"
          onClick={() => openModal("/Newbie/distribution/distribution_whale.PNG", "おひとつ1万2千円！（廃課金を基準にしてはいけない理由の一つ）")}
        />

        <SectionTitle icon="check_circle">まとめ</SectionTitle>
        <div className="mb-4">
          基本防具はガントレットとサバトンは「会心」+「攻撃」+「属性攻撃」の付いた防具を「会心」が5跳ねすることを祈る。<br />
          それ以外の基本防具は「攻撃」+「属性攻撃」の付いた防具を「属性攻撃」が5跳ねすることを祈る。<br />
          それぞれ自分の目指す基準を超えたら他の部位の厳選を始めよう！<br /><br />
          ヴェラ防具はなるべく火力に繋がるステータスが付いた防具を集めて2OPより3OP、3OPより4OPを目指そう。<br />
          とりあえずOPの数さえ多ければ「属性攻撃(%)」が5跳ねしたら妥協～最前線のラインには乗れるのでそこを目標に基本防具優先で厳選するのを推奨する。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_line.PNG"
          alt="まずは妥協ラインを目指して厳選を進めよう！"
          caption="まずは妥協ラインを目指して厳選を進めよう！"
          onClick={() => openModal("/Newbie/distribution/distribution_line.PNG", "まずは妥協ラインを目指して厳選を進めよう！")}
        />

        {/* ■おまけ */}
        <SectionTitle icon="lightbulb">おまけ</SectionTitle>
        <div className="mb-4">
          人によっては防具突破のリソース消費を抑えるために1つの防具で複数の属性を育てたい！という人もいるだろう。<br />
          防具突破の仕様を知ることで複数属性で使える防具を作ることが可能となっている。<br />
          ここでは簡単な解説に留めるが、防具を突破すると付くステータス突破は防具のランダムステータスによって内容が変化する。<br />
          ランダムステータスに付いている「属性攻撃」がランクアップで上昇していた場合、その属性以外の「属性攻撃」がステータス突破に付いてくる。<br />
          そのため、2種類以上の「属性攻撃」が付いた防具を突破することで全属性の「属性攻撃」を持った防具を作成できる。<br />
          ランダムステータスの伸びなかった「属性攻撃」とステータス突破に付いた「属性攻撃」の数値は一番数値が大きい「属性攻撃」の値に近い値になってくれるので、全ての部位を同じように厳選すれば全属性対応の基本防具を作成できる。<br /><br />
          注意点として、ヴェラ防具はどうしても「属性攻撃(%)」だけに厳選対象を絞らないと複数属性対応のモノを作りづらい。<br />
          そのためヴェラ防具については属性ごとに用意するのをおススメする。<br />
          また、シンプルに厳選の難易度が上がって成長スピードが遅くなり飽きる原因になってしまうのと、無・微課金の人は属性を1つに絞らないとガチャを碌に引けないのである程度ゲームに慣れてから手を出すことをおススメする。
        </div>
        <CaptionedImage
          src="/Newbie/distribution/distribution_allelement.PNG"
          alt="厳選のハードルは上がるが全属性対応の防具も作れるぞ！"
          caption="厳選のハードルは上がるが全属性対応の防具も作れるぞ！"
          onClick={() => openModal("/Newbie/distribution/distribution_allelement.PNG", "厳選のハードルは上がるが全属性対応の防具も作れるぞ！")}
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

DistributionPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};