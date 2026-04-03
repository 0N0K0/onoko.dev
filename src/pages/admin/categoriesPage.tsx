import { useState } from "react";
import EntitiesPage from "../../components/entities/EntitiesPage";
import useCategoryMutations from "../../hooks/useCategoryMutations";
import { CATEGORIES_QUERY } from "../../services/category/categoryQueries";
import type { Category } from "../../types/categoryTypes";
import CategoryFormDialog from "../../components/entities/CategoryFormDialog";
import { useCategory } from "../../hooks/useCategory";

/**
 * Page d'administration pour la gestion des catégories de projets et technologies.
 * Permet d'afficher la liste des catégories, d'ajouter une nouvelle catégorie,
 * de modifier une catégorie existante ou de supprimer une catégorie.
 */
export default function Categories() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { categories, setCategories } = useCategory();

  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
  };

  const { handleAdd, handleEdit, handleDelete } = useCategoryMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    categories,
    setCategories,
  });

  return (
    <>
      <EntitiesPage
        labels={{
          title: "Catégories",
          addButton: "Ajouter une catégorie",
          entity: "categories",
        }}
        items={categories}
        setItems={setCategories}
        query={CATEGORIES_QUERY}
        fields={[
          {
            key: "label",
            label: "Label",
            content: (item) => (
              <p style={{ paddingLeft: `${item.depth * 16}px` }}>
                {item.depth > 0 ? `- ` : ""}
                {item.label}
              </p>
            ),
          },
          {
            key: "entity",
            label: "Entité",
            content: (item: Category) =>
              (entitiesMap as Record<string, string>)[item.entity || ""] ||
              item.entity ||
              "",
          },
        ]}
        onClickActions={{
          add: () => setFormDialogOpen(true),
          edit: (id: string) => setFormDialogOpen(id),
          delete: handleDelete,
        }}
        submitting={submitting}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        submitError={submitError}
      />
      <CategoryFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        categories={categories}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
