import { ProjectLayout } from '@/components/layout/ProjectLayout';

export function Skillfarm() {

  const timelineKeys = ['0','1','2','3','4','5','6','7'] as const;
  return (
    <ProjectLayout
      i18nKey="skillfarm"
      image={`${import.meta.env.BASE_URL}image/skillfarm.jpg`}
      timelineKeys={timelineKeys}
    />
  );
}
