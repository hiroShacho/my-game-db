import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import SidebarLayout from '@/components/layout/SidebarLayout';
import Head from "next/head";

const KailoOreZeroMap = dynamic(() => import('@/components/maps/kailo_OreZero_Map'), { ssr: false });

export default function KailoMapPage() {
  return (
   <>
    <Head>
      <title>【幻塔】探索マップ・キルオゼロ鉱山区 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の探索マップで探索を快適に！" />
    </Head>
      
    <SidebarLayout> 
      <KailoOreZeroMap />
    </SidebarLayout>
   </>
  );
}
