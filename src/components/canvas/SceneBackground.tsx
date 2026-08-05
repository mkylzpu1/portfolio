import { useEffect, useRef } from 'react';

import { useMeshRef } from '@/contexts/MeshContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThreeScene } from '@/hooks/useThreeScene';

export function SceneBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const meshRef = useMeshRef();
  useThreeScene(canvasRef, meshRef);

  useEffect(() => {
    meshRef.current?.setTheme(theme);
  }, [theme, meshRef]);

  return (
    <div
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
}
