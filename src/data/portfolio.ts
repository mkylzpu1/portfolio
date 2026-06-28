export interface Project {
  id: string;
  title: string;
  descKey: string;   // i18n key
  image: string;
  tags: string[];
  url: string;
}

export interface TimelineItem {
  year: string;
  titleKey: string;       // i18n key
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
    id: 'skillfarm',
    title: 'projectData.skillfarm.title',
    descKey: 'projectData.skillfarm.description',
    image: `${BASE}image/skillfarm.jpg`,
    tags: ['Laravel', 'Vue.js', 'MySQL', 'Docker'],
    url: '/skillfarm',
  },
  {
    id: 'blog',
    title: 'projectData.blog.title',
    descKey: 'projectData.blog.description',
    image: `${BASE}image/blog.jpg`,
    tags: ['WordPress', 'PHP', 'SEO'],
    url: '/blog',
  },
  {
    id: 'application-manager',
    title: 'projectData.applicationManager.title',
    descKey: 'projectData.applicationManager.description',
    image: `${BASE}image/application-manager.png`,
    tags: ['React', 'Python', 'DynamoDB', 'AWS', 'Terraform'],
    url: '/application-manager',
  },
  {
    id: 'flight-insight',
    title: 'projectData.flightInsight.title',
    descKey: 'projectData.flightInsight.description',
    image: `${BASE}image/flight-insight.png`,
    tags: ['React', 'Vite', 'Tailwind CSS'],
    url: '/flight-insight',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    items: ['Java / Spring', 'Python / FastAPI', 'PHP / Laravel', 'Ruby / Rails', 'WordPress'],
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
    year: '2023-2026',
    titleKey: 'timeline.0.title',
    descriptionKey: 'timeline.0.description',
  },
  {
    year: '2021',
    titleKey: 'timeline.1.title',
    descriptionKey: 'timeline.1.description',
  },
  {
    year: '2018',
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
  { id: 'home',       label: 'Home',       href: '/#home' },
  { id: 'about',      label: 'About',      href: '/#about' },
  { id: 'projects',   label: 'Projects',   href: '/#projects' },
  { id: 'skills',     label: 'Skills',     href: '/#skills' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'services',   label: 'Services',   href: '/#services' },
  { id: 'contact',    label: 'Contact',    href: '/#contact' },
] as const;

export type NavSectionId = (typeof navItems)[number]['id'];
