import Image from "next/image";

const SKILLS = [
  "Python", "SQL", "Java",
  "Azure", "Spark", "Kafka", "Deepset",
  "MongoDB", "Cassandra", "Neo4j", "ElasticSearch",
  "Power BI", "Qlik Sense", "scikit-learn",
];

export default function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Avatar */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div className="border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] overflow-hidden w-[120px] h-[120px]">
          <Image
            src="/profile.jpg"
            alt="Louis"
            width={120}
            height={120}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <span className="text-[11px] text-[var(--color-ink-muted)] text-center">
          Louis.jpg
        </span>
      </div>

      {/* Bio + skills */}
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-[11px] text-[var(--color-ink-muted)] uppercase tracking-widest mb-1">
            About
          </p>
          <p className="text-[13px] leading-relaxed">
            I&apos;m a Data Scientist based in Stockholm, working on AI solutions
            for government institutions at Redfield AB. I hold an Engineering
            Degree from Efrei Paris (Data Engineering) and a Master&apos;s from
            Stockholm University specialising in AI applied to Health.
          </p>
          <p className="text-[13px] leading-relaxed mt-3">
            Currently writing my Master&apos;s thesis with RISE &amp; Husqvarna on
            6G on-device AI for autonomous robots.
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
  );
}
