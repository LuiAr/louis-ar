export type ExperienceType =
  | "full-time"
  | "contract"
  | "internship"
  | "freelance";

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: ExperienceType;
  startDate: string;
  endDate: string | "present";
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
  companyUrl?: string;
}
