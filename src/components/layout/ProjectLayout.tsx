import { useTranslation } from 'react-i18next';
import styles from '@/styles/project.module.css';

interface Props {
  i18nKey: string; // 翻訳キーのプレフィックス (例: 'flightInsight')
  image: string;
  appUrl?: string;
  repoUrl?: string;
  timelineKeys: readonly string[];
}

export function ProjectLayout({ i18nKey, image, appUrl, repoUrl, timelineKeys }: Props) {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.label}>{t(`${i18nKey}.label`)}</span>
        <h1 className={styles.title}>{t(`${i18nKey}.title`)}</h1>

        <div className={styles.hero}>
          <img src={image} alt={t(`${i18nKey}.title`)} />
          {appUrl || repoUrl ? (
            <div className={styles.links}>
              {appUrl && (
                <a href={appUrl} target="_blank" rel="noreferrer" className={styles.link}>App</a>
              )}
              {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noreferrer" className={styles.link}>Repo</a>
            )}
          </div>
          ) : null}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t(`${i18nKey}.overviewTitle`)}</h2>
          <p className={styles.body}>{t(`${i18nKey}.overviewDesc`)}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t(`${i18nKey}.processTitle`)}</h2>
          {timelineKeys.map((key, index) => (
            <div key={key} className={styles.timelineItem}>
              <span className={styles.timelineMonth}>{index + 1}</span>
              <div>
                <p className={styles.timelineFlag}>{t(`${i18nKey}.timeline.${key}.flag`)}</p>
                <p className={styles.body}>{t(`${i18nKey}.timeline.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t(`${i18nKey}.techTitle`)}</h2>
          <p className={styles.body}>{t(`${i18nKey}.techDesc`)}</p>
        </div>
      </div>
    </main>
  );
}
