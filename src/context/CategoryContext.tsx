import { createContext, useEffect, useState, useMemo } from "react";
import type { Category, CategoryContextType } from "../types/categoryTypes";
import apolloClient from "../services/appolloClient";
import { CATEGORIES_QUERY } from "../services/category/categoryQueries";

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const [itemsError, setItemsError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setItemsError("");
    try {
      const { data } = await apolloClient.query<{ [key: string]: any[] }>({
        query: CATEGORIES_QUERY,
        fetchPolicy: "no-cache",
      });
      setCategories(data ? data.categories : []);
    } catch (e: any) {
      setItemsError(e.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const contextValue = useMemo(
    () => ({ categories, setCategories, loading, itemsError }),
    [categories, setCategories, loading, itemsError]
  );
  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
}
