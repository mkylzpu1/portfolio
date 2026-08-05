import { rawProjectContent } from '@/data/projects';

type Locale = 'ja' | 'en';

/**
 * CMS (src/content/projects/{ja,en}/*.json) の内容を
 * i18next の `projectData.<id>.*` 名前空間用のリソースに変換する。
 *
 * 見出し等の共通文言（overviewTitle, processTitle, techTitle, back）は
 * projectData.common としてロケールJSON（locales/ja.json 等）側に静的に定義されており、
 * ここでは扱わない（= プロジェクト個別データの変換のみに責務を絞っている）。
 */
export function buildProjectResources(locale: Locale): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const p of rawProjectContent) {
    const c = p.content[locale];
    out[p.id] = {
      title: c.title,
      description: c.description,
      tags: c.tags,
      overviewDesc: c.overviewDesc,
      timeline: Object.fromEntries(c.timeline.map((t, i) => [String(i), t])),
    };
  }
  return out;
}
