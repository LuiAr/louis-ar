import MacWindow from "@/components/ui/MacWindow";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const SKILLS = [
  "TypeScript", "React", "Next.js", "Node.js",
  "Tailwind CSS", "PostgreSQL", "Docker", "AWS",
  "Figma", "Git", "GraphQL", "Prisma",
];

function PixelAvatar() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="var(--color-cream-dark)" />
      {/* Head */}
      <rect x="20" y="10" width="40" height="40" fill="var(--color-ink)" />
      {/* Eyes */}
      <rect x="28" y="22" width="8" height="8" fill="var(--color-cream)" />
      <rect x="44" y="22" width="8" height="8" fill="var(--color-cream)" />
      <rect x="30" y="24" width="4" height="4" fill="var(--color-ink)" />
      <rect x="46" y="24" width="4" height="4" fill="var(--color-ink)" />
      {/* Mouth */}
      <rect x="28" y="36" width="4" height="4" fill="var(--color-cream)" />
      <rect x="32" y="40" width="16" height="4" fill="var(--color-cream)" />
      <rect x="48" y="36" width="4" height="4" fill="var(--color-cream)" />
      {/* Neck */}
      <rect x="32" y="50" width="16" height="8" fill="var(--color-ink)" />
      {/* Body */}
      <rect x="16" y="58" width="48" height="20" fill="var(--color-ink)" />
      {/* Collar */}
      <rect x="32" y="58" width="6" height="10" fill="var(--color-cream)" />
      <rect x="42" y="58" width="6" height="10" fill="var(--color-cream)" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeInWhenVisible>
          <MacWindow title="ReadMe.txt" active className="w-full">
            <div className="flex flex-col md:flex-row gap-8 p-8">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)]">
                  <PixelAvatar />
                </div>
                <span className="text-[11px] text-[var(--color-ink-muted)] text-center">
                  Louis.jpg
                  <br />
                  <span className="text-[10px]">80 × 80 px</span>
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[11px] text-[var(--color-ink-muted)] uppercase tracking-widest mb-1">
                    About
                  </p>
                  <p className="text-[13px] leading-relaxed">
                    I&apos;m a software engineer with 5+ years of experience building
                    products people love. I care deeply about crafting interfaces
                    that are fast, accessible, and a joy to use.
                  </p>
                  <p className="text-[13px] leading-relaxed mt-3">
                    When I&apos;m not shipping features, you&apos;ll find me contributing
                    to open source, exploring retro computing aesthetics, or
                    attempting to make the perfect espresso.
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-[var(--color-ink-muted)] uppercase tracking-widest mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] border border-[var(--color-ink)] px-2 py-0.5 bg-[var(--color-cream-dark)] mac-invert-hover cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MacWindow>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
