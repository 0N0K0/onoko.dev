import useEntityMutations from "./useEntityMutations";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "../../services/category/categoryMutations";
import type { Category } from "../../types/entities/categoryTypes";

export default function useCategoryMutations() {
  return useEntityMutations<
    { input: Omit<Category, "id"> },
    { id: string; input: Partial<Category> }
  >(
    CREATE_CATEGORY_MUTATION,
    UPDATE_CATEGORY_MUTATION,
    DELETE_CATEGORY_MUTATION,
  );
}
