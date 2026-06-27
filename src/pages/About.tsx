import { useTranslation } from 'react-i18next';
import styles from '@/styles/page.module.css';

export function About() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.label}>{t('aboutPage.label')}</span>
        <h1 className={styles.title}>{t('aboutPage.title')}</h1>

        <div className={styles.card}>
          <div className={styles.body}>
            <p>
              {t('aboutPage.name')}<br />
              {t('aboutPage.birthday')}<br /><br />
              <a target="_blank" rel="noreferrer" href="https://twitter.com/dwKZ4cBpgrEB1ZO">
                Twitter
              </a>
            </p>
            <p>{t('aboutPage.p1')}</p>
            <p>{t('aboutPage.p2')}</p>
            <p>{t('aboutPage.p3')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
