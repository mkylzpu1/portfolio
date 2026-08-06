import { rawProjectContent } from '@/data/projects';

type Locale = 'ja' | 'en';

/**
 * CMS (src/content/projects/{ja,en}/*.json) の内容を
 * i18next の `projectData.<id>.*` 名前空間用のリソースに変換する。
 *
 * 見出し等の共通文言（overviewTitle, processTitle, techTitle, back）は
 * projectData.common としてロケールJSON（locales/ja.json 等）側に静的に定義されており、
 * ここでは扱わない（= プロジェクト個別データの変換のみに責務を絞っている）。
 *
 * highlights・timeline はいずれも任意フィールド。
 * 存在しない場合は i18n リソースにキー自体を含めない。
 */
export function buildProjectResources(locale: Locale): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const p of rawProjectContent) {
    const c = p.content[locale];

    const entry: Record<string, unknown> = {
      title: c.title,
      description: c.description,
      tags: c.tags,
      overviewDesc: c.overviewDesc,
    };

    // timeline は任意
    if (c.timeline && c.timeline.length > 0) {
      entry.timeline = Object.fromEntries(c.timeline.map((t, i) => [String(i), t]));
    }

    // highlights は任意
    if (c.highlights && c.highlights.length > 0) {
      entry.highlights = Object.fromEntries(c.highlights.map((h, i) => [String(i), h]));
    }

    out[p.id] = entry;
  }
  return out;
}
