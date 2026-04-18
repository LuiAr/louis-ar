import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio v2",
    shortDescription: "This very site — Mac OS Classic themed portfolio",
    longDescription:
      "A personal portfolio website built with Next.js 15 and Tailwind CSS v4, featuring a 1984 Macintosh-inspired design system with pixel-perfect window chrome, animated boot sequence, and Finder-style UI patterns.",
    tags: ["web", "design"],
    status: "live",
    year: 2025,
    iconType: "application",
    links: {
      github: "https://github.com/LuiAr/louis-ar",
      live: "https://luiar.github.io/louis-ar",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    featured: true,
  },
  {
    id: "ai-chat",
    title: "AI Chat Interface",
    shortDescription: "Conversational UI for LLM interactions",
    longDescription:
      "A clean, minimal chat interface for interacting with large language models. Features streaming responses, conversation history, and markdown rendering with code highlighting.",
    tags: ["web", "ai", "fullstack"],
    status: "in-progress",
    year: 2025,
    iconType: "application",
    links: {
      github: "https://github.com/LuiAr",
    },
    techStack: ["React", "TypeScript", "Node.js", "OpenAI API"],
    featured: true,
  },
  {
    id: "design-system",
    title: "Design System",
    shortDescription: "Reusable component library with dark mode",
    longDescription:
      "A comprehensive design system built with React and TypeScript, featuring 40+ components, dark mode support, full accessibility compliance, and comprehensive Storybook documentation.",
    tags: ["web", "design", "open-source"],
    status: "live",
    year: 2024,
    iconType: "folder",
    links: {
      github: "https://github.com/LuiAr",
    },
    techStack: ["React", "TypeScript", "Storybook", "CSS Modules"],
    featured: true,
  },
  {
    id: "mobile-app",
    title: "Mobile Tracker",
    shortDescription: "Cross-platform fitness tracking app",
    longDescription:
      "A React Native app for tracking workouts and nutrition. Features offline-first data sync, Apple Health integration, and adaptive UI for both iOS and Android.",
    tags: ["mobile", "fullstack"],
    status: "archived",
    year: 2023,
    iconType: "document",
    links: {
      github: "https://github.com/LuiAr",
    },
    techStack: ["React Native", "Expo", "TypeScript", "SQLite"],
    featured: false,
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    shortDescription: "Real-time data visualization platform",
    longDescription:
      "A full-stack analytics dashboard with real-time updates via WebSockets, customizable chart widgets, multi-tenant auth, and a PostgreSQL backend with Prisma ORM.",
    tags: ["web", "fullstack"],
    status: "live",
    year: 2024,
    iconType: "document",
    links: {
      github: "https://github.com/LuiAr",
      live: "https://example.com",
    },
    techStack: ["Next.js", "Prisma", "PostgreSQL", "WebSockets", "Recharts"],
    featured: false,
  },
];
