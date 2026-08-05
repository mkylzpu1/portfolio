import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { projects, projectCategories } from '@/data/projects';
import styles from '@/styles/home.module.css';
import { withBaseUrl } from '@/utils/asset';

const CATEGORY_STORAGE_KEY = 'activeProjectCategory';

export function ProjectsSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    return sessionStorage.getItem(CATEGORY_STORAGE_KEY) ?? 'all';
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    sessionStorage.setItem(CATEGORY_STORAGE_KEY, categoryId);
  };

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  const categoryLabelMap = Object.fromEntries(
    projectCategories.filter((c) => c.id !== 'all').map((c) => [c.id, c.labelKey]),
  );

  return (
    <section id="projects" className={`${styles.section} s s-2`}>
      <div className={styles.sectionInner}>
        <div data-reveal>
          <span className={styles.sectionLabel}>{t('projects.label')}</span>
          <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
          <p className={styles.sectionDesc}>{t('projects.desc')}</p>
        </div>
        <div className={styles.categoryFilter} data-reveal>
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryChip} ${activeCategory === cat.id ? styles.categoryChipActive : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <Link key={project.id} to={project.url} className={styles.projectCard} data-reveal>
              <div className={styles.projectThumb}>
                <img
                  src={withBaseUrl(project.image)}
                  alt={t(`${project.i18nKey}.title`)}
                  loading="lazy"
                />
                <span className={styles.projectCategoryBadge}>
                  {t(categoryLabelMap[project.category])}
                </span>
              </div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{t(`${project.i18nKey}.title`)}</h3>
                <p className={styles.projectDesc}>{t(`${project.i18nKey}.description`)}</p>
                <div className={styles.projectTags}>
                  {((t(`${project.i18nKey}.tags`, { returnObjects: true }) as string[]) ?? []).map(
                    (tag) => (
                      <span key={tag} className={styles.projectTag}>
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
