import SidebarLayout from "@/components/layout/SidebarLayout";
import relics from "@/data/relics.json";
import Link from "next/link";
import Image from "next/image";

export default function RelicsPage() {
  const sortedRelics = [...relics].sort(
    (a, b) => parseInt(b.id.split("_")[1]) - parseInt(a.id.split("_")[1])
  );

  return (
    <SidebarLayout>
      <h1 className="text-xl font-bold mb-4">アルケー一覧</h1>
      <div className="space-y-4">
        {sortedRelics.map((relic) => (
          <div
            key={relic.id}
            className="flex items-center border p-4 rounded shadow-sm"
          >
            <Link href={`/relics/${relic.id}`}>
              <div className="relative w-[120px] h-[120px]">
                <Image
                  src={`/images/r_${relic.id.split("_")[1]}_img.PNG`}
                  alt={relic.name}
                  fill
                  className="object-contain rounded cursor-pointer"
                />
              </div>
            </Link>
            <div className="ml-4 flex flex-col justify-center">
              <Link href={`/relics/${relic.id}`}>
                <h2 className="text-lg font-semibold text-blue-700 hover:underline">
                  {relic.name}
                </h2>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{relic.description}</p>
              <div className="flex flex-wrap gap-2">
                {relic.baseTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
