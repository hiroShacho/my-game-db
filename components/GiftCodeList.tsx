import React, { useState } from "react";

type GiftCode = { code: string; desc: string; expire: string; };

export const GiftCodeList: React.FC<{ codes: GiftCode[] }> = ({ codes }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {}
  };

  return (
    <div className="w-full bg-white rounded shadow p-4">
      <h3 className="text-md sm:text-lg font-semibold mb-3 text-gray-800">ギフトコード一覧</h3>
      <div className="space-y-3">
        {codes.length === 0 && (
          <div className="text-gray-500 text-sm">現在利用可能なギフトコードはありません。</div>
        )}
        {codes.map((g, i) => (
          <div key={g.code} className="flex flex-col sm:flex-row sm:items-center border-b pb-2 last:border-b-0 last:pb-0 sm:space-x-4">
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-800 text-sm sm:text-base select-all">{g.code}</span>
              <span className="ml-0 sm:ml-2 text-xs sm:text-sm text-gray-600" style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", display: "inline-block"}}>{g.desc}</span>
            </div>
            <div className="flex items-center mt-1 sm:mt-0 space-x-2 shrink-0">
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">期限: {g.expire}</span>
              <button className="px-2 py-1 text-xs sm:text-sm rounded border bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 active:bg-blue-300 transition whitespace-nowrap"
                onClick={() => handleCopy(g.code, i)} tabIndex={0} type="button">
                {copiedIndex === i ? "コピー済" : "コピー"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-400">※ コードはゲーム内の特典⇒引き換えから入力してください。期限切れにご注意ください。</div>
    </div>
  );
};