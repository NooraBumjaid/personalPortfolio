import { FormEvent, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { OpenForWorkBadge } from "@/components/ui/OpenForWorkBadge";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion/Motion";
import { siteConfig } from "@/lib/site-config";

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/noorabumjaid",
    href: siteConfig.linkedin,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
      />
    ),
  },
  {
    label: "GitHub",
    value: "github.com/NooraBumjaid",
    href: siteConfig.github,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
      />
    ),
  },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Contact"
            title="Let's"
            highlight="connect"
            description={`Open to internships, IT and cybersecurity roles, and collaborative opportunities.`}
            align="center"
          />
        </MotionSection>

        <div className="mt-10 flex justify-center">
          <OpenForWorkBadge />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactLinks.map((link) => (
              <MotionItem key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <GlassCard hover className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyber-accent/10 text-cyber-accent">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {link.icon}
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-cyber-text">{link.label}</p>
                      <p className="truncate text-sm text-cyber-muted">{link.value}</p>
                    </div>
                  </GlassCard>
                </a>
              </MotionItem>
            ))}
            <MotionItem>
              <GlassCard className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
                <p className="text-sm font-medium text-cyber-text">Curriculum Vitae</p>
                <p className="text-sm text-cyber-muted">
                  View my resume on the site or download a PDF copy.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button href="/resume" size="md">
                    View CV
                  </Button>
                  <Button href={siteConfig.resumePath} download variant="secondary" size="md">
                    Download
                  </Button>
                </div>
              </GlassCard>
            </MotionItem>
          </MotionStagger>

          <MotionSection delay={0.1}>
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-cyber-text">Send a message</h3>
              <p className="mt-2 text-sm text-cyber-muted">
                Fill out the form and your email client will open with a pre-filled message.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-cyber-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-cyber-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-cyber-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-input resize-none"
                    placeholder="Tell me about the opportunity..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
