import Link from "next/link";
import { useRouter } from "next/router";

// ページごとに適切な表示名にするためのマッピング
const labelMap: Record<string, string> = {
  "top": "トップ",
  "search":"検索結果",
  "tag-search": "タグ検索",
  "map": "探索マップ",
  "kailo_OreZero_EXpoint": "キルオ：ゼロ鉱山区マップ",
  "weapons": "武器一覧",
  "matrices": "ボリション一覧",
  "trait": "アバター特性一覧",
  "relics": "アルケー一覧",
  "New_ver_info":"アップデート情報",
  "beginning":"はじめに",
  "tutorial":"序盤の進め方",
  "levelup":"育成要素のまとめ",
  "distribution":"防具厳選について",
  "basicknowledge":"基礎知識",
  "trivia":"豆知識",
  "jointoperation":"連合作戦",
  "DeepseaStronghold":"深海基地",
  "DeepseaProvingGround":"深海訓練所",
  "QuarantineZone":"隔離区域",
  "HyenaArena":"ハイエナアリーナ",
  "TheEndGame":"最終公演",
  "SadnessValley":"ロストバレー",
  "CarnivalParty":"パーティータイム",
  "PursuitofFate":"運命の追撃",
  "CoreflameDepths":"地核深焔",
  "fce":"進化辺境",
  "voidabyss":"虚空のアビス",
  "raid": "討伐作戦",
  "GluttonousFeast":"暴食の饗宴",
  "PrisonofExecution":"刑辟牢獄",
  "MechaSimulation":"機兵演習",
  "ElementAlart": "元素警戒",
  "MatrixHacking":"マトリックスハッキング",
  "RealmofPhantasm":"イリュージョンシフト",
  "PittingPredators":"駆虎呑狼の計",
  "ScorchingNightmare": "燃え上がるナイトメア" ,
  "TrafficControl": "交通管制",
  "SwarmGuard":"ガードバグ陣",
  // 必要に応じて追加
};

// パンくずから除外したいパス
const excludePaths = ["event", "ver5-1","ver5-2","ver5-3","ver5-3-5", "newbie"];

// 「search」ページではパンくずリストのリンクを非表示にしたい
const noLinkPaths = ["/search"];

// 武器IDやその他IDを日本語名に変換する辞書（例）
const weaponNameMap: Record<string, string> = { 
"ThunderousHalberd":"雷霆の戟",
"Pummeler":"初動重撃",
"StaffofScars":"聖痕の杖",
"TheTerminator":"エンダー",
"Nightingale'sFeather":"夜雀の羽根",
"EMBlade":"電磁ブレード",
"CombatBlade":"コンバットナイフ",
"CompositeBow":"複合弓",
"FrostedSpear":"フロストスピア",
"Thunderblades":"疾雷の双刃",
"AbsoluteZero":"零度の指針",
"ScytheoftheCrow":"レイヴンの大鎌",
"ChakramoftheSeas":"海の戦輪",
"IcewindArrow":"氷風の矢",
"MoltenShieldV2":"V2メルトシールド",
"DualEMStars":"超電磁二重星",
"RosyEdge":"薔薇の頂",
"NegatingCube":"ネガティブキューブ",
"Venus":"明けの明星",
"Balmung":"バルムンク",
"GurenBlade":"紅蓮刀",
"FlamingRevolver":"フレイムリボルバー",
"Spark":"スパーク",
"Heartstream":"水流の徹心",
"Shadoweave":"シャドーウィーブ",
"Vesper":"夕べの祈り",
"Thunderbreaker":"破重雷槍",
"CloverCross":"クローバークロス",
"UnyieldingWing":"不滅の翼",
"Mobius":"メビウス",
"Gleipnir":"グレイプニル",
"VermilionBird":"陵光",
"PreciousOne":"グロリアスライト",
"MoonstarBracelet":"月星の環",
"MiniHurricane":"プチハリケーン",
"LostArt":"絶響",
"PineComet":"松慧",
"Unity":"併輪",
"OnyxTortoise":"執明",
"AzureDragon":"孟章",
"EndlessBloom":"重蕊",
"AlabasterTiger":"監兵",
"PurpleBamboo":"紫竹",
"Equilibrium":"規衡",
"Pactcrest☆Metz":"プロミスパクト☆メイツ",
"EP-7000Skyfire":"EP-7000スカイファイア",
"Wicked":"ウィキッドガール",
"SpearofLonginus":"ロンギヌスの槍",
"Salvation":"リリーフ",
"Freeflow":"陰陽双魚",
"CalmWaters":"ヴィントシュティレ",
"PoppinStick":"パチキャン",
"Rumble":"ノイズ",
"SiegeEdge":"破滅の刃",
"Hellfire":"業火",
"TheWitch'sKey":"魔女の鍵",
"ScarletGale":"レッドウィンド",
"StarofOblivion":"破滅の星",
"Requiem":"レクイエム",
"SLAP":"ビンタ",
"Swish":"スベスベ",
"TwinStars": "二重星",
"AF-010Servion":"サーバントAF-010",
"EternalSalvation":"ホーリージャッジメント",
"Pollux":"ポルクス",
//仮でボリションと特性はパンくずだけ変える
"m_1":"エコー",
"t_1":"エコー",
"m_2":"イーネ",
"t_2":"イーネ",
"m_3":"ペペ",
"t_3":"ペペ",
"m_4":"ヒルダ",
"t_4":"ヒルダ",
"m_5":"バイリン",
"t_5":"バイリン",
"m_6":"クロウ",
"t_6":"クロウ",
"m_7":"ココリッタ",
"t_7":"ココリッタ",
"m_8":"キング",
"t_8":"キング",
"m_9":"シロ",
"t_9":"シロ",
"m_10":"ツバサ",
"t_10":"ツバサ",
"m_11":"シューマー",
"t_11":"シューマー",
"m_12":"セミール",
"t_12":"セミール",
"m_13":"メリル",
"t_13":"メリル",
"m_14":"ゼロ",
"t_14":"ゼロ",
"m_15":"ネメシス",
"t_15":"ネメシス",
"m_16":"フレイヤ",
"t_16":"フレイヤ",
"m_17":"クローディア",
"t_17":"クローディア",
"m_18":"コバルト",
"t_18":"コバルト",
"m_19":"ラビィ",
"t_19":"ラビィ",
"m_20":"不破",
"t_20":"不破",
"m_21":"凛夜",
"t_21":"凛夜",
"m_22":"エスター",
"t_22":"エスター",
"m_23":"天琅",
"t_23":"天琅",
"m_24":"アナベラ",
"t_24":"アナベラ",
"m_25":"アリス",
"t_25":"アリス",
"m_26":"ウーミィ",
"t_26":"ウーミィ",
"m_27":"フェンリル",
"t_27":"フェンリル",
"m_28":"嵐",
"t_28":"嵐",
"m_29":"イカロス",
"t_29":"イカロス",
"m_30":"フィオナ",
"t_30":"フィオナ",
"m_31":"グノノ",
"t_31":"グノノ",
"m_32":"レビリア",
"t_32":"レビリア",
"m_33":"榴火",
"t_33":"榴火",
"m_34":"玉蘭",
"t_34":"玉蘭",
"m_35":"明景",
"t_35":"明景",
"m_36":"篁",
"t_36":"篁",
"m_37":"妃色",
"t_37":"妃色",
"m_38":"凌寒",
"t_38":"凌寒",
"m_39":"南音",
"t_39":"南音",
"m_40":"煙渺",
"t_40":"煙渺",
"m_41":"ブレヴィ",
"t_41":"ブレヴィ",
"m_42":"パロッティ",
"t_42":"パロッティ",
"m_43":"ヤノ",
"t_43":"ヤノ",
"m_44":"アスカ",
"t_44":"アスカ",
"m_45":"レイ",
"t_45":"レイ",
"m_46":"姫玉",
"t_46":"姫玉",
"m_47":"ロズリン",
"t_47":"ロズリン",
"m_48":"アンカー",
"t_48":"アンカー",
"m_49":"ノーラ",
"t_49":"ノーラ",
"m_50":"メリル・アムド",
"t_50":"メリル・アムド",
"m_51":"アスラーダ",
"t_51":"アスラーダ",
"m_52":"グレイフォックス",
"t_52":"グレイフォックス",
"m_53":"クローディア・ストームアイ",
"t_53":"クローディア・ストームアイ",
"m_54":"ネメシス・ヴォイド",
"t_54":"ネメシス・ヴォイド",
"m_55":"アントリア",
"t_55":"アントリア",
"m_56":"キャロット",
"t_56":"キャロット",
"m_57":"リンゼイ",
"t_57":"リンゼイ",
"m_58":"アストール",
"t_58":"アストール",
"m_59":"シードル",
"t_59":"シードル",
"m_60":"ラクシス",
"t_60":"ラクシス",
"m_61":"ヘレンネ",
"t_61":"ヘレンネ",
"r_1":"フロスト砲",
"r_2":"ジェットパック",
"r_3":"溶岩爆弾",
"r_4":"ジェットスライダー",
"r_5":"磁気嵐",
"r_6":"量子ローブ",
"r_7":"多連装ミサイル",
"r_8":"ロボットアーム",
"r_9":"クーラント",
"r_10":"シンギュラリティキューブ",
"r_11":"オムニアム砲",
"r_12":"電磁パルス",
"r_13":"ジャイアントアーム",
"r_14":"オムニアムの盾",
"r_15":"時空の裂け目",
"r_16":"ドローン",
"r_17":"V型メカ",
"r_18":"幽閉空間",
"r_19":"デスコントロール",
"r_20":"ホログラム投影",
"r_21":"ペリカン号",
"r_22":"疾行履",
"r_23":"浮遊スライダー",
"r_24":"クーラントⅡ型",
"r_25":"ダメージブースター",
"r_26":"マリンハート",
"r_27":"バブルガン",
"r_28":"トリプルマスク",
"r_29":"制電制御銃",
"r_30":"ムービングアンカー",
"r_31":"バフフィールド",
"r_32":"MarkⅡ戦闘眼",
"r_33":"遮断装置",
};

// ルート配列を受け取り、ラベルを返す関数
function getBreadcrumbLabel(part: string, parentPath: string[]): string {
  // 武器・ボリション・特性ページでID/slugを日本語に変換
  if (
    parentPath.length >= 1 &&
    ["weapons", "matrices", "trait", "relics"].includes(parentPath[0])
  ) {
    return weaponNameMap[part] || part;
  }
  if (parentPath.length >= 1 && parentPath[0] === "event" && part === "guardian-of-kailo") {
    return "キルオの守護者";
  }
  return labelMap[part] || part;
}

export default function Breadcrumb() {
  const router = useRouter();
  const pathParts = router.pathname.split("/").filter(Boolean);

  // トップページ（"/"）なら何も表示しない
  if (pathParts.length === 0) {
    return null;
  }

  // パンくず表示用のラベル配列（除外パスは空にする）
  let displayLabels: { part: string, href: string, parentPath: string[] }[] = [];
  for (let i = 0; i < pathParts.length; i++) {
    const part = decodeURIComponent(pathParts[i]);
    if (excludePaths.includes(part)) continue;
    const href = "/" + pathParts.slice(0, i + 1).join("/");
    const parentPath = pathParts.slice(0, i).map(decodeURIComponent);
    displayLabels.push({ part, href, parentPath });
  }

  // 先頭にトップを追加（必要なら）
  displayLabels.unshift({ part: "top", href: "/", parentPath: [] });

  // 検索ページなら全てリンクなしで表示
  if (router.pathname === "/search") {
    return (
      <nav aria-label="パンくずリスト" className="text-sm mb-3">
        <ol className="flex flex-wrap items-center space-x-1">
          {displayLabels.map((crumb, idx) => (
            <li key={crumb.href} className="flex items-center">
              {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
              <span>{getBreadcrumbLabel(crumb.part, crumb.parentPath)}</span>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="パンくずリスト" className="text-sm mb-3">
      <ol className="flex flex-wrap items-center space-x-1">
        {displayLabels.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
            <Link href={crumb.href} className="hover:underline text-blue-600">
              {getBreadcrumbLabel(crumb.part, crumb.parentPath)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}