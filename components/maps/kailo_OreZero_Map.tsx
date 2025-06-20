// pages/map/kailo_OreZero_Map.tsx
import dynamic from 'next/dynamic';
import points from '@/data/maps/kailo_OreZero_points.json';
import type { Point } from '@/components/maps/ExplorationMap';

const ExplorationMap = dynamic(() => import('@/components/maps/ExplorationMap'), { ssr: false });

export default function KailoOreZeroMap() {
  return (
    <ExplorationMap
      mapId="kailo_OreZero"
      imageUrl="/map/kailo_OreZero.png"
      imageWidth={1119}
      imageHeight={1003}
      points={points as Point[]}
    />
  );
}
