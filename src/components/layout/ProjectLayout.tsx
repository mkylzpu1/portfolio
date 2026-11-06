import { ArrowLeft, ExternalLink, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ImageLightbox } from '@/components/ui/ImageLightbox';
import type { Screenshot } from '@/data/projects';
import styles from '@/styles/project.module.css';
import { withBaseUrl } from '@/utils/asset';

interface Props {
  i18nKey: string;
  image: string;
  appUrl?: string;
  repoUrl?: string;
  /** タイムラインのステップ数。0 のときセクションを非表示 */
  timelineCount: number;
  /** アピールポイントの数。0 のときセクションを非表示 */
  highlightCount: number;
  /** スクリーンショット（ロケール非依存）。undefined / 空配列のとき非表示 */
  screenshots?: Screenshot[];
}

export function ProjectLayout({
  i18nKey,
  image,
  appUrl,
  repoUrl,
  timelineCount,
  highlightCount,
  screenshots,
}: Props) {
  const { t } = useTranslation();

  const techTags = t(`${i18nKey}.tags`, { returnObjects: true }) as unknown;
  const tagsArray: string[] = Array.isArray(techTags) ? techTags : [];

  const timelineKeys =
    timelineCount > 0 ? Array.from({ length: timelineCount }, (_, i) => String(i)) : [];

  const highlightKeys =
    highlightCount > 0 ? Array.from({ length: highlightCount }, (_, i) => String(i)) : [];

  const hasScreenshots = Array.isArray(screenshots) && screenshots.length > 0;

  // 画面紹介の拡大表示（null = 閉じている）
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = hasScreenshots
    ? screenshots.map((sc, idx) => ({
        src: withBaseUrl(sc.image),
        title: t(`${i18nKey}.screenshots.${idx}.title`, { defaultValue: '' }),
        caption: t(`${i18nKey}.screenshots.${idx}.caption`, { defaultValue: '' }),
      }))
    : [];

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {/* ── Breadcrumb ── */}
        <nav className={styles.breadcrumb}>
          <Link to="/#projects" className={styles.backLink}>
            <ArrowLeft size={13} strokeWidth={2} />
            Projects
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{t(`${i18nKey}.title`)}</span>
        </nav>

        {/* ── Hero: PCは左テキスト＋右画像、SPは縦積み ── */}
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t(`${i18nKey}.title`)}</h1>
            <p className={styles.description}>{t(`${i18nKey}.description`)}</p>

            {tagsArray.length > 0 && (
              <ul className={styles.tags} aria-label={t('projectData.common.techTitle')}>
                {tagsArray.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {(appUrl || repoUrl) && (
              <div className={styles.actions}>
                {appUrl && (
                  <a href={appUrl} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                    <ExternalLink size={13} strokeWidth={2} />
                    Live App
                  </a>
                )}
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.btnSecondary}
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                )}
              </div>
            )}
          </header>

          <div className={styles.heroImage}>
            <img src={image} alt={t(`${i18nKey}.title`)} />
          </div>
        </section>

        {/* ── 本文（全幅） ── */}
        <div className={styles.content}>
          <div>
            {/* Overview */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>{t('projectData.common.overviewTitle')}</span>
              <p className={styles.bodyText}>{t(`${i18nKey}.overviewDesc`)}</p>
            </div>

            {/* Screenshots（任意）: 概要の直後に配置し、サイトの中身を先に伝える */}
            {hasScreenshots && (
              <>
                <hr className={styles.divider} />
                <div className={styles.section}>
                  <span className={styles.sectionLabel}>
                    {t('projectData.common.screenshotsTitle')}
                  </span>
                  <div className={styles.galleryGrid}>
                    {lightboxItems.map((item, idx) => (
                      <figure key={idx} className={styles.galleryItemWrap}>
                        <button
                          type="button"
                          className={styles.galleryItem}
                          onClick={() => setLightboxIndex(idx)}
                          aria-label={item.title || `Screenshot ${idx + 1}`}
                        >
                          <img
                            src={item.src}
                            alt={item.title || `Screenshot ${idx + 1}`}
                            loading="lazy"
                          />
                          <span className={styles.galleryZoom} aria-hidden="true">
                            <Maximize2 size={14} strokeWidth={2} />
                          </span>
                        </button>
                        {(item.title || item.caption) && (
                          <figcaption className={styles.galleryCaption}>
                            {item.title && (
                              <strong className={styles.galleryTitle}>{item.title}</strong>
                            )}
                            {item.caption && <span>{item.caption}</span>}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                  <p className={styles.galleryNote}>{t('projectData.common.screenshotsNote')}</p>
                </div>
              </>
            )}

            {/* Highlights（任意） */}
            {highlightKeys.length > 0 && (
              <>
                <hr className={styles.divider} />
                <div className={styles.section}>
                  <span className={styles.sectionLabel}>
                    {t('projectData.common.highlightsTitle')}
                  </span>
                  <div className={styles.highlights}>
                    {highlightKeys.map((key, idx) => (
                      <div key={key} className={styles.highlightItem}>
                        <div className={styles.highlightNum}>
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <p className={styles.highlightTitle}>
                            {t(`${i18nKey}.highlights.${key}.title`)}
                          </p>
                          <p className={styles.highlightDesc}>
                            {t(`${i18nKey}.highlights.${key}.desc`)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Development process（任意） */}
            {timelineKeys.length > 0 && (
              <>
                <hr className={styles.divider} />
                <div className={styles.section}>
                  <span className={styles.sectionLabel}>
                    {t('projectData.common.processTitle')}
                    <span className={styles.optLabel}>optional</span>
                  </span>
                  <div className={styles.timeline}>
                    {timelineKeys.map((key, idx) => (
                      <div key={key} className={styles.timelineItem}>
                        <div className={styles.timelineDot}>{idx + 1}</div>
                        <div>
                          <p className={styles.timelineFlag}>
                            {t(`${i18nKey}.timeline.${key}.flag`)}
                          </p>
                          <p className={styles.timelineDesc}>
                            {t(`${i18nKey}.timeline.${key}.desc`)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {hasScreenshots && (
        <ImageLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
