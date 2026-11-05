// ─────────────────────────────────────────────────────────
// CMS (Sveltia) content loading
// i18n structure: multiple_folders
//   src/content/projects/ja/<id>.json
//   src/content/projects/en/<id>.json
//
// このファイルは「CMSコンテンツをどう読み込み、どう正規化するか」のみを担当する。
// プロフィールやスキルなど、CMSと無関係な静的データは data/profile.ts を参照。
// ─────────────────────────────────────────────────────────

/** アピールポイント（任意） */
export interface Highlight {
  title: string;
  desc: string;
}

/** スクリーンショット（任意） */
export interface Screenshot {
  image: string;
  /** 画面名（ロケールごと） */
  title?: string;
  /** 画面の簡単な説明（ロケールごと） */
  caption?: string;
}

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
  /** 任意：開発プロセスのタイムライン */
  timeline?: { flag: string; desc: string }[];
  /** 任意：アピールポイント（目安3つ） */
  highlights?: Highlight[];
  /** 任意：スクリーンショット */
  screenshots?: Screenshot[];
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
  /** スクリーンショット画像（ロケール非依存。画像パスは ja 側を使用） */
  screenshots?: Screenshot[];
  content: Record<
    Locale,
    Pick<
      ProjectLocaleContent,
      'title' | 'description' | 'tags' | 'overviewDesc' | 'timeline' | 'highlights' | 'screenshots'
    >
  >;
}

const allIds = Array.from(new Set([...jaById.keys(), ...enById.keys()])).sort();

export const rawProjectContent: RawProjectContent[] = allIds.flatMap((id) => {
  const ja = jaById.get(id);
  const en = enById.get(id);

  if (!ja || !en) {
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
      // screenshots は ja 側から読む（ロケール非依存）
      screenshots: ja.screenshots?.length ? ja.screenshots : undefined,
      content: {
        ja: {
          title: ja.title,
          description: ja.description,
          tags: ja.tags,
          overviewDesc: ja.overviewDesc,
          timeline: ja.timeline,
          highlights: ja.highlights,
          screenshots: ja.screenshots,
        },
        en: {
          title: en.title,
          description: en.description,
          tags: en.tags,
          overviewDesc: en.overviewDesc,
          timeline: en.timeline,
          highlights: en.highlights,
          screenshots: en.screenshots,
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
  /** タイムラインのステップ数（0 = タイムラインなし） */
  timelineCount: number;
  /** アピールポイントの数（0 = セクションなし） */
  highlightCount: number;
  /** スクリーンショット（ロケール非依存） */
  screenshots?: Screenshot[];
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
  timelineCount: p.content.ja.timeline?.length ?? 0,
  highlightCount: p.content.ja.highlights?.length ?? 0,
  screenshots: p.screenshots,
  category: p.category,
}));

export const projectCategories = [
  { id: 'all', labelKey: 'projects.categories.all' },
  { id: 'app', labelKey: 'projects.categories.app' },
  { id: 'tool', labelKey: 'projects.categories.tool' },
  { id: 'hp', labelKey: 'projects.categories.hp' },
] as const;
