import type { ApolloCache } from "@apollo/client";
import type { useMutation } from "@apollo/client/react";

/**
 * Ce fichier définit les types TypeScript liés aux entités génériques utilisées dans l'application, notamment les propriétés pour les pages d'entités, les mutations d'entités et les dialogues de confirmation de suppression.
 * Ces types permettent d'assurer une utilisation cohérente et typée des entités à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

export interface EntitiesContentProps {
  labels: {
    entity: string;
    title: string;
    addButton: string;
  };
  items: any[] | undefined;
  loading?: boolean;
  fields: {
    key: string;
    label: string;
    content?: (item: any) => React.ReactNode;
  }[];
  onClickActions: {
    add: () => void;
    edit: (id: string) => void;
    delete: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
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
  handleAdd: useMutation.MutationFunction<
    any,
    { input: Omit<any, "id"> },
    ApolloCache
  >;
  handleEdit: useMutation.MutationFunction<
    any,
    { id: string; input: Partial<any> },
    ApolloCache
  >;
  submitting: boolean;
}
