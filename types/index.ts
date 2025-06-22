// types/index.ts

/** 汎用タグ */
export type Tag = string;

/** 武器データ */
export interface WeaponData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  strategy: string;
  ratingScore: number;
  ratingText: string;
  videoUrls: string[];
  tags?: string[];
  skillIds?: string[];
  constellations?: {
    level: string;
    description: string;
    tags?: string[];
  }[];
}

/** スキルデータ */
export interface SkillData {
  id: string;
  name: string;
  description: string;
  tags?: string[];
}

/** ボリション（マトリクス）データ */
export interface MatrixData {
  id: string;
  name: string;
  avatar: string;
  description: string;
  effects?: {
    set: string;
    effect: string;
    tags?: string[];
  }[];
}

/** アバター特性データ */
export interface TraitData {
  id: string;
  name: string;
  avatar: string;
  description: string;
  rating?: string;
  tags?: string[];
}

/** アルケー（遺物）データ */
export interface RelicData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  constellations?: {
    level: string;
    description: string;
    tags?: string[];
  }[];
  baseTags?: string[];
  evaluation?: string; // 追加：ページで参照する評価情報
}

/** 旧コードで直接使われていた 'Relic' 型を復活 */
export type Relic = RelicData;

// 以降を追記して、以下をすべてグローバルスコープに注入します。
// — ページ側を一切触らずに 'Relic' や 'JSX.Element' がそのまま使えるように —

// グローバル型宣言
export {};
declare global {
  /** RelicData のグローバルエイリアス */
  type Relic = RelicData;

  namespace JSX {
    /**
     * JSX.Element を ReactNode と同一視して
     * resultItems: JSX.Element[] を ReactNode[] にできるようにする
     */
    type Element = import('react').ReactNode;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
