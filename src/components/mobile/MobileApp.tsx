"use client";

import { useEffect } from "react";
import MobileSection from "@/components/mobile/MobileSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

const SECTIONS = [
  { id: "about",      title: "ReadMe.txt",        Content: AboutSection },
  { id: "projects",   title: "Projects — Finder", Content: ProjectsSection },
  { id: "experience", title: "Experience",         Content: ExperienceSection },
  { id: "contact",    title: "Get In Touch",       Content: ContactSection },
] as const;

const NAV_LABELS: Record<string, string> = {
  about: "About",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

export default function MobileApp() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("mobile-scroll");
    html.style.scrollBehavior = "smooth";
    return () => {
      html.classList.remove("mobile-scroll");
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] font-[var(--font-body)]">
      {/* Sticky navigation bar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-cream)] border-b-2 border-[var(--color-ink)] flex items-center justify-between px-4 h-9">
        <span className="text-[13px] font-bold tracking-tight">Louis Ar</span>
        <div className="flex items-center gap-1">
          {SECTIONS.map(({ id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[11px] px-2 py-0.5 mac-invert-hover whitespace-nowrap"
            >
              {NAV_LABELS[id]}
            </a>
          ))}
        </div>
      </nav>

      {/* Section cards */}
      <main className="flex flex-col gap-6 p-4 pb-12">
        {SECTIONS.map(({ id, title, Content }) => (
          <MobileSection key={id} id={id} title={title}>
            <Content />
          </MobileSection>
        ))}
      </main>
    </div>
  );
}
