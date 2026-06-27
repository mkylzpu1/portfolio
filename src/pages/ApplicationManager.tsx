import { useTranslation } from 'react-i18next';
import styles from '@/styles/project.module.css';

export function ApplicationManager() {
  const { t } = useTranslation();

  const timelineKeys = ['0','1','2','3','4'] as const;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.label}>{t('appManager.label')}</span>
        <h1 className={styles.title}>{t('appManager.title')}</h1>

        <div className={styles.hero}>
          <img src="/image/application-manager.png" alt={t('appManager.title')} />
          <div className={styles.links}>
            <a href="https://d2bz0qcouukt2b.cloudfront.net/" target="_blank" rel="noreferrer" className={styles.link}>App</a>
            <a href="https://github.com/mkylzpu1/application-manager" target="_blank" rel="noreferrer" className={styles.link}>Repo</a>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('appManager.overviewTitle')}</h2>
          <p className={styles.body}>{t('appManager.overviewDesc')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('appManager.processTitle')}</h2>
          {timelineKeys.map((key, index) => (
            <div key={key} className={styles.timelineItem}>
              <span className={styles.timelineMonth}>{index + 1}</span>
              <div>
                <p className={styles.timelineFlag}>{t(`appManager.timeline.${key}.flag`)}</p>
                <p className={styles.body}>{t(`appManager.timeline.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('appManager.techTitle')}</h2>
          <p className={styles.body}>{t('appManager.techDesc')}</p>
        </div>
      </div>
    </main>
  );
}
