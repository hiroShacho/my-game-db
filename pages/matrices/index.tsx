import Link from "next/link";
import SidebarLayout from "@/components/layout/SidebarLayout";
import matrices from "@/data/matrices.json";

export default function MatricesPage() {
  const sortedMatrices = [...matrices].sort((a, b) => {
    const getNumericId = (id: string) => parseInt(id.split("_")[1], 10);
    return getNumericId(b.id) - getNumericId(a.id);
  });

  return (
    <SidebarLayout>
      <h1 className="text-xl font-bold mb-4">ボリション一覧</h1>
      <div className="space-y-4">
        {sortedMatrices.map((matrix) => (
          <div
            key={matrix.id}
            className="flex items-start border border-gray-300 p-4 rounded-lg"
          >
            {/* 画像と名前へのリンク */}
            <Link
              href={`/matrices/${matrix.id}`}
              className="w-32 flex-shrink-0 text-center hover:opacity-80 transition"
            >
              <img
                src={`/images/${matrix.id}_img.PNG`}
                alt={matrix.name}
                className="w-full h-auto mb-2"
              />
              <div className="font-semibold">{matrix.name}</div>
            </Link>

            {/* 効果 + タグ表示 */}
            <div className="ml-4 flex flex-col justify-between h-full flex-grow">
              {(matrix.effects || []).map((eff, idx) => (
                <div key={idx} className="mb-3">
                  <div className="text-sm font-semibold text-gray-700">
                    {eff.set}
                  </div>
                  <div className="text-sm text-gray-800 mb-1">{eff.effect}</div>
                  <div>
                    {(eff.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 mb-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
