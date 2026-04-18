import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "current",
    company: "Acme Corp",
    role: "Senior Frontend Engineer",
    type: "full-time",
    startDate: "2023-03",
    endDate: "present",
    location: "Paris, France",
    description:
      "Leading frontend architecture for a B2B SaaS platform serving 50k+ users.",
    bullets: [
      "Migrated legacy React class components to modern hooks, reducing bundle size by 32%",
      "Designed and implemented a white-label theming system adopted by 12 enterprise clients",
      "Mentored 3 junior engineers through weekly 1:1s and code reviews",
      "Established frontend testing standards, pushing coverage from 40% to 87%",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Storybook"],
    companyUrl: "https://example.com",
  },
  {
    id: "startup",
    company: "Helix Labs",
    role: "Full-Stack Developer",
    type: "full-time",
    startDate: "2021-06",
    endDate: "2023-02",
    location: "Remote",
    description:
      "Early engineer at a health-tech startup building patient data platforms.",
    bullets: [
      "Built real-time patient monitoring dashboard from scratch using React and WebSockets",
      "Designed REST API consumed by 3 mobile apps and the main web platform",
      "Implemented HIPAA-compliant audit logging and role-based access control",
      "Reduced API p95 latency from 1.2s to 180ms through query optimization and caching",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    companyUrl: "https://example.com",
  },
  {
    id: "agency",
    company: "Pixel Studio",
    role: "Frontend Developer",
    type: "contract",
    startDate: "2020-01",
    endDate: "2021-05",
    location: "Lyon, France",
    description:
      "Delivered web projects for clients across e-commerce, media, and non-profit sectors.",
    bullets: [
      "Delivered 8 client projects on time and within budget over 16 months",
      "Built custom Shopify themes generating €200k+ in client revenue",
      "Created an internal component library that cut average project setup time by 60%",
    ],
    skills: ["JavaScript", "Vue.js", "Shopify", "CSS", "Figma"],
  },
  {
    id: "internship",
    company: "BNP Paribas",
    role: "Software Engineering Intern",
    type: "internship",
    startDate: "2019-06",
    endDate: "2019-12",
    location: "Paris, France",
    description:
      "6-month internship in the digital banking division working on internal tooling.",
    bullets: [
      "Built a Python script automating monthly report generation, saving 8 hours/month",
      "Developed an internal React app for tracking IT asset inventory",
      "Contributed to migration of legacy jQuery code to React",
    ],
    skills: ["React", "Python", "SQL", "Git"],
    companyUrl: "https://bnpparibas.com",
  },
];
