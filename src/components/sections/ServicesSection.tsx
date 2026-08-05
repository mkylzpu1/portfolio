import { Globe, Code2, FileText, Cloud, Wrench, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/home.module.css';

interface ServiceItemDef {
  key: 'corporate' | 'wordpress' | 'lp' | 'infra' | 'tools';
  icon: LucideIcon;
}

// services.items.* の翻訳キーとアイコンの対応。
// カードを増やす場合はここに追加するだけでよい（元は5枚分JSXを直書きしていた）。
const SERVICE_ITEMS: ServiceItemDef[] = [
  { key: 'corporate', icon: Globe },
  { key: 'wordpress', icon: Code2 },
  { key: 'lp', icon: FileText },
  { key: 'infra', icon: Cloud },
  { key: 'tools', icon: Wrench },
];

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className={`${styles.section} s`}>
      <div className={styles.sectionInner}>
        <div data-reveal>
          <span className={styles.sectionLabel}>{t('services.label')}</span>
          <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
          <p className={styles.sectionDesc}>{t('services.desc')}</p>
        </div>
        <div className={styles.servicesGrid}>
          {SERVICE_ITEMS.map(({ key, icon: Icon }) => (
            <div key={key} className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className={styles.serviceTitle}>{t(`services.items.${key}.title`)}</h3>
                  <p className={styles.servicePrice}>{t(`services.items.${key}.price`)}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t(`services.items.${key}.desc`)}</p>
              <ul className={styles.serviceList}>
                {(t(`services.items.${key}.features`, { returnObjects: true }) as string[]).map(
                  (f) => (
                    <li key={f}>{f}</li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.servicesCta} data-reveal>
          <h3 className={styles.servicesCtaTitle}>{t('services.ctaTitle')}</h3>
          <p className={styles.servicesCtaText}>{t('services.ctaText')}</p>
          <p className={styles.servicesCtaNote}>{t('services.ctaNote')}</p>
        </div>
      </div>
    </section>
  );
}
