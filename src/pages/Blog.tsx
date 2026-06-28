import { ProjectLayout } from '@/components/layout/ProjectLayout';

export function Blog() {
  const timelineKeys = ['0','1','2','3','4'] as const;

  return (
    <ProjectLayout
      i18nKey="blog"
      image={`${import.meta.env.BASE_URL}image/blog.jpg`}
      timelineKeys={timelineKeys}
    />
  );
}
