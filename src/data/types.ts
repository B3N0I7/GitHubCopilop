export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description?: string;
}

export interface DocSection {
  id: string;
  title: string;
  description: string;
  content?: string;
  loader?: () => Promise<string>;
  examples?: CodeExample[];
  tips?: string[];
  relatedLinks?: { title: string; path: string }[];
}

export interface NavigationItem {
  path: string;
  title: string;
  icon?: string;
  children?: NavigationItem[];
}

export default DocSection;
