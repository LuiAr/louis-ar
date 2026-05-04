import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "master-thesis",
    title: "6G On-Device AI for Robots",
    shortDescription: "Master thesis — VLM/SLM system for autonomous navigation",
    longDescription:
      "Master thesis in collaboration with RISE Research Institutes of Sweden and Husqvarna. Developed a modular Vision-Language Model / Small Language Model system optimised for 6G on-device AI enabling real-time navigation of autonomous robots. Included data collection on a Husqvarna Automower.",
    tags: ["ai"],
    status: "in-progress",
    year: 2026,
    iconType: "document",
    links: {},
    techStack: ["Python", "VLM", "SLM", "6G", "Robotics"],
    featured: true,
  },
  {
    id: "innovation-day",
    title: "Self-Checkout Vision System",
    shortDescription: "Computer vision model for catering tray detection",
    longDescription:
      "Academic project at Efrei Paris — developed a self-checkout solution for the catering industry using computer vision to detect trays. The project was selected among the six best out of 40 submissions.",
    tags: ["ai"],
    status: "live",
    year: 2023,
    iconType: "application",
    links: {},
    techStack: ["Python", "Computer Vision", "scikit-learn"],
    featured: true,
  },
  {
    id: "qr-generator",
    title: "Easy QR — Free QR Generator",
    shortDescription: "Instant QR codes — no account, no expiry",
    longDescription:
      "A simple, no-friction QR code generator. Paste a URL and get a scannable QR code instantly — no account required, no subscription, and the codes never expire.",
    tags: ["web"],
    status: "live",
    year: 2025,
    iconType: "application",
    links: {
      live: "https://easy-qr-fast.lovable.app",
    },
    techStack: ["Lovable"],
    featured: false,
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    shortDescription: "This very site — Mac OS Classic themed portfolio",
    longDescription:
      "A personal portfolio website built with Next.js 15 and Tailwind CSS v4, featuring a 1984 Macintosh-inspired design system with pixel-perfect window chrome, animated boot sequence, and Finder-style UI patterns.",
    tags: ["web", "design"],
    status: "live",
    year: 2025,
    iconType: "application",
    links: {
      github: "https://github.com/LuiAr/louis-ar",
      live: "https://louisarbey.eu",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    featured: true,
  },
];
