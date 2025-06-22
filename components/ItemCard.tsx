import React from "react";
import { WeaponData, SkillData, MatrixData, TraitData, RelicData } from "../types";

type ItemCardProps = {
  item: WeaponData | SkillData | MatrixData | TraitData | RelicData;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="border p-4 rounded shadow mb-2">
      <h2 className="text-xl font-bold">{item?.name ?? ""}</h2>
      <p className="text-sm text-gray-500">{(item as any)?.type ?? ""}</p>
      <p>{item?.description ?? ""}</p>
      <div className="mt-2">
        {Array.isArray((item as any)?.tags) &&
          (item as any).tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 rounded"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}