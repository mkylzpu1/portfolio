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

  return (
    <ProjectLayout
      i18nKey={project.i18nKey}
      image={withBaseUrl(project.detailImage ?? project.image)}
      appUrl={project.appUrl != null ? withBaseUrl(project.appUrl) : undefined}
      repoUrl={project.repoUrl}
      timelineCount={project.timelineCount}
      highlightCount={project.highlightCount}
      screenshots={project.screenshots}
      category={project.category}
    />
  );
}
