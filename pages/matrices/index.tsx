import Link from "next/link";
import SidebarLayout from "@/components/layout/SidebarLayout";
import matrices from "@/data/matrices.json";
import Head from "next/head";

export default function MatricesPage() {
  const sortedMatrices = [...matrices].sort((a, b) => {
    const getNumericId = (id: string) => parseInt(id.split("_")[1], 10);
    return getNumericId(b.id) - getNumericId(a.id);
  });

  return (
   <>
    <Head>
      <title>【幻塔】ボリション性能一覧 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）のボリションデータ・性能を紹介。" />
    </Head>

    <SidebarLayout>
      <h1 className="text-xl font-bold mb-4">ボリション一覧</h1>
      <div className="space-y-4">
        {sortedMatrices.map((matrix) => (
          <div
            key={matrix.id}
            className="flex flex-col sm:flex-row items-start border border-gray-300 p-3 sm:p-4 rounded-lg"
          >
            {/* 画像と名前へのリンク */}
            <Link
              href={`/matrices/${matrix.id}`}
              className="w-full sm:w-32 flex-shrink-0 text-center hover:opacity-80 transition mb-2 sm:mb-0"
            >
              <img
                src={`/images/${matrix.id}_img.PNG`}
                alt={matrix.name}
                className="w-24 sm:w-full h-auto mx-auto mb-2"
              />
              <div className="font-semibold text-sm sm:text-base">{matrix.name}</div>
            </Link>

            {/* 効果 + タグ表示 */}
            <div className="sm:ml-4 flex flex-col justify-between h-full flex-grow w-full">
              {(matrix.effects || []).map((eff, idx) => (
                <div key={idx} className="mb-3">
                  <div className="text-sm font-semibold text-gray-700">{eff.set}</div>
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
   </>
  );
}
