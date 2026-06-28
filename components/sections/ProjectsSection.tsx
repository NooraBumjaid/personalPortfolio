import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { useLocale } from "@/lib/i18n";

export function ProjectsSection() {
  const { getFeaturedProjects, ui } = useLocale();
  const projects = getFeaturedProjects(3);

  return (
    <section id="projects" className="section-padding scroll-mt-28 border-t border-cyber-border/50 bg-cyber-surface/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label={ui.projectsLabel}
            title={ui.projectsTitle}
            highlight={ui.projectsHighlight}
            description={ui.projectsDescription}
          />
        </MotionSection>

        <MotionStagger className="mt-12 flex flex-wrap items-stretch justify-center gap-6">
          {projects.map((project) => (
            <MotionItem
              key={project.slug}
              className="flex h-full w-full md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
            >
              <ProjectCard project={project} />
            </MotionItem>
          ))}
        </MotionStagger>

        <MotionSection className="mt-12 flex justify-center">
          <Button href="/projects" variant="secondary" size="lg">
            {ui.viewAllProjects}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </MotionSection>
      </div>
    </section>
  );
}
