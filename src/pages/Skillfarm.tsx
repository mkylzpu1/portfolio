import { useTranslation } from 'react-i18next';
import styles from '@/styles/project.module.css';

export function Skillfarm() {
  const { t } = useTranslation();

  const timelineKeys = ['0','1','2','3','4','5','6','7'] as const;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.label}>{t('skillfarm.label')}</span>
        <h1 className={styles.title}>{t('skillfarm.title')}</h1>

        <div className={styles.hero}>
          <a href="http://54.199.118.157/" target="_blank" rel="noreferrer">
            <img src="/image/skillfarm.jpg" alt="Skillfarm" />
          </a>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('skillfarm.aboutTitle')}</h2>
          <p className={styles.body}>{t('skillfarm.aboutDesc')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('skillfarm.devTitle')}</h2>
          {timelineKeys.map((key, index) => (
            <div key={key} className={styles.timelineItem}>
              <span className={styles.timelineMonth}>{index + 1}</span>
              <div>
                <p className={styles.timelineFlag}>{t(`skillfarm.timeline.${key}.flag`)}</p>
                <p className={styles.body}>{t(`skillfarm.timeline.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('skillfarm.techTitle')}</h2>
          <p className={styles.body}>{t('skillfarm.techDesc')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('skillfarm.roleTitle')}</h2>
          <p className={styles.body}>{t('skillfarm.roleDesc')}</p>
        </div>
      </div>
    </main>
  );
}
