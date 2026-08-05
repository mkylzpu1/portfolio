import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation } from '@/components/layout/Navigation';
import { useScrollRestore } from '@/hooks/useScrollRestore';
import { Home } from '@/pages/Home';
import { ProjectDetail } from '@/pages/ProjectDetail';

function ScrollManager() {
  useScrollRestore();
  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
