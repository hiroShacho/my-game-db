import { useRouter } from "next/router";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import { cnCharacterData } from "@/data/CNCharacterData";

export default function CNCharacterPage() {
  const router = useRouter();
  const { characterId } = router.query;
  const chara = typeof characterId === "string" ? cnCharacterData[characterId] : undefined;

  // 改行対応: テキストを <br> に変換する関数
  const renderWithBr = (text: string) =>
    text.split('\n').map((line, i, arr) =>
      i === arr.length - 1 ? line : (
        <span key={i}>
          {line}
          <br />
        </span>
      )
    );

  return (
    <>
      <Head>
        <title>
          {chara
            ? `【幻塔攻略】${chara.name}（${chara.subName}）大陸版キャラ詳細 | 幻塔攻略データベース`
            : "【幻塔攻略】大陸版キャラ詳細 | 幻塔攻略データベース"}
        </title>
        <meta
          name="description"
          content={chara ? `${chara.name}（${chara.subName}）の大陸（CN）版での性能・詳細データ。` : "幻塔（Tower of Fantasy）の大陸（CN）版キャラ詳細。"}
        />
      </Head>
      <SidebarLayout>
        <div className="max-w-3xl mx-auto space-y-6 px-2 sm:px-6 py-4">
          {!chara ? (
            <div className="p-4">キャラクターが見つかりません。</div>
          ) : (
            <>
              {/* キャラ基本情報 */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={`/CN_info/${chara.id}_img.PNG`}
                  alt={chara.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
                <div className="space-y-2 mt-2 w-full">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {chara.name}
                    {chara.subName && (
                      <span className="ml-2 text-base text-gray-500">（{chara.subName}）</span>
                    )}
                  </h1>
                  <div className="flex gap-4 items-start flex-wrap">
                    {/* レア度 */}
                    {chara.rarity && (
                      <img
                        src={`/images/${chara.rarity}.png`}
                        alt={chara.rarity}
                        className="h-6 sm:h-8 mt-2"
                      />
                    )}
                    {/* 共鳴 */}
                    {chara.resonance && (
                      <div className="text-center mt-2">
                        <img
                          src={`/images/${chara.resonance}.png`}
                          alt={chara.resonance}
                          className="h-6 sm:h-8"
                        />
                        <div className="text-xs sm:text-sm mt-1">{chara.resonance}</div>
                      </div>
                    )}
                    {/* 属性 */}
                    {chara.trait && (
                      <div className="text-center mt-2">
                        <img
                          src={`/images/${chara.trait}.png`}
                          alt={chara.trait}
                          className="h-6 sm:h-8"
                        />
                        <div className="text-xs sm:text-sm mt-1">{chara.trait}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 概要 */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold">概要</h2>
                <p className="mt-1 text-sm">{renderWithBr(chara.overview)}</p>
              </section>

              {/* 主要スキル */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold">主要スキル</h2>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  {chara.mainSkills.map(skill => (
                    <li key={skill.title}>
                      <strong>{skill.title}：</strong>{renderWithBr(skill.content)}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 凸効果 */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold">凸効果</h2>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  {chara.constellations.map(c => (
                    <li key={c.level}>
                      <strong>{c.level}凸：</strong>{renderWithBr(c.content)}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ボリション */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold">ボリション</h2>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  <li>
                    <strong>2セット：</strong>{renderWithBr(chara.matrices.set2)}
                  </li>
                  <li>
                    <strong>4セット：</strong>{renderWithBr(chara.matrices.set4)}
                  </li>
                </ul>
              </section>

              {/* アバター特性 */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold">アバター特性</h2>
                <p className="mt-1 text-sm">{renderWithBr(chara.avatarTrait)}</p>
              </section>

              <div className="text-gray-500 text-xs mt-8">
                ※内容は大陸版（CN）準拠・非公式情報です。実装時に変更される可能性があります。
              </div>
            </>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}