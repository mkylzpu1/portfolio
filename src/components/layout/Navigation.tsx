import { useState }              from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation }         from 'react-i18next';
import {
  Home, User, FolderKanban, Code2, Clock, Mail, Menu, X, Briefcase,
} from 'lucide-react';

import { navItems }           from '@/data/portfolio';
import { useActiveSection }   from '@/hooks/useActiveSection';
import { NavSettings }        from './NavSettings';
import styles                 from '@/styles/nav.module.css';

const NAV_ICONS = {
  home:       Home,
  about:      User,
  projects:   FolderKanban,
  skills:     Code2,
  experience: Clock,
  services:   Briefcase,
  contact:    Mail,
} as const;

const SCROLL_OFFSET = 0;

export function Navigation() {
  const { t }           = useTranslation();
  const location        = useLocation();
  const active          = useActiveSection(location.pathname);
  const navigate        = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === '/';

  const isNavActive = (id: string) => {
    if (isHome) return active === id;
    if (id === 'about'    && location.pathname === '/about')    return true;
    if (id === 'projects' && ['/skillfarm', '/blog'].includes(location.pathname)) return true;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) {
      navigate(href);
      return;
    }

    const hash    = href.slice(hashIndex + 1);
    const basePath = href.slice(0, hashIndex) || '/';

    if (location.pathname === basePath || basePath === '/') {
      const el = document.getElementById(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(`${basePath}#${hash}`);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayVisible : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <Link to="/" className={styles.logo} onClick={() => setMobileOpen(false)} aria-label="Home">
          SS
        </Link>

        <nav className={styles.navMain} aria-label="Main navigation">
          {navItems.map(({ id, href }) => {
            const Icon     = NAV_ICONS[id];
            const isActive = isNavActive(id);
            return (
              <a
                key={id}
                href={href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={(e) => handleNavClick(e, href)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={1.75} />
                <span className={styles.navLabel}>{t(`nav.${id}`)}</span>
              </a>
            );
          })}
        </nav>

        <div className={styles.navBottom}>
          <div className={styles.navSocial}>
            <a
              href="https://github.com/mkylzpu1"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.203 8.203 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          <NavSettings />
        </div>
      </aside>
    </>
  );
}
