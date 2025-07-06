import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import weapons from "@/data/weapons.json";
import skills from "@/data/skills.json";
import matrices from "@/data/matrices.json";
import traits from "@/data/traits.json";
import relics from "@/data/relics.json";
import Link from "next/link";
import Head from "next/head";

interface SearchItem {
  id: string;
  name: string;
  description: string;
  type: string;
  refId?: string; // スキルの場合は参照元の武器ID
}

export default function SiteSearch() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (typeof q === "string") {
      const keyword = q.toLowerCase();

      const match = (item: any, type: string, refId?: string): SearchItem | null => {
        const name = item.name?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        if (name.includes(keyword) || description.includes(keyword)) {
          return {
            id: item.id,
            name: item.name,
            description: item.description || "",
            type,
            refId,
          };
        }
        return null;
      };

      const allResults: SearchItem[] = [];

      weapons.forEach(item => {
        const res = match(item, "武器");
        if (res) allResults.push(res);
      });

      skills.forEach(skill => {
        const weapon = weapons.find(w => w.skillIds?.includes(skill.id));
        if (weapon) {
          const res = match(skill, "スキル", weapon.id); // refId: 武器ID
          if (res) allResults.push(res);
        }
      });

      matrices.forEach(item => {
        const res = match(item, "ボリション");
        if (res) allResults.push(res);
      });

      traits.forEach(item => {
        const res = match(item, "アバター特性");
        if (res) allResults.push(res);
      });

      relics.forEach(item => {
        const res = match(item, "アルケー");
        if (res) allResults.push(res);
      });

      setResults(allResults);
    }
  }, [q]);

  return (
   <>
    <Head>
      <title>【幻塔攻略】検索 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の攻略データベース内（本サイト内）を検索できる検索ページです。" />
    </Head>
    <SidebarLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">「{q}」の検索結果</h1>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((item, index) => {
            let href = "#";
            switch (item.type) {
              case "武器":
                // weaponsのみid→slug参照
                const weapon = weapons.find(w => w.id === item.id);
                href = `/weapons/${weapon?.slug || item.id}`;
                break;
              case "スキル":
                // スキルリンクは武器のslugのみ対応
                const weaponForSkill = weapons.find(w => w.id === item.refId);
                href = `/weapons/${weaponForSkill?.slug || item.refId}#${item.id}`;
                break;
              case "ボリション":
                href = `/matrices/${item.id}`;
                break;
              case "アバター特性":
                href = `/trait/${item.id}`;
                break;
              case "アルケー":
                href = `/relics/${item.id}`;
                break;
            }

            return (
              <li key={index} className="border p-4 sm:p-6 rounded shadow-sm">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">{item.type}</div>
                <Link href={href}>
                  <div className="font-semibold text-blue-700 hover:underline cursor-pointer text-base sm:text-lg">
                    {item.name}
                  </div>
                </Link>
                <div className="text-gray-700 whitespace-pre-wrap mt-1 text-sm sm:text-base">{item.description}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm sm:text-base text-gray-500">
          該当するデータが見つかりませんでした。
        </p>
      )}
    </SidebarLayout>
   </>
  );
}