import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { profile } from '@/data/profile';
import styles from '@/styles/home.module.css';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className={`${styles.section} ${styles.hero} s s-0`}>
      <div className={styles.heroContent} data-reveal>
        <p className={styles.heroGreeting}>{t('home.greeting')}</p>
        <h1 className={styles.heroName}>{t('home.name')}</h1>
        <p className={styles.heroRole}>{t('home.role')}</p>
        <p className={styles.heroIntro}>{t('home.intro')}</p>
        <div className={styles.tagList}>
          {profile.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.heroActions}>
          <a
            href="#projects"
            className={styles.btnPrimary}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('home.viewProjects')}
            <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            className={styles.btnSecondary}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('home.getInTouch')}
          </a>
        </div>
      </div>
      <div className={styles.heroVisual} aria-hidden="true" />
    </section>
  );
}
