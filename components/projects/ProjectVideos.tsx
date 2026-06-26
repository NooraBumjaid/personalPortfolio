import { GlassCard } from "@/components/ui/GlassCard";
import { withBasePath } from "@/lib/paths";

export interface ProjectVideo {
  label: string;
  url: string;
}

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

function isLocalVideo(url: string): boolean {
  return url.startsWith("/") && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

interface ProjectVideosProps {
  videos: ProjectVideo[];
}

export function ProjectVideos({ videos }: ProjectVideosProps) {
  const available = videos.filter((video) => video.url.trim());

  if (available.length === 0) return null;

  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-cyber-accent">
        Videos
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {available.map((video) => {
          const embedUrl = getYouTubeEmbedUrl(video.url);

          return (
            <div
              key={video.label}
              className={`w-full ${available.length > 1 ? "lg:w-[calc(50%-1rem)]" : "max-w-4xl"}`}
            >
              <h3 className="mb-3 text-sm font-semibold text-cyber-text">
                {video.label}
              </h3>
              {embedUrl ? (
                <div className="aspect-video overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface">
                  <iframe
                    src={embedUrl}
                    title={video.label}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isLocalVideo(video.url) ? (
                <div className="overflow-hidden rounded-xl border border-cyber-border bg-cyber-surface">
                  <video
                    src={withBasePath(video.url)}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-auto w-full"
                  >
                    Your browser does not support embedded video playback.
                  </video>
                </div>
              ) : (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm text-cyber-accent hover:underline"
                >
                  Watch video
                </a>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
