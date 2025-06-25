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
      {/* ヘッダ部分 */}
      <div className="p-3 bg-gray-100 border-b border-gray-300">
        <div className="flex flex-wrap gap-4 mb-2">
          <Link href="/map/kailo_OreZero_EXpoint" legacyBehavior>
            <a className={`font-bold ${mapId === 'kailo_OreZero' ? 'text-blue-700 underline' : ''}`}>
              キルオ：ゼロ鉱山区
            </a>
          </Link>
        </div>
        <div className="text-xs sm:text-sm text-gray-700 mb-2">
          マーカークリックで「取得済み／未取得」切替。<br />
          アイコン種別表示の切替も可能です。<br />
          他エリアのマップは今後実装予定
        </div>
        <div className="bg-white bg-opacity-80 px-2 py-1 flex flex-wrap gap-4 items-center">
          {Object.entries(progress).map(([icon, { total, collected }]) => (
            <div key={icon} className="flex items-center gap-1">
              <label className="flex items-center gap-1 cursor-pointer">
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
                <span className="text-xs sm:text-sm">{iconLabelMap[icon] || icon}: {collected} / {total}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 地図部分（高さをレスポンシブにする・z-indexを0で最背面に） */}
      <div className="w-full relative" style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}>
        <div
          className="absolute inset-0 z-0"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "320px",
            maxHeight: "70vh",
          }}
        >
          <MapContainer
            crs={L.CRS.Simple}
            bounds={bounds}
            style={{ width: "100%", height: "100%" }}
            zoomSnap={0.1}
            zoomDelta={0.1}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            dragging={true}
            zoomControl={false}
            className="z-0"
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
                    <p className="whitespace-pre-line">{point.description}</p>
                    <button
                      onClick={() => toggleCollected(point.id)}
                      className="mt-1 px-2 py-1 bg-cyan-50 border border-cyan-600 rounded text-xs hover:bg-cyan-100"
                    >
                      {collected[point.id] ? '未取得にする' : '取得済みにする'}
                    </button>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* 動画部分 */}
      {mapVideoMap[mapId] && (
        <div className="p-4 bg-blue-50 mt-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-3">
            🔍 探索解説動画
          </h3>
          <div className="relative w-full" style={{ paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={mapVideoMap[mapId]}
              title="解説動画"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg shadow"
            />
          </div>
        </div>
      )}
    </div>
  );
}