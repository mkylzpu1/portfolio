import { useRef, useState, useEffect } from 'react';

import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { AppRouter }     from '@/routes/AppRouter';
import { useThreeScene } from '@/hooks/useThreeScene';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

/** Three.js にテーマ変更を伝えるブリッジ */
function ThemeBridge({ meshRef }: { meshRef: React.RefObject<import('@/utils/ParticleMesh').ParticleMesh | null> }) {
  const { theme } = useTheme();

  useEffect(() => {
    meshRef.current?.setTheme(theme);
  }, [theme, meshRef]);

  return null;
}

function AppInner() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem('loaded') === 'true';
  });
  const canvasRef = useRef<HTMLDivElement>(null);
  const audioRef  = useRef<HTMLAudioElement>(null);
  const { meshRef } = useThreeScene(canvasRef);

  const handleSoundChoice = (enabled: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!enabled) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    audio.volume = 0.45;
    audio.play().catch(() => {});
  };

  return (
    <>
      <ThemeBridge meshRef={meshRef} />
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
      <audio ref={audioRef} id="sound" src="/music/bgm.mp3" loop preload="auto" />
      {!loaded
        ? <LoadingScreen
            onEnter={() => {
              sessionStorage.setItem('loaded', 'true');
              setLoaded(true);
            }}
            onSoundChoice={handleSoundChoice}
          />
        : <AppRouter meshRef={meshRef} />
      }
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
