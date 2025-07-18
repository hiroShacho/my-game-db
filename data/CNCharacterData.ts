export type CNCharacter = {
  id: string;
  name: string;
  subName?: string;
  rarity: "SSR" | "SR" | "R";
  resonance: "強攻" | "剛毅" | "恩恵";
  trait: "雷" | "氷" | "炎" | "物理" | "異能" | string;
  overview: string;
  mainSkills: { title: string; content: string }[];
  constellations: { level: number; content: string }[];
  matrices: { set2: string; set4: string };
  avatarTrait: string;
};

export const cnCharacterData: Record<string, CNCharacter> = {
  hipper: {
    id: "hipper",
    name: "シードル",
    subName: "Hipper",
    rarity: "SSR",
    resonance: "強攻",
    trait: "雷・氷",
    overview: `雷のメインアタッカー。立ち回りはリンゼイやアストール同様、通常攻撃や第2スキルメインの傾向にある。\nスキルで通常攻撃を強化して、「強化通常攻撃⇒回避攻撃&特殊回避攻撃&通常5段目のループ⇒第2スキル」で火力を出す。\nタイタンのレアステータスは弱点攻撃以外は通常攻撃に寄せるといいかも。`,
    mainSkills: [
      {
        title: "スキル",
        content: "\n倍率は第1：10022%、第2：20160%。\n第1スキルはダメージ+強化状態になるが、通常攻撃が強化通常攻撃に変化するだけでバフはなし。\n第2スキルは高倍率ダメージのみ。",
      },
      {
        title: "強化通常攻撃",
        content: "\n倍率は28411%、ボリ2セット効果で36331%まで上昇。\n第1スキル使用で強化通常攻撃に変化。基本は強化通常攻撃のみ使う。",
      },
      {
        title: "特殊回避攻撃",
        content: "\n倍率は9331%、通常攻撃扱い。\nスキル発動から一定時間経過で発動可能になる回避攻撃の分岐。無凸で9秒、1凸で5秒のクールタイム。\n発動後に通常攻撃を押すと通常5段目が発動。\nなお、クールタイムが開けた後はすぐに再使用可能なようなので、1凸以降は最初の5秒で通常攻撃を撃ち切ったら、その後は回避攻撃⇒特殊回避攻撃⇒通常5段目の流れを繰り返すことになる。",
      },
    ],
    constellations: [
      {
        level: 1,
        content: "\n特殊回避攻撃のクールタイムが9秒から5秒に短縮。\n通常5段目は命中したターゲット全てにマークを付与し、第2スキルでマークした敵に10000%の追加ダメージを与える。",
      },
      {
        level: 3,
        content: "\n雷ダメージ+24%。\n雷ダメージを与えると、自身のダメージ軽減効果+10%、最大+20%まで、5秒間持続。",
      },
      {
        level: 5,
        content: "\n雷耐性無視30%。\n他の武器に切り替えると、シードル武器を表にしていた時間に基づいて、自身のHPを1秒につき最大HPの2%回復（最大40%まで）。",
      },
      {
        level: 6,
        content: "\n最終ダメージ+45％。\n第2スキルの倍率が20160％から41760％に上昇。",
      },
    ],
    matrices: {
      set2: `\n雷攻撃力+30/40/50/60%。\nシードルの通常攻撃5段目の倍率が5292%まで上昇。\n強化通常攻撃5段目の倍率が16632%まで上昇。`,
      set4: `\n雷ダメージ+15/20/25/30%。\nシードルの武器装備時、会心ダメージ+15/20/25/30% & 最終ダメージ+25%。`,
    },
    avatarTrait: `最終ダメージ+18%。\nシードルの武器装備時、雷ダメージ+24% & 最終ダメージ+24%。`,
  },
  // 他キャラもここに追加
};