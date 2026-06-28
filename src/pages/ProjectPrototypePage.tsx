import { useParams } from "@/lib/router";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ProjectSubpageHeader } from "@/components/projects/ProjectSubpageHeader";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function ProjectPrototypePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { getProjectBySlug, ui } = useLocale();
  const project = getProjectBySlug(slug);

  useDocumentTitle(
    project?.prototypeUrl
      ? `${project.title} — ${ui.projectPrototype} | ${ui.documentTitleSuffix}`
      : ui.documentTitleNotFound
  );

  if (!project?.prototypeUrl?.trim()) return <NotFoundPage />;

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <ProjectSubpageHeader
              projectSlug={slug}
              projectTitle={project.title}
              pageTitle={ui.projectPrototype}
              description={ui.viewPrototypeDesc}
            >
              <Button href={project.prototypeUrl} external variant="secondary" size="sm">
                {ui.openInNewTab}
              </Button>
            </ProjectSubpageHeader>
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <GlassCard className="overflow-hidden">
              <div className="relative aspect-[16/10] w-full bg-cyber-surface">
                <iframe
                  src={project.prototypeUrl}
                  title={`${project.title} prototype`}
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
