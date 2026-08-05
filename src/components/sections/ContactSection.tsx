import { useTranslation } from 'react-i18next';

import { ContactIcon } from './ContactIcon';

import { contactLinks } from '@/data/profile';
import styles from '@/styles/home.module.css';

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <>
      <section id="contact" className={styles.section}>
        <div className={styles.sectionInner}>
          <div data-reveal>
            <span className={styles.sectionLabel}>{t('contact.label')}</span>
            <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
            <p className={styles.sectionDesc}>{t('contact.desc')}</p>
          </div>
          <div className={styles.contactGrid}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noreferrer'}
                className={styles.contactCard}
                data-reveal
              >
                <div className={styles.contactIcon}>
                  <ContactIcon icon={link.icon} />
                </div>
                <span className={styles.contactLabel}>{link.label}</span>
                <span className={styles.contactValue}>
                  {link.valueKey ? t(link.valueKey) : link.label}
                </span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }} data-reveal>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSei9usU-1JIiAgY8b7_Vlft1dL_PmggtcPwOs7-0Zl8S4HQbw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              {t('contact.sendMessage')}
            </a>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </>
  );
}
