import type { Category } from "./categoryTypes";
import type {
  EntityFormDialogProps,
  useEntityMutationProps,
} from "./entityTypes";

export interface Media {
  id: string;
  label?: string;
  path: string;
  type: string;
  file?: File | null;
  category?: Category | string;
}

export interface MediaContextType {
  medias?: Media[];
  setMedias: React.Dispatch<React.SetStateAction<Media[] | undefined>>;
  loading: boolean;
  itemsError: string;
}

export interface MediaFormDialogProps extends EntityFormDialogProps {
  medias?: Media[];
}

export interface useMediaMutationProps extends useEntityMutationProps {
  medias?: Media[] | undefined;
  setMedias: React.Dispatch<React.SetStateAction<Media[] | undefined>>;
}
