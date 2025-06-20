import { useRouter } from 'next/router'
import traits from '@/data/traits.json'
import weapons from '@/data/weapons.json'
import Image from 'next/image'
import Link from 'next/link'
import SidebarLayout from '@/components/Layout/SidebarLayout'

export default function TraitDetail() {
  const router = useRouter()
  const { id } = router.query

  if (!id || typeof id !== 'string') return null

  const trait = traits.find(t => t.id === id)
  if (!trait) return <div>特性が見つかりませんでした。</div>

  const weapon = weapons.find(w => w.avatar === trait.avatar)

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">{trait.name}</h1>
      <Image
        src={`/images/${trait.id}_img.PNG`}
        alt={`${trait.name}の画像`}
        width={400}
        height={400}
      />

      {/* 効果 */}
      <div className="border rounded-md p-4 bg-gray-50 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">効果</h2>
        <p className="text-base">{trait.description}</p>
      </div>

      {/* 評価 */}
      <div className="border rounded-md p-4 bg-gray-50 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">評価</h2>
        <p className="text-base">{trait.rating || '評価は未設定です。'}</p>
      </div>

      {trait.tags && trait.tags.length > 0 && (
        <div className="border rounded-md p-4 bg-gray-50 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">タグ</h2>
          <div className="flex flex-wrap gap-2">
            {trait.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* アバター武器リンク */}
      {weapon ? (
        <div>
          <div className="text-sm text-gray-500 mb-1">アバター武器リンク：</div>
          <Link href={`/weapons/${weapon.id}`}>
            <Image
              src={`/images/${weapon.id}_img.PNG`}
              alt={`${weapon.name}の画像`}
              width={150}
              height={150}
            />
          </Link>
        </div>
      ) : (
        <div>対応する武器が見つかりませんでした。</div>
      )}
    </div>
  )
}

TraitDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <SidebarLayout>{page}</SidebarLayout>
}
