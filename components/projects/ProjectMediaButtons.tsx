import { Link } from "@/lib/router";
import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Project, ProjectDocument } from "@/lib/projects";

interface ProjectMediaButtonsProps {
  project: Project;
}

const documentIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const presentationIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m10 2V2M7 20h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM7 8h10" />
  </svg>
);

function getDocumentDescription(format?: ProjectDocument["format"]) {
  if (format === "report") return "Report";
  if (format === "ppt") return "PPT";
  if (format === "pdf") return "PDF report";
  return "PDF report";
}

function getDocumentIcon(format?: ProjectDocument["format"]) {
  return format === "ppt" ? presentationIcon : documentIcon;
}

const mediaItems = [
  {
    key: "videos",
    label: "Watch Videos",
    description: "Pitch presentations and platform demo",
    href: (slug: string) => `/projects/${slug}/videos`,
    show: (p: Project) => p.videos?.some((v) => v.url.trim()),
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "slides",
    label: "View Slides",
    description: "Project presentation deck",
    href: (slug: string) => `/projects/${slug}/slides`,
    show: (p: Project) =>
      p.documents?.some((d) => d.slug === "slides" && d.url.trim()),
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "poster",
    label: "View Poster",
    description: "Project exhibition poster",
    href: (slug: string) => `/projects/${slug}/poster`,
    show: (p: Project) =>
      p.documents?.some((d) => d.slug === "poster" && d.url.trim()),
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "report",
    label: "View Report",
    description: "Full project report and analysis",
    href: (slug: string) => `/projects/${slug}/document/report`,
    show: (p: Project) =>
      p.documents?.some((d) => d.slug === "report" && d.url.trim()),
    icon: documentIcon,
  },
  {
    key: "presentation",
    label: "View Presentation",
    description: "Slides and project overview",
    href: (slug: string) => `/projects/${slug}/document/presentation`,
    show: (p: Project) =>
      p.documents?.some((d) => d.slug === "presentation" && d.url.trim()),
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m10 2V2M7 20h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM7 8h10" />
      </svg>
    ),
  },
  {
    key: "figma",
    label: "View Figma Design",
    description: "System design and interface prototypes",
    href: (slug: string, project: Project) => project.figmaUrl ?? `#`,
    external: true,
    show: (p: Project) => Boolean(p.figmaUrl?.trim()),
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    key: "prototype",
    label: "View Prototype",
    description: "Interactive Figma design preview",
    href: (slug: string) => `/projects/${slug}/prototype`,
    show: (p: Project) => Boolean(p.prototypeUrl?.trim()),
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
] as const;

function MediaButton({
  href,
  label,
  description,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  external?: boolean;
}) {
  const className =
    "group block rounded-xl border border-cyber-border bg-white/5 p-5 transition-all hover:border-cyber-accent/40 hover:bg-cyber-accent/5";

  const content = (
    <>
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-accent/10 text-cyber-accent transition-colors group-hover:bg-cyber-accent/20">
        {icon}
      </div>
      <h3 className="text-center font-semibold text-cyber-text transition-colors group-hover:text-cyber-accent">
        {label}
      </h3>
      <p className="mt-1 text-center text-xs leading-relaxed text-cyber-muted">
        {description}
      </p>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function ProjectMediaButtons({ project }: ProjectMediaButtonsProps) {
  const staticItems = mediaItems.filter((item) => item.show(project));
  const gridItems = staticItems.filter((item) => item.key !== "figma");
  const figmaItem = staticItems.find((item) => item.key === "figma");
  const videoCount = project.videos?.filter((video) => video.url.trim()).length ?? 0;
  const reportItems =
    project.documents?.filter(
      (doc) =>
        doc.group === "reports" &&
        doc.slug &&
        doc.url.trim() &&
        doc.slug !== "report"
    ) ?? [];

  if (gridItems.length === 0 && reportItems.length === 0 && !figmaItem) return null;

  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="mb-2 font-mono text-sm uppercase tracking-wider text-cyber-accent">
        Project Media
      </h2>
      <p className="mb-6 text-sm text-cyber-muted">
        Explore reports, presentations, prototypes, and demo materials for this project.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {gridItems.map((item) => (
          <div key={item.key} className="w-full sm:w-[calc(50%-0.5rem)]">
            <MediaButton
              href={item.href(project.slug)}
              label={
                item.key === "videos"
                  ? videoCount === 1
                    ? "Watch Video"
                    : "Watch Videos"
                  : item.label
              }
              description={
                item.key === "videos"
                  ? videoCount === 1
                    ? "Project presentation recording"
                    : item.description
                  : item.description
              }
              icon={item.icon}
              external={"external" in item && item.external === true}
            />
          </div>
        ))}
        {reportItems.map((doc) => (
          <div key={doc.slug} className="w-full sm:w-[calc(50%-0.5rem)]">
            <MediaButton
              href={`/projects/${project.slug}/document/${doc.slug}`}
              label={doc.label}
              description={doc.description ?? getDocumentDescription(doc.format)}
              icon={getDocumentIcon(doc.format)}
            />
          </div>
        ))}
      </div>

      {figmaItem && (
        <div className="mt-4 flex justify-center">
          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <MediaButton
              href={project.figmaUrl!}
              label={figmaItem.label}
              description={figmaItem.description}
              icon={figmaItem.icon}
              external
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
}
