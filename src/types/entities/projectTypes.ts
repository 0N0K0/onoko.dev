import type { Category } from "./categoryTypes";
import type { Coworker } from "./coworkerTypes";
import type { Media } from "./mediaTypes";
import type { Role } from "./roleTypes";
import type { Stack } from "./stackTypes";

export interface Project {
  id: string;
  label: string;
  thumbnail?: Media | string;
  categories?: Category[] | string[];
  website?: {
    url: string;
    label: string;
  };
  mockup?: {
    url: string;
    label: string;
    images?: Media[];
  };
  client?: {
    label: string;
    logo?: Media | string;
  };
  manager?: {
    name: string;
    email?: string;
  };
  startDate?: Date;
  endDate?: Date;
  intro?: {
    context?: string;
    objective?: string;
    client?: string;
  };
  presentation?: {
    description?: string;
    issue?: string;
    audience?: string;
  };
  need?: {
    features?: string;
    functionalConstraints?: string;
    technicalConstraints?: string;
  };
  organization?: {
    workload?: string;
    anticipation?: string;
    methodology?: string;
    evolution?: string;
    validation?: string;
  };
  roles?: Role[] | string[];
  coworkers?: Coworker[];
  stacks?: (Partial<Stack> & { section?: string; version?: string })[];
  kpis?: {
    issues?: number;
    points?: number;
    commits?: number;
    pullRequests?: number;
  };
  feedback?: {
    general?: string;
    client?: string;
  };
}
