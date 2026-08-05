// ─────────────────────────────────────────────────────────
// サイト運営者に関する静的データ（CMS非連携）。
// プロジェクトデータは data/projects.ts を参照。
// ─────────────────────────────────────────────────────────

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
