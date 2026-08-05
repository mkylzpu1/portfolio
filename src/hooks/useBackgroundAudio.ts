import { useRef, useCallback } from 'react';

export function useBackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setSoundChoice = useCallback((enabled: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!enabled) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    // ONを選んだタイミングで初めてsrcをセット → ここで初めてダウンロードが始まる
    if (!audio.src) {
      audio.src = `${import.meta.env.BASE_URL}music/bgm-compressed.mp3`;
    }
    audio.volume = 0.45;
    audio.play().catch(() => {});
  }, []);

  return { audioRef, setSoundChoice };
}
