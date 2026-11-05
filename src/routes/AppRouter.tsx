import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation } from '@/components/layout/Navigation';
import { useScrollRestore } from '@/hooks/useScrollRestore';
import { Home } from '@/pages/Home';
import { ProjectDetail } from '@/pages/ProjectDetail';

function ScrollManager() {
  useScrollRestore();
  return null;
}

/**
 * GitHub Pages ではリポジトリ名配下 (/portfolio/) で配信されるため、
 * ビルド時の base (import.meta.env.BASE_URL) をルーターの basename に渡す。
 * 末尾スラッシュは除去する（"/" の場合は "/" のまま）。
 */
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

export function AppRouter() {
  return (
    <BrowserRouter
      basename={ROUTER_BASENAME}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ScrollManager />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
