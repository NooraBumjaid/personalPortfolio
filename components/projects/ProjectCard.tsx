import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard hover className="group flex h-full w-full flex-col items-center p-5 text-center">
      <h3 className="line-clamp-2 flex min-h-[3.5rem] items-center justify-center text-lg font-semibold leading-snug text-cyber-text transition-colors group-hover:text-cyber-accent">
        {project.title}
      </h3>

      <div className="mt-auto w-full pt-4">
        <Button href={`/projects/${project.slug}`} variant="secondary" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </GlassCard>
  );
}
