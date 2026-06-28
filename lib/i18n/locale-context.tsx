import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import portfolioEn from "@/data/portfolio.json";
import portfolioAr from "@/data/portfolio.ar.json";
import { getUi, type UiStrings } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/types";
import type { Project, ProjectDocument } from "@/lib/projects-types";

const STORAGE_KEY = "portfolio-locale";

type PortfolioData = typeof portfolioEn;

const portfolios: Record<Locale, PortfolioData> = {
  en: portfolioEn,
  ar: portfolioAr,
};

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isRtl: boolean;
  ui: UiStrings;
  site: PortfolioData["site"];
  heroStats: PortfolioData["heroStats"];
  navLinks: PortfolioData["navLinks"];
  education: PortfolioData["education"];
  languages: PortfolioData["languages"];
  skillCategories: PortfolioData["skillCategories"];
  certifications: PortfolioData["certifications"];
  experience: PortfolioData["experience"];
  leadership: PortfolioData["leadership"];
  awards: PortfolioData["awards"];
  getAllProjects: () => Project[];
  getFeaturedProjects: (limit?: number) => Project[];
  getProjectBySlug: (slug: string) => Project | undefined;
  getProjectDocument: (project: Project, docSlug: string) => ProjectDocument | undefined;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === "en" ? "ar" : "en"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => {
    const portfolio = portfolios[locale];
    const projects = sortProjects(portfolio.projects as Project[]);

    return {
      locale,
      setLocale,
      toggleLocale,
      isRtl: locale === "ar",
      ui: getUi(locale),
      site: portfolio.site,
      heroStats: portfolio.heroStats,
      navLinks: portfolio.navLinks,
      education: portfolio.education,
      languages: portfolio.languages,
      skillCategories: portfolio.skillCategories,
      certifications: portfolio.certifications,
      experience: portfolio.experience,
      leadership: portfolio.leadership,
      awards: portfolio.awards,
      getAllProjects: () => projects,
      getFeaturedProjects: (limit?: number) => {
        const featured = projects.filter((project) => project.featured);
        return limit ? featured.slice(0, limit) : featured;
      },
      getProjectBySlug: (slug: string) => projects.find((project) => project.slug === slug),
      getProjectDocument: (project: Project, docSlug: string) =>
        project.documents?.find((doc) => doc.slug === docSlug && doc.url.trim()),
    };
  }, [locale, setLocale, toggleLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function usePortfolioData() {
  return useLocale();
}
