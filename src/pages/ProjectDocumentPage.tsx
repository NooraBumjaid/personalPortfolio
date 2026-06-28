import { useParams } from "@/lib/router";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ProjectSubpageHeader } from "@/components/projects/ProjectSubpageHeader";
import { useLocale } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function ProjectDocumentPage() {
  const { slug = "", docSlug = "" } = useParams<{ slug: string; docSlug: string }>();
  const { getProjectBySlug, getProjectDocument, ui } = useLocale();
  const project = getProjectBySlug(slug);
  const document = project ? getProjectDocument(project, docSlug) : undefined;

  useDocumentTitle(
    project && document
      ? `${project.title} — ${document.label} | ${ui.documentTitleSuffix}`
      : ui.documentTitleNotFound
  );

  if (!project || !document) return <NotFoundPage />;

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <ProjectSubpageHeader
              projectSlug={slug}
              projectTitle={project.title}
              pageTitle={document.label}
              description={project.title}
            >
              <Button href={document.url} download variant="secondary" size="sm">
                {ui.downloadPdf}
              </Button>
            </ProjectSubpageHeader>
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <GlassCard className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full bg-cyber-surface md:aspect-[16/10] lg:aspect-[16/9]">
                <iframe
                  src={`${withBasePath(document.url)}#toolbar=0`}
                  title={document.label}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
