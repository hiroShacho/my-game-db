// pages/map/kailo_BrightonZone_Map.tsx
import dynamic from 'next/dynamic';
import points from '@/data/maps/kailo_BrightonZone_points.json';
import type { Point } from '@/components/maps/ExplorationMap';

const ExplorationMap = dynamic(() => import('@/components/maps/ExplorationMap'), { ssr: false });

export default function KailoBrightonZoneMap() {
  return (
    <ExplorationMap
      mapId="kailo_BrightonZone"
      imageUrl="/map/kailo_BrightonZone.png"
      imageWidth={1050}
      imageHeight={850}
      points={points as Point[]}
    />
  );
}