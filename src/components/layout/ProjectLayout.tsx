import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styles from '@/styles/project.module.css';

interface Props {
  i18nKey: string;
  image: string;
  appUrl?: string;
  repoUrl?: string;
  timelineKeys: readonly string[];
}

export function ProjectLayout({ i18nKey, image, appUrl, repoUrl, timelineKeys }: Props) {
  const { t } = useTranslation();
  const techTags = t(`${i18nKey}.tags`, { returnObjects: true }) as unknown;
  const techDesc = Array.isArray(techTags) ? techTags.join(' / ') : '';

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb}>
          <Link to="/#projects" className={styles.backLink}>
            <ArrowLeft size={14} strokeWidth={2} />
            Projects
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{t(`${i18nKey}.title`)}</span>
        </nav>

        <h1 className={styles.title}>{t(`${i18nKey}.title`)}</h1>
        <div className={styles.hero}>
          <img src={image} alt={t(`${i18nKey}.title`)} />
          {(appUrl || repoUrl) && (
            <div className={styles.heroActions}>
              {appUrl && (
                <a href={appUrl} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                  <ExternalLink size={14} strokeWidth={2} />
                  Live App
                </a>
              )}
              {repoUrl && (
                <a href={repoUrl} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                  <FaGithub className="w-5 h-5" />
                  Repository
                </a>
              )}
            </div>
          )}
        </div>

        {/* 「概要」「開発プロセス」「使用技術」の見出しは全プロジェクト共通のラベルなので
            projectData.common から取得する（プロジェクト固有の i18nKey 配下ではない） */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('projectData.common.overviewTitle')}</h2>
          <p className={styles.body}>{t(`${i18nKey}.overviewDesc`)}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('projectData.common.processTitle')}</h2>
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
          <h2 className={styles.sectionTitle}>{t('projectData.common.techTitle')}</h2>
          <p className={styles.body}>{techDesc}</p>
        </div>
      </div>
    </main>
  );
}
