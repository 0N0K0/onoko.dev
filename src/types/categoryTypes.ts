import type {
  EntityFormDialogProps,
  useEntityMutationProps,
} from "./entityTypes";
import type { Stack } from "./stackTypes";

/**
 * Ce fichier définit les types TypeScript liés aux catégories de projets et technologies, notamment le type Category qui décrit la structure d'une catégorie, ainsi que les types pour les propriétés du formulaire de catégorie et les propriétés des mutations liées aux catégories.
 * Ces types permettent d'assurer une utilisation cohérente et typée des catégories à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

export interface Category {
  id: string;
  label: string;
  entity?: string;
  description?: string;
  parent?: string;
  depth?: number;
  entities?: Stack[];
}

export interface CategoryFormDialogProps extends EntityFormDialogProps {
  categories?: Category[];
}

export interface useCategoryMutationProps extends useEntityMutationProps {
  categories?: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}

export interface CategoryContextType {
  categories?: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
  loading: boolean;
  itemsError: string;
}
