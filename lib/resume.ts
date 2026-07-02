import type { Locale } from "@/lib/i18n/types";

export const RESUME_ASSETS: Record<
  Locale,
  { path: string; filename: string; title: string }
> = {
  en: {
    path: "/resume.pdf",
    filename: "Noora_Abdulrahman_Rashid_Bumjaid_FlowCV_Resume_2026-07-02.pdf",
    title: "Noora Bumjaid Resume",
  },
  ar: {
    path: "/resume.ar.pdf",
    filename: "سيرة ذاتية نورة بومجيد.pdf",
    title: "سيرة ذاتية نورة بومجيد",
  },
};

export function getResumeAsset(locale: Locale) {
  return RESUME_ASSETS[locale];
}
