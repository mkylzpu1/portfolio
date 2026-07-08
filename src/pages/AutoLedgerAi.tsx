import { ProjectLayout } from '@/components/layout/ProjectLayout';

export function AutoLedgerAi() {
  // 国別比較やデータ分析のプロセスを想定
  const timelineKeys = ['0', '1', '2'] as const;
  return (
    <ProjectLayout
      i18nKey="projectData.autoLedgerAi"
      image={`${import.meta.env.BASE_URL}image/auto-ledger-ai.png`}
      timelineKeys={timelineKeys}
    />
  );
}
