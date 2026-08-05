import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { buildProjectResources } from './buildProjectResources';
import en from './locales/en.json';
import ja from './locales/ja.json';

const STORAGE_KEY = 'portfolio_language';

const savedLanguage = localStorage.getItem(STORAGE_KEY);
const defaultLanguage = savedLanguage ?? 'ja';

// 静的UI文言（locales/*.json）と、CMSから動的生成したプロジェクト文言をマージする。
// 構造の詳細は i18n/README.md を参照。
export const resources = {
  ja: {
    translation: {
      ...ja,
      projectData: { ...ja.projectData, ...buildProjectResources('ja') },
    },
  },
  en: {
    translation: {
      ...en,
      projectData: { ...en.projectData, ...buildProjectResources('en') },
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
