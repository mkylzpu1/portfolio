import { Globe, Code2, Cloud, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { skillCategories } from '@/data/profile';
import styles from '@/styles/home.module.css';

const SKILL_ICONS = {
  Backend: Code2,
  Frontend: Globe,
  Infrastructure: Cloud,
  Tools: Wrench,
};

export function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section id="skills" className={`${styles.section} s s-3`}>
      <div className={styles.sectionInner}>
        <div data-reveal>
          <span className={styles.sectionLabel}>{t('skills.label')}</span>
          <h2 className={styles.sectionTitle}>{t('skills.title')}</h2>
          <p className={styles.sectionDesc}>{t('skills.desc')}</p>
        </div>
        <div className={styles.skillsGrid}>
          {skillCategories.map((cat) => {
            const IconComponent = SKILL_ICONS[cat.title as keyof typeof SKILL_ICONS] ?? Code2;
            return (
              <div key={cat.title} className={styles.skillCard} data-reveal>
                <div className={styles.skillHeader}>
                  <IconComponent size={18} strokeWidth={1.75} />
                  <h3 className={styles.skillTitle}>{cat.title}</h3>
                </div>
                <ul className={styles.skillList}>
                  {cat.items.map((item) => (
                    <li key={item} className={styles.skillItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
