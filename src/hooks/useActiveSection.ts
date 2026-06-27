/**
 * useActiveSection
 *
 * IntersectionObserver ではなく scrollY ベースで判定する。
 * 「viewport の上端から最も近い位置にある、すでに通過したセクション」
 * を active とすることで、速度・閾値・境界条件によるちらつきをなくす。
 *
 * ルール:
 *  - scrollY === 0 のとき → 必ず 'home'
 *  - それ以外 → 各セクションの top を取得し、
 *    (scrollY + OFFSET) を超えた中で最後のもの
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import type { NavSectionId } from '@/data/portfolio';

const SECTION_IDS: NavSectionId[] = [
  'home',
  'about',
  'projects',
  'skills',
  'experience',
  'services',
  'contact',
];

// viewport 上端からこの分だけ下の位置をアクティブ判定の基準点とする
// ヘッダー高さ相当 + 少し余裕
const ACTIVATION_OFFSET = 120; // px

export function useActiveSection(pathname: string) {
  const [active, setActive] = useState<NavSectionId>('home');
  // セクション上端キャッシュ（リサイズ時に再計算）
  const topsRef = useRef<{ id: NavSectionId; top: number }[]>([]);

  /** セクション上端を document 座標で計算してキャッシュ */
  const calcTops = useCallback(() => {
    topsRef.current = SECTION_IDS.flatMap((id) => {
      const el = document.getElementById(id);
      if (!el) return [];
      return [{ id, top: el.getBoundingClientRect().top + window.scrollY }];
    });
  }, []);

  /** 現在の scrollY から active を算出 */
  const compute = useCallback(() => {
    if (pathname !== '/') return;

    const y = window.scrollY;

    // ページ最上部は必ず home
    if (y < 4) {
      setActive('home');
      return;
    }

    const tops = topsRef.current;
    if (tops.length === 0) return;

    const threshold = y + ACTIVATION_OFFSET;
    let found: NavSectionId = tops[0].id;

    for (const { id, top } of tops) {
      if (top <= threshold) found = id;
      else break;
    }

    setActive(found);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    // 描画完了後にセクション位置を計算
    const init = () => {
      calcTops();
      compute();
    };

    // requestAnimationFrame で 1 フレーム待つ（レイアウト確定後）
    const raf = requestAnimationFrame(init);

    const onScroll = () => compute();
    const onResize = () => { calcTops(); compute(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname, calcTops, compute]);

  return active;
}
