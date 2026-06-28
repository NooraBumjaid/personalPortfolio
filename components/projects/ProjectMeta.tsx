import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectTeamMember } from "@/lib/projects";
import { useLocale } from "@/lib/i18n";

interface ProjectMetaProps {
  course?: string;
  supervisor?: string;
  team?: ProjectTeamMember[];
}

export function ProjectMeta({ course, supervisor, team }: ProjectMetaProps) {
  const { ui } = useLocale();

  if (!course && !supervisor && !team?.length) return null;

  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyber-accent">
        {ui.projectDetails}
      </h2>
      <dl className="space-y-4 text-sm">
        {course && (
          <div>
            <dt className="font-medium text-cyber-text">{ui.course}</dt>
            <dd className="mt-1 text-cyber-muted" dir="auto">{course}</dd>
          </div>
        )}
        {supervisor && (
          <div>
            <dt className="font-medium text-cyber-text">{ui.supervisor}</dt>
            <dd className="mt-1 text-cyber-muted">{supervisor}</dd>
          </div>
        )}
        {team && team.length > 0 && (
          <div>
            <dt className="font-medium text-cyber-text">{ui.team}</dt>
            <dd className="mt-2 space-y-2">
              {team.map((member) => (
                <div key={member.name} className="text-cyber-muted">
                  <span className="text-cyber-text">{member.name}</span>
                  {member.id && (
                    <span className="ms-2 font-mono text-xs text-cyber-cyan">{member.id}</span>
                  )}
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </GlassCard>
  );
}
