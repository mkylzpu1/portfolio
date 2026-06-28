import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Mail,
  Send,
  Globe,
  Code2,
  FileText,
  Cloud,
  Wrench,
} from 'lucide-react';

import {
  profile,
  projects,
  skillCategories,
  timeline,
  contactLinks,
} from '@/data/portfolio';
import { useScrollParticle } from '@/hooks/useScrollParticle';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from '@/styles/home.module.css';
import type { ParticleMesh } from '@/utils/ParticleMesh';

interface Props {
  meshRef: React.RefObject<ParticleMesh | null>;
}

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'mail':
      return <Mail size={20} strokeWidth={1.75} />;
    case 'github':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.203 8.203 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'qiita':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 9.568l-1.414 1.414-4.154-4.154-4.154 4.154-1.414-1.414 4.154-4.154-4.154-4.154 1.414-1.414 4.154 4.154 4.154-4.154 1.414 1.414-4.154 4.154 4.154 4.154z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'form':
      return <Send size={20} strokeWidth={1.75} />;
    default:
      return null;
  }
}

const SKILL_ICONS = {
  Backend: Code2,
  Frontend: Globe,
  Infrastructure: Cloud,
  Tools: Wrench,
};

export function Home({ meshRef }: Props) {
  const { t } = useTranslation();
  useScrollParticle(meshRef);
  useScrollReveal();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section id="home" className={`${styles.section} ${styles.hero} s s-0`}>
        <div className={styles.heroContent} data-reveal>
          <p className={styles.heroGreeting}>{t('home.greeting')}</p>
          <h1 className={styles.heroName}>{t('home.name')}</h1>
          <p className={styles.heroRole}>{t('home.role')}</p>
          <p className={styles.heroIntro}>{t('home.intro')}</p>
          <div className={styles.tagList}>
            {profile.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
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

      {/* About */}
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
                <div className={styles.profileIcon}><MapPin size={18} /></div>
                <div>
                  <p className={styles.profileLabel}>{t('about.locationLabel')}</p>
                  <p className={styles.profileValue}>{t('home.location')}</p>
                </div>
              </div>
              <div className={styles.profileItem}>
                <div className={styles.profileIcon}><Briefcase size={18} /></div>
                <div>
                  <p className={styles.profileLabel}>{t('about.experienceLabel')}</p>
                  <p className={styles.profileValue}>{t('home.experience')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`${styles.section} s s-2`}>
        <div className={styles.sectionInner}>
          <div data-reveal>
            <span className={styles.sectionLabel}>{t('projects.label')}</span>
            <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
            <p className={styles.sectionDesc}>{t('projects.desc')}</p>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.url}
                className={styles.projectCard}
                data-reveal
              >
                <div className={styles.projectThumb}>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{t(project.title)}</h3>
                  <p className={styles.projectDesc}>{t(project.descKey)}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
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
                      <li key={item} className={styles.skillItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
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

      {/* Services */}
      <section id="services" className={`${styles.section} s`}>
        <div className={styles.sectionInner}>
          <div data-reveal>
            <span className={styles.sectionLabel}>{t('services.label')}</span>
            <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
            <p className={styles.sectionDesc}>{t('services.desc')}</p>
          </div>

          <div className={styles.servicesGrid}>

            <div className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}><Globe size={22} strokeWidth={1.75} /></div>
                <div>
                  <h3 className={styles.serviceTitle}>{t('services.items.corporate.title')}</h3>
                  <p className={styles.servicePrice}>{t('services.items.corporate.price')}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t('services.items.corporate.desc')}</p>
              <ul className={styles.serviceList}>
                {(t('services.items.corporate.features', { returnObjects: true }) as string[]).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}><Code2 size={22} strokeWidth={1.75} /></div>
                <div>
                  <h3 className={styles.serviceTitle}>{t('services.items.wordpress.title')}</h3>
                  <p className={styles.servicePrice}>{t('services.items.wordpress.price')}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t('services.items.wordpress.desc')}</p>
              <ul className={styles.serviceList}>
                {(t('services.items.wordpress.features', { returnObjects: true }) as string[]).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}><FileText size={22} strokeWidth={1.75} /></div>
                <div>
                  <h3 className={styles.serviceTitle}>{t('services.items.lp.title')}</h3>
                  <p className={styles.servicePrice}>{t('services.items.lp.price')}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t('services.items.lp.desc')}</p>
              <ul className={styles.serviceList}>
                {(t('services.items.lp.features', { returnObjects: true }) as string[]).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}><Cloud size={22} strokeWidth={1.75} /></div>
                <div>
                  <h3 className={styles.serviceTitle}>{t('services.items.infra.title')}</h3>
                  <p className={styles.servicePrice}>{t('services.items.infra.price')}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t('services.items.infra.desc')}</p>
              <ul className={styles.serviceList}>
                {(t('services.items.infra.features', { returnObjects: true }) as string[]).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.serviceCard} data-reveal>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}><Wrench size={22} strokeWidth={1.75} /></div>
                <div>
                  <h3 className={styles.serviceTitle}>{t('services.items.tools.title')}</h3>
                  <p className={styles.servicePrice}>{t('services.items.tools.price')}</p>
                </div>
              </div>
              <p className={styles.serviceDesc}>{t('services.items.tools.desc')}</p>
              <ul className={styles.serviceList}>
                {(t('services.items.tools.features', { returnObjects: true }) as string[]).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

          </div>

          <div className={styles.servicesCta} data-reveal>
            <h3 className={styles.servicesCtaTitle}>{t('services.ctaTitle')}</h3>
            <p className={styles.servicesCtaText}>{t('services.ctaText')}</p>
            <p className={styles.servicesCtaNote}>{t('services.ctaNote')}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
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
                <span className={styles.contactValue}>{link.valueKey ? t(link.valueKey) : link.label}</span>
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
    </div>
  );
}
