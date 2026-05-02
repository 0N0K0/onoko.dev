import type { Category } from "./categoryTypes";

export interface Media {
  id: string;
  label?: string;
  path: string;
  type: string;
  file?: File | null;
  category?: Category | string;
  position?: number;
  focus?: string;
}

export type MediaGridProps = {
  medias: Media[];
  handleEdit: (options: {
    variables: { id: string; input: Partial<Media> };
  }) => unknown;
  onDelete: (options: { variables: { id: string } }) => unknown;
  submitting: boolean;
} & (
  | {
      mode: "library";
      setOpenDialog: React.Dispatch<React.SetStateAction<string | false>>;
    }
  | {
      mode: "picker";
      multiple: boolean;
      handleAdd: (options: {
        variables: { input: { file: File | null } };
      }) => unknown;
      addMediaLoading: boolean;
      images: Media[];
      setImages: React.Dispatch<React.SetStateAction<Media[]>>;
    }
);
