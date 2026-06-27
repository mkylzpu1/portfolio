import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 32 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          });
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [selector]);
}
