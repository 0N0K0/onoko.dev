import { useState } from "react";
import EntitiesPage from "../../components/entities/EntitiesPage";
import useCategoryMutations from "../../hooks/useCategoryMutations";
import { CATEGORIES_QUERY } from "../../services/categoryQueries";
import type { Category } from "../../types/categoryTypes";
import CategoryFormDialog from "../../components/category/CategoryFormDialog";

export default function CategoriesPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<Partial<Category> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [categories, setCategories] = useState<Category[] | undefined>([]);

  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
  };

  const handleClickAdd = () => {
    setFormDialogOpen(true);
    setEditingCategory({
      label: "",
      entity: "",
      description: "",
      parent: "",
    });
  };

  const handleClickEdit = (id: string) => {
    setFormDialogOpen(id);
    const category = categories?.find((c) => c.id === id) || null;
    setInitialCategory(category);
    setEditingCategory(category);
  };

  const { handleAdd, handleEdit, handleDelete } = useCategoryMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialCategory,
    editingCategory,
    setEditingCategory,
    setHasChanges,
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
          { key: "label", label: "Label" },
          {
            key: "entity",
            label: "Entité",
            content: (item) => entitiesMap[item.entity || ""],
          },
        ]}
        onClickActions={{
          add: handleClickAdd,
          edit: handleClickEdit,
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
        initialCategory={initialCategory}
        setInitialCategory={setInitialCategory}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
