import { useRouter } from 'next/router'
import traits from '@/data/traits.json'
import weapons from '@/data/weapons.json'
import Image from 'next/image'
import Link from 'next/link'
import SidebarLayout from '@/components/layout/SidebarLayout'

export default function TraitDetail() {
  const router = useRouter()
  const { id } = router.query

  if (!id || typeof id !== 'string') return null

  const trait = traits.find(t => t.id === id)
  if (!trait) return <SidebarLayout><div className="p-4">特性が見つかりませんでした。</div></SidebarLayout>

  const weapon = weapons.find(w => w.avatar === trait.avatar)

  return (
    <SidebarLayout>
      <div className="px-2 sm:px-8 py-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">{trait.name}</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          {/* 画像エリア */}
          <div className="flex-shrink-0 flex items-center sm:items-start justify-center sm:justify-center sm:h-full">
            <div className="w-32 h-32 sm:w-48 sm:h-[250px] bg-blue-100 rounded flex items-center justify-center">
              <Image
                src={`/images/${trait.id}_img.PNG`}
                alt={`${trait.name}の画像`}
                width={160}
                height={160}
                className="object-contain rounded"
                // fillは使わない
              />
            </div>
          </div>
          {/* 情報ボックス群 */}
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-1">効果</h2>
              <p className="text-sm sm:text-base">{trait.description}</p>
            </div>
            <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-1">評価</h2>
              <p className="text-sm sm:text-base">{trait.rating || '評価は未設定です。'}</p>
            </div>
            {trait.tags && trait.tags.length > 0 && (
              <div className="border rounded-md p-2 sm:p-4 bg-gray-50 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold mb-1">タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {trait.tags.map((tag) => (
                    <span key={tag} className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* アバター武器リンク */}
        {weapon ? (
          <div className="mt-4">
            <div className="text-xs sm:text-sm text-gray-500 mb-1">アバター武器リンク：</div>
            <Link href={`/weapons/${weapon.slug}`} className="inline-block">
              <Image
                src={`/images/${weapon.id}_img.PNG`}
                alt={`${weapon.name}の画像`}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="text-xs sm:text-sm text-center mt-1">{weapon.name}</div>
            </Link>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-gray-500 mt-4">対応する武器が見つかりませんでした。</div>
        )}
      </div>
    </SidebarLayout>
  )
}