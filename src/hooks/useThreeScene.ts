import { useEffect, useRef } from 'react';

import { ParticleMesh } from '@/utils/ParticleMesh';
import { Stage }        from '@/utils/Stage';
import type { ThemeMode } from '@/utils/Stage';

function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem('portfolio_theme') as ThemeMode | null;
  if (saved === 'dark' || saved === 'light') return saved;
  return 'dark';
}

export function useThreeScene(canvasRef: React.RefObject<HTMLDivElement>) {
  const stageRef = useRef<Stage | null>(null);
  const meshRef  = useRef<ParticleMesh | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const stage = new Stage(canvas);
    const mesh  = new ParticleMesh(stage);
    stageRef.current = stage;
    meshRef.current  = mesh;

    // 初期テーマを即座に反映（フェードなし）
    const initialTheme = getInitialTheme();
    stage.setTheme(initialTheme);

    mesh.init().then(() => {
      if (cancelled) {
        mesh.dispose();
        stage.dispose();
        return;
      }

      // 初期テーマをパーティクルにも適用
      mesh.setTheme(initialTheme);

      const animate = () => {
        stage.render();
        mesh.onRaf();
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    });

    const handleResize = () => {
      stage.onResize();
      mesh.onResize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (mesh.isReady) {
        mesh.dispose();
        stage.dispose();
      } else {
        stage.dispose();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stageRef, meshRef };
}
