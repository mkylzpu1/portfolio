import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';
import { setLanguage, LANGUAGES, type Language } from '@/i18n';
import styles from '@/styles/nav-settings.module.css';

export function NavSettings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const currentLang = i18n.language as Language;

  return (
    <div className={styles.settingsWrap}>
      <div className={styles.divider} />

      {/* Language toggle: JP | EN */}
      <div className={styles.langToggle} role="group" aria-label={t('settings.language')}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            className={`${styles.langBtn} ${currentLang === lang ? styles.langBtnActive : ''}`}
            onClick={() => setLanguage(lang)}
            aria-pressed={currentLang === lang}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Theme toggle: sun / moon icons */}
      <div className={styles.themeToggle} role="group" aria-label={t('settings.theme')}>
        <button
          type="button"
          className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnActive : ''}`}
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          aria-label={t('settings.light')}
          title={t('settings.light')}
        >
          <Sun size={14} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className={`${styles.themeBtn} ${theme === 'dark' ? styles.themeBtnActive : ''}`}
          onClick={() => setTheme('dark')}
          aria-pressed={theme === 'dark'}
          aria-label={t('settings.dark')}
          title={t('settings.dark')}
        >
          <Moon size={14} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
