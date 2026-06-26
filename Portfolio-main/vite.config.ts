import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGithubPages = env.GITHUB_PAGES === "true";
  const base =
    env.VITE_BASE_PATH ||
    (isGithubPages && repo && !repo.endsWith(".github.io") ? `/${repo}/` : "/");

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    define: {
      "import.meta.env.VITE_BASE_PATH": JSON.stringify(base.replace(/\/$/, "")),
      "process.env.NEXT_PUBLIC_BASE_PATH": JSON.stringify(base.replace(/\/$/, "")),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
