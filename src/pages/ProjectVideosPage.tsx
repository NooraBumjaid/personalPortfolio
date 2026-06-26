import { useParams } from "@/lib/router";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { ProjectSubpageHeader } from "@/components/projects/ProjectSubpageHeader";
import { ProjectVideos } from "@/components/projects/ProjectVideos";
import { getProjectBySlug } from "@/lib/projects";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function ProjectVideosPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useDocumentTitle(
    project ? `${project.title} — Videos | Noora Bumjaid` : "Not Found"
  );

  if (!project?.videos?.some((v) => v.url.trim())) {
    return <NotFoundPage />;
  }

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <ProjectSubpageHeader
              projectSlug={slug}
              projectTitle={project.title}
              pageTitle="Project Videos"
              description="Pitch presentations and platform demonstration."
            />
          </FadeIn>

          <FadeIn onMount className="mt-10">
            <ProjectVideos videos={project.videos!} />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
