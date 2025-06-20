import traits from '@/data/traits.json'
import Image from 'next/image'
import Link from 'next/link'
import SidebarLayout from '@/components/Layout/SidebarLayout'

export default function TraitList() {
  const sortedTraits = [...traits].sort((a, b) => parseInt(b.id.replace('t_', '')) - parseInt(a.id.replace('t_', '')))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">アバター特性一覧</h1>
      <div className="space-y-6">
        {sortedTraits.map((trait) => (
          <div key={trait.id} className="flex border p-4 rounded-md">
            <Link href={`/trait/${trait.id}`} className="mr-4">
              <div className="w-[120px] h-[120px] relative">
                <Image
                  src={`/images/${trait.id}_img.PNG`}
                  alt={`${trait.name}の画像`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-1 text-sm">{trait.name}</div>
            </Link>
            <div className="flex flex-col justify-center space-y-2">
              <div>{trait.description}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {trait.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TraitList.getLayout = function getLayout(page: React.ReactNode) {
  return <SidebarLayout>{page}</SidebarLayout>
}
