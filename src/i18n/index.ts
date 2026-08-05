import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ja from './locales/ja.json';

import { rawProjectContent } from '@/data/portfolio';

const STORAGE_KEY = 'portfolio_language';

const savedLanguage = localStorage.getItem(STORAGE_KEY);
const defaultLanguage = savedLanguage ?? 'ja';

/**
 * CMS (src/content/projects/{ja,en}/*.json) の内容を
 * i18next の projectData 名前空間にマージする。
 * 見出し等の共通文言（overviewTitle, processTitle, techTitle, back）は
 * ja.json / en.json 側の projectData 直下に残したまま利用する。
 */
function buildProjectData(locale: 'ja' | 'en'): Record<string, unknown> {
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

export const resources = {
  ja: {
    translation: {
      ...ja,
      projectData: { ...ja.projectData, ...buildProjectData('ja') },
    },
  },
  en: {
    translation: {
      ...en,
      projectData: { ...en.projectData, ...buildProjectData('en') },
    },
  },
} as const;

export type Language = keyof typeof resources;
export const LANGUAGES: Language[] = ['ja', 'en'];

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'ja',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };

export function setLanguage(lang: Language) {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEY, lang);
}
