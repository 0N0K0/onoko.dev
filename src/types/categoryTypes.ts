import type { Stack } from "./stackTypes";

export interface Category {
  id: string;
  label: string;
  entity?: string;
  description?: string;
  parent?: string;
  depth?: number;
  entities?: Stack[];
}

export interface CategoryFormDialogProps {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  categories: Category[] | undefined;
  initialCategory: Category | null;
  setInitialCategory: (category: Category | null) => void;
  editingCategory: Partial<Category> | null;
  setEditingCategory: (category: Partial<Category> | null) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  submitting: boolean;
}

export interface useCategoryMutationProps {
  setSubmitSuccess: React.Dispatch<React.SetStateAction<string>>;
  setSubmitError: React.Dispatch<React.SetStateAction<string>>;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setFormDialogOpen?: React.Dispatch<React.SetStateAction<string | boolean>>;
  initialCategory?: Category | null;
  setInitialCategory?: React.Dispatch<React.SetStateAction<Category | null>>;
  editingCategory?: Partial<Category> | null;
  setEditingCategory?: React.Dispatch<
    React.SetStateAction<Partial<Category> | null>
  >;
  hasChanges?: boolean;
  setHasChanges?: React.Dispatch<React.SetStateAction<boolean>>;
  categories?: Category[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}
