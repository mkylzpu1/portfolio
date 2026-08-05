import { MapPin, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/home.module.css';

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className={`${styles.section} s s-1`}>
      <div className={styles.sectionInner}>
        <div data-reveal>
          <span className={styles.sectionLabel}>{t('about.label')}</span>
          <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText} data-reveal>
            <p>{t('about.text1')}</p>
            <p>{t('about.text2')}</p>
          </div>
          <div className={styles.profileCard} data-reveal>
            <div className={styles.profileItem}>
              <div className={styles.profileIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <p className={styles.profileLabel}>{t('about.locationLabel')}</p>
                <p className={styles.profileValue}>{t('home.location')}</p>
              </div>
            </div>
            <div className={styles.profileItem}>
              <div className={styles.profileIcon}>
                <Briefcase size={18} />
              </div>
              <div>
                <p className={styles.profileLabel}>{t('about.experienceLabel')}</p>
                <p className={styles.profileValue}>{t('home.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
