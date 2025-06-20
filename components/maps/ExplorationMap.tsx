import { MapContainer, ImageOverlay, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

export type Point = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  icon: string;
};

type ExplorationMapProps = {
  mapId: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  points: Point[];
};

const iconLabelMap: Record<string, string> = {
  gate: '転送ゲート',
  Expoint: '探索ポイント',
  chest_blue: '青宝箱',
  chest_purple: '紫宝箱',
  chest_gold: '金宝箱',
  named_boss: '掃討リスト',
};

const mapNameMap: Record<string, string> = {
  kailo_OreZero: 'キルオ：ゼロ鉱山区',
};

const mapVideoMap: Record<string, string> = {
  kailo_OreZero: 'https://www.youtube.com/embed/_qcAmRFNGJo',
};

function FitBoundsOnce({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  const [fitted, setFitted] = useState(false);

  useEffect(() => {
    if (!fitted) {
      map.fitBounds(bounds);
      map.setMinZoom(map.getZoom());
      map.setMaxBounds(bounds);
      setFitted(true);
    }
  }, [map, bounds, fitted]);

  return null;
}

export default function ExplorationMap({
  mapId,
  imageUrl,
  imageWidth,
  imageHeight,
  points,
}: ExplorationMapProps) {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [imageHeight, imageWidth],
  ];
  const localStorageKey = `${mapId}_flags`;
  const [collected, setCollected] = useState<Record<string, boolean>>({});
  const [visibleIcons, setVisibleIcons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      try {
        setCollected(JSON.parse(stored));
      } catch {
        console.warn(`ローカルストレージの読み込み失敗: ${localStorageKey}`);
      }
    }
  }, [localStorageKey]);

  useEffect(() => {
    const icons = Array.from(new Set(points.map((p) => p.icon)));
    setVisibleIcons((prev) => {
      const updated = { ...prev };
      for (const icon of icons) {
        if (!(icon in updated)) {
          updated[icon] = true;
        }
      }
      return updated;
    });
  }, [points]);

  const toggleCollected = (id: string) => {
    setCollected((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id],
      };
      localStorage.setItem(localStorageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const progress = useMemo(() => {
    const result: Record<string, { total: number; collected: number }> = {};
    for (const point of points) {
      const key = point.icon;
      if (!result[key]) result[key] = { total: 0, collected: 0 };
      result[key].total++;
      if (collected[point.id]) result[key].collected++;
    }
    return result;
  }, [points, collected]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div style={{ padding: '12px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <Link href="/map/kailo_OreZero_EXpoint" legacyBehavior>
            <a style={{ fontWeight: mapId === 'kailo_OreZero' ? 'bold' : 'normal' }}>キルオ：ゼロ鉱山区</a>
          </Link>
        </div>
        <div style={{ fontSize: '0.9em', color: '#333', marginBottom: '8px' }}>
          マーカーをクリックすると「取得済み／未取得」を切り替えることができます。<br />
          表示するアイコンの種類はチェックボックスで切り替え可能です。<br />
          他エリアのマップは今後実装予定
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.8)',
            padding: '4px 8px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(progress).map(([icon, { total, collected }]) => (
            <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={visibleIcons[icon] !== false}
                  onChange={() =>
                    setVisibleIcons((prev) => ({
                      ...prev,
                      [icon]: !prev[icon],
                    }))
                  }
                />
                <img src={`/icons/${icon}.png`} alt={icon} width={20} height={20} />
                <span>{iconLabelMap[icon] || icon}: {collected} / {total}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height: '480px' }}>
        <MapContainer
          crs={L.CRS.Simple}
          bounds={bounds}
          style={{ width: '100%', height: '100%' }}
          zoomSnap={0.1}
          zoomDelta={0.1}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <ImageOverlay url={imageUrl} bounds={bounds} />
          <FitBoundsOnce bounds={bounds} />
          {points.map((point) => {
            if (!visibleIcons[point.icon]) return null;

            const iconUrl = `/icons/${point.icon}.png`;
            const icon = new L.DivIcon({
              className: `custom-marker ${collected[point.id] ? 'collected-marker' : ''}`,
              html: `<div class="marker-circle"><img src="${iconUrl}" alt="${point.icon}" /></div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });


            return (
              <Marker
                key={point.id}
                position={[point.y, point.x]}
                icon={icon}
                opacity={collected[point.id] ? 0.5 : 1.0}
              >
                <Popup offset={[0, -20]}>
                  <strong>{point.name}</strong>
                  <p>{point.description}</p>
                  <button
                    onClick={() => toggleCollected(point.id)}
                    style={{
                      marginTop: '4px',
                      padding: '4px 8px',
                      backgroundColor: '#e0f7fa',
                      border: '1px solid #00acc1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {collected[point.id] ? '未取得にする' : '取得済みにする'}
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {mapVideoMap[mapId] && (
        <div style={{ padding: '24px', background: '#eef2f7', marginTop: '16px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
            🔍 探索解説動画
          </h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <iframe
              src={mapVideoMap[mapId]}
              title="解説動画"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
