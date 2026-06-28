import { Link } from "@/lib/router";
import { ReactNode } from "react";
import { useLocale } from "@/lib/i18n";

interface ProjectSubpageHeaderProps {
  projectSlug: string;
  projectTitle: string;
  pageTitle: string;
  description?: string;
  children?: ReactNode;
}

export function ProjectSubpageHeader({
  projectSlug,
  projectTitle,
  pageTitle,
  description,
  children,
}: ProjectSubpageHeaderProps) {
  const { ui } = useLocale();

  return (
    <div>
      <Link
        href={`/projects/${projectSlug}`}
        className="inline-flex items-center gap-2 text-sm text-cyber-muted transition-colors hover:text-cyber-accent"
      >
        <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {ui.backToProject(projectTitle)}
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cyber-accent">
        {projectTitle}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{pageTitle}</h1>
      {description && <p className="mt-3 max-w-2xl text-cyber-muted">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
