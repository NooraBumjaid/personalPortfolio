import { useParams } from "@/lib/router";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ProjectSubpageHeader } from "@/components/projects/ProjectSubpageHeader";
import { getProjectBySlug } from "@/lib/projects";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function ProjectPrototypePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useDocumentTitle(
    project?.prototypeUrl
      ? `${project.title} — Figma Prototype | Noora Bumjaid`
      : "Not Found"
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
              pageTitle="Figma Prototype"
              description="Interactive interface prototype and system design preview."
            >
              <Button href={project.prototypeUrl} external variant="secondary" size="sm">
                Open in New Tab
              </Button>
            </ProjectSubpageHeader>
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <GlassCard className="overflow-hidden">
              <div className="relative aspect-[16/10] w-full bg-cyber-surface">
                <iframe
                  src={project.prototypeUrl}
                  title={`${project.title} Figma prototype`}
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
