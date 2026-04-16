import type { useMutation } from "@apollo/client/react";
import type { Category } from "./categoryTypes";
import type { EntityFormDialogProps } from "./entityTypes";
import type { ApolloCache } from "@apollo/client";

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

export type MediaGridProps = {
  medias: Media[];
  onDelete: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
  submitting: boolean;
} & (
  | {
      mode: "library";
      setOpenDialog: React.Dispatch<React.SetStateAction<string | false>>;
    }
  | {
      mode: "picker";
      multiple: boolean;
      handleAdd: useMutation.MutationFunction<
        boolean,
        { input: { file: File | null } },
        ApolloCache
      >;
      addMediaLoading: boolean;
      handleEdit: useMutation.MutationFunction<
        boolean,
        { id: string; input: Partial<Media> },
        ApolloCache
      >;
      images: Media[];
      setImages: React.Dispatch<React.SetStateAction<Media[]>>;
    }
);
