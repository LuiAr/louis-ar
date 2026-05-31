export type ProjectTag =
  | "web"
  | "mobile"
  | "design"
  | "open-source"
  | "fullstack"
  | "ai";

export type ProjectStatus = "live" | "in-progress" | "archived";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: ProjectTag[];
  status: ProjectStatus;
  year: number;
  iconType: "folder" | "document" | "application" | "image";
  /** Optional image path (relative to /public). When set, it overrides the SVG iconType. */
  iconSrc?: string;
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  techStack: string[];
  featured: boolean;
}
