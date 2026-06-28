import { ProjectLayout } from '@/components/layout/ProjectLayout';

export function FlightInsight() {
  // 国別比較やデータ分析のプロセスを想定
  const timelineKeys = ['0', '1', '2'] as const;
  return (
    <ProjectLayout
      i18nKey="flightInsight"
      image={`${import.meta.env.BASE_URL}movie/flight-insight.gif`}
      timelineKeys={timelineKeys}
    />
  );
}
