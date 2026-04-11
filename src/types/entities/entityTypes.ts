import type { DocumentNode } from "@apollo/client";
import type { Category } from "./categoryTypes";
import type { Role } from "./roleTypes";
import type { Stack } from "./stackTypes";
import type { Coworker } from "./cowokerTypes";
import type { Media } from "./mediaTypes";

/**
 * Ce fichier définit les types TypeScript liés aux entités génériques utilisées dans l'application, notamment les propriétés pour les pages d'entités, les mutations d'entités et les dialogues de confirmation de suppression.
 * Ces types permettent d'assurer une utilisation cohérente et typée des entités à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

export interface EntitiesPageProps {
  labels: {
    entity: string;
    title: string;
    addButton: string;
  };
  items: any[] | undefined;
  setItems: (items: any[] | undefined) => void;
  query: DocumentNode;
  fields: {
    key: string;
    label: string;
    content?: (item: any) => React.ReactNode;
  }[];
  onClickActions: {
    add: () => void;
    edit: (id: string) => void;
    delete: (ids: string[]) => void;
  };
  submitting: boolean;
  submitSuccess: string;
  setSubmitSuccess: (message: string) => void;
  submitError: string;
}

export interface useEntityMutationProps {
  setSubmitSuccess?: React.Dispatch<React.SetStateAction<string>>;
  setSubmitError?: React.Dispatch<React.SetStateAction<string>>;
  setSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  setFormDialogOpen?: React.Dispatch<React.SetStateAction<string | boolean>>;
}

export interface DeleteConfirmationDialogProps {
  label: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClickDelete: () => void;
  submitting: boolean;
}

export interface EntityFormDialogProps {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  handleAdd: (
    item: Partial<Category | Role | Stack | Coworker | Media>,
  ) => void;
  handleEdit: (
    item: Partial<Category | Role | Stack | Coworker | Media>,
  ) => void;
  submitting: boolean;
}
