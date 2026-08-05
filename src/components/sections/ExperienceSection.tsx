import { useTranslation } from 'react-i18next';

import { timeline } from '@/data/profile';
import styles from '@/styles/home.module.css';

export function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section id="experience" className={`${styles.section} s s-4`}>
      <div className={styles.sectionInner}>
        <div data-reveal>
          <span className={styles.sectionLabel}>{t('experience.label')}</span>
          <h2 className={styles.sectionTitle}>{t('experience.title')}</h2>
          <p className={styles.sectionDesc}>{t('experience.desc')}</p>
        </div>
        <div className={styles.timelineWrap} data-reveal>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineLine} aria-hidden="true" />
            {timeline.map((item) => (
              <article key={item.year + item.titleKey} className={styles.timelineCard}>
                <div className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineYear}>{item.year}</span>
                <h3 className={styles.timelineCardTitle}>{t(item.titleKey)}</h3>
                <p className={styles.timelineCardDesc}>{t(item.descriptionKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
