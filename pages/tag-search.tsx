import { useState, useMemo } from 'react';
import Link from 'next/link';
import weaponData from '@/data/weapons.json';
import skillData from '@/data/skills.json';
import matrixData from '@/data/matrices.json';
import traitData from '@/data/traits.json';
import relicData from '@/data/relics.json';
import SidebarLayout from '@/components/layout/SidebarLayout';
import { Tag } from '@/types';
import Head from "next/head";

type TagType = '武器' | '凸効果' | 'スキル' | 'ボリション' | 'アバター特性' | 'アルケー';

const responsivePadding = { padding: "4vw", maxWidth: 600, margin: "0 auto" };

// 検索避けフラグ判定
const isSearchable = (item: any) =>
  !("isCN" in item && item.isCN) &&
  !("isHiddenFromSearch" in item && item.isHiddenFromSearch) &&
  !(item.id && typeof item.id === "string" && item.id.startsWith("CN_"));

const TagSearchPage: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagSearchMode, setTagSearchMode] = useState<'AND' | 'OR'>('AND');

  const toggleType = (type: TagType) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updated);
    if (!updated.includes(type)) {
      const tagsToRemove = getAllTagsForType(type);
      setSelectedTags((prev) => prev.filter((t) => !tagsToRemove.includes(t)));
    }
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getAllTagsForType = (type: TagType): Tag[] => {
    const tags = new Set<Tag>();
    if (type === '武器') {
      weaponData.filter(isSearchable).forEach((w) => w.tags?.forEach((t) => tags.add(t)));
    }
    if (type === '凸効果') {
      weaponData.filter(isSearchable).forEach((w) =>
        w.constellations?.forEach((c) =>
          c.tags?.forEach((t) => tags.add(t))
        )
      );
    }
    if (type === 'スキル') {
      skillData.filter(isSearchable).forEach((s) => s.tags?.forEach((t) => tags.add(t)));
    }
    if (type === 'ボリション') {
      matrixData.filter(isSearchable).forEach((m) =>
        m.effects?.forEach((e) => e.tags?.forEach((t) => tags.add(t)))
      );
    }
    if (type === 'アバター特性') {
      traitData.filter(isSearchable).forEach((t) => t.tags?.forEach((t2) => tags.add(t2)));
    }
    if (type === 'アルケー') {
      relicData.filter(isSearchable).forEach((r) => {
        r.constellations?.forEach((c) =>
          c.tags?.forEach((t2) => tags.add(t2))
        );
        r.baseTags?.forEach((t2) => tags.add(t2));
      });
    }
    return Array.from(tags).sort();
  };

  const allTags = useMemo(() => {
    const set = new Set<Tag>();
    selectedTypes.forEach((type) => {
      getAllTagsForType(type).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [selectedTypes]);

  const isMatch = (tags?: Tag[]): boolean => {
    if (!tags) return false;
    if (selectedTags.length === 0) return true;
    return tagSearchMode === 'AND'
      ? selectedTags.every((t) => tags.includes(t))
      : selectedTags.some((t) => tags.includes(t));
  };

  const renderResults = () => {
    if (selectedTypes.length === 0) return null;
    const resultItems: JSX.Element[] = [];

    // 武器
    if (selectedTypes.includes('武器')) {
      weaponData
        .filter(isSearchable)
        .filter((w) => isMatch(w.tags))
        .forEach((w) => {
          resultItems.push(
            <div key={`weapon-${w.id}`} style={cardStyle}>
              <div style={rowStyle}>
                <Link href={`/weapons/${w.slug}`}>
                  <img
                    src={`/images/${w.id}_img.PNG`}
                    alt={w.name}
                    style={imgStyle}
                  />
                </Link>
                <div>
                  <Link href={`/weapons/${w.slug}`}>
                    <div><strong>[武器]</strong> {w.name}</div>
                  </Link>
                  <div>アバター: {w.avatar}</div>
                </div>
              </div>
            </div>
          );
        });
    }

    // 凸効果
    if (selectedTypes.includes('凸効果')) {
      weaponData
        .filter(isSearchable)
        .forEach((w) => {
          w.constellations?.forEach((c, idx) => {
            if (isMatch(c.tags)) {
              resultItems.push(
                <div key={`constellation-${w.id}-${idx}`} style={cardStyle}>
                  <div style={rowStyle}>
                    <Link href={`/weapons/${w.slug}`}>
                      <img
                        src={`/images/${w.id}_img.PNG`}
                        alt={w.name}
                        style={imgStyle}
                      />
                    </Link>
                    <div>
                      <Link href={`/weapons/${w.slug}`}>
                        <div>
                          <strong>[凸効果]</strong> {w.name}：{idx + 1}凸
                        </div>
                      </Link>
                      <div>アバター: {w.avatar}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>{c.description}</div>
                </div>
              );
            }
          });
        });
    }

    // スキル
    if (selectedTypes.includes('スキル')) {
      skillData
        .filter(isSearchable)
        .forEach((s) => {
          if (isMatch(s.tags)) {
            const w = weaponData.filter(isSearchable).find((w) => w.skillIds?.includes(s.id));
            if (!w) return;
            resultItems.push(
              <div key={`skill-${s.id}`} style={cardStyle}>
                <div style={rowStyle}>
                  <Link href={`/weapons/${w.slug}`}>
                    <img
                      src={`/images/${w.id}_img.PNG`}
                      alt={w.name}
                      style={imgStyle}
                    />
                  </Link>
                  <div>
                    <Link href={`/weapons/${w.slug}`}>
                      <div><strong>[スキル]</strong> {s.name}</div>
                    </Link>
                    <div>武器: {w.name}（アバター: {w.avatar}）</div>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>{s.description}</div>
              </div>
            );
          }
        });
    }

    // ボリション
    if (selectedTypes.includes('ボリション')) {
      matrixData
        .filter(isSearchable)
        .forEach((m) => {
          m.effects?.forEach((e, idx) => {
            if (isMatch(e.tags)) {
              resultItems.push(
                <div key={`matrix-${m.id}-${idx}`} style={cardStyle}>
                  <div style={rowStyle}>
                    <Link href={`/matrices/${m.id}`}>
                      <img
                        src={`/images/${m.id}_img.PNG`}
                        alt={m.name}
                        style={imgStyle}
                      />
                    </Link>
                    <div>
                      <Link href={`/matrices/${m.id}`}>
                        <div>
                          <strong>[ボリション]</strong> {m.name}（{e.set}）
                        </div>
                      </Link>
                      <div>アバター: {m.avatar}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>{e.effect}</div>
                </div>
              );
            }
          });
        });
    }

    // アバター特性
    if (selectedTypes.includes('アバター特性')) {
      traitData
        .filter(isSearchable)
        .filter((t) => isMatch(t.tags))
        .forEach((t) => {
          resultItems.push(
            <div key={`trait-${t.id}`} style={cardStyle}>
              <div style={rowStyle}>
                <Link href={`/trait/${t.id}`}>
                  <img
                    src={`/images/${t.id}_img.PNG`}
                    alt={t.name}
                    style={avatarTraitImgStyle}
                  />
                </Link>
                <div>
                  <Link href={`/trait/${t.id}`}>
                    <div><strong>[アバター特性]</strong> {t.name}</div>
                  </Link>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>{t.description}</div>
            </div>
          );
        });
    }

    // アルケー
    if (selectedTypes.includes('アルケー')) {
      relicData
        .filter(isSearchable)
        .forEach((r) => {
          r.constellations?.forEach((c) => {
            if (isMatch(c.tags)) {
              resultItems.push(
                <div key={`relic-constellation-${r.id}-${c.level}`} style={cardStyle}>
                  <div style={rowStyle}>
                    <Link href={`/relics/${r.id}`}>
                      <img
                        src={`/images/${r.id}_img.PNG`}
                        alt={r.name}
                        style={relicImgStyle}
                      />
                    </Link>
                    <div>
                      <Link href={`/relics/${r.id}`}>
                        <div><strong>[アルケー]</strong> {r.name}（{c.level}効果）</div>
                      </Link>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>{c.description}</div>
                </div>
              );
            }
          });
          if (isMatch(r.baseTags)) {
            resultItems.push(
              <div key={`relic-desc-${r.id}`} style={cardStyle}>
                <div style={rowStyle}>
                  <Link href={`/relics/${r.id}`}>
                    <img
                      src={`/images/${r.id}_img.PNG`}
                      alt={r.name}
                      style={relicImgStyle}
                    />
                  </Link>
                  <div>
                    <Link href={`/relics/${r.id}`}>
                      <div><strong>[アルケー]</strong> {r.name}（全体説明）</div>
                    </Link>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>{r.description}</div>
              </div>
            );
          }
        });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {resultItems}
      </div>
    );
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 12,
    background: '#fff',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
  };
  const imgStyle: React.CSSProperties = { width: 64, height: 64, objectFit: 'cover', marginRight: 16 };
  const avatarTraitImgStyle: React.CSSProperties = { width: 128, height: 64, objectFit: 'cover', marginRight: 16 };
  const relicImgStyle: React.CSSProperties = { width: 128, height: 80, objectFit: 'cover', marginRight: 16 };
  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12 };

  return (
   <>
    <Head>
      <title>【幻塔攻略】タグ検索 | 幻塔攻略データベース</title>
      <meta name="description" content="幻塔（Tower of Fantasy）の攻略データベース内（本サイト内）をタグで検索できるタグ検索ページです。" />
    </Head>
    <SidebarLayout>
      <div style={responsivePadding}>
        <h2>大項目（種類）</h2>
        <div>
          {(['武器', '凸効果', 'スキル', 'ボリション', 'アバター特性', 'アルケー'] as TagType[]).map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              style={{
                margin: 4,
                padding: '6px 10px',
                background: selectedTypes.includes(type) ? '#f39c12' : '#ccc',
                color: '#000',
                border: 'none',
                borderRadius: 4,
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <h2>小項目（タグ）</h2>
        <div>
          <button
            onClick={() => setTagSearchMode('AND')}
            style={{ margin: 4, padding: '4px 10px', background: tagSearchMode === 'AND' ? '#2ecc71' : '#ccc', borderRadius: 4 }}
          >
            AND検索
          </button>
          <button
            onClick={() => setTagSearchMode('OR')}
            style={{ margin: 4, padding: '4px 10px', background: tagSearchMode === 'OR' ? '#2ecc71' : '#ccc', borderRadius: 4 }}
          >
            OR検索
          </button>
        </div>

        <div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                margin: 4,
                padding: '4px 8px',
                background: selectedTags.includes(tag) ? '#0070f3' : '#eaeaea',
                color: selectedTags.includes(tag) ? '#fff' : '#000',
                border: 'none',
                borderRadius: 4,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <hr />
        <h2>検索結果</h2>
        <div style={{ overflowX: "auto" }}>
          {renderResults()}
        </div>
      </div>
    </SidebarLayout>
   </>
  );
};

export default TagSearchPage;