import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "redfield",
    company: "Redfield AB",
    role: "Data Scientist",
    type: "part-time",
    startDate: "2025-09",
    endDate: "present",
    location: "Stockholm, Sweden",
    description:
      "Developing AI solutions for government institutions and contributing to data-driven decision support.",
    bullets: [
      "Development of AI solutions for government institutions",
      "Contribution to data-driven decision support through advanced analytics",
    ],
    skills: ["Python", "Machine Learning", "AI", "Data Analytics"],
    companyUrl: "https://redfield.se",
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
    role: "Sales – Consulting",
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
