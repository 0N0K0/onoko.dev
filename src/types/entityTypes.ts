import type { DocumentNode } from "@apollo/client";

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
  setInitialItem?: React.Dispatch<React.SetStateAction<any>>;
  setEditingItem?: React.Dispatch<React.SetStateAction<any>>;
  setHasChanges?: React.Dispatch<React.SetStateAction<boolean>>;
}
