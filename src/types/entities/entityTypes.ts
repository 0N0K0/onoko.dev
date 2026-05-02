import type { Dispatch, SetStateAction } from "react";

/**
 * Ce fichier définit les types TypeScript liés aux entités génériques utilisées dans l'application, notamment les propriétés pour les pages d'entités, les mutations d'entités et les dialogues de confirmation de suppression.
 * Ces types permettent d'assurer une utilisation cohérente et typée des entités à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

export interface EntitiesContentProps<
  T extends { id: string } = { id: string },
> {
  labels: {
    entity: string;
    title: string;
    addButton: string;
  };
  items: T[] | undefined;
  loading?: boolean;
  fields: {
    key: string;
    label: string;
    content?: (item: T) => React.ReactNode;
  }[];
  onClickActions: {
    add: () => void;
    edit: (id: string) => void;
    delete: (options?: { variables?: Record<string, unknown> }) => void;
  };
  submitting: boolean;
  submitSuccess: string;
  setSubmitSuccess: (message: string) => void;
  error: string;
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
  handleAdd: (options?: { variables?: Record<string, unknown> }) => void;
  handleEdit: (options?: { variables?: Record<string, unknown> }) => void;
  submitting: boolean;
}

export interface MutationState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: (...args: any[]) => void;
  data: boolean | null | undefined;
  loading: boolean;
  error: { message?: string } | undefined;
}

export interface UseEntityPageOptions {
  query: {
    loading: boolean;
    error: { message?: string } | undefined;
    refetch: () => void;
  };
  mutations: {
    create: MutationState;
    edit: MutationState;
    delete: MutationState;
  };
  messages: {
    create: string;
    edit: string;
    delete: string;
  };
}

export interface UseEntityPageReturn {
  contentProps: {
    onClickActions: {
      add: () => void;
      edit: (id: string) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete: (...args: any[]) => void;
    };
    submitting: boolean;
    submitSuccess: string;
    setSubmitSuccess: (message: string) => void;
    error: string;
  };
  formDialogProps: {
    open: boolean | string;
    setOpen: Dispatch<SetStateAction<string | boolean>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleAdd: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleEdit: (...args: any[]) => void;
    submitting: boolean;
  };
}
