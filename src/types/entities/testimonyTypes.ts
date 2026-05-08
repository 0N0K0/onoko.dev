import type { Dayjs } from "dayjs";
import type { EntityFormDialogProps } from "./entityTypes";

// Interface représentant un témoignage
export interface Testimony {
  id: string;
  name: string;
  company?: string;
  content: string;
  createdAt: Dayjs;
}

export interface TestimonyFormDialogProps extends EntityFormDialogProps {
  testimonies?: Testimony[];
}
