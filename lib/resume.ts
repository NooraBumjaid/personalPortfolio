import type { Locale } from "@/lib/i18n/types";

export const RESUME_ASSETS: Record<
  Locale,
  { path: string; filename: string; title: string }
> = {
  en: {
    path: "/resume.pdf",
    filename: "NOORABUMJAID_CV.pdf",
    title: "Noora Bumjaid Resume",
  },
  ar: {
    path: "/resume.ar.pdf",
    filename: "نوره-بومجيد.pdf",
    title: "نوره بومجيد — السيرة الذاتية",
  },
};

export function getResumeAsset(locale: Locale) {
  return RESUME_ASSETS[locale];
}
