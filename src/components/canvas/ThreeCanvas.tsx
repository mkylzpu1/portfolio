import { useRef } from 'react';

import { useThreeScene } from '@/hooks/useThreeScene';

export function ThreeCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useThreeScene(canvasRef);

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
