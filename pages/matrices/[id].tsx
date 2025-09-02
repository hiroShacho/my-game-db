import { useRouter } from "next/router";
import matrices from "@/data/matrices.json";
import weapons from "@/data/weapons.json";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";
import Head from "next/head";
import StarRating from "@/components/StarRating";
import { AdSenseContentUnit } from "@/components/AdSenseContentUnit";
import { AdSenseContentUnit2 } from "@/components/AdSenseContentUnit2";

export default function MatrixDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const matrix = matrices.find((m) => m.id === id);

  if (!matrix) {
    return <SidebarLayout>ボリションが見つかりませんでした。</SidebarLayout>;
  }

  const associatedWeapon = weapons.find((w) => w.avatar === matrix.avatar);

  return (
   <>
    <Head>
      <title>【幻塔攻略】ボリション詳細 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）のボリションの詳細を紹介。" />
    </Head>
    <SidebarLayout>
      <div className="space-y-4 px-2 sm:px-8">
        {/* ボリション画像 */}
        <img
          src={`/images/${matrix.id}_img.PNG`}
          alt={matrix.name}
          className="w-30 h-auto mx-auto"
        />

        {/* ボリション名 */}
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          {matrix.avatar}のボリション　{matrix.name}
        </h1>

        {/* 効果表示 */}
        <div className="space-y-2">
          {(matrix.effects || []).map((eff, idx) => (
            <div key={idx} className="bg-gray-100 p-3 sm:p-4 rounded">
              <div className="font-semibold text-sm sm:text-base text-gray-700 whitespace-pre-line">{eff.set}</div>
              <div className="text-sm sm:text-base text-gray-800 whitespace-pre-line">{eff.effect}</div>
              {/* タグ */}
              {eff.tags && eff.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {eff.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 評価 */} 
        <div className="bg-gray-100 p-3 rounded space-y-1">
          <div className="font-semibold text-sm text-gray-700">評価</div>
          {/* StarRatingコンポーネントで表示 */}
          <StarRating score={Number(matrix.ratingStars || 0)} size={16} />
          <div className="text-sm text-gray-800">
            {matrix.ratingComment || "評価コメントは準備中です。"}
          </div>
        </div>

        {/* アバター武器リンク（画像＋リンク） */}
        {associatedWeapon ? (
          <div className="text-center mt-4 space-y-2">
            <Link href={`/weapons/${associatedWeapon.slug}`}>
              <img
                src={`/images/${associatedWeapon.id}_img.PNG`}
                alt={`${associatedWeapon.name}の画像`}
                className="w-30 h-auto mx-auto hover:opacity-80 transition"
              />
            </Link>
            <div>
              <Link
                href={`/weapons/${associatedWeapon.slug}`}
                className="text-blue-600 hover:underline"
              >
                アバター「{matrix.avatar}」の武器を見る
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-sm text-center mt-4 text-gray-500">
            該当する武器が見つかりません。
          </div>
        )}

        {/* 広告表示：2つ横並び */}
        <div className="flex flex-row gap-2 mb-4" style={{ justifyContent: "center" }}>
          <AdSenseContentUnit />
          <AdSenseContentUnit2 />
        </div>
      </div>
    </SidebarLayout>
   </>
  );
}