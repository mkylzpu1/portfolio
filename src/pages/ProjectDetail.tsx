// pages/ProjectDetail.tsx
import { Navigate, useParams } from 'react-router-dom';

import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { projects } from '@/data/portfolio';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.url === `/${projectId}`);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const timelineKeys = Array.from({ length: project.timelineCount }, (_, i) =>
    String(i),
  ) as readonly string[];

  return (
    <ProjectLayout
      i18nKey={project.i18nKey}
      image={project.detailImage ?? project.image}
      appUrl={project.appUrl}
      repoUrl={project.repoUrl}
      timelineKeys={timelineKeys}
    />
  );
}
