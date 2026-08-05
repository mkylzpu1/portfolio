import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { useMeshRef } from '@/contexts/MeshContext';
import { useScrollParticle } from '@/hooks/useScrollParticle';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from '@/styles/home.module.css';

export function Home() {
  const meshRef = useMeshRef();

  // スクロール量をThree.jsの背景パーティクルへ伝える／各セクションのフェードイン演出
  useScrollParticle(meshRef);
  useScrollReveal();

  return (
    <div className={styles.page}>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
