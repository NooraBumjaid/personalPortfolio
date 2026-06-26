function getBasePath(): string {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_BASE_PATH) {
    return import.meta.env.VITE_BASE_PATH;
  }
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  return "";
}

/** Base path for GitHub Pages project sites (e.g. /Portfolio). Empty for root deploys. */
export const basePath = getBasePath();

/** Prefix internal static asset paths with the GitHub Pages base path. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${basePath}${path}`;
}
