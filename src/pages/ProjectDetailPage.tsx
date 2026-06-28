import { Link, useParams } from "@/lib/router";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeIn, PageTransition } from "@/components/motion/FadeIn";
import { withBasePath } from "@/lib/paths";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectMediaButtons } from "@/components/projects/ProjectMediaButtons";
import { useLocale } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-cyber-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-accent" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function ProjectDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { getProjectBySlug, ui } = useLocale();
  const project = getProjectBySlug(slug);

  useDocumentTitle(
    project ? `${project.title} | ${ui.documentTitleSuffix}` : ui.projectNotFound
  );

  if (!project) return <NotFoundPage />;

  return (
    <PageTransition>
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn onMount>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-cyber-muted transition-colors hover:text-cyber-accent"
            >
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {ui.backToProjects}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyber-accent/10 px-3 py-1 text-xs font-medium text-cyber-accent">
                {project.category}
              </span>
              {project.period ? (
                <span className="font-mono text-xs text-cyber-muted">{project.period}</span>
              ) : null}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Button href={project.liveUrl} external size="sm">
                    {ui.liveWebsite}
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button href={project.githubUrl} external variant="secondary" size="sm">
                    {ui.viewOnGithub}
                  </Button>
                ) : null}
              </div>
            )}
          </FadeIn>

          <div className="mt-12 space-y-8">
            {project.technologies.length ? (
              <FadeIn onMount>
                <GlassCard className="p-6 md:p-8">
                  <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
                    {ui.technologies}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-sm text-cyber-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </FadeIn>
            ) : null}

            {(project.course || project.supervisor || project.team?.length) ? (
              <FadeIn onMount>
                <ProjectMeta
                  course={project.course ?? undefined}
                  supervisor={project.supervisor ?? undefined}
                  team={project.team ?? undefined}
                />
              </FadeIn>
            ) : null}

            {project.gallery?.length ? (
              <FadeIn onMount>
                <ProjectGallery projectTitle={project.title} items={project.gallery} />
              </FadeIn>
            ) : null}

            <FadeIn onMount>
              <ProjectMediaButtons project={project} />
            </FadeIn>

            <FadeIn onMount>
              <GlassCard className="p-6 md:p-8">
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
                  {ui.overview}
                </h2>
                <p className="leading-relaxed text-cyber-muted" dir="auto">{project.overview}</p>
              </GlassCard>
            </FadeIn>

            {project.problem ? (
              <FadeIn onMount>
                <GlassCard className="p-6 md:p-8">
                  <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
                    {ui.problem}
                  </h2>
                  <p className="leading-relaxed text-cyber-muted" dir="auto">{project.problem}</p>
                </GlassCard>
              </FadeIn>
            ) : null}

            {project.solution ? (
              <FadeIn onMount>
                <GlassCard className="p-6 md:p-8">
                  <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
                    {ui.solution}
                  </h2>
                  <p className="leading-relaxed text-cyber-muted" dir="auto">{project.solution}</p>
                </GlassCard>
              </FadeIn>
            ) : null}

            {project.features.length ? (
              <FadeIn onMount>
                <ListSection title={ui.features} items={project.features} />
              </FadeIn>
            ) : null}

            {project.contributions.length ? (
              <FadeIn onMount>
                <ListSection title={ui.myContributions} items={project.contributions} />
              </FadeIn>
            ) : null}

            {project.challenges?.length ? (
              <FadeIn onMount>
                <ListSection title={ui.challenges} items={project.challenges} />
              </FadeIn>
            ) : null}

            {project.lessonsLearned?.length ? (
              <FadeIn onMount>
                <ListSection title={ui.lessonsLearned} items={project.lessonsLearned} />
              </FadeIn>
            ) : null}

            <FadeIn onMount>
              <GlassCard className="p-6 md:p-8">
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
                  {ui.outcome}
                </h2>
                <p className="leading-relaxed text-cyber-muted">{project.outcome}</p>
              </GlassCard>
            </FadeIn>

            {project.content.trim() ? (
              <FadeIn onMount>
                <GlassCard className="p-6 md:p-8">
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-cyber-text prose-p:text-cyber-muted prose-li:text-cyber-muted prose-strong:text-cyber-text">
                    <ReactMarkdown
                      components={{
                        img: ({ src, alt }) =>
                          typeof src === "string" && src ? (
                            <img
                              src={withBasePath(src)}
                              alt={alt ?? ""}
                              className="my-6 h-auto w-full rounded-xl border border-cyber-border bg-cyber-surface"
                            />
                          ) : null,
                      }}
                    >
                      {project.content}
                    </ReactMarkdown>
                  </div>
                </GlassCard>
              </FadeIn>
            ) : null}
          </div>

          <FadeIn onMount className="mt-12 flex flex-wrap gap-4">
            <Button href="/projects" variant="secondary">
              {ui.viewAllProjectsLower}
            </Button>
            <Button href="/#contact">{ui.discussProject}</Button>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
