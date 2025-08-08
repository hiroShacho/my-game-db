import { GetStaticPaths, GetStaticProps } from 'next';
import relicsData from '@/data/relics.json';
import Image from 'next/image';
import Head from 'next/head';
import SidebarLayout from '@/components/layout/SidebarLayout';
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit"; // 追加

type Props = {
  relic: any;
};

export default function RelicDetailPage({ relic }: Props) {
  return (
   <>
    <Head>
      <title>【幻塔攻略】アルケー詳細 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）のアルケーの詳細を紹介。" />
    </Head>
    <SidebarLayout>
      <Head>
        <title>{relic.name} | アルケー詳細</title>
      </Head>
      <div className="px-2 py-4 sm:px-8 max-w-2xl mx-auto">
        {/* タイトルと画像 */}
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 gap-4">
          <div className="w-40 h-20 sm:w-80 sm:h-40 relative mb-2 sm:mb-0">
            <Image
              src={`/images/${relic.id}_img.PNG`}
              alt={relic.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-3xl font-bold">{relic.name}</h1>
            {relic.description && (
              <p className="mt-2 text-gray-700 text-sm sm:text-base">{relic.description}</p>
            )}
          </div>
        </div>

        {/* タグ（baseTags） */}
        {Array.isArray(relic.baseTags) && relic.baseTags.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {relic.baseTags.map((tag: string, index: number) => (
                <span key={index} className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 凸効果 */}
        {Array.isArray(relic.constellations) && relic.constellations.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">凸効果</h2>
            {relic.constellations.map((effect: { level: string; description: string }, index: number) => (
              <div key={index} className="border p-2 sm:p-3 mb-2 rounded bg-gray-50">
                <p className="font-semibold mb-1">{effect.level}</p>
                <p className="text-sm sm:text-base">{effect.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 評価 */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-2">評価</h2>
          <p className="text-sm sm:text-base">{relic.evaluation || '評価はまだ登録されていません。'}</p>
        </div>

        {/* 広告追加：評価の下 */}
        <div style={{ width: 320, minWidth: 200, maxWidth: '100%' }}>
          <AdSenseContentUnit />
        </div>
      </div>
    </SidebarLayout>
   </>
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