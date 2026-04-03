/**
 * Ce fichier définit les types TypeScript liés aux stacks technologiques utilisées dans les projets.
 * Ces types permettent d'assurer une utilisation cohérente et typée des stacks à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

import type { Category } from "./categoryTypes";
import type {
  EntityFormDialogProps,
  useEntityMutationProps,
} from "./entityTypes";

export interface Stack {
  id: string;
  label: string;
  iconUrl?: string;
  description?: string;
  versions: string[];
  skills: string[];
  category?: string | Category;
}

export interface useStackMutationProps extends useEntityMutationProps {
  stacks?: Stack[] | undefined;
  setStacks: React.Dispatch<React.SetStateAction<Stack[] | undefined>>;
}

export interface StackFormDialogProps extends EntityFormDialogProps {
  stacks?: Stack[];
}
