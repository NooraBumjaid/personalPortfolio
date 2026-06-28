import { Link, useParams } from "@/lib/router";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ProjectSubpageHeader } from "@/components/projects/ProjectSubpageHeader";
import { ProjectDocument } from "@/lib/projects";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

function getReportDocuments(documents?: ProjectDocument[]) {
  return documents?.filter((doc) => doc.group === "reports" && doc.url.trim()) ?? [];
}

export function ProjectReportsPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { getProjectBySlug, ui } = useLocale();
  const project = getProjectBySlug(slug);
  const reports = getReportDocuments(project?.documents ?? undefined);

  useDocumentTitle(
    project && reports.length
      ? `${project.title} — ${ui.projectReports} | ${ui.documentTitleSuffix}`
      : ui.documentTitleNotFound
  );

  if (!project || reports.length === 0) return <NotFoundPage />;

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <ProjectSubpageHeader
              projectSlug={slug}
              projectTitle={project.title}
              pageTitle={ui.projectReports}
              description={ui.viewReportsDesc}
            />
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reports.map((report) => (
              <FadeIn onMount key={report.slug ?? report.label}>
                <Link href={`/projects/${slug}/document/${report.slug}`} className="group block h-full">
                  <GlassCard hover className="h-full p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-accent/10 text-cyber-accent transition-colors group-hover:bg-cyber-accent/20">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="font-semibold text-cyber-text transition-colors group-hover:text-cyber-accent">
                      {report.label}
                    </h2>
                    <p className="mt-1 text-xs text-cyber-muted">{ui.docPdf}</p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
