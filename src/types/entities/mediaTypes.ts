import type { Category } from "./categoryTypes";
import type { EntityFormDialogProps } from "./entityTypes";

export interface Media {
  id: string;
  label?: string;
  path: string;
  type: string;
  file?: File | null;
  category?: Category | string;
}

export interface MediaFormDialogProps extends EntityFormDialogProps {
  medias?: Media[];
}
