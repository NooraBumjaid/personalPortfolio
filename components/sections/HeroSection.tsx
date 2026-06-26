import { Button } from "@/components/ui/Button";
import { OpenForWorkBadge } from "@/components/ui/OpenForWorkBadge";
import { MotionHero } from "@/components/motion/Motion";
import { withBasePath } from "@/lib/paths";
import { heroStats, siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid bg-gradient-radial" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 hidden h-72 w-72 rounded-full bg-cyber-accent/5 blur-3xl md:block" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 hidden h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl md:block" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <MotionHero>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <OpenForWorkBadge />
              <span className="inline-flex items-center rounded-full border border-cyber-border bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyber-muted">
                Cybersecurity Portfolio
              </span>
            </div>
          </MotionHero>

          <MotionHero delay={0.08}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-cyber-text sm:text-5xl lg:text-6xl">
              <span className="cyber-gradient-text">{siteConfig.name}</span>
            </h1>
          </MotionHero>

          <MotionHero delay={0.14}>
            <div className="mt-5 space-y-1">
              <p className="text-xl font-semibold text-cyber-text sm:text-2xl">
                {siteConfig.title}
              </p>
              <p className="text-base text-cyber-cyan sm:text-lg">{siteConfig.subtitle}</p>
            </div>
          </MotionHero>

          <MotionHero delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cyber-muted sm:text-lg">
              {siteConfig.heroBio}
            </p>
          </MotionHero>

          <MotionHero delay={0.26}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#projects" size="lg">
                View Projects
              </Button>
              <Button href="/resume" variant="secondary" size="lg">
                View CV
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Contact Me
              </Button>
            </div>
          </MotionHero>

          <MotionHero delay={0.32}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <p className="text-2xl font-bold text-cyber-accent">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-cyber-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </MotionHero>
        </div>

        <MotionHero delay={0.18} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="relative">
            <div className="absolute -inset-4 hidden rounded-3xl bg-gradient-to-br from-cyber-accent/15 via-transparent to-cyber-purple/15 blur-2xl md:block" />
            <div className="glass-card relative overflow-hidden p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cyber-surface">
                <img
                  src={withBasePath("/profile.png")}
                  alt={siteConfig.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          </div>
        </MotionHero>
      </div>
    </section>
  );
}
