export interface ProjectVideo {
  label: string;
  url: string;
}

export interface ProjectDocument {
  slug?: string;
  label: string;
  url: string;
  group?: "reports" | "presentation" | "general";
  format?: "report" | "ppt" | "pdf";
  description?: string;
}

export interface ProjectTeamMember {
  name: string;
  id?: string;
}

export interface ProjectGalleryImage {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  overview: string;
  technologies: string[];
  features: string[];
  contributions: string[];
  outcome: string;
  category: string;
  featured: boolean;
  order?: number | null;
  period?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  course?: string | null;
  supervisor?: string | null;
  team?: ProjectTeamMember[] | null;
  objectives?: string[] | null;
  futureWork?: string[] | null;
  videos?: ProjectVideo[] | null;
  documents?: ProjectDocument[] | null;
  image?: string | null;
  cardDescription?: string | null;
  problem?: string | null;
  solution?: string | null;
  challenges?: string[] | null;
  lessonsLearned?: string[] | null;
  prototypeUrl?: string | null;
  figmaUrl?: string | null;
  gallery?: ProjectGalleryImage[] | null;
  content: string;
}
