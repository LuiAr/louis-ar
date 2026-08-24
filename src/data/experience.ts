import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "redfield",
    company: "Redfield AB",
    role: "Data Scientist",
    type: "full-time",
    startDate: "2025-09",
    endDate: "present",
    location: "Stockholm, Sweden",
    description:
      "AI and data science consulting for large-scale companies and government institutions, from first proof of concept through to production.",
    bullets: [
      "AI consulting for large-scale companies, translating business problems into working models",
      "Development of AI solutions for government institutions",
      "Contribution to data-driven decision support through advanced analytics",
    ],
    skills: [
      "Python",
      "Machine Learning",
      "AI",
      "Data Analytics",
      "Consulting",
    ],
    companyUrl: "https://redfield.se",
  },
  {
    id: "rise-husqvarna",
    company: "RISE x Husqvarna",
    role: "Master's Thesis, On-Device AI",
    type: "thesis",
    startDate: "2026-01",
    endDate: "2026-06",
    location: "Stockholm, Sweden",
    description:
      "Master's thesis with RISE Research Institutes of Sweden and Husqvarna on 6G on-device AI for autonomous robots. Built and evaluated a modular Vision-Language Model and Small Language Model system that lets a robot understand its surroundings and navigate in real time, with the compute split between the device and the network edge.",
    bullets: [
      "Designed a modular VLM plus SLM pipeline for real-time scene understanding and navigation",
      "Benchmarked on-device versus edge-offloaded inference under 6G latency and bandwidth constraints",
      "Collected and annotated a field dataset using a Husqvarna Automower as the test platform",
      "Quantised and optimised models to run within the robot's compute and power budget",
    ],
    skills: [
      "Python",
      "VLM",
      "SLM",
      "6G",
      "Edge AI",
      "Robotics",
      "PyTorch",
    ],
    companyUrl: "https://www.ri.se",
    links: [{ label: "Read the thesis", url: "https://thesis.louisarbey.eu" }],
  },
  {
    id: "adone",
    company: "Adone Conseil",
    role: "Data & BI Consultant",
    type: "full-time",
    startDate: "2024-03",
    endDate: "2024-08",
    location: "Paris, France",
    description:
      "Developed data solutions in a luxury brand environment and delivered training on BI tools.",
    bullets: [
      "Development of Data solutions in a luxury brand environment",
      "Providing training on Excel and Power BI solutions",
    ],
    skills: ["Power BI", "Excel", "SQL", "Data Modeling"],
  },
  {
    id: "deloitte",
    company: "Deloitte",
    role: "Data Analyst",
    type: "full-time",
    startDate: "2022-11",
    endDate: "2023-03",
    location: "Paris, France",
    description:
      "Consulting assignments in the Audit department with a focus on data visualization.",
    bullets: [
      "Numerous consulting assignments in the Audit department",
      "Dashboard creation on QlikSense tool",
    ],
    skills: ["Qlik Sense", "SQL", "Data Analysis", "Consulting"],
    companyUrl: "https://deloitte.com",
  },
  {
    id: "boulanger",
    company: "Boulanger",
    role: "Sales & Consulting",
    type: "full-time",
    startDate: "2020-12",
    endDate: "2021-01",
    location: "Paris, France",
    description:
      "Salesperson in the multimedia department of a major French electronics retailer.",
    bullets: [
      "Customer advice and support in the multimedia department",
      "Sales consulting for consumer electronics products",
    ],
    skills: ["Sales", "Customer Service", "Communication"],
  },
];
