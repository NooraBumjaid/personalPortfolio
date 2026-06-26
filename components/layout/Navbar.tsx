import { Link, usePathname } from "@/lib/router";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-config";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.replace("#", ""));

    const getDocumentTop = (element: HTMLElement) =>
      element.getBoundingClientRect().top + window.scrollY;

    const updateActiveSection = () => {
      const offset = 120;
      let current = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && window.scrollY + offset >= getDocumentTop(element)) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    setActiveSection("home");

    const frame = requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [isHome, pathname]);

  const getHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (isHome) return href;
    return `${withBasePath("/")}${href}`;
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith("/")) return pathname === href;
    if (!isHome) return false;
    return activeSection === href.replace("#", "");
  };

  const renderNavLink = (link: (typeof navLinks)[number], onNavigate?: () => void) => {
    const active = isLinkActive(link.href);
    const className = cn(
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      onNavigate ? "block px-4 py-3" : "",
      active
        ? "bg-cyber-accent/10 text-cyber-accent"
        : "text-cyber-muted hover:text-cyber-text",
      onNavigate && !active ? "hover:bg-white/5" : ""
    );

    if (link.href.startsWith("/")) {
      return (
        <Link href={link.href} className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    return (
      <a href={getHref(link.href)} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="nav-bar mt-4 flex items-center justify-between rounded-2xl border border-cyber-border px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-accent/10 font-mono text-sm font-bold text-cyber-accent">
              NB
            </span>
            <span className="hidden font-semibold text-cyber-text sm:block">
              Noora Bumjaid
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>{renderNavLink(link)}</li>
            ))}
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-cyber-muted hover:bg-white/5 hover:text-cyber-text lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen ? (
          <div className="nav-bar mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-cyber-border p-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>{renderNavLink(link, () => setMobileOpen(false))}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
