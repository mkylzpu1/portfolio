import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { ParticleMesh } from '@/utils/ParticleMesh';

gsap.registerPlugin(ScrollTrigger);

export function useScrollParticle(meshRef: React.RefObject<ParticleMesh | null>) {
  useEffect(() => {
    let trigger: ScrollTrigger | null = null;

    const setup = () => {
      const mesh = meshRef.current;
      if (!mesh?.isReady) return false;

      // scrub: true はスクロール量に完全追従するため使わない。
      // onUpdate で progress を渡し、ParticleMesh 側の慣性に委ねる。
      trigger = ScrollTrigger.create({
        trigger: document.body,
        start:   'top top',
        end:     'bottom bottom',
        onUpdate: (self) => {
          mesh.setProgress(self.progress);
        },
      });

      return true;
    };

    // mesh.isReady を待つポーリング
    const timer = window.setInterval(() => {
      if (setup()) clearInterval(timer);
    }, 100);

    return () => {
      clearInterval(timer);
      trigger?.kill();
    };
  // meshRef は ref オブジェクトなので安定
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
