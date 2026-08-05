import { useState } from 'react';

import { SceneBackground } from '@/components/canvas/SceneBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { MeshProvider } from '@/contexts/MeshContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useBackgroundAudio } from '@/hooks/useBackgroundAudio';
import { AppRouter } from '@/routes/AppRouter';

function AppShell() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('loaded') === 'true');
  const { audioRef, setSoundChoice } = useBackgroundAudio();

  return (
    <>
      <audio ref={audioRef} id="sound" loop preload="none" />
      {!loaded ? (
        <LoadingScreen
          onEnter={() => {
            sessionStorage.setItem('loaded', 'true');
            setLoaded(true);
          }}
          onSoundChoice={setSoundChoice}
        />
      ) : (
        <MeshProvider>
          <SceneBackground />
          <AppRouter />
        </MeshProvider>
      )}
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
