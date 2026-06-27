import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ja from './locales/ja.json';
import en from './locales/en.json';

const STORAGE_KEY = 'portfolio_language';

const savedLanguage = localStorage.getItem(STORAGE_KEY);
const defaultLanguage = savedLanguage ?? 'ja';

export const resources = {
  ja: { translation: ja },
  en: { translation: en },
} as const;

export type Language = keyof typeof resources;
export const LANGUAGES: Language[] = ['ja', 'en'];

i18n
  .use(initReactI18next)
  .init({
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
