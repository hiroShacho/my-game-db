import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import SidebarLayout from '@/components/layout/SidebarLayout';

const KailoOreZeroMap = dynamic(() => import('@/components/maps/kailo_OreZero_Map'), { ssr: false });

export default function KailoMapPage() {
  return (
    <SidebarLayout>
      <KailoOreZeroMap />
    </SidebarLayout>
  );
}
