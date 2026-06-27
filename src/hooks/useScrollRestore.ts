/**
 * useScrollRestore
 *
 * ページ遷移時の挙動を制御するフック。
 *
 * - 通常遷移: 最上部へスクロール
 * - ハッシュあり (例: /#skills): 描画後に対象セクションへスムーズスクロール
 * - ブラウザの戻る/進む: 既定の挙動に委ねる (popstate)
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** ヘッダー（サイドバー）分のオフセット。レイアウトに合わせて調整 */
const HEADER_OFFSET = 0;

/** ハッシュ対象要素が描画されるのを待つ最大リトライ数 × インターバル */
const HASH_RETRY_INTERVAL = 80;   // ms
const HASH_RETRY_MAX      = 30;   // 最大 2.4 秒待つ

export function useScrollRestore() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // ブラウザの戻る/進む (key が変わっても popstate 経由) は
    // ブラウザ既定のスクロール復元に委ねる。
    // ただし React Router は history.scrollRestoration を "manual" にしないため、
    // ここでは明示的にプッシュ/リプレース時だけ制御する。

    if (hash) {
      // ─── ハッシュ付き遷移 ─────────────────────────────────────
      const id      = hash.slice(1);
      let   retries = 0;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        if (++retries < HASH_RETRY_MAX) {
          window.setTimeout(tryScroll, HASH_RETRY_INTERVAL);
        }
      };

      // 初回は少し遅延してから試みる（React の描画サイクル完了を待つ）
      window.setTimeout(tryScroll, 50);
    } else {
      // ─── 通常遷移: 最上部へ ───────────────────────────────────
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  // pathname / hash / key いずれかが変わったら再実行
  }, [pathname, hash, key]);
}
