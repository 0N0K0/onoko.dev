import useProjectMutations from "../../hooks/mutations/useProjectMutations";
import useProjects from "../../hooks/queries/useProjects";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import ProjectFormDialog from "../../components/entities/project/ProjectFormDialog";
import type { Project } from "../../types/entities/projectTypes";
import Picture from "../../components/custom/Picture";
import type { Category } from "../../types/entities/categoryTypes";
import useEntityPage from "../../hooks/useEntityPage";

export default function Projects() {
  const { projects, loading, error, refetch } = useProjects();
  const mutations = useProjectMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Projet créé avec succès",
      edit: "Projet modifié avec succès",
      delete: "Projet supprimé avec succès",
    },
  });

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Projets",
          addButton: "Ajouter un projet",
          entity: "projets",
        }}
        items={projects}
        loading={loading}
        fields={[
          {
            key: "client.logo",
            label: "Logo",
            content: (item: Project) =>
              typeof item.client?.logo === "object" ? (
                <Picture
                  image={item.client.logo}
                  maxHeight="48px"
                  maxWidth="48px"
                />
              ) : null,
          },
          {
            key: "client.label",
            label: "Client",
            content: (item: Project) => item.client?.label,
          },
          {
            key: "label",
            label: "Label",
            content: (item: Project) => item.label,
          },
          {
            key: "startDate",
            label: "Date de début",
            content: (item: Project) => item.startDate?.format("MM/YYYY"),
          },
          {
            key: "categories",
            label: "Catégories",
            content: (item: Project) =>
              item.categories
                ?.filter(
                  (category): category is Category =>
                    typeof category === "object",
                )
                .map((category: Category) => category.label)
                .join(", "),
          },
        ]}
        {...contentProps}
      />
      <ProjectFormDialog {...formDialogProps} projects={projects} />
    </>
  );
}
