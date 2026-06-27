import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PdfScrollViewer } from "@/components/resume/PdfScrollViewer";
import { siteConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  className?: string;
  /** Taller viewer for the dedicated resume page */
  tall?: boolean;
}

export function ResumeViewer({ className, tall = false }: ResumeViewerProps) {
  const resumePath = withBasePath(siteConfig.resumePath);

  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      <div className="flex flex-col gap-3 border-b border-cyber-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-cyber-muted">Noora_Bumjaid_CV.pdf</span>
        </div>
        <Button href={siteConfig.resumePath} download variant="secondary" size="sm">
          Download CV
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </Button>
      </div>

      <PdfScrollViewer
        src={resumePath}
        title={`${siteConfig.name} Resume`}
        className={cn(
          "bg-cyber-surface",
          tall ? "min-h-[75vh] md:min-h-[80vh]" : "min-h-[28rem] md:min-h-[32rem]"
        )}
      />
    </GlassCard>
  );
}
