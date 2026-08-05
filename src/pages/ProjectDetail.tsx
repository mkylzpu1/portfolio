// pages/ProjectDetail.tsx
import { Navigate, useParams } from 'react-router-dom';

import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { projects } from '@/data/projects';
import { withBaseUrl } from '@/utils/asset';

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
      image={withBaseUrl(project.detailImage ?? project.image)}
      appUrl={project.appUrl != null ? withBaseUrl(project.appUrl) : undefined}
      repoUrl={project.repoUrl}
      timelineKeys={timelineKeys}
    />
  );
}
