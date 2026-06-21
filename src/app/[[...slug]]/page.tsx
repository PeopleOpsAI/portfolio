"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Download,
  Heart,
  Lightbulb,
  Linkedin,
  Menu,
  Moon,
  Sun,
  Target,
  Workflow,
  X,
} from "lucide-react";
import {
  SITE,
  NAV_LINKS,
  heroContent,
  heroStats,
  aboutContent,
  expertiseContent,
  experienceItems,
  caseStudies,
  coreValues,
  skillTiers,
  hrPhilosophy,
  lookingFor,
  educationContent,
  certifications,
  contactContent,
  type CaseStudy,
  type ExperienceItem,
} from "@/lib/site";
import { useTheme } from "../providers";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

const wrap = "mx-auto w-full max-w-5xl px-5 md:px-8";
const pagePad = "pb-20 pt-28 md:pb-28 md:pt-32";

const valueIcons = { target: Target, workflow: Workflow, lightbulb: Lightbulb, heart: Heart };

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--text-tertiary)]">
      <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
      <span className="mx-2">›</span>
      <span className="text-[var(--text-primary)]">{current}</span>
    </nav>
  );
}

// ─── Hooks & layout ──────────────────────────────────────────────────────────

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { light, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
        <div className={`flex h-14 items-center justify-between ${wrap} max-w-6xl`}>
          <Link href="/" className="text-lg font-bold text-[var(--accent-primary)]">SM</Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link text-sm ${active ? "font-medium text-[var(--accent-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              aria-label="Toggle theme"
            >
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href={`mailto:${SITE.email}`} className="hidden text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] sm:inline">
              Get In Touch
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 bg-[var(--bg-canvas)] pt-14 md:hidden">
          <nav className="flex flex-col gap-1 p-5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-lg hover:bg-[var(--bg-surface)]">
                {link.label}
              </Link>
            ))}
            <Link href="/case-studies" onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-lg hover:bg-[var(--bg-surface)]">Work</Link>
            <a href={SITE.resumePath} download={SITE.resumeFilename} className="btn-pill-primary mt-4 w-full">Download Resume</a>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-10">
      <div className={`${wrap} max-w-6xl space-y-6`}>
        <div className="flex flex-col justify-between gap-4 text-sm text-[var(--text-tertiary)] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.name} · Senior HR Executive · {SITE.locationShort}, India</p>
          <div className="flex flex-wrap gap-5">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">LinkedIn</a>
            <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <Link href="/about" className="hover:text-[var(--text-primary)]">About</Link>
            <Link href="/case-studies" className="hover:text-[var(--text-primary)]">Work</Link>
          </div>
        </div>
        <p className="text-xs text-[var(--text-tertiary)]">Currently exploring: HR Technology & Employee Self-Service</p>
      </div>
    </footer>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

// ─── Shared cards ────────────────────────────────────────────────────────────

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const featured = study.featured ?? index === 0;
  return (
    <Reveal>
      <article className={`case-card ${featured ? "case-card-featured" : ""}`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent-primary)]">{study.company}</span>
            <span className="text-sm text-[var(--text-tertiary)]">{study.period}</span>
          </div>
          <ArrowUpRight size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
        </div>
        <h3 className="case-title text-2xl font-semibold tracking-tight">{study.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">{study.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <span key={t} className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">{t}</span>
          ))}
        </div>
        <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Impact:</p>
          <div className="flex flex-wrap gap-2">
            {study.impacts.map((imp) => (
              <span key={imp} className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs text-[var(--text-secondary)]">{imp}</span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ExperienceEntry({ item }: { item: ExperienceItem; index: number }) {
  const dates = `${item.startDate} – ${item.endDate}`;
  return (
    <Reveal className="relative pl-8">
      <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)]" aria-hidden="true" />
      <div className="absolute bottom-0 left-[4px] top-6 w-px bg-[var(--border-subtle)]" aria-hidden="true" />
      <p className="text-sm font-medium text-[var(--accent-primary)]">{dates}</p>
      <h3 className="mt-2 text-xl font-semibold">
        {item.role}
        <span className="font-normal text-[var(--text-tertiary)]"> · {item.company}</span>
      </h3>
      <ul className="mt-4 space-y-2">
        {item.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            <span className="text-[var(--text-tertiary)]">·</span>{b}
          </li>
        ))}
      </ul>
      {item.current ? (
        <span className="mt-4 inline-block rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs text-[var(--accent-primary)]">
          End-to-end ownership of HR operations at scale
        </span>
      ) : null}
    </Reveal>
  );
}

function SkillPill({ children, tier }: { children: string; tier?: "expert" | "proficient" | "familiar" }) {
  const border =
    tier === "expert"
      ? "border-[var(--accent-primary)]"
      : tier === "proficient"
        ? "border-[var(--border-strong)]"
        : "border-[var(--border-subtle)] opacity-80";
  return (
    <span className={`rounded-md border bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] ${border}`}>{children}</span>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <section className={`hero-glow ${pagePad} text-center`}>
        <div className={wrap}>
          <p className="mx-auto mb-6 inline-block rounded-full border border-[var(--border-strong)] bg-[var(--accent-muted)] px-4 py-1.5 text-xs text-[var(--accent-primary)]">
            {heroContent.badge}
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">{heroContent.name}</h1>
          <p className="mt-4 text-xl text-[var(--text-secondary)] md:text-2xl">{heroContent.headline}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{heroContent.tagline}</p>
          <p className="mx-auto mt-8 max-w-xl text-base italic text-[var(--text-secondary)] md:text-lg">
            &ldquo;{heroContent.quote}&rdquo;
          </p>
          <p className="mt-4 text-sm text-[var(--text-tertiary)]">📍 {heroContent.locationLine}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/case-studies" className="btn-pill-primary w-full sm:w-auto">View My Work</Link>
            <a href={SITE.resumePath} download={SITE.resumeFilename} className="btn-pill-ghost w-full sm:w-auto"><Download size={16} /> Download Resume</a>
          </div>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-[var(--border-subtle)] pt-12 md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold tabular-nums md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[var(--text-tertiary)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function ExperiencePage() {
  return (
    <div className={`${wrap} ${pagePad}`}>
        <Breadcrumb current="Experience" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Experience</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
          3+ years across IT, EPC, and renewable energy — progressing from HR Executive to Senior HR with widening scope each step.
        </p>
        <div className="mt-14 space-y-12">
          {experienceItems.map((item, i) => (
            <ExperienceEntry key={item.company} item={item} index={i} />
          ))}
        </div>
        <Reveal className="mt-16">
          <h2 className="text-2xl font-bold">Education</h2>
          <div className="mt-6 pl-8">
            <h3 className="text-xl font-semibold">{educationContent.degree}</h3>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">{educationContent.period}</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">MBA in Human Resource Management — building strategic HR and people operations foundation.</p>
          </div>
        </Reveal>
        <Reveal className="mt-16">
          <h2 className="text-2xl font-bold">Key Achievements</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center">
                <p className="text-3xl font-bold tabular-nums">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-[var(--text-tertiary)]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
  );
}

function SkillsPage() {
  const allSkills = [...expertiseContent.primary, ...expertiseContent.secondary];
  return (
    <div className={`${wrap} ${pagePad}`}>
        <Breadcrumb current="Skills & Tools" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Skills & Tools</h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">What I work with and how I think about HR technology.</p>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">HR Domain Expertise</h2>
          <div className="mt-4 border-b border-[var(--border-subtle)]" />
          <div className="mt-6 flex flex-wrap gap-2">
            {allSkills.map((s) => <SkillPill key={s}>{s}</SkillPill>)}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <div className="mt-4 border-b border-[var(--border-subtle)]" />
          {(["expert", "proficient", "familiar"] as const).map((tier) => (
            <div key={tier} className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">{tier}</p>
              <div className="flex flex-wrap gap-2">
                {skillTiers[tier].map((s) => <SkillPill key={s} tier={tier}>{s}</SkillPill>)}
              </div>
            </div>
          ))}
        </section>

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
            <h2 className="text-xl font-bold">How I Think About HR Technology</h2>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">{hrPhilosophy}</p>
          </div>
        </Reveal>
      </div>
  );
}

function AboutPage() {
  return (
    <div className={`${wrap} ${pagePad}`}>
        <Breadcrumb current="About" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About {SITE.name.split(" ")[0]}</h1>

        <blockquote className="gradient-border-left mt-10 pl-6 text-lg italic leading-relaxed text-[var(--text-secondary)] md:text-xl">
          &ldquo;{heroContent.quote}&rdquo;
        </blockquote>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          {aboutContent.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p className="text-sm font-medium text-[var(--accent-primary)]">{aboutContent.credential}</p>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Core Values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {coreValues.map((v, i) => {
              const Icon = valueIcons[v.icon];
              return (
                <Reveal key={v.title}>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-muted)]">
                      <Icon size={20} className="text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{v.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal className="mt-10">
          <div className="gradient-border-left rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 pl-6">
            <h2 className="text-xl font-bold">{lookingFor.title}</h2>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">{lookingFor.body}</p>
          </div>
        </Reveal>

        <p className="mt-6 text-sm italic text-[var(--text-tertiary)]">{lookingFor.note}</p>

        <div className="mt-12 border-t border-[var(--border-subtle)] pt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/case-studies" className="btn-pill-primary"><ArrowUpRight size={16} /> See My Work</Link>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-pill-ghost"><Linkedin size={16} /> Connect on LinkedIn</a>
          </div>
        </div>
      </div>
  );
}

function CaseStudiesPage() {
  return (
    <div className={`${wrap} ${pagePad}`}>
        <Breadcrumb current="Case Studies" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
          HR operations, recruitment, and innovation projects — measurable outcomes across BluPine Energy, EPC Infracon, and CodeGenIT.
        </p>
        <div className="mt-12 space-y-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} index={i} />
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a href={SITE.resumePath} download={SITE.resumeFilename} className="btn-pill-primary"><Download size={16} /> Download Resume</a>
          <p className="mt-4 text-sm text-[var(--text-tertiary)]">{contactContent.locations}</p>
        </Reveal>
      </div>
  );
}

const PAGES: Record<string, () => ReactNode> = {
  "/": () => <HomePage />,
  "/experience": () => <ExperiencePage />,
  "/skills": () => <SkillsPage />,
  "/about": () => <AboutPage />,
  "/case-studies": () => <CaseStudiesPage />,
};

function NotFound() {
  return (
    <div className={`${wrap} ${pagePad} text-center`}>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-[var(--text-secondary)]">This page does not exist.</p>
      <Link href="/" className="btn-pill-primary mt-8 inline-flex">Back to Home</Link>
    </div>
  );
}

export default function Page() {
  const pathname = usePathname();
  const render = PAGES[pathname];
  return <SiteShell>{render ? render() : <NotFound />}</SiteShell>;
}
