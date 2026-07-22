export interface Project {
  id: string;
  i18nKey: string; // ← 追加: ProjectLayoutに渡すキー
  title: string;
  descKey: string;
  tagsKey: string;
  image: string;
  detailImage?: string; // ← 追加: 詳細ページ用の画像
  url: string;
  appUrl?: string; // ← 追加
  repoUrl?: string; // ← 追加
  timelineCount: number; // ← 追加: timelineKeysの代わりに件数だけ持つ
  category: 'app' | 'tool' | 'hp';
}

export interface TimelineItem {
  year: string;
  titleKey: string; // i18n key
  descriptionKey: string; // i18n key
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  valueKey: string; // i18n key
  href: string;
  icon: 'mail' | 'github' | 'qiita' | 'linkedin' | 'form';
}

export const profile = {
  name: 'Shota Sato',
  nameJa: '佐藤 翔太',
  role: 'System Engineer',
  roleJa: 'システムエンジニア',
  tags: ['JavaScript', 'Python', 'Java', 'Ruby', 'PHP', 'AWS', 'Terraform', 'Docker'],
  location: 'Japan',
  experience: '4 years (Medical) · 3+ years (Engineering)',
};

const BASE = import.meta.env.BASE_URL;
export const projects: Project[] = [
  {
    id: 'pasha-ten',
    i18nKey: 'projectData.pashaTen',
    title: 'projectData.pashaTen.title',
    descKey: 'projectData.pashaTen.description',
    category: 'app',
    tagsKey: 'projectData.pashaTen.tags',
    image: `${BASE}image/pasha-ten.svg`,
    url: '/pasha-ten',
    appUrl: 'https://d3e460c51ps9vo.cloudfront.net/guide',
    timelineCount: 5,
  },
  {
    id: 'auto-ledger-ai',
    i18nKey: 'projectData.autoLedgerAi',
    title: 'projectData.autoLedgerAi.title',
    descKey: 'projectData.autoLedgerAi.description',
    category: 'tool',
    tagsKey: 'projectData.autoLedgerAi.tags',
    image: `${BASE}image/auto-ledger-ai.png`,
    url: '/auto-ledger-ai',
    appUrl: 'https://mkylzpu1.github.io/auto-ledger-ai-lp/',
    timelineCount: 3,
  },
  {
    id: 'flight-insight',
    i18nKey: 'projectData.flightInsight',
    title: 'projectData.flightInsight.title',
    descKey: 'projectData.flightInsight.description',
    category: 'app',
    tagsKey: 'projectData.flightInsight.tags',
    image: `${BASE}image/flight-insight.png`,
    detailImage: `${BASE}movie/Flight Insight.gif`,
    url: '/flight-insight',
    timelineCount: 3,
  },
  {
    id: 'application-manager',
    i18nKey: 'projectData.applicationManager',
    title: 'projectData.applicationManager.title',
    descKey: 'projectData.applicationManager.description',
    category: 'app',
    tagsKey: 'projectData.applicationManager.tags',
    image: `${BASE}image/application-manager.png`,
    url: '/application-manager',
    appUrl: 'https://d2bz0qcouukt2b.cloudfront.net/',
    repoUrl: 'https://github.com/mkylzpu1/application-manager',
    timelineCount: 5,
  },
  {
    id: 'skillfarm',
    i18nKey: 'projectData.skillfarm',
    title: 'projectData.skillfarm.title',
    descKey: 'projectData.skillfarm.description',
    category: 'app',
    tagsKey: 'projectData.skillfarm.tags',
    image: `${BASE}image/skillfarm.jpg`,
    url: '/skillfarm',
    timelineCount: 8,
  },
  {
    id: 'blog',
    i18nKey: 'projectData.blog',
    title: 'projectData.blog.title',
    descKey: 'projectData.blog.description',
    category: 'hp',
    tagsKey: 'projectData.blog.tags',
    image: `${BASE}image/blog.jpg`,
    url: '/blog',
    timelineCount: 5,
  },
];

export const projectCategories = [
  { id: 'all', labelKey: 'projects.categories.all' },
  { id: 'app', labelKey: 'projects.categories.app' },
  { id: 'tool', labelKey: 'projects.categories.tool' },
  { id: 'hp', labelKey: 'projects.categories.hp' },
] as const;

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    items: [
      'Java / Spring',
      'Python / FastAPI',
      'PHP / Laravel',
      'Ruby / Rails',
      'WordPress',
      'GAS',
    ],
  },
  {
    title: 'Frontend',
    items: ['JavaScript / React, Vue.js, TypeScript', 'HTML / CSS / SCSS'],
  },
  {
    title: 'Infrastructure',
    items: ['Docker', 'AWS', 'Terraform', 'CI/CD'],
  },
  {
    title: 'Tools',
    items: ['Git / GitHub', 'Figma', 'VS Code'],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: '2018',
    titleKey: 'timeline.0.title',
    descriptionKey: 'timeline.0.description',
  },
  {
    year: '2021',
    titleKey: 'timeline.1.title',
    descriptionKey: 'timeline.1.description',
  },
  {
    year: '2023-2026',
    titleKey: 'timeline.2.title',
    descriptionKey: 'timeline.2.description',
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'Form',
    valueKey: 'contact.formValue',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSei9usU-1JIiAgY8b7_Vlft1dL_PmggtcPwOs7-0Zl8S4HQbw/viewform',
    icon: 'form',
  },
  {
    label: 'GitHub',
    valueKey: '',
    href: 'https://github.com/mkylzpu1',
    icon: 'github',
  },
];

export const navItems = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'projects', label: 'Projects', href: '/#projects' },
  { id: 'skills', label: 'Skills', href: '/#skills' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const;

export type NavSectionId = (typeof navItems)[number]['id'];
