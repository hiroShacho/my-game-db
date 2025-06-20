import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import weapons from "../../data/weapons.json";
import skills from "../../data/skills.json";
import matrices from "../../data/matrices.json";
import traits from "../../data/traits.json";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Link from "next/link";

const skillCategories = ["通常攻撃", "回避", "スキル", "連携スキル"];

export default function WeaponDetail() {
  const router = useRouter();
  const { id, q } = router.query;
  const [selectedTab, setSelectedTab] = useState<string>("通常攻撃");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const hasScrolled = useRef(false);

  const weapon = weapons.find(w => w.id === String(id));
  const skillList = weapon
    ? skills.filter(s => Array.isArray(weapon.skillIds) && weapon.skillIds.includes(s.id))
    : [];

  useEffect(() => {
    if (typeof window === "undefined" || !weapon) return;

    if (!hasScrolled.current && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const skill = skillList.find(s => s.id === targetId);
      if (skill) {
        const foundCategory = skill.tags.find(tag => skillCategories.includes(tag));
        if (foundCategory) {
          setSelectedTab(foundCategory);
          setHighlightId(targetId);
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
          hasScrolled.current = true;
        }
      }
    }

    if (typeof q === "string") {
      setKeyword(q.toLowerCase());
    }
  }, [id, skillList, q, weapon]);

  const filteredSkills = skillList.filter(s => s.tags.includes(selectedTab));

  const highlightKeyword = (text: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
    );
  };

  const getEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {!weapon ? (
          <div className="p-4">武器が見つかりません。</div>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <img
                src={`/images/${weapon.id}_img.PNG`}
                alt={weapon.name}
                className="w-32 h-32 object-contain"
              />
              <div className="space-y-2 mt-2">
                <h1 className="text-3xl font-bold">{weapon.name}</h1>
                <div className="flex gap-4 items-start">
                  <img
                    src={`/images/${weapon.tags.find(tag => ["R", "SR", "SSR"].includes(tag))}.png`}
                    alt="レア度"
                    className="h-8 mt-2"
                  />
                  <div className="text-center mt-2">
                    <img
                      src={`/images/${weapon.tags.find(tag => ["強攻", "剛毅", "恩恵"].includes(tag))}.png`}
                      alt="共鳴"
                      className="h-8"
                    />
                    <div className="text-sm mt-1">
                      {weapon.tags.find(tag => ["強攻", "剛毅", "恩恵"].includes(tag))}
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <img
                      src={`/images/${weapon.tags.find(tag => tag.match(/雷|氷|炎|物理|異能/))}.png`}
                      alt="属性"
                      className="h-8"
                    />
                    <div className="text-sm mt-1">
                      {weapon.tags.find(tag => tag.match(/雷|氷|炎|物理|異能/))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <h2 className="text-lg font-semibold">タグ</h2>
              <div className="mt-1">
                {weapon.tags.map(tag => (
                  <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold">評価</h2>
              {weapon.ratingScore !== undefined ? (
                <div className="text-sm text-gray-800 mt-1">
                  <div className="text-yellow-500 mb-1">
                    {"★".repeat(weapon.ratingScore) + "☆".repeat(5 - weapon.ratingScore)}
                  </div>
                  {weapon.ratingText ? (
                    <p className="whitespace-pre-wrap">{weapon.ratingText}</p>
                  ) : (
                    <p className="text-gray-500">※コメントは未登録です。</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-1">※評価は未登録です。</p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold">運用方法</h2>
              {weapon.strategy ? (
                <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{weapon.strategy}</p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">※運用方法は未登録です。</p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold">凸効果</h2>
              {Array.isArray(weapon.constellations) && weapon.constellations.length > 0 ? (
                <ul className="list-disc list-inside text-sm mt-1">
                  {weapon.constellations.map((e, i) => (
                    <li key={i}>
                      <strong>{e.level}</strong>: {e.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-1">この武器には凸効果が存在しません。</p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">スキル</h2>
              <div className="flex gap-2 mb-4">
                {skillCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedTab(category)}
                    className={`px-3 py-1 rounded border ${
                      selectedTab === category ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredSkills.length > 0 ? (
                filteredSkills.map(skill => (
                  <div
                    key={skill.id}
                    id={skill.id}
                    className={`border p-3 rounded shadow-sm mb-3 scroll-mt-20 ${highlightId === skill.id ? "bg-yellow-100" : ""}`}
                  >
                    <h3 className="font-bold">{highlightKeyword(skill.name)}</h3>
                    <p className="text-sm whitespace-pre-wrap">{highlightKeyword(skill.description)}</p>
                    <div className="mt-1">
                      {skill.tags.map(tag => (
                        <span key={tag} className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 mr-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">該当カテゴリのスキルはありません。</p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold">ボリション</h2>
              {weapon.avatar ? (
                matrices.some(m => m.avatar === weapon.avatar) ? (
                  <div className="flex flex-col gap-4 mt-2">
                    {matrices.filter(m => m.avatar === weapon.avatar).map(matrix => (
                      <div key={matrix.id} className="border p-3 rounded shadow-sm">
                        <Link href={`/matrices/${matrix.id}`} className="flex items-center gap-4 mb-2">
                          <img
                            src={`/images/${matrix.id}_img.PNG`}
                            alt={matrix.name}
                            className="w-16 h-16 object-contain"
                          />
                          <div className="text-sm font-semibold">{matrix.name}</div>
                        </Link>
                        <div className="text-sm text-gray-700 space-y-1">
                          {Array.isArray(matrix.effects) &&
                            matrix.effects.map((e, i) => (
                              <div key={i}>
                                <strong>{e.set}:</strong> {e.effect}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">※該当するボリションは見つかりませんでした。</p>
                )
              ) : (
                <p className="text-sm text-gray-500">※この武器には対応アバター情報がありません。</p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold">アバター特性</h2>
              {weapon.avatar ? (
                traits.some(t => t.avatar === weapon.avatar) ? (
                  <div className="flex flex-col gap-4 mt-2">
                    {traits.filter(t => t.avatar === weapon.avatar).map(trait => (
                      <div key={trait.id} className="border p-3 rounded shadow-sm">
                        <Link href={`/trait/${trait.id}`} className="flex items-center gap-4 mb-2">
                          <img
                            src={`/images/${trait.id}_img.PNG`}
                            alt={trait.name}
                            className="w-16 h-16 object-contain"
                          />
                          <div className="text-sm font-semibold">{trait.name}</div>
                        </Link>
                        <div className="text-sm text-gray-700">{trait.description}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">※該当するアバター特性は見つかりませんでした。</p>
                )
              ) : (
                <p className="text-sm text-gray-500">※この武器には対応アバター情報がありません。</p>
              )}
            </section>

            {/* 武器解説動画（複数対応＋URL変換） */}
            {Array.isArray(weapon.videoUrls) && weapon.videoUrls.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold">武器解説動画</h2>
                <div className="flex flex-col gap-6 mt-2">
                  {weapon.videoUrls.map((url, idx) => (
                    <div key={idx} className="relative pb-[56.25%] h-0 overflow-hidden rounded">
                      <iframe
                        src={getEmbedUrl(url)}
                        title={`${weapon.name} の武器解説動画 ${idx + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded"
                      ></iframe>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </SidebarLayout>
  );
}
