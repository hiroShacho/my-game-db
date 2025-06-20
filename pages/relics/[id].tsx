import { GetStaticPaths, GetStaticProps } from 'next';
import relicsData from '@/data/relics.json';
import Image from 'next/image';
import Head from 'next/head';
import SidebarLayout from '@/components/layout/SidebarLayout'; // 修正


type Props = {
  relic: any;
};

export default function RelicDetailPage({ relic }: Props) {
  return (
    <SidebarLayout>
      <Head>
        <title>{relic.name} | アルケー詳細</title>
      </Head>
      <div className="p-4">
        {/* タイトルと画像 */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-80 h-40 relative mb-4 md:mb-0 md:mr-6">
            <Image
              src={`/images/${relic.id}_img.PNG`}
              alt={relic.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{relic.name}</h1>
            {relic.description && (
              <p className="mt-2 text-gray-700">{relic.description}</p>
            )}
          </div>
        </div>

        {/* タグ（baseTags） */}
        {Array.isArray(relic.baseTags) && relic.baseTags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {relic.baseTags.map((tag, index) => (
                <span key={index} className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 凸効果 */}
        {Array.isArray(relic.constellations) && relic.constellations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">凸効果</h2>
            {relic.constellations.map((effect, index) => (
              <div key={index} className="border p-3 mb-2 rounded bg-gray-50">
                <p className="font-semibold mb-1">{effect.level}</p>
                <p>{effect.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 評価 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">評価</h2>
          <p>{relic.evaluation || '評価はまだ登録されていません。'}</p>
        </div>
      </div>
    </SidebarLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = relicsData.map((relic) => ({
    params: { id: relic.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const relic = relicsData.find((r) => r.id === params?.id);

  return {
    props: {
      relic: relic || null,
    },
  };
};
