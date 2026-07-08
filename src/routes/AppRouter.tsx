import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation } from '@/components/layout/Navigation';
import { useScrollRestore } from '@/hooks/useScrollRestore';
import { About } from '@/pages/About';
import { ApplicationManager } from '@/pages/ApplicationManager';
import { AutoLedgerAi } from '@/pages/AutoLedgerAi';
import { Blog } from '@/pages/Blog';
import { FlightInsight } from '@/pages/FlightInsight';
import { Home } from '@/pages/Home';
import { Skillfarm } from '@/pages/Skillfarm';
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
        <Route path="/skillfarm" element={<Skillfarm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/application-manager" element={<ApplicationManager />} />
        <Route path="/flight-insight" element={<FlightInsight />} />
        <Route path="/auto-ledger-ai" element={<AutoLedgerAi />} />
        <Route path="*" element={<Home meshRef={meshRef} />} />
      </Routes>
    </BrowserRouter>
  );
}
