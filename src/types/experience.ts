export type ExperienceType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance"
  | "thesis";

export interface ExperienceLink {
  label: string;
  url: string;
}

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
  /** Extra outbound links shown as buttons inside the expanded row. */
  links?: ExperienceLink[];
}
