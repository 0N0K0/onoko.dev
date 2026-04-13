import { useEffect, useState } from "react";
import useCategoryMutations from "../../hooks/mutations/useCategoryMutations";
import type { Category } from "../../types/entities/categoryTypes";
import CategoryFormDialog from "../../components/entities/CategoryFormDialog";
import useCategories from "../../hooks/queries/useCategories";
import EntitiesContent from "../../layout/admin/EntitiesContent";

/**
 * Page d'administration pour la gestion des catégories de projets et technologies.
 * Permet d'afficher la liste des catégories, d'ajouter une nouvelle catégorie,
 * de modifier une catégorie existante ou de supprimer une catégorie.
 */
export default function Categories() {
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { categories, loading, error, refetch } = useCategories();

  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
    media: "Média",
  };

  const {
    createCategory,
    createCategoryData,
    createCategoryLoading,
    createCategoryError,
    editCategory,
    editCategoryData,
    editCategoryLoading,
    editCategoryError,
    deleteCategory,
    deleteCategoryData,
    deleteCategoryLoading,
    deleteCategoryError,
  } = useCategoryMutations();

  useEffect(() => {
    if (!createCategoryLoading && createCategoryData) {
      setSubmitSuccess("Catégorie créée avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [createCategoryData]);
  useEffect(() => {
    if (!editCategoryLoading && editCategoryData) {
      setSubmitSuccess("Catégorie modifiée avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [editCategoryData]);
  useEffect(() => {
    if (!deleteCategoryLoading && deleteCategoryData) {
      setSubmitSuccess("Catégorie supprimée avec succès");
      refetch();
    }
  }, [deleteCategoryData]);

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Catégories",
          addButton: "Ajouter une catégorie",
          entity: "categories",
        }}
        items={categories}
        loading={loading}
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
          delete: deleteCategory,
        }}
        submitting={
          createCategoryLoading || editCategoryLoading || deleteCategoryLoading
        }
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        error={
          error?.message ||
          createCategoryError?.message ||
          editCategoryError?.message ||
          deleteCategoryError?.message ||
          ""
        }
      />
      <CategoryFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        categories={categories}
        handleAdd={createCategory}
        handleEdit={editCategory}
        submitting={
          createCategoryLoading || editCategoryLoading || deleteCategoryLoading
        }
      />
    </>
  );
}
