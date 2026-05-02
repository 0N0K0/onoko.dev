import type { Stack } from "../../types/entities/stackTypes";
import useStackMutations from "../../hooks/mutations/useStackMutation";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import StackFormDialog from "../../components/entities/StackFormDialog";
import useStacks from "../../hooks/queries/useStacks";
import Picture from "../../components/custom/Picture";
import useEntityPage from "../../hooks/useEntityPage";

export default function Stacks() {
  const { stacks, loading, error, refetch } = useStacks();
  const mutations = useStackMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Technologie créée avec succès",
      edit: "Technologie modifiée avec succès",
      delete: "Technologie supprimée avec succès",
    },
  });

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Technologies",
          addButton: "Ajouter une technologie",
          entity: "stacks",
        }}
        items={stacks}
        loading={loading}
        fields={[
          {
            key: "icon",
            label: "Icone",
            content: (item: Stack) =>
              typeof item.icon === "object" ? (
                <Picture image={item.icon} maxHeight="48px" maxWidth="48px" />
              ) : null,
          },
          { key: "label", label: "Label" },
          {
            key: "category",
            label: "Catégorie",
            content: (item: Stack) =>
              typeof item.category === "string"
                ? item.category
                : item.category?.label,
          },
          {
            key: "versions",
            label: "Versions",
            content: (item: Stack) => item.versions.join(", "),
          },
          {
            key: "skills",
            label: "Compétences",
            content: (item: Stack) =>
              item.skills.length > 0 ? item.skills.length : "",
          },
        ]}
        {...contentProps}
      />
      <StackFormDialog {...formDialogProps} stacks={stacks} />
    </>
  );
}
