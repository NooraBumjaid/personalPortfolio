import { Link, useParams, usePathname } from "@/lib/router";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ImageDocumentsGrid, isImageDocumentUrl } from "@/components/ui/ImageDocumentsGrid";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function MediaGalleryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const pathname = usePathname();
  const { experience, leadership, ui } = useLocale();
  const section = pathname.includes("/experience/") ? "experience" : "activities";

  const entry =
    section === "experience"
      ? experience.find((item) => "slug" in item && item.slug === slug)
      : section === "activities"
        ? leadership.find((item) => "slug" in item && item.slug === slug)
        : undefined;

  const images = entry?.documents?.filter((doc) => isImageDocumentUrl(doc.url)) ?? [];
  const title = entry && "role" in entry ? entry.role : "";
  const subtitle = entry && "organization" in entry ? entry.organization : "";
  const backHref = section === "experience" ? "/#experience" : "/activities";
  const backLabel = section === "experience" ? ui.backToExperience : ui.backToActivities;
  const pageTitle = section === "experience" ? ui.certificate : ui.photos;

  useDocumentTitle(
    entry && images.length
      ? `${title} — ${pageTitle} | ${ui.documentTitleSuffix}`
      : ui.documentTitleNotFound
  );

  if (!entry || images.length === 0) return <NotFoundPage />;

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-cyber-muted transition-colors hover:text-cyber-accent"
            >
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backLabel}
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cyber-accent">
              {subtitle}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-cyber-muted">{ui.mediaPageDescription}</p>
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <ImageDocumentsGrid
              documents={images}
              size="page"
              fit={section === "experience" ? "contain" : "cover"}
            />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
