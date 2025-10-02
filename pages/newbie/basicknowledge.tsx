import { ReactElement, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SidebarLayout from "@/components/layout/SidebarLayout";

// 拡大画像モーダル
function Modal({ open, onClose, src, alt }: { open: boolean; onClose: () => void; src: string; alt: string; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={onClose}>
      <div className="relative bg-white rounded-lg p-2 shadow-lg flex flex-col items-center justify-center max-w-[98vw] max-h-[98vh]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600" onClick={onClose} aria-label="閉じる" type="button">×</button>
        <div className="relative w-[90vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] min-h-[200px] max-h-[80vh]">
          <Image src={src} alt={alt} fill className="object-contain" style={{ background: "#fff" }} sizes="100vw" priority={false}/>
        </div>
      </div>
    </div>
  );
}

// キャプション付き画像（クリックで拡大）
function CaptionedImage({ src, alt, caption, w = 480, h = 270, onClick }: { src: string; alt: string; caption: string; w?: number; h?: number; onClick?: () => void; }) {
  return (
    <div className="flex flex-col items-center my-4 w-full">
      <div className="relative rounded-lg shadow border-2 border-blue-300 overflow-hidden bg-white cursor-pointer" style={{ width: w, maxWidth: "98vw", aspectRatio: `${w} / ${h}`, background: "#fff" }} onClick={onClick} title="クリックで拡大">
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw"/>
        <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">クリックで拡大</span>
      </div>
      <div className="bg-blue-50 px-4 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center max-w-xl">{caption}</div>
    </div>
  );
}

// 画像を横並び（クリックで拡大）
function RowImages({ images, w = 350, h = 200, onClick }: { images: { src: string; alt: string; caption: string }[]; w?: number; h?: number; onClick?: (src: string, alt: string) => void; }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
      {images.map((img) => (
        <div key={img.src} className="flex flex-col items-center">
          <div className="relative rounded-lg shadow border-2 border-blue-200 overflow-hidden bg-white cursor-pointer" style={{ width: w, maxWidth: "96vw", aspectRatio: `${w} / ${h}`, background: "#fff" }} onClick={() => onClick && onClick(img.src, img.alt)} title="クリックで拡大">
            <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="100vw"/>
            <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">クリックで拡大</span>
          </div>
          <div className="bg-blue-50 px-2 py-1 text-xs text-blue-800 border-t border-blue-200 w-full text-center max-w-xs">{img.caption}</div>
        </div>
      ))}
    </div>
  );
}

// 3分類区切り（背景色を大きく切り替える/アイコンなし/モバイルも収まるよう修正）
function BigCategoryArea({ id, color, label, children }: { id: string; color: string; label: string; children: React.ReactNode; }) {
  return (
    <div
      id={id}
      className="big-category-area"
      style={{
        background: color,
        margin: "0 0 42px 0",
        padding: "18px 0 36px 0",
        borderRadius: "0 0 40px 40px",
        boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "2.1rem",
          color: "#222",
          padding: "18px 5vw 12px 5vw",
        }}
      >
        {label}
      </div>
      <div
        style={{
          maxWidth: "940px",
          margin: "0 auto",
          padding: "8px 0 0 0",
          width: "100%",
        }}
      >
        {children}
      </div>
      <style jsx>{`
        .big-category-area {
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .big-category-area {
            border-radius: 0 0 24px 24px;
          }
        }
        @media (max-width: 600px) {
          .big-category-area {
            border-radius: 0 0 12px 12px;
            font-size: 1.2rem;
            padding: 10px 0 18px 0;
          }
        }
      `}</style>
    </div>
  );
}

// セクションタイトル
function SectionTitle({ id, icon, children }: { id?: string; icon?: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ scrollMarginTop: '80px' }} className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-300/60 to-blue-50 border-l-8 border-blue-500 rounded px-4 py-2 my-5 shadow">
      {icon && (<span className="material-symbols-outlined text-blue-600 text-2xl">{icon}</span>)}
      <span className="text-2xl font-bold text-blue-900">{children}</span>
    </div>
  );
}

export default function BasicKnowledgePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (src: string, alt: string) => { setModalImage({ src, alt }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setModalImage(null); };

  return (
    <>
      <Head>
        <title>基礎知識 | 幻塔攻略データベース</title>
        <meta name="description" content="幻塔の武器ロール・属性・ガチャなど基礎知識をまとめて解説！"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
      </Head>
      <div className="mx-auto max-w-3xl px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">menu_book</span>
          基礎知識
        </h1>
        {/* 目次 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 border-2 border-blue-300 rounded-xl shadow px-6 py-4 max-w-md w-full">
            <div className="text-lg font-bold text-blue-900 mb-2 text-center">基礎知識 目次</div>
            <ul className="list-disc ml-6 text-base">
              <li>
                <a href="#category-combat" className="text-blue-700 hover:underline">戦闘</a>
                <ul className="list-disc ml-5">
                  <li><a href="#combat-rolls" className="text-blue-700 hover:underline">各ロールの特殊効果について</a></li>
                </ul>
              </li>
              <li>
                <a href="#category-gacha" className="text-blue-700 hover:underline">ガチャ</a>
                <ul className="list-disc ml-5">
                  <li><a href="#gacha-attribute" className="text-blue-700 hover:underline">属性は1つに絞ろう（メイン属性を決めよう）</a></li>
                  <li><a href="#gacha-newest" className="text-blue-700 hover:underline">ガチャはメイン属性の最新キャラを引こう！</a></li>
                  <li><a href="#gacha-pity" className="text-blue-700 hover:underline">限定ガチャの天井は全て共有</a></li>
                  <li><a href="#gacha-orderelement" className="text-blue-700 hover:underline">新キャラクターの属性の実装順はほぼ固定</a></li>
                </ul>
              </li>
              <li>
                <a href="#category-daily" className="text-blue-700 hover:underline">日常コンテンツ</a>
                <ul className="list-disc ml-5">
                  <li><a href="#daily-update" className="text-blue-700 hover:underline">デイリーなどの更新は午前5時</a></li>
                  <li><a href="#daily-guild" className="text-blue-700 hover:underline">ギルドは入り得</a></li>
                  <li><a href="#daily-cactus" className="text-blue-700 hover:underline">火力の測定はサボテンで！</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* 戦闘区間 */}
        <BigCategoryArea id="category-combat" color="#d6f3ff" label="■戦闘">
          <SectionTitle id="combat-rolls" icon="auto_fix_high">各ロールの特殊効果について</SectionTitle>
          <div className="mb-4">
            武器を３つ装備することで発動する武器共鳴効果にはそれぞれソロ・チームで発動するバフが設定されている。<br/>
            <b>強攻</b>であればソロなら最終ダメージ+10%、チームなら40%追加の<b>最終ダメージ+50%</b>のバフが発動する。<br/>
            <b>剛毅</b>であればソロならダメージ軽減+25%・シールドブレイク率+60%・ヘイト+800%・<b>攻撃を当てた武器属性の弱点付与</b>効果、チームなら20%追加のダメージ軽減+45%のバフが発動する。<br/>
            <b>恩恵</b>であればソロなら回復効果+100%、チームなら100%追加の回復効果+200%のバフが発動する。<br/>
            <b>均衡</b>であればソロなら最終ダメージとダメージ軽減が+5%・シールドブレイク率と回復効果が+20%、チームなら35%追加の最終ダメージ+40%・10%追加のダメージ軽減+15%のバフが発動する。<br/>
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_roll.PNG" alt="各ロールごとにバフが発動" caption="各ロールごとにバフが発動" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_roll.PNG", "各ロールごとにバフが発動")}/>
          <div className="mb-4">
            このバフがあることからチーム戦では基本的に強攻が火力、剛毅がタンク、恩恵が回復を担当する。<br/>
            ソロだと時々恩恵編成の火力が強攻編成よりも高いことがあるが、チームでは強攻に最終ダメージが追加で40%付く上に恩恵フィオナのリンク（味方に付与できるバフ効果）による攻撃力UPは強攻・均衡に対してしか効果が無い。<br/>
            そのため、チームでの戦闘では余程のことが無い限り火力恩恵が強攻に勝つことは不可能となっている。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_fionalink.PNG" alt="フィオナのリンクは強攻・均衡にしか攻撃力を渡せない" caption="フィオナのリンクは強攻・均衡にしか攻撃力を渡せない" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_fionalink.PNG", "フィオナのリンクは強攻・均衡にしか攻撃力を渡せない")}/>
        </BigCategoryArea>

        {/* ガチャ区間 */}
        <BigCategoryArea id="category-gacha" color="#ffe8ed" label="■ガチャ">
          <SectionTitle id="gacha-attribute" icon="bolt">属性は1つに絞ろう（メイン属性を決めよう）</SectionTitle>
          <div className="mb-4">
            このゲームのガチャは武器なら80連・ボリションなら40連でSSR確定の天井が存在するが、SSRの中から<b>ピックアップキャラの武器・ボリションが出る確率は50%</b>となっている。<br/>
            そのため、確実に武器・ボリションを無凸でゲットするなら逆火コイン・チップでの交換のために武器は最低でも120連、ボリションは2セット揃えるのに160連・4セットなら320連が必要になる。<br/>
            新キャラが出るたびに確保していたらいつまでたっても凸数を上げられず、結果として追加されていくソロ・マルチコンテンツがクリア出来なくなって飽きて引退なんてことになりかねない。<br/>
            基本的にはゲームを始めてある程度経ったら気に入った属性1つに定めて限定武器のガチャを引いていくようにしよう。<br/><br/>
            なお、異能属性に関しては全ての属性で使える効果を所持している上に異能武器2本+凸数の高い恒常武器を揃えればメインに決めた属性以外の属性でも編成を組めるようになるので、幻影の序列のような各属性の編成が求められるコンテンツの為にも異能属性の武器は必ず引くようにしよう！<br/>
            何ならメインの属性を決めずに異能属性の武器だけを引き続けるというのも1つの手ではある。（実質異能がメイン？）
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_elemnt.PNG" alt="自分にあった属性を1つ選ぼう！" caption="自分にあった属性を1つ選ぼう！" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_elemnt.PNG", "自分にあった属性を1つ選ぼう！")}/>

          <SectionTitle id="gacha-newest" icon="star">ガチャはメイン属性の最新キャラを引こう！</SectionTitle>
          <div className="mb-4">
            このゲームは基本的に自分の属性の最新キャラを引けば火力が大きく伸びるようになっている。<br/>
            そのため、新規や少し遊んでメイン属性を決めたばかりの人は今実装されている最新のキャラを引こう。<br/>
            自分のメイン属性のガチャが無い時は待ちになるが、ガチャのタイミング自体は予想しやすいのでそれまではリソースを貯めるための期間として受け入れよう。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_newchara.PNG" alt="最新キャラを引けばほぼ確実に強くなれるという意味では安心？" caption="最新キャラを引けばほぼ確実に強くなれるという意味では安心？" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_newchara.PNG", "最新キャラを引けばほぼ確実に強くなれるという意味では安心？")}/>

          <SectionTitle id="gacha-pity" icon="diamond">限定ガチャの天井は全て共有</SectionTitle>
          <div className="mb-4">
            このゲームの限定ガチャは新キャラクターと復刻のガチャで天井が共有されている。<br/>
            なので復刻のガチャを10連引いたら新キャラクターの天井までのカウントも10進んでいる。<br/>
            そのためキャラ専用のレッドコアなどを貰ったらすぐに引いてしまうのもいいが、復刻が来た時に新キャラクターの天井カウントを進めるために温存しておくというのも一つの手となる。<br/><br/>
            特に異能キャラが実装されるタイミングでは全キャラ復刻ガチャが同時に開催されることが多いので、そのタイミングで貯めていた専用レッドコアを使って異能キャラの天井カウントを一気に進めると復刻ガチャ分の逆火コインを無駄にせずガチャをお得に引けるぞ！<br/>
            なお、今のバージョンの限定ガチャの天井カウントが10/80の状態で次のバージョンに入った場合、次のバージョンの限定ガチャの天井カウントも10/80の状態になっている。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_pity.PNG" alt="限定ガチャの天井はバージョンをまたいで共有されるぞ！" caption="限定ガチャの天井はバージョンをまたいで共有されるぞ！" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_pity.PNG", "限定ガチャの天井はバージョンをまたいで共有される")}/>

          <SectionTitle id="gacha-orderelement" icon="timeline">新キャラクターの属性の実装順はほぼ固定</SectionTitle>
          <div className="mb-4">
            このゲームの新キャラクターの属性順は異能以外は固定になっている。<br/>
            例としてVer5.0のリンゼイを基準に考えると氷⇒物理⇒雷⇒炎の順番に実装されており、その次はまた氷に戻って同じ順番でループするようになっている。<br/>
            異能属性だけは来るタイミングがランダムで、現状は氷か物理武器の次に実装されることが多く、1つの時空につき最低1体は実装されている。<br/>
            なお、武器共鳴については剛毅武器が5～7体ごとに実装され、恩恵武器が7～10体ごとに実装されている。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_gachaelement.PNG" alt="実装は氷⇒物理⇒雷⇒炎⇒氷...とループする（時々異能が挟まる）" caption="実装は氷⇒物理⇒雷⇒炎⇒氷...とループする（時々異能が挟まる）" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_gachaelement.PNG", "実装は氷⇒物理⇒雷⇒炎⇒氷...とループする（時々異能が挟まる）")}/>
        </BigCategoryArea>

        {/* 日常コンテンツ区間 */}
        <BigCategoryArea id="category-daily" color="#f5fcd6" label="■日常コンテンツ">
          <SectionTitle id="daily-update" icon="schedule">デイリーなどの更新は午前5時</SectionTitle>
          <div className="mb-4">
            このゲームのデイリーなどの更新タイミングは午前5時となっている。<br/>
            そのためプレイ時間帯が深夜～早朝の人はこの午前5時をまたぐタイミングでやり残しが無いようにしておこう。<br/>
            なお、最近追加された異空間狩猟場だけは日曜日の22時までが締め切りなのでうっかり忘れないように出来る限り週の頭に済ませてしまおう。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_dailyupdate.PNG" alt="異空間狩猟場だけ特殊なので注意！" caption="異空間狩猟場だけ特殊なので注意！" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_dailyupdate.PNG", "異空間狩猟場だけ特殊なので注意！")}/>

          <SectionTitle id="daily-guild" icon="groups">ギルドは入り得</SectionTitle>
          <div className="mb-4">
            ギルドに入ると毎週煙水晶が貰える。<br/>
            役職によって煙の量は多少増えるが誤差なのでそこは気にしなくて大丈夫。<br/>
            ギルド商店では入手手段が限られている強力オムニアム結晶やアルケーの欠片を購入できるぞ！<br/>
            人付き合いが苦手な人は煙水晶目的の無言ギルドもあるのでそちらに入ろう。
          </div>
          <CaptionedImage src="/Newbie/basicknowledge/basicknowledge_crewrewards.PNG" alt="一緒に貰える箱にも煙水晶が入っていることもあるぞ！" caption="一緒に貰える箱に煙水晶が入っていることもあるぞ！" onClick={() => openModal("/Newbie/basicknowledge/basicknowledge_crewrewards.PNG", "一緒に貰える箱にも煙水晶が入っていることもあるぞ！")}/>
          <RowImages images={[
            { src: "/Newbie/basicknowledge/basicknowledge_crewrewardsbox1.PNG", alt: "ギルド特典", caption: "ギルド特典" },
            { src: "/Newbie/basicknowledge/basicknowledge_crewrewardsbox2.PNG", alt: "ギルド特典の中身", caption: "ギルド特典の中身" },
          ]} w={350} h={200} onClick={openModal}/>

          <SectionTitle id="daily-cactus" icon="sports_score">火力の測定はサボテンで！</SectionTitle>
          <div className="mb-4">
            このゲームでDPS（秒間にどれだけ火力を出せるか）を測る時はサボテンのサンドバックを使用する。<br/>
            メニューにある訓練センターの極限テストを選んで専用のエリアに入って計測するのが一般的。<br/>
            計測時間は在りし日の幻等と同じ2分30秒で測るのが一般的となっている。
          </div>
          <RowImages images={[
            { src: "/Newbie/basicknowledge/basicknowledge_cactus1.PNG", alt: "極限テストで計測しよう！", caption: "極限テストで計測しよう！" },
            { src: "/Newbie/basicknowledge/basicknowledge_cactus2.PNG", alt: "サボテンは友達！ｺﾜｸﾅｲ!", caption: "サボテンは友達！ｺﾜｸﾅｲ!" },
          ]} w={350} h={200} onClick={openModal}/>
          <div className="mb-4">
            Mi-aの食事バフ・食べ物のバフを使うか等の細かい条件は人によって変わってくるが、大体の人はバフの有無を併記してくれている。<br/>
            このゲームは如何に一番火力が高くなるスキル回しを安定して回し続けられるかで火力が大きく変わってくる。<br/>
            そのため、少しでも火力を出したい人はSNS上で最前線のプレイヤーが出しているスキル回しを参考にサボテンで練習してみよう！<br/>
            ちなみにサボテン自体はミラポリスのHOTTAスタジオとのびのび広場、九域の浄化広場やギルドルームにもあるが、一番安定して計測できるのは訓練センターなのでソロで測るなら訓練センターにしよう。
          </div>
          <RowImages images={[
            { src: "/Newbie/basicknowledge/basicknowledge_cactus3.PNG", alt: "ミラポリスにもサボテンはあるが少しゲームが重いことも", caption: "ミラポリスにもサボテンはあるが少しゲームが重いことも" },
            { src: "/Newbie/basicknowledge/basicknowledge_cactus4.PNG", alt: "九域にもサボテンの代わりになる解き放たれし蓮の柱がある", caption: "九域にもサボテンの代わりになる解き放たれし蓮の柱がある" },
          ]} w={350} h={200} onClick={openModal}/>
        </BigCategoryArea>

        <Modal open={modalOpen && modalImage !== null} onClose={closeModal} src={modalImage?.src || ""} alt={modalImage?.alt || ""}/>
      </div>
    </>
  );
}

BasicKnowledgePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};