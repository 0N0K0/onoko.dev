import type { Category } from "./categoryTypes";
import type { Coworker } from "./cowokerTypes";
import type { useEntityMutationProps } from "./entityTypes";
import type { Role } from "./roleTypes";
import type { Stack } from "./stackTypes";

export interface Project {
  id: string;
  label: string;
  thumbnailUrl?: string;
  thumbnailFile?: File | null;
  categories?: Category[] | string[];
  website?: {
    url: string;
    label: string;
  };
  mockup?: {
    url: string;
    label: string;
    imagesUrls?: string[];
    imagesFiles?: (File | null)[];
  };
  client?: {
    label: string;
    logoUrl?: string;
    logoFile?: File | null;
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

export interface ProjectContextType {
  projects?: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
  loading: boolean;
  itemsError: string;
}

export interface useProjectMutationProps extends useEntityMutationProps {
  projects?: Project[] | undefined;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
}
