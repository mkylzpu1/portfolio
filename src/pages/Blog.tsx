import { useTranslation } from 'react-i18next';
import styles from '@/styles/project.module.css';

export function Blog() {
  const { t } = useTranslation();

  const timelineKeys = ['0','1','2','3','4'] as const;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.label}>{t('blog.label')}</span>
        <h1 className={styles.title}>{t('blog.title')}</h1>

        <div className={styles.hero}>
          <a href="https://diagnostic-image.com/" target="_blank" rel="noreferrer">
            <img src={`${import.meta.env.BASE_URL}image/blog.jpg`} alt={t('blog.title')} />
          </a>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('blog.aboutTitle')}</h2>
          <p className={styles.body}>{t('blog.aboutDesc')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('blog.devTitle')}</h2>
          {timelineKeys.map((key, index) => (
            <div key={key} className={styles.timelineItem}>
              <span className={styles.timelineMonth}>{index + 1}</span>
              <div>
                <p className={styles.timelineFlag}>{t(`blog.timeline.${key}.flag`)}</p>
                <p className={styles.body}>{t(`blog.timeline.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('blog.techTitle')}</h2>
          <p className={styles.body}>{t('blog.techDesc')}</p>
        </div>
      </div>
    </main>
  );
}
