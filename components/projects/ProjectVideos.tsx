import { GlassCard } from "@/components/ui/GlassCard";
import { withBasePath } from "@/lib/paths";
import { useLocale } from "@/lib/i18n";
import type { ProjectVideo } from "@/lib/projects-types";

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

function getGoogleDriveEmbedUrl(url: string): string | null {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  return match?.[1] ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
}

function isLocalVideo(url: string): boolean {
  return url.startsWith("/") && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

interface ProjectVideosProps {
  videos: ProjectVideo[];
}

export function ProjectVideos({ videos }: ProjectVideosProps) {
  const { ui } = useLocale();
  const available = videos.filter((video) => video.url.trim());

  if (available.length === 0) return null;

  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-cyber-accent">
        {ui.videos}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {available.map((video) => {
          const youtubeEmbedUrl = getYouTubeEmbedUrl(video.url);
          const driveEmbedUrl = getGoogleDriveEmbedUrl(video.url);
          const embedUrl = youtubeEmbedUrl ?? driveEmbedUrl;

          return (
            <div
              key={video.label}
              className={`w-full ${available.length > 1 && !video.image ? "lg:w-[calc(50%-1rem)]" : "max-w-5xl"}`}
            >
              <h3 className="mb-3 text-sm font-semibold text-cyber-text">{video.label}</h3>
              <div className={video.image ? "flex flex-col items-center gap-4 md:flex-row md:items-stretch" : undefined}>
                {embedUrl ? (
                  <div className="aspect-video w-full min-w-0 flex-1 overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface">
                    <iframe
                      src={embedUrl}
                      title={video.label}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : isLocalVideo(video.url) ? (
                  <div className="w-full min-w-0 flex-1 overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface">
                    <video
                      src={withBasePath(video.url)}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-auto w-full"
                    />
                  </div>
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm text-cyber-accent hover:underline"
                  >
                    {ui.watchVideo}
                  </a>
                )}
                {video.image ? (
                  <a
                    href={withBasePath(video.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full shrink-0 overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface md:w-44 lg:w-52"
                  >
                    <img
                      src={withBasePath(video.image)}
                      alt={video.imageLabel ?? video.label}
                      className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] md:h-full"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
