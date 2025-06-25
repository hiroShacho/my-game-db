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
      <div className="px-2 sm:px-8 max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">アルケー一覧</h1>
        <div className="space-y-4">
          {sortedRelics.map((relic) => (
            <div
              key={relic.id}
              className="flex flex-col sm:flex-row items-center border p-2 sm:p-4 rounded shadow-sm gap-4"
            >
              <Link href={`/relics/${relic.id}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px]">
                  <Image
                    src={`/images/r_${relic.id.split("_")[1]}_img.PNG`}
                    alt={relic.name}
                    fill
                    className="object-contain rounded cursor-pointer"
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-center w-full">
                <Link href={`/relics/${relic.id}`}>
                  <h2 className="text-base sm:text-lg font-semibold text-blue-700 hover:underline">
                    {relic.name}
                  </h2>
                </Link>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{relic.description}</p>
                <div className="flex flex-wrap gap-2">
                  {relic.baseTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}