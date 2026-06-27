export type PageNamespace =
  | 'index'
  | 'about'
  | 'skillfarm'
  | 'blog'
  | 'portfolio'
  | 'contact';

export interface SectionScrollTarget {
  uniform: { value: number };
  trigger: string;
}

export interface WorkItem {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
