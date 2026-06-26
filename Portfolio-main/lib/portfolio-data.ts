import portfolio from "@/data/portfolio.json";
import type { Project, ProjectDocument } from "@/lib/projects-types";

export const siteConfig = portfolio.site;
export const heroStats = portfolio.heroStats;
export const navLinks = portfolio.navLinks;
export const education = portfolio.education;
export const languages = portfolio.languages;
export const skillCategories = portfolio.skillCategories;
export const certifications = portfolio.certifications;
export const experience = portfolio.experience;
export const leadership = portfolio.leadership;
export const awards = portfolio.awards;

const projects = portfolio.projects as Project[];

function sortProjects(a: Project, b: Project): number {
  const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return a.title.localeCompare(b.title);
}

const sortedProjects = [...projects].sort(sortProjects);

export function getAllProjects(): Project[] {
  return sortedProjects;
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = sortedProjects.filter((project) => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return sortedProjects.find((project) => project.slug === slug);
}

export function getProjectDocument(
  project: Project,
  docSlug: string
): ProjectDocument | undefined {
  return project.documents?.find((doc) => doc.slug === docSlug && doc.url.trim());
}
