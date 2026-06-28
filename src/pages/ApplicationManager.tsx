import { ProjectLayout } from '@/components/layout/ProjectLayout';

export function ApplicationManager() {

  const timelineKeys = ['0','1','2','3','4'] as const;

  return (
    <ProjectLayout
      i18nKey="appManager"
      image={`${import.meta.env.BASE_URL}image/application-manager.png`}
      appUrl="https://d2bz0qcouukt2b.cloudfront.net/"
      repoUrl="https://github.com/mkylzpu1/application-manager"
      timelineKeys={timelineKeys}
    />
  );
}
