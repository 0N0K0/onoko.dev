/**
 * Ce fichier définit les types TypeScript liés aux stacks technologiques utilisées dans les projets, notamment le type Stack qui décrit la structure d'une stack, avec des propriétés telles que l'id, le label, l'URL de l'icône, la description, les versions disponibles et la catégorie associée.
 * Ces types permettent d'assurer une utilisation cohérente et typée des stacks à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

import type { Category } from "./categoryTypes";
import type { useEntityMutationProps } from "./entityTypes";

export interface Stack {
  id: string;
  label: string;
  iconUrl?: string;
  description?: string;
  versions: string[];
  category?: string | Category;
}

export interface useStackMutationProps extends useEntityMutationProps {
  initialStack?: Stack | null;
  setInitialStack?: React.Dispatch<React.SetStateAction<Stack | null>>;
  editingStack?: Partial<Stack & { iconFile?: File | null }> | null;
  setEditingStack?: React.Dispatch<
    React.SetStateAction<Partial<Stack & { iconFile?: File | null }> | null>
  >;
  stacks?: Stack[] | undefined;
  setStacks: React.Dispatch<React.SetStateAction<Stack[] | undefined>>;
}

export interface StackFormDialogProps {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  initialStack?: Stack | null;
  setInitialStack: (category: Stack | null) => void;
  editingStack: Partial<Stack & { iconFile?: File | null }> | null;
  setEditingStack: (
    category: Partial<Stack & { iconFile?: File | null }> | null,
  ) => void;
  onDropIcon: (acceptedFiles: File[]) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  submitting: boolean;
}
