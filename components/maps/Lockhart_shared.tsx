import Image from "next/image";

// セクションタイトル（見本に合わせた装飾）
export function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-pink-300/60 to-pink-50 border-l-8 border-pink-500 rounded px-4 py-2 my-5 shadow">
      {icon && <span className="material-symbols-outlined text-pink-600 text-2xl">{icon}</span>}
      <span className="text-2xl font-bold text-pink-900">{children}</span>
    </div>
  );
}

// キャプション付き画像・動画
function CaptionedMedia({
  src,
  alt,
  caption,
  maxWidth = 900,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
  onClick?: () => void;
}) {
  const isVideo = src.toLowerCase().endsWith(".mp4");

  return (
    <div className="flex flex-col items-center my-3 mx-auto" style={{ width: "100%", maxWidth }}>
      <div
        className={`relative rounded-lg shadow border-2 border-pink-300 overflow-hidden bg-black ${
          isVideo ? "" : "cursor-pointer"
        }`}
        style={{ width: "100%" }}
        onClick={!isVideo ? onClick : undefined}
        title={!isVideo && caption ? "クリックで拡大" : undefined}
      >
        {isVideo ? (
          <video
            controls
            preload="metadata"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <source src={src} type="video/mp4" />
            お使いのブラウザでは動画タグがサポートされていません。
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={maxWidth}
            height={Math.round((maxWidth * 480) / 900)}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        )}
      </div>
      {caption && (
        <div className="bg-pink-50 px-2 py-1 text-xs text-pink-800 border-t border-pink-200 w-full text-center">
          {caption}
        </div>
      )}
    </div>
  );
}

// 画像・動画を最大2枚横並び（以降は改行）
export function ImageRow({
  images,
  maxWidth = 480,
  onClick,
}: {
  images: { src: string; alt: string; caption?: string }[];
  maxWidth?: number;
  onClick?: (src: string, alt: string) => void;
}) {
  const chunks: { src: string; alt: string; caption?: string }[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    chunks.push(images.slice(i, i + 2));
  }

  return (
    <div className="w-full my-3">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-2 justify-center my-2 w-full">
          {chunk.map((img) => (
            <CaptionedMedia
              key={img.src}
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              maxWidth={maxWidth}
              onClick={
                onClick && !img.src.toLowerCase().endsWith(".mp4")
                  ? () => onClick(img.src, img.alt)
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 拡大モーダル（画像のみ）
export function Modal({
  open,
  src,
  alt,
  onClose,
}: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative bg-white rounded-lg p-2 shadow-lg max-w-4xl w-[96vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600"
          onClick={onClose}
          aria-label="閉じる"
          type="button"
        >
          ×
        </button>
        <div className="relative w-full h-[60vh] min-h-[300px] max-h-[72vh]">
          <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" style={{ background: "#fff" }} />
        </div>
      </div>
    </div>
  );
}