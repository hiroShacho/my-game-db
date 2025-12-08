export type RaidCard = {
  key: string;
  title: string;
  href: string;
  status: "開催中" | "限定討伐" | "未開催";
  img: string;
  borderColor?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  category: "週討伐" | "限定討伐"; // ★区分を追加
};

export const raidCards: RaidCard[] = [
  {
    key: "PrisonofExecution",
    title: "刑辟牢獄",
    href: "/raid/PrisonofExecution",
    status: "開催中",
    img: "/raid/PrisonofExecution.PNG",
    borderColor: "border-emerald-400",
    badgeColor: "bg-emerald-100",
    badgeTextColor: "text-emerald-700",
    category: "週討伐", // ★
  },
  {
    key: "StellarManhunt",
    title: "星間包囲",
    href: "/raid/StellarManhunt",
    status: "未開催",
    img: "/raid/StellarManhunt.PNG",
    borderColor: "border-yellow-400",
    badgeColor: "bg-yellow-200",
    badgeTextColor: "text-yellow-900",
    category: "限定討伐", // ★
  },
  // 必要なら他の討伐カードも同じようにcategoryを追加
];

//週討伐・限定討伐・その他レイドの名前メモ（コピペ用）
//------------------------------------------------------------
//暴食の饗宴
//GluttonousFeast
//刑辟牢獄
//PrisonofExecution
//機兵演習
//MechaSimulation
//元素警戒
//ElementAlart
//マトリックスハッキング
//MatrixHacking
//イリュージョンシフト
//RealmofPhantasm
//駆虎呑狼の計
//PittingPredators
//燃え上がるナイトメア
//ScorchingNightmare
//交通管制
//TrafficControl
//ガードバグ陣
//SwarmGuard
//星間包囲
//StellarManhunt
// ------------------------------------------------------------
// 必要に応じてここに追加・編集してコピペで使ってください