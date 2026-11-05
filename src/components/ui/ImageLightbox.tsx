import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/styles/lightbox.module.css';

export interface LightboxItem {
  src: string;
  title?: string;
  caption?: string;
}

interface Props {
  items: LightboxItem[];
  /** 表示中の画像インデックス。null のとき閉じている */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function ImageLightbox({ items, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null && items[index] !== undefined;
  const count = items.length;

  const move = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  // キーボード操作（Esc / ← / →）と背面スクロールのロック
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, move]);

  if (!isOpen || index === null) return null;

  const item = items[index];
  const hasMultiple = count > 1;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? 'Screenshot'}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} strokeWidth={2} />
      </button>

      {hasMultiple && (
        <button
          type="button"
          className={`${styles.nav} ${styles.prev}`}
          onClick={(e) => {
            e.stopPropagation();
            move(-1);
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={26} strokeWidth={2} />
        </button>
      )}

      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <img key={item.src} src={item.src} alt={item.title ?? `Screenshot ${index + 1}`} />
        {(item.title || item.caption || hasMultiple) && (
          <figcaption className={styles.caption}>
            <div className={styles.captionText}>
              {item.title && <strong className={styles.captionTitle}>{item.title}</strong>}
              {item.caption && <span>{item.caption}</span>}
            </div>
            {hasMultiple && (
              <span className={styles.counter}>
                {index + 1} / {count}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {hasMultiple && (
        <button
          type="button"
          className={`${styles.nav} ${styles.next}`}
          onClick={(e) => {
            e.stopPropagation();
            move(1);
          }}
          aria-label="Next"
        >
          <ChevronRight size={26} strokeWidth={2} />
        </button>
      )}
    </div>,
    document.body,
  );
}
