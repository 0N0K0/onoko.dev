import type { Category } from "../../types/entities/categoryTypes";
import { CATEGORIES_QUERY } from "../../services/category/categoryQueries";
import { createEntityQuery } from "./createEntityQuery";

export default createEntityQuery<Category, "categories">(
  CATEGORIES_QUERY,
  "categories",
);
