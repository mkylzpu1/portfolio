import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation } from '@/components/layout/Navigation';
import { useScrollRestore } from '@/hooks/useScrollRestore';
import { About } from '@/pages/About';
import { Home } from '@/pages/Home';
import { ProjectDetail } from '@/pages/ProjectDetail';
import type { ParticleMesh } from '@/utils/ParticleMesh';

interface Props {
  meshRef: React.RefObject<ParticleMesh | null>;
}

/** ルーター内側でフックを呼ぶためのラッパー */
function ScrollManager() {
  useScrollRestore();
  return null;
}

export function AppRouter({ meshRef }: Props) {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollManager />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home meshRef={meshRef} />} />
        <Route path="/about" element={<About />} />
        <Route path="/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<Home meshRef={meshRef} />} />
      </Routes>
    </BrowserRouter>
  );
}
