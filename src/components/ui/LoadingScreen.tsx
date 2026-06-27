import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/loading.module.css';

interface Props {
  onEnter: () => void;
  onSoundChoice: (enabled: boolean) => void;
}

type Phase = 'sound' | 'typing' | 'done';


export function LoadingScreen({ onEnter, onSoundChoice }: Props) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>('sound');
  const [displayText, setDisplayText] = useState('');
  const [coverAnime, setCoverAnime] = useState(false);
  const loadingBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = loadingBoxRef.current;
    if (!el) return;
    gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power2.out' });
  }, []);

  const startTyping = (withSound: boolean) => {
    onSoundChoice(withSound);
    setCoverAnime(true);
    setTimeout(() => setPhase('typing'), 400);
  };

  const splashTextRef = useRef<HTMLDivElement>(null);
  const welcomeText = t('loading.welcome');

  useEffect(() => {
    if (phase !== 'typing') return;

    let strIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const strings = [welcomeText];

    const tick = () => {
      const current = strings[strIdx];
      if (!deleting) {
        charIdx++;
        setDisplayText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          if (strIdx === strings.length - 1) {
            setTimeout(() => setPhase('done'), 1200);
            return;
          }
          deleting = true;
          timer = setTimeout(tick, 800);
          return;
        }
      } else {
        charIdx--;
        setDisplayText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          strIdx++;
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 80);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [phase, welcomeText]);

  useEffect(() => {
    if (phase !== 'done') return;

    gsap.to(splashTextRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: onEnter,
    });
  }, [phase, onEnter]);

  return (
    <div id="splash" className={styles.splash}>
      <div
        ref={loadingBoxRef}
        id="loading-box"
        className={`${styles.loadingBox} ${styles.loadingBoxVisible}`}
        style={{ display: phase === 'sound' ? 'grid' : 'none' }}
      >
        <div className={styles.introCopy}>
          <span className={styles.eyebrow}>{t('loading.eyebrow')}</span>
          <h1>{t('loading.name')}</h1>
          <p>{t('loading.tagline')}</p>
        </div>

        <div className={styles.soundPanel}>
          <span className={styles.panelLabel}>{t('loading.audioLabel')}</span>
          <h2>{t('loading.audioTitle')}</h2>
          <p>{t('loading.audioDesc')}</p>
          <div className={styles.btnGroup}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => startTyping(true)}>
              {t('loading.on')}
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => startTyping(false)}>
              {t('loading.off')}
            </button>
          </div>
        </div>
      </div>

      {(phase === 'typing' || phase === 'done') && (
        <div ref={splashTextRef} id="splash_text" className={styles.splashText}>
          <span>{displayText}</span>
        </div>
      )}

      <div className={`${styles.loaderCover} ${styles.loaderCoverUp} ${coverAnime ? styles.loaderCoverAnime : ''}`} />
      <div className={`${styles.loaderCover} ${styles.loaderCoverDown} ${coverAnime ? styles.loaderCoverAnime : ''}`} />
    </div>
  );
}
