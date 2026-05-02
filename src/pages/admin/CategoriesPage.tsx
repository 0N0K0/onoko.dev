import useCategoryMutations from "../../hooks/mutations/useCategoryMutations";
import type { Category } from "../../types/entities/categoryTypes";
import CategoryFormDialog from "../../components/entities/CategoryFormDialog";
import useCategories from "../../hooks/queries/useCategories";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import useEntityPage from "../../hooks/useEntityPage";

const entitiesMap: { [key: string]: string } = {
  "": "",
  stack: "Technologie",
  project: "Projet",
  media: "Média",
};

export default function Categories() {
  const { categories, loading, error, refetch } = useCategories();
  const mutations = useCategoryMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Catégorie créée avec succès",
      edit: "Catégorie modifiée avec succès",
      delete: "Catégorie supprimée avec succès",
    },
  });

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
              <p style={{ paddingLeft: `${(item.depth ?? 0) * 16}px` }}>
                {(item.depth ?? 0) > 0 ? `- ` : ""}
                {item.label}
              </p>
            ),
          },
          {
            key: "entity",
            label: "Entité",
            content: (item: Category) =>
              entitiesMap[item.entity || ""] || item.entity || "",
          },
        ]}
        {...contentProps}
      />
      <CategoryFormDialog {...formDialogProps} categories={categories} />
    </>
  );
}
