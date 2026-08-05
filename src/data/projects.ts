// ─────────────────────────────────────────────────────────
// CMS (Sveltia) content loading
// i18n structure: multiple_folders
//   src/content/projects/ja/<id>.json
//   src/content/projects/en/<id>.json
//
// このファイルは「CMSコンテンツをどう読み込み、どう正規化するか」のみを担当する。
// プロフィールやスキルなど、CMSと無関係な静的データは data/profile.ts を参照。
// ─────────────────────────────────────────────────────────

interface ProjectLocaleContent {
  id: string;
  category: 'app' | 'tool' | 'hp';
  image: string;
  detailImage?: string;
  url: string;
  appUrl?: string;
  repoUrl?: string;
  title: string;
  description: string;
  tags: string[];
  overviewDesc: string;
  timeline: { flag: string; desc: string }[];
}

type Locale = 'ja' | 'en';

/** 各ロケールフォルダ内のjsonをすべて読み込む */
const jaModules = import.meta.glob<ProjectLocaleContent>('/src/content/projects/ja/*.json', {
  eager: true,
  import: 'default',
});
const enModules = import.meta.glob<ProjectLocaleContent>('/src/content/projects/en/*.json', {
  eager: true,
  import: 'default',
});

function toIdMap(modules: Record<string, ProjectLocaleContent>): Map<string, ProjectLocaleContent> {
  const map = new Map<string, ProjectLocaleContent>();
  for (const content of Object.values(modules)) {
    map.set(content.id, content);
  }
  return map;
}

const jaById = toIdMap(jaModules);
const enById = toIdMap(enModules);

/** id -> ロケールごとのコンテンツ にまとめた中間表現（i18n/index.ts が利用） */
export interface RawProjectContent {
  id: string;
  category: 'app' | 'tool' | 'hp';
  image: string;
  detailImage?: string;
  url: string;
  appUrl?: string;
  repoUrl?: string;
  content: Record<
    Locale,
    Pick<ProjectLocaleContent, 'title' | 'description' | 'tags' | 'overviewDesc' | 'timeline'>
  >;
}

const allIds = Array.from(new Set([...jaById.keys(), ...enById.keys()])).sort();

export const rawProjectContent: RawProjectContent[] = allIds.flatMap((id) => {
  const ja = jaById.get(id);
  const en = enById.get(id);

  if (!ja || !en) {
    // 翻訳が片方の言語しかない場合はビルド時に気づけるよう警告し、対象からは除外
    console.warn(
      `[portfolio] project "${id}" is missing a translation (ja: ${!!ja}, en: ${!!en}). Skipped.`,
    );
    return [];
  }

  return [
    {
      id: ja.id,
      category: ja.category,
      image: ja.image,
      detailImage: ja.detailImage || undefined,
      url: ja.url,
      appUrl: ja.appUrl || undefined,
      repoUrl: ja.repoUrl || undefined,
      content: {
        ja: {
          title: ja.title,
          description: ja.description,
          tags: ja.tags,
          overviewDesc: ja.overviewDesc,
          timeline: ja.timeline,
        },
        en: {
          title: en.title,
          description: en.description,
          tags: en.tags,
          overviewDesc: en.overviewDesc,
          timeline: en.timeline,
        },
      },
    },
  ];
});

export interface Project {
  id: string;
  i18nKey: string;
  image: string;
  detailImage?: string;
  url: string;
  appUrl?: string;
  repoUrl?: string;
  timelineCount: number;
  category: 'app' | 'tool' | 'hp';
}

export const projects: Project[] = rawProjectContent.map((p) => ({
  id: p.id,
  i18nKey: `projectData.${p.id}`,
  image: p.image,
  detailImage: p.detailImage,
  url: p.url,
  appUrl: p.appUrl,
  repoUrl: p.repoUrl,
  timelineCount: p.content.ja.timeline.length,
  category: p.category,
}));

export const projectCategories = [
  { id: 'all', labelKey: 'projects.categories.all' },
  { id: 'app', labelKey: 'projects.categories.app' },
  { id: 'tool', labelKey: 'projects.categories.tool' },
  { id: 'hp', labelKey: 'projects.categories.hp' },
] as const;
